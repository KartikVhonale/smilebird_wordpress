<?php

namespace GenieAi\App\ProLabel;

use GenieAi\App\ProLabel\GenieBanner;
use GenieAi\App\ProLabel\GenieNotice;
use GenieAi\App\ProLabel\GenieRating;

class ProLabelInit
{
    public function __construct()
    {
        add_action('wp_loaded', function () {

            $this->filterString = self::active_plugins();
            \GenieAi\App\ProLabel\GenieNotice::init();

            $this->initBanner();
            // $this->initStories();
            $this->initRating();
        });
    }


    public static function active_plugins()
    {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
        $apl           = get_option('active_plugins');
        $plugins       = get_plugins();
        $filter_string = '';
        foreach ($apl as $p) {
            if (isset($plugins[$p]) && isset($plugins[$p]['TextDomain'])) {
                $filter_string .= ',' . $plugins[$p]['TextDomain'];
            }
        }
        return ltrim($filter_string, ',');
    }

    private function initBanner()
    {
        /**
         * Show Genie banner (codename: jhanda)
         */
        GenieBanner::instance( 'getgenie' )
        // ->is_test(true)
        ->set_filter( $this->filterString )
        ->set_api_url( 'https://api.wpmet.com/public/jhanda' )
        ->set_plugin_screens( 'toplevel_page_getgenie' )
        ->call();

       // show notice if getgenie license is not activated.
       if (!get_option('getgenie_site_token')) {

        GenieNotice::instance( 'getgenie', 'go-pro-noti2ce' )                                       # @plugin_slug @notice_name
            ->set_dismiss( 'global', ( 3600 * 24 * 300 ) )                                          # @global/user @time_period
            ->set_type( 'warning' )                                                                 # @notice_type
            ->set_html("
                        <div class='getgenie-notice'>
                            <p class='notice-message'>
                                <img src='" . GETGENIE_URL . "/assets/dist/admin/images/genie-head.svg" . "' class='notice-icon' />
                                I've noticed that you haven't activated the Pro/Free license yet. Click the button below to unleash my magic. Sincerely — GetGenie AI
                            </p>
                            <div class='notice-link'>
                                <a href='https://app.getgenie.ai/license/?product=free-trial' target='_blank'>Claim your license</a>
                                <a href='" . admin_url('admin.php?page=' .  GETGENIE_TEXTDOMAIN) . "#license'>Finish setup with your license.</a>
                            </div>
                        </div>
                        "
            )                                                                                     # @notice_massage_html
            ->call();
       }
    }

    private function initRating()
    {
        /**
         * Show GenieAi rating (codename: rating)
         */
        GenieRating::instance('getgenie')
            ->set_plugin('GetGenie', 'https://wordpress.org/support/plugin/getgenie/reviews/')
            ->set_plugin_logo('https://ps.w.org/getgenie/assets/icon-256x256.gif?rev=2798355', 'width:150px !important')
            ->set_allowed_screens('toplevel_page_getgenie')
            ->set_priority(10)
            ->set_first_appear_day(7)
            ->set_condition(true)
            ->call();
    }
}
