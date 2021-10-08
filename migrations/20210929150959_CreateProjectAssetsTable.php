<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateProjectAssetsTable extends Migration
{
    private string $table = 'project_asset';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->string('file');
            $table->string('preview_src');
            $table->integer('project_id');
            $table->integer('category_id');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');

            $table->index('project_id');
            $table->index('category_id');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}