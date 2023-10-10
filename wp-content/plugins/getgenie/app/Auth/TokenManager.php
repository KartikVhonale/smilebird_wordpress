<?php

namespace GenieAi\App\Auth;

use GenieAi\App\Auth\Encryption;

class TokenManager
{
    protected $age;
    protected $prefix = 'AT01-';

    public function generate($age = ['10', 'minute']) 
    {
        $response = 'access_denied';

        $payload = [
            'created_at' => wp_date("Y-m-d H:i", null, ( new \DateTimeZone( 'Asia/Dhaka' )) ),
            'wp_user_id' => get_current_user_id(),
            'auth_token_secret_key' => get_option('getgenie_auth_token_secret_key'),
            'age' =>  $age
        ];

        $payload = apply_filters( 'getgenie_token_generate_payload', $payload);

        $encryption = new Encryption();
        $response  = $encryption->encrypt(json_encode($payload), $payload['auth_token_secret_key']);
        return  $this->prefix.$response;
    }
}