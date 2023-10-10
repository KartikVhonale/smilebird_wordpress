<?php

namespace GenieAi\App\Services\History;

class Cpt
{

    public $prefix = '';
    public $param = '';
    public $request = null;

    public function __construct() {
        add_action( 'init', [$this, 'post_type'], 0 );
    }

    // Register Custom Post Type
    public function post_type() {

        $labels = array(
            'name'                  => _x( 'getgenie histories', 'Post Type General Name', 'getgenie' ),
            'singular_name'         => _x( 'getgenie history', 'Post Type Singular Name', 'getgenie' ),
            'menu_name'             => __( 'Post Types', 'getgenie' ),
            'name_admin_bar'        => __( 'Post Type', 'getgenie' ),
            'archives'              => __( 'Item Archives', 'getgenie' ),
            'attributes'            => __( 'Item Attributes', 'getgenie' ),
            'parent_item_colon'     => __( 'Parent Item:', 'getgenie' ),
            'all_items'             => __( 'All Items', 'getgenie' ),
            'add_new_item'          => __( 'Add New Item', 'getgenie' ),
            'add_new'               => __( 'Add New', 'getgenie' ),
            'new_item'              => __( 'New Item', 'getgenie' ),
            'edit_item'             => __( 'Edit Item', 'getgenie' ),
            'update_item'           => __( 'Update Item', 'getgenie' ),
            'view_item'             => __( 'View Item', 'getgenie' ),
            'view_items'            => __( 'View Items', 'getgenie' ),
            'search_items'          => __( 'Search Item', 'getgenie' ),
            'not_found'             => __( 'Not found', 'getgenie' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'getgenie' ),
            'featured_image'        => __( 'Featured Image', 'getgenie' ),
            'set_featured_image'    => __( 'Set featured image', 'getgenie' ),
            'remove_featured_image' => __( 'Remove featured image', 'getgenie' ),
            'use_featured_image'    => __( 'Use as featured image', 'getgenie' ),
            'insert_into_item'      => __( 'Insert into item', 'getgenie' ),
            'uploaded_to_this_item' => __( 'Uploaded to this item', 'getgenie' ),
            'items_list'            => __( 'Items list', 'getgenie' ),
            'items_list_navigation' => __( 'Items list navigation', 'getgenie' ),
            'filter_items_list'     => __( 'Filter items list', 'getgenie' ),
        );
        $args = array(
            'label'                 => __( 'getgenie history', 'getgenie' ),
            'description'           => __( 'getgenie histories', 'getgenie' ),
            'labels'                => $labels,
            'supports'              => array( 'title', 'author'),
            'taxonomies'            => [],
            'hierarchical'          => false,
            'public'                => false,
            'show_ui'               => false,
            'show_in_menu'          => false,
            'query_var'             => false,
            'menu_position'         => 5,
            'show_in_admin_bar'     => false,
            'show_in_nav_menus'     => false,
            'can_export'            => false,
            'has_archive'           => false,
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'rewrite'               => false,
            'capability_type'       => 'post',
            'show_in_rest'          => false,
        );
        register_post_type( 'getgenie_history', $args );
    }
}