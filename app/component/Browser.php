<?php

namespace app\component;


use GeoIp2\Database\Reader;
use GeoIp2\Exception\AddressNotFoundException;
use Jenssegers\Agent\Agent;
use MaxMind\Db\Reader\InvalidDatabaseException;

class Browser
{
	public static function getInfo ()
	{
		$ip = $_SERVER['REMOTE_ADDR'];

		$agent = new Agent();
		$location = 'Unknown';

		if (empty($ip)) {
			return false;
		}

		// todo: geoip wrapper

		try {
			$reader = new Reader(RESOURCES . '/geoip/GeoLite2-City.mmdb');

			try {
				$record = $reader->city($ip);
				$location = $record->city->name . ', ' . $record->country->name;
			} catch (AddressNotFoundException $e) {
			} catch (InvalidDatabaseException $e) {
			}

		} catch (InvalidDatabaseException $e) {
		}

		$data = new \stdClass();

		$data->device = $agent->device();
		$data->browser = $agent->browser();
		$data->platform = $agent->platform();
		$data->ip = $ip;
		$data->geolocation = $location;

		return $data;
	}

	public static function getCurrentUserGeo ()
	{
		if (!PRODUCTION) {
			return 'RU';
		}

		$ip = $_SERVER['REMOTE_ADDR'];
		$geo = self::getGeo($ip);

		return $geo;
	}

	public static function getGeo ($ip)
	{
		$location = null;

		if (empty($ip)) {
			return $location;
		}

		try {
			$reader = new Reader(RESOURCES . '/geoip/GeoLite2-City.mmdb');

			try {
				$record = $reader->city($ip);
				$location = $record->country->isoCode;
			} catch (AddressNotFoundException $e) {
			} catch (\InvalidArgumentException $e) {
			}

		} catch (InvalidDatabaseException $e) {
		}

		return $location;
	}
}