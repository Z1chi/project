<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AlterAffiliateTable extends Migration
{
    private string $table = 'affiliate';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->text('postback_url')->nullable()->change();
            $table->integer('project_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->text('postback_url')->nullable(false)->change();
            $table->integer('project_id')->nullable(false)->change();
        });
    }
}
