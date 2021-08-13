<?php

define('MODULE_NAME', APP_MODULE_NAME);
define('MODULE_PATH', ROOT . '/' . MODULE_NAME);

define('ASSETS', ROOT . '/assets');
define('MODULE_CONTROLLER', MODULE_PATH . '/controller');
define('MODULE_TEMPLATE', MODULE_PATH . '/template');
define('MODULE_LAYOUT', MODULE_PATH . '/template/layout');
define('MODULE_I18N', MODULE_PATH . '/localization');

define('SESSION_KEY_CURRENT', 'module_' . APP_MODULE_NAME);