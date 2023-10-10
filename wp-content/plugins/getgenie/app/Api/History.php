<?php

namespace GenieAi\App\Api;

class History
{

    public $prefix  = '';
    public $param   = '';
    public $request = null;

    public function __construct()
    {
        add_action('rest_api_init', function () {
            
            register_rest_route('getgenie/v1/history', '(?P<action>[\w-]+)', array(
                'methods'             => \WP_REST_Server::ALLMETHODS,
                'callback'            => [$this, 'actions'],
                'permission_callback' => '__return_true',
                'args'                => array(
                    'page' => array(
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        }
                    ),
                    'limit' => array(
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        }
                    )
                )
            ));
        });
    }

    public function actions($request){
        if(method_exists($this, $request['action'])){
            return $this->{$request['action']}($request);
        }
    }

    public function create($request)
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

        $body   = $request->get_body();
        $req    = json_decode($body);

        $record = array(
            'post_title'  => $req->templateSlug . '-' . date('Y-m-d H:i:s'),
            'post_status' => 'publish',
            'post_type' => 'getgenie_history',
            'post_author' => get_current_user_id(),
            'meta_input'  => array(
                'history_template_slug'    => $req->templateSlug,
                'history_template_type'    => $req->templateType, // writer default or blog wizard
                'history_creativity_level' => $req->creativity,
                'history_input'            => $req->input, // input labels and values in array/ object format
                'history_output'           => (isset($req->output) ? $req->output : []),
                'history_current_usage'    => $req->limitUsageStats->currentUsage,
            ),
        );

        // Insert the post into the database
        wp_insert_post($record);
        update_option('getgenie_subscription_statistics_timestamp', time());
        update_option('getgenie_subscription_statistics', rest_sanitize_object($req->limitUsageStats));

        return [
            "status"    => "success",
            "message"   => [
                "Created successfully.",
            ],
            "traceCode" => "",
        ];

    }

    public function clear($request)
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

        $args = array(
            'post_type'      => 'getgenie_history',
            'author'         => get_current_user_id(),
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        );
        
        $loop    = new \WP_Query($args);
        $deleted = 0;
        while ($loop->have_posts()) : $loop->the_post();
            wp_delete_post(get_the_ID(), true);
            $deleted++;
        endwhile;

        wp_reset_postdata();

        return [
            "status"    => "success",
            "data"      => [
                "total_posts" => $loop->post_count,
                "total_deleted_posts" => $deleted,
            ],
            "message"   => [
                "Cleared all history successfully.",
            ],
            "traceCode" => "",
        ];
    }

    public function list($request)
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
        $page = $request->get_param('page') ? $request->get_param('page') : 1;
        $limit = $request->get_param('limit') ? $request->get_param('limit') : 20;
        $args = array(
            'post_type'      => 'getgenie_history',
            'author'         => get_current_user_id(),
            'post_status'    => 'publish',
            'posts_per_page' => $limit,
            'orderby'        => 'date',
            'order'          => 'DESC',
            'paged'          => $page
        );
        
        $loop    = new \WP_Query($args);
        $totalPages = $loop->max_num_pages;

        $history = [];
        while ($loop->have_posts()) : $loop->the_post();
            $history[] = [
                "id"              => get_the_ID(),
                "input"           => get_post_meta(get_the_ID(), 'history_input', true),
                "output"          => get_post_meta(get_the_ID(), 'history_output', true),
                "usage"           => get_post_meta(get_the_ID(), 'history_current_usage', true),
                "creativityLevel" => get_post_meta(get_the_ID(), 'history_creativity_level', true),
                "templateSlug"    => get_post_meta(get_the_ID(), 'history_template_slug', true),
                "templateTitle"   => ucfirst(str_replace('-', ' ', get_post_meta(get_the_ID(), 'history_template_slug', true))),
                "date"            => get_the_date('Y-m-d H:i:s'). wp_timezone_string(),
                "user"            => get_the_author(),
            ];
        endwhile;

        wp_reset_postdata();

        return [
            "status"    => "success",
            "data"      => [
                "history" => $history,
                "total_pages" => $totalPages,
            ],
            "message"   => [
                "Fetched history list successfully.",
            ],
            "traceCode" => "",
        ];
    }
}