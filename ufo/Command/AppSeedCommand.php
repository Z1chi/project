<?php
declare(strict_types=1);

namespace Ufo\Command;

use Ufo\Component\Console\Command;
use Ufo\Model\Admin;

final class AppSeedCommand extends Command
{
    protected function configure()
    {
        $this->setName('app:seed');
        $this->setDescription('Fresh database and seeds test data');
    }

    public function onExecute(): void
    {
        $this->displaySl('Seeding database..');

        Admin::truncate();
        $admin = new Admin();
        $admin->name = 'Admin';
        $admin->email = 'admin';
        $admin->password = password_hash('administrator', PASSWORD_BCRYPT);
        $admin->created = time();
        $admin->updated = time();
        $admin->level = 20;
        $admin->callcenter_percent = 10;
        $admin->activity = 1;
        $admin->active = 1;
        $admin->save();

        $this->display('DONE✨');
    }
}
