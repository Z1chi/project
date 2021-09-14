<?php
define('ROOT', dirname(__DIR__));
define('CONFIG', ROOT . '/config');
define('SYSTEM', ROOT . '/system');
define('RESOURCES', ROOT . '/resources');
define('TEMPLATE', ROOT . '/app/template');

require_once ROOT . '/vendor/autoload.php';

require_once SYSTEM . '/core/App.php';
include SYSTEM . '/components/debugger.php';

new \system\RunApp();
