<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateProjectTable extends Migration
{
    private string $table = 'project';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->string('title', 32)->nullable(false);
            $table->string('token', 32)->nullable(false);
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
            $table->dateTime('accessed_at');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
