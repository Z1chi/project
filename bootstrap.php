<?php
declare(strict_types=1);

use Dotenv\Dotenv;

const ROOT = __DIR__;

require ROOT . '/vendor/autoload.php';

$dotenv = Dotenv::create(ROOT);
$dotenv->load();

require_once config_path('system.php');
