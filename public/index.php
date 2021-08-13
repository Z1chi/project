<?php
define('ROOT', dirname(__DIR__));
define('CONFIG', ROOT . '/config');
define('SYSTEM', ROOT . '/system');
define('RESOURCES', ROOT . '/resources');
define('TEMPLATE', ROOT . '/app/template');

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once ROOT . '/vendor/autoload.php';

require_once SYSTEM . '/core/App.php';
include SYSTEM . '/components/debugger.php';

new \system\RunApp();
