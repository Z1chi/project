<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AddStatusToAffiliateWithdraw extends Migration
{
    private string $table = 'affiliate_withdraw';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->integer('status');
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->dropColumn('status');
        });
    }
}
