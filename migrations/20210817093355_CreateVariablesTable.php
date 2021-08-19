<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateVariablesTable extends Migration
{
    private string $table = 'variables';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->string('key', 64)->nullable(false);
            $table->text('value')->nullable(false);
            $table->integer('updated')->nullable(false)->default(0);

            $table->unique('key');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
