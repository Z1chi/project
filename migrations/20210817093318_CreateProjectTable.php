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
            $table->string('title', 32);
            $table->string('token', 32);
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
            $table->timestamp('accessed_at');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
