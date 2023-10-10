<?php

namespace GenieAi\App\Api;

class Feedback
{

    public $prefix  = '';
    public $param   = '';
    public $request = null;

    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route('getgenie/v1', 'feedback', array(
                'methods'             => \WP_REST_Server::ALLMETHODS,
                'callback'            => [$this, 'action'],
                'permission_callback' => '__return_true',
            ));
        });
    }

    public function action($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return [
                'status'  => 'fail',
                'message' => ['Nonce mismatch.'],
            ];
        }

        if (!is_user_logged_in() || !current_user_can('publish_posts')) {
            return [
                'status'  => 'fail',
                'message' => ['Access denied.'],
            ];
        }
        $response = wp_remote_post( GETGENIE_NLP_REMOTE_ADDR . 'logs/feedback/', array(
            'method'      => 'POST',
            'timeout'     => 300,
            'redirection' => 3,
            'httpversion' => '1.0',
            'sslverify' => false,
            'blocking'    => true,
            'body' => $request->get_body(),
            'headers' => array(
                'Content-Type' => 'application/json',
                'Site-URL'   => get_site_url(),
                'Site-Token' => get_option('getgenie_site_token', ''),
                'Auth-Token' => $request->get_header('Auth-Token'),
                'Referer'    => get_site_url(),
            ),
        ));

        if(200 === wp_remote_retrieve_response_code($response)) {
            $response_body = wp_remote_retrieve_body($response);
            $response          = json_decode($response_body);

            if(!empty($response)){
                return $response;
            }
        }

        
        return [
            "status"  => "fail",
            "message" => [
                "Remote connection timeout",
            ],
        ];
    }
}
