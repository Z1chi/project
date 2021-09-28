<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateSupportTable extends Migration
{
    private string $table = 'support';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255)->nullable();
            $table->string('image', 255)->nullable();
            $table->string('tg_link', 255);
            $table->integer('active')->nullable()->default(1);

            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();

            $table->index('created_at');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
