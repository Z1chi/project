<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AlterActionLogUserUid extends Migration
{
    private string $table = 'affiliate_action_log';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->string('user_uid',64)->nullable(true);
            $table->index('user_uid');
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->dropColumn('user_uid');
        });
    }
}
