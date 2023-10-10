<?php

use GenieAi\Bootstrap\Application;
use GenieAi\Bootstrap\System\ConfigReader;


if (!function_exists('genie_view')) {

    /**
     * @param $path
     * @param  array  $data
     * @return bool
     */
    function genie_view($path, $data = [])
    {

        if (count($data)) {
            extract($data);
        }

        include GETGENIE_DIR . 'resources/view/'.$path.'.php';
        return true;
    }
}