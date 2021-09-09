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
            $table->integer('admin_id');
            $table->string('action', 64);
            $table->json('data')->nullable();
            $table->string('ip', 64);
            $table->integer('created');

        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
