<?php

namespace GenieAi\App\Api;

class GetGenieChat
{

    public $prefix  = '';
    public $param   = '';
    public $request = null;

    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route('getgenie/v1/geniechat', '(?P<action>[\w-]+)', array(
                'methods'             => \WP_REST_Server::ALLMETHODS,
                'callback'            => [$this, 'actions'],
                'permission_callback' => '__return_true',
                'args'                => array(
                    'page'  => array(
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        },
                    ),
                    'limit' => array(
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        },
                    ),
                ),
            ));
        });
    }

    public function actions($request)
    {
        if (method_exists($this, $request['action'])) {
            return $this->{$request['action']}($request);
        }
    }


    public function create($request)
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

        $body = $request->get_body();
        $req  = json_decode($body);
        $conversation_id = $req->id ?? '';

        if (empty($conversation_id)) {
            $record = array(
                'post_title'  => $req->templateSlug . '-' . date('Y-m-d H:i:s'),
                'post_status' => 'publish',
                'post_type'   => 'getgenie_chat',
                'post_author' => get_current_user_id(),
                'meta_input'  => array(
                    'getgenie_chat_template_slug' => $req->templateSlug,
                    'getgenie_chat_messages'      => $req->messages, // input labels and values in array/ object format
                ),
            );
            // Insert the post into the database
            $conversation_id = wp_insert_post($record);
            $message = 'Chat created successfully.';
        } else {
            $record = array(
                'ID'          => $conversation_id,
                'post_title'  => $req->templateSlug . '-' . date('Y-m-d H:i:s'),
                'post_status' => 'publish',
                'post_type'   => 'getgenie_chat',
                'post_author' => get_current_user_id(),
                'meta_input'  => array(
                    'getgenie_chat_template_slug' => $req->templateSlug,
                    'getgenie_chat_messages'      => $req->messages, // input labels and values in array/ object format
                ),
            );
            // Update the post into the database
            wp_update_post($record);
            $message = 'Chat updated successfully.';
        }

        update_option('getgenie_subscription_statistics_timestamp', time());


        update_option('getgenie_subscription_statistics', rest_sanitize_object($req->limitUsageStats));


        return [
            "status"    => "success",
            "data"      => [
                "conversation_id" => $conversation_id,
            ],
            "message"   => [
                $message,
            ],
            "traceCode" => "",
        ];
        
    }

    public function clear($request)
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


        $body    = $request->get_body();
        $req     = json_decode($body);
        $conversation_id = $req->id ?? '';
        $deleted = 0;


        if (empty($conversation_id)) {
            $args = array(
                'post_type'      => 'getgenie_chat',
                'author'         => get_current_user_id(),
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'orderby'        => 'date',
                'order'          => 'DESC',
            );

            $loop = new \WP_Query($args);
            while ($loop->have_posts()): $loop->the_post();
                wp_delete_post(get_the_ID(), true);
                $deleted++;
            endwhile;

        } else {
            wp_delete_post($conversation_id, true);
            $deleted++;
        }

        wp_reset_postdata();

        return [
            "status"    => "success",
            "data"      => [
                "total_posts"         => $loop->post_count ?? $deleted,
                "total_deleted_posts" => $deleted,
            ],
            "message"   => [
                "Cleared all chats successfully.",
            ],
            "traceCode" => "",
        ];
    }

    function list($request) {
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
        $page  = $request->get_param('page') ? $request->get_param('page') : 1;
        $limit = $request->get_param('limit') ? $request->get_param('limit') : 20;
        $args  = array(
            'post_type'      => 'getgenie_chat',
            'author'         => get_current_user_id(),
            'post_status'    => 'publish',
            'posts_per_page' => $limit,
            'orderby'        => 'date',
            'order'          => 'DESC',
            'paged'          => $page,
        );

        $loop       = new \WP_Query($args);
        $totalPages = $loop->max_num_pages;

        $getgenie_chats = [];
        while ($loop->have_posts()): $loop->the_post();
            $getgenie_chats[] = [
                "id"              => get_the_ID(),
                "messages"        => get_post_meta(get_the_ID(), 'getgenie_chat_messages', true),
                "templateSlug"    => get_post_meta(get_the_ID(), 'getgenie_chat_template_slug', true),
                "date"            => get_the_date('Y-m-d H:i:s'),
                "user"            => get_the_author(),
            ];
        endwhile;

        wp_reset_postdata();

        return [
            "status"    => "success",
            "data"      => [
                "getgenie_chats" => $getgenie_chats,
                "total_pages"    => $totalPages,
            ],
            "message"   => [
                "Fetched messages list successfully.",
            ],
            "traceCode" => "",
        ];
    }
}
