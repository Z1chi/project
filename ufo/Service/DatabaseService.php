<?php
declare(strict_types=1);

namespace Ufo\Service;

use Illuminate\Container\Container;
use Illuminate\Database\Capsule\Manager as Capsule;

final class DatabaseService
{
    public function initEloquent(Container $container = null): Capsule
    {
        $capsule = new Capsule();
        $capsule->addConnection([
            'driver'    => 'pgsql',
            'host'      => DB_HOST,
            'database'  => DB_NAME,
            'username'  => DB_USER,
            'password'  => DB_PASS,
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ]);
        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        return $capsule;
    }
}
