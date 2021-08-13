<?php

namespace app\component;


use GeoIp2\Database\Reader;
use GeoIp2\Exception\AddressNotFoundException;
use Jenssegers\Agent\Agent;
use MaxMind\Db\Reader\InvalidDatabaseException;

class SvgLoader
{
	public static function file ($path)
	{
		return file_get_contents(ROOT . '/public/assets/img' . $path);
	}
}