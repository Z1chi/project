<?php
declare(strict_types=1);

namespace Ufo\Component\Scheduler;

use Illuminate\Cache\CacheManager;
use Illuminate\Console\Scheduling\CacheEventMutex;
use Illuminate\Console\Scheduling\CacheSchedulingMutex;
use Illuminate\Console\Scheduling\EventMutex;
use Illuminate\Console\Scheduling\ScheduleRunCommand;
use Illuminate\Console\Scheduling\SchedulingMutex;
use Illuminate\Container\Container;
use Illuminate\Contracts\Cache\Factory;
use Illuminate\Contracts\Events\Dispatcher;

class Application extends Container
{
    public function __construct()
    {
        $this->registerBaseBindings();
        $this->registerScheduleBindings();
    }

    protected function registerBaseBindings()
    {
        static::setInstance($this);
        $this->instance('app', $this);
        $this->instance(Container::class, $this);
        $this->instance(ScheduleRunCommand::class, $this);
        $this->instance(Dispatcher::class, $this);
        $this->instance(\Illuminate\Contracts\Debug\ExceptionHandler::class, $this);
    }

    protected function registerScheduleBindings()
    {
        $this->bind(
            Factory::class,
            function ($app) {
                return new CacheManager($app);
            }
        );

        $this->bind(EventMutex::class, CacheEventMutex::class);
        $this->bind(SchedulingMutex::class, CacheSchedulingMutex::class);
    }

    public function environment()
    {
        return 'prod';
    }

    public function isDownForMaintenance()
    {
        return false;
    }
}
