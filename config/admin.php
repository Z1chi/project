<?php

define('MODULE_NAME', ADMIN_MODULE_NAME);
define('MODULE_PATH', ROOT . '/' . MODULE_NAME);

define('ASSETS', ROOT . '/assets_' . MODULE_NAME);
define('MODULE_CONTROLLER', MODULE_PATH . '/controller');
define('MODULE_TEMPLATE', MODULE_PATH . '/template');
define('MODULE_LAYOUT', MODULE_PATH . '/template/layout');
define('MODULE_I18N', MODULE_PATH . '/localization');

define('SESSION_KEY_CURRENT', 'module_' . ADMIN_MODULE_NAME);
define('SESSION_TIMEOUT', 300);

define('MAIL_FROM_ADDRESS', getenv('EMAIL_NOREPLY'));
define('MAIL_FROM_NAME', APP_PUBLIC_NAME);

define('KEY_PAGE_PARAM', 'page');
define('KEY_ON_PAGE_COUNT', 50);