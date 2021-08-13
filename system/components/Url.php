<?php

namespace system\components;

use system\Router;
use App;

class Url
{

    public static function home ($base_url = null)
    {
        return self::createRaw('', $base_url);
    }

    public static function create ($controller = null, $action = null, $base_url = null)
    {
        $str = '';

        if ($controller != null) {
        	$str .= $controller;
		}

		if ($action != null) {
        	$str .= '/' . $action;
		}

        return self::createRaw($str, $base_url);
    }

	public static function createRaw ($path = null, $language = null)
    {
        $current_route = App::$app->getRouter()->getRoute();

        if ($language == null) {
        	$language = App::$app->getLanguage();
		}

		if (isset($current_route['module']) && $current_route['module'] == ADMIN_MODULE_NAME) {
			$url = '/' . getenv('APP_ADMIN_PATH');
		} else if (isset($current_route['module']) && $current_route['module'] == AFFILIATE_MODULE_NAME) {
        	$url = '/' . getenv('APP_AFFILIATE_PATH');
        } else {
            $url = '/' . $language;
        }

		$parts = explode('/', $path);
		$part_count = sizeof($parts);

		for ($i = 0; $i < $part_count; $i++) {
			if ($parts[$i] != '') {
				$url .= '/' . $parts[$i];
			}
		}

        if (mb_strlen($url) > 1) {
            $url = rtrim($url, '/');
        }

        $url = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $url;

        return $url;
	}
}