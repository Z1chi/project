<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AlterActionLogpayoutFields extends Migration
{
    private string $table = 'affiliate_action_log';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->string('payout_type', 16)->default('cpa')->after('currency');
            $table->float('payout_value')->default(0)->after('payout_type');
            $table->float('payout_amount')->default(0)->after('payout_value');
            $table->string('payout_currency', 4)->nullable()->default(null)->after('payout_amount');
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->dropColumn('payout_type');
            $table->dropColumn('payout_value');
            $table->dropColumn('payout_amount');
            $table->dropColumn('payout_currency');
        });
    }
}
