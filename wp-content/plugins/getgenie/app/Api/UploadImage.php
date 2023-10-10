<?php 

namespace GenieAi\App\Api;

class UploadImage {

	public $prefix  = '';
    public $param   = '';
    public $request = null;

	public function __construct()
	{
		add_action('rest_api_init', function() {
            register_rest_route('getgenie/v1', 'genie-image/upload', array(
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
        $body   = $request->get_body();
        $req    = json_decode($body);
        $url = $req->imageUrl;
        $title = $req->title;

        require_once( ABSPATH . "/wp-load.php");
        require_once( ABSPATH . "/wp-admin/includes/image.php");
        require_once( ABSPATH . "/wp-admin/includes/file.php");
        require_once( ABSPATH . "/wp-admin/includes/media.php");
        
        // Download url to a temp file
        $tmp = download_url( $url );
        if ( is_wp_error( $tmp ) ) {
            return [
                "status"  => "fail",
                "message" => "Error Uploading File",
            ];
        }
        
        // Get the filename and extension ("photo.png" => "photo", "png")
        $filename = pathinfo($url, PATHINFO_FILENAME);
        $extension = pathinfo($url, PATHINFO_EXTENSION);
        $wp_filetype = wp_check_filetype( $filename, null );
        
        // An extension is required or else WordPress will reject the upload
        if ( ! $extension ) {
            // Look up mime type, example: "/photo.png" -> "image/png"
           $mime = mime_content_type($tmp);
           $mime = is_string($mime) ? sanitize_mime_type( $mime ) : false;
            
            // Only allow certain mime types because mime types do not always end in a valid extension (see the .doc example below)
            $mime_extensions = array(
                'image/png'  => 'png',
            );
            
               if ( isset( $mime_extensions[$mime] ) ) {
                // Use the mapped extension
                $extension = $mime_extensions[$mime];
            } else {
                // Could not identify extension
                return $wp_filetype;
            } 
        }
        // Upload by "sideloading": "the same way as an uploaded file is handled by media_handle_upload"
        $args = array(
            'name' => "$filename.$extension",
            'tmp_name' => $tmp,
            'post_mime_type' => $wp_filetype['type'],
        );
        
        // Do the upload
        $attachment_id = media_handle_sideload( $args, 0, $title);
       
        
        // Error uploading
        if ( is_wp_error($attachment_id) ) { 

            return [
                "status"  => "fail",
                "message" => [
                    "Image could not be uploaded ",
                ],
            ];
        }
        
        else {
        // Success, return attachment ID (int)
        $attachment = get_post( $attachment_id );
            return [
                'status'  => 'success',
                'result'  => $attachment_id,
                'data'    => [

                    'alt' => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
                    'caption' => $attachment->post_excerpt,
                    'description' => $attachment->post_content,
                    'href' => get_permalink( $attachment->ID ),
                    'src' => $attachment->guid,
                    'title' => $attachment->post_title

                ],
                'message' => 'image upload successfully',

            ];
        }	
    }
	
}