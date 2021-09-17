<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AddUrlPatternFieldToProjectTable extends Migration
{
    private string $table = 'project';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->string('url_pattern', 255)->default('');
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
        $table->dropColumn('url_pattern');
    });
    }
}
