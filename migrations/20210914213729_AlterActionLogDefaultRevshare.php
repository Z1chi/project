<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AlterActionLogDefaultRevshare extends Migration
{
    private string $table = 'affiliate_action_log';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->string('payout_type')->default('revshare')->change();
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->string('payout_type')->default('cpa')->change();
        });
    }
}
