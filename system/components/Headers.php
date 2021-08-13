<?php

namespace system\components;


/**
 * Header variables helper & sanitizer
 *
 * Class Request
 * @package system\components
 */

class Headers
{
	public static function POST ($key) {
		return self::handle('POST', $key);
	}

	public static function GET ($key) {
		return self::handle('GET', $key);
	}

	private static function handle ($method, $key) {

		$var = null;

		switch ($method) {
			case 'POST':
				$var = $_POST;
				break;
			case 'GET':
				$var = $_GET;
		}

		if (!isset($var[$key]))
			return NULL;
		else
			return $var[$key];
	}
}