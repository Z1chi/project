<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AddIsTrustedToProjectTable extends Migration
{
    private string $table = 'project';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->boolean('is_trusted')->default(false);
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->dropColumn('is_trusted');
        });
    }
}
