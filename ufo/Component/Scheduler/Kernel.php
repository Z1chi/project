<?php
declare(strict_types=1);

namespace Ufo\Component\Scheduler;

use Illuminate\Console\Scheduling\Schedule;
use Ufo\Command\AppSeedCommand;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        // QueueJobProcessorCommand::class,
        AppSeedCommand::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command(QueueJobProcessorCommand::class)->everyMinute();
    }
}
