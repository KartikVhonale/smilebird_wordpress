<?php

namespace GenieAi\App\Api;

class UsageLimitStats
{

    public $prefix = '';
    public $param = '';
    public $request = null;

    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route('getgenie/v1', 'limit_usage_stats', array(
                'methods'  => \WP_REST_Server::ALLMETHODS,
                'callback' => [$this, 'action'],
                'permission_callback' => '__return_true',
            ));
        });
    }


    public function action($request)
    {
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return [
                'status'    => 'fail',
                'message'   => ['Nonce mismatch.']
            ];
        }

        if (!is_user_logged_in() || !current_user_can('publish_posts')) {
            return [
                'status'    => 'fail',
                'message'   => ['Access denied.']
            ];
        }

        $getgenie_subscription_statistic_timestamp = get_option('getgenie_subscription_statistics_timestamp');

        $time = 1000 * 60 * 0; // 10 Minutes

        if ((time() - $getgenie_subscription_statistic_timestamp)  <= $time) {
            return [
                "status"  => "success",
                "data" => get_option('getgenie_subscription_statistics'),
                "message" => [
                    "Successfully fetched"
                ],
                "traceCode" => "c3VjY2Vzc2Z1bGx5IGZldGNoZWQu"
            ];
        }

        $response = getgenie_remote_request(
            'wp-json/v1/manage-sites/limit_usage_stats',
            $request->get_body(),
            [
                'Site-Token' => get_option('getgenie_site_token', ''),
            ]
        );

        if ($response !== null) {
            if ($response->status == 'success') {
                update_option('getgenie_subscription_statistics_timestamp', time());
                update_option('getgenie_subscription_statistics', rest_sanitize_object($response->data));
            }

            return $response;
        }

        return [
            "status"  => "fail",
            "message" => [
                "Remote connection timeout",
            ],
        ];
    }
}
