<?php

define('DB_CONNECTION', getenv('APP_DB_CONNECTION'));
define('DB_HOST', getenv('APP_DB_HOST'));
define('DB_USER', getenv('APP_DB_USER'));
define('DB_PASS', getenv('APP_DB_PASS'));
define('DB_NAME', getenv('APP_DB_NAME'));


define('TBL_ADMIN',				'admin');
define('TBL_VARIABLES',			'variables');

// todo: remove ??
define('TBL_LOG_ADMIN',			'log_admin');
define('TBL_LOG_USER',			'log_user');
define('TBL_LOG_AFFILIATE',		'log_affiliate');

define('TBL_AFFILIATE',				'affiliate');
define('TBL_AFFILIATE_URL',			'affiliate_url');
define('TBL_AFFILIATE_ACTION_LOG',	'affiliate_action_log');
define('TBL_AFFILIATE_WITHDRAW',    'affiliate_withdraw');