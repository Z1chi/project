<?php

namespace system\components;


//use app\model\Logs;
use Curl\Curl;

class InsightApi
{

	private static $api_base_url = 'https://explorer.api.bitcoin.com/btc/v1';
	private static $api_tx_dir = '/tx/';
	private static $api_address_dir = '/addr/';

	public static function getTxInfo ($tx) {
		$url = self::$api_base_url . self::$api_tx_dir . $tx;
		return self::makeRequest($url);
	}

	public static function getAddressInfo ($address) {
		$url = self::$api_base_url . self::$api_address_dir . $address;
		return self::makeRequest($url);
	}

	private static function makeRequest ($url)
	{
		try {
			$curl = new Curl();
			$curl->get($url);

			if ($curl->error) {
				// TODO: LOG
//				Logs::writeError( __CLASS__, 'Curl error: ' . $curl->errorCode . ', ' . $curl->errorMessage);
				return false;
			} else {
				return $curl->response;
			}

		} catch (\ErrorException $e) {
//			Logs::writeError( __CLASS__, 'Curl exception: ' . $e->getMessage());
			return false;
		}
	}
}
