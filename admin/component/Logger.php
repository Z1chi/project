<?php

namespace admin\component;


use App;
use system\components\DB;

class Logger
{
	public static $ACTION_LOGIN = 'admin_login';
	public static $ACTION_LOGOUT = 'admin_logout';
	public static $ACTION_CHANGE_PASSWORD = 'admin_change_password';
	public static $ACTION_UPDATE_VARIABLE = 'update_preferences_variable';
	public static $ACTION_AFFILIATE_ACTIVATE = 'affiliate_activate';
	public static $ACTION_AFFILIATE_DEACTIVATE = 'affiliate_deactivate';
	public static $ACTION_AFFILIATE_WITHDRAW_REQUEST_CLOSE = 'affiliate_withdraw_request_close';
    public static $ACTION_ADMIN_ACTIVATE = 'admin_activate';
    public static $ACTION_ADMIN_DEACTIVATE = 'admin_deactivate';
    public static $ACTION_ADMIN_UPDATE = 'admin_update';
    public static $ACTION_SUPPORT_UPDATE = 'support_update';
    public static $ACTION_ADMIN_ADD = 'admin_add';
    public static $ACTION_SUPPORT_ADD = 'support_add';

	public static function write ($action, array $data_array = NULL)
	{
		$array = [
			'admin_id' => App::getSession('id'),
			'action' => $action,
			'data' => $data_array != NULL ? json_encode($data_array) : NULL,
			'ip' => $_SERVER['REMOTE_ADDR'],
			'created' => time()
		];

		DB::getInstance()
			->insert(TBL_LOG_ADMIN, $array);
	}

	public static function getLastRow ($user_id, $action) {

    }
}