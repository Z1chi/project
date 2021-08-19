<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateLogAdminTable extends Migration
{
    private string $table = 'log_admin';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->integer('admin_id')->nullable(false);
            $table->string('action', 64)->nullable(false);
            $table->json('data');
            $table->string('ip', 64)->nullable(false);
            $table->integer('created')->nullable(false);

            $table->index('admin_id');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
