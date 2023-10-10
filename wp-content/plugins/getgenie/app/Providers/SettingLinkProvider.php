<?php

namespace GenieAi\App\Providers;

class SettingLinkProvider
{

    public function __construct()
    {
        add_filter('plugin_action_links_' . GETGENIE_BASENAME, array($this, 'setting_links'));
    }

    public function setting_links($links)
    {
        $settings_link = '<a href="' . admin_url('admin.php?page=getgenie#license') . '">Settings</a>';
        array_unshift($links, $settings_link);
        return $links;
    }
}
