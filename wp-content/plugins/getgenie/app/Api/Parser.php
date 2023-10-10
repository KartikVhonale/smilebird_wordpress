<?php

namespace GenieAi\App\Api;

class Parser
{

    public $prefix  = '';
    public $param   = '';
    public $request = null;

    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route('getgenie/v1/parser', '(?P<param1>[\w-]+)/(?P<param2>[\w-]+)', array(
                'methods'             => \WP_REST_Server::ALLMETHODS,
                'callback'            => [$this, 'action'],
                'permission_callback' => '__return_true',
            ));
        });
    }

    public function action($request)
    {
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

        $remote_url = GETGENIE_NLP_REMOTE_ADDR . $request['param1'] . '/' . $request['param2'];
        $body       = $request->get_body();

        $response = wp_remote_post($remote_url, array(
            'method'      => 'POST',
            'timeout'     => 300,
            'redirection' => 3,
            'httpversion' => '1.0',
            'sslverify'   => false,
            'blocking'    => true,
            'body'        => $body,
            'headers'     => array(
                'Site-URL'      => get_site_url(),
                'Content-Type'  => 'application/json',
                'Site-Token' => get_option('getgenie_site_token', ''),
            ),
        ));

        if (200 === wp_remote_retrieve_response_code($response)) {
            $response_body = wp_remote_retrieve_body($response);
            $data          = json_decode($response_body);

            return $data;
        }

        return [
            "status"  => "fail",
            "message" => [
                "Remote connection timeout",
            ],
        ];
    }
}
