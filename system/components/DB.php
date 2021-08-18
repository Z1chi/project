<?php

namespace system\components;

use ParagonIE\EasyDB;

/**
 * Database wrapper
 * @package system\component
 */
class DB {

	/**
	 * @var EasyDB\Factory
	 */
	private static $db = null;

	public static function getInstance()
	{
		if (is_null(self::$db))
		{
			$config = [
				DB_CONNECTION . ':host=' . DB_HOST . ';dbname=' . DB_NAME,
				DB_USER,
				DB_PASS
			];

			self::$db = EasyDB\Factory::fromArray($config);
		}

		return self::$db;
	}
}