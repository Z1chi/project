<?php
declare(strict_types=1);

namespace Ufo\Component\Migration;

use Illuminate\Database\Schema\Builder;
use Phpmig\Migration\Migration as PhpMigration;

abstract class Migration extends PhpMigration
{
    protected Builder $schema;

    public function init(): void
    {
        $this->schema = $this->get('schema');
    }
}
