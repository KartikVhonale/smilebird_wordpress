<?php

namespace GenieAi\App\Api;

class License
{

    public $prefix = '';
    public $param = '';
    public $request = null;

    public function __construct() {
        add_action('rest_api_init', function() {
            register_rest_route('getgenie/v1/license', '(?P<action>[\w-]+)', array(
                'methods'  => \WP_REST_Server::ALLMETHODS,
                'callback' => [$this, 'action'],
                'permission_callback' => '__return_true',
            ));
        });
    }


    public function action($request) 
    {
        if($request['action'] == 'get_license_version'){
            return 'RPR_OK-2.0.0';
        }

        if ( !wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
            return [
                'status'    => 'fail',
                'message'   => ['Nonce mismatch.']
            ];
        }

        if ( !is_user_logged_in() || !current_user_can('publish_posts')) {
            return [
                'status'    => 'fail',
                'message'   => ['Access denied.']
            ];
        }

        switch($request['action']){
             case 'get-token':

                $response = getgenie_remote_request(
                    'wp-json/v1/manage-sites/license_active',
                    $request->get_body(),
                    [
                        'License-Version-Checker-Url' => get_rest_url(null, 'getgenie/v1/license/get_license_version')
                    ]
                );

                if($response !== null) {
                    $token      = isset($response->data) ? $response->data->siteToken : '';
                    $authTokenSecretKey  = isset($response->data) ? $response->data->authTokenSecretKey : '';
                    $subscriptionSiteData  = isset($response->data) ? $response->data->subscriptionSiteData : '';

                    if($token != '') {
                        update_option('getgenie_site_token', $token);
                        update_option('getgenie_auth_token_secret_key', $authTokenSecretKey);
                        update_option('getgenie_subscription_site_data', $subscriptionSiteData);
                        return [
                            "status" => "success",
                            "message" => [
                                "License has been activated"
                            ]
                        ];
                    }

                    return [
                        "status" => "fail",
                        "message" => [
                            isset($response->message[0]) ? $response->message[0] : "Invalid license key"
                        ]
                    ];
                }
                break;

            case 'remove-token':
                delete_option('getgenie_site_token');
                delete_option('getgenie_auth_token_secret_key');
                return [
                    "status" => "success",
                    "message" => [
                        "License has been deactivated"
                    ]
                ];
                break;

        }

        return [
            "status" => "fail",
            "message" => [
                "Remote connection timeout"
            ]
        ];
    }
}