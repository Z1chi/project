<?php

namespace affiliate\component;


use App;
use system\components\DB;

class Logger
{
	public static $ACTION_LOGIN = 'affiliate_login';
	public static $ACTION_LOGOUT = 'affiliate_logout';
	public static $ACTION_CHANGE_PASSWORD = 'affiliate_change_password';
	public static $ACTION_URL_UPDATE = 'affiliate_url_update';
	public static $ACTION_URL_DELETE = 'affiliate_url_delete';
	public static $ACTION_URL_CREATE = 'affiliate_url_create';
	public static $ACTION_AFFILIATE_UPDATE = 'affiliate_update';

	public static function write ($action, array $data_array = NULL)
	{
		$array = [
			'affiliate_id' => App::getSession('id'),
			'action' => $action,
			'data' => $data_array != NULL ? json_encode($data_array) : NULL,
			'ip' => $_SERVER['REMOTE_ADDR'],
			'created' => time()
		];

		DB::getInstance()
			->insert(TBL_LOG_AFFILIATE, $array);
	}
}