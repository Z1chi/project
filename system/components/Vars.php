<?php

namespace system\components;


class Vars
{
	private static $array = null;

	public static function get($key, $default = '')
	{
		if (self::$array == NULL) {
			$rows = self::getList();

			foreach ($rows as $row) {
				self::$array[$row['key']] = $row['value'];
			}
		}

		if (!isset(self::$array[$key]))
		{
		    $f = DB::getInstance()->cell('SELECT * FROM ' . TBL_VARIABLES . ' WHERE key = ?', $key);

		    if (!$f)
		    {
                DB::getInstance()->insert(TBL_VARIABLES, [
                    'key' => $key,
                    'value' => $default
                ]);
            }


			$value = '';
		} else {
			$value = self::$array[$key];
		}

		return $value;
	}

	public static function getList ()
	{
		$rows = DB::getInstance()
			->run('SELECT * FROM ' . TBL_VARIABLES . ' ' .
 				'ORDER BY key ASC');

		return $rows;
	}

	public static function isExists ($key)
	{
		$row = DB::getInstance()
			->row('SELECT id FROM ' . TBL_VARIABLES . ' WHERE key = ?', $key);

		return $row != NULL;
	}

	public static function set($key, $value)
	{
		if (static::isExists($key)) {
			DB::getInstance()
				->update(
					TBL_VARIABLES,
					['value' => $value, 'updated' => time()],
					['key' => $key]
				);
		} else {
			DB::getInstance()
				->insert(
					TBL_VARIABLES,
					['key' => $key, 'value' => $value]
				);
		}
	}
}