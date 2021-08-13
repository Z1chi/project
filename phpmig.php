<?php

use Dotenv\Dotenv;
use Illuminate\Container\Container;
use Phpmig\Adapter;
use Illuminate\Database\Capsule\Manager as Capsule;
use Ufo\Service\DatabaseService;

const ROOT = __DIR__;
const CONFIG = ROOT . '/config';
const SYSTEM = ROOT . '/system';
const RESOURCES = ROOT . '/resources';

// Read environment variables
$dotenv = Dotenv::create(ROOT);
$dotenv->load();

require(__DIR__ . '/config/system.php');

$container = new Container();
$databaseService = new DatabaseService();
$capsule = $databaseService->initEloquent($container);

$container['phpmig.adapter'] = new Adapter\Illuminate\Database($capsule, 'migrations', 'default');
$container['phpmig.migrations_path'] = __DIR__ . DIRECTORY_SEPARATOR . 'migrations';
$container['phpmig.migrations_template_path'] = __DIR__ . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'migration_template.tmpl';

$container['schema'] = Capsule::schema('default');

return $container;