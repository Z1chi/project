<?php

// General project settings

mb_internal_encoding("UTF-8");
date_default_timezone_set('UTC');

// Is production?

define('PRODUCTION', (getenv('APP_ENV') == 'prod'));

// CLI scripts folder

define('CLI', ROOT . '/cli');

define('UPLOAD_PATH', '/upload');
define('UPLOAD_PATH_DOCUMENT', UPLOAD_PATH . '/document');
define('UPLOAD_DIR', ROOT . '/public' . UPLOAD_PATH);

// System defaults

define('APP_PUBLIC_NAME', getenv('APP_NAME'));
define('EMAIL_SUPPORT', getenv('SUPPORT_EMAIL'));

define('DEFAULT_LANGUAGE', 'en');
define('DEFAULT_LAYOUT_FILE', '/default.php');

define('LANGUAGES_ARRAY', serialize(['en', 'ru']));
define('LANGUAGES_LIST', implode('|', unserialize(LANGUAGES_ARRAY)));

define('APP_MODULE_NAME', 'app');
define('ADMIN_MODULE_NAME', 'admin');
define('AFFILIATE_MODULE_NAME', 'affiliate');

// SMTP settings

define('EMAIL_NAME', getenv('APP_NAME'));
define('EMAIL_NOREPLY', getenv('EMAIL_NOREPLY'));

// rates and fees

define('CURRENCY', '$');
define('CURRENCY_ISO', 'USD');

define('AFFILIATE_REVSHARE_PERCENT', 40);
define('AFFILIATE_DEPOSIT_PERCENT', 40);

define('AFFILIATE_URL_GET_KEY', 'url');
define('AFFILIATE_URL_COOKIE_KEY', 'aff_url');

define('AFFILIATE_IFRAME_KEY_SIGNUP', 'aff_signup');
define('AFFILIATE_IFRAME_KEY_DEPOSIT', 'aff_deposit');

define('WITHDRAW_MIN', 0.001);

// SESSION KEYS

define('SESSION_KEY_API', 'module_api'); // todo remove
define('SESSION_KEY_AFFILIATE', 'module_affiliate');

require(__DIR__ . '/database.php');
require_once __DIR__ . '/routes.php';