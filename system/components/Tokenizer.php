<?php

namespace system\components;

use system\exceptions\RequestException;

class Tokenizer
{
    public static function set($key)
    {
        self::init();
        $_SESSION['token'][$key] = md5(uniqid(mt_rand(), true));
    }

    public static function get($key, $set_token = false)
    {
        self::init();

        if ($set_token) {
            self::set($key);
        }

        return isset($_SESSION['token'][$key]) ? $_SESSION['token'][$key] : false;
    }

    public static function remove($key)
    {
        self::init();
        if (isset($_SESSION['token'][$key])) {
            unset($_SESSION['token'][$key]);
        }
    }

    public static function destroy()
    {
        $_SESSION['token'] = [];
    }

    /**
     * @param $token
     * @param $key
     * @throws RequestException
     */
    public static function ajaxCheckToken($token, $key)
    {
        $stored_token = self::get($key);

		if (empty($token) || !$stored_token) {
			throw new RequestException([ 'token_required' => true ]);
		}

        if ($stored_token != $token) {
            throw new RequestException([
            	'fake_form' => true,
				'token' => $token,
				'stored_token' => $stored_token
			]);
        }
    }

    private static function init()
    {
        if (!isset($_SESSION['token'])) {
            $_SESSION['token'] = [];
        }

        $_SESSION['token']['timeout'] = time();
    }
}