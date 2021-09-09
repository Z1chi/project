<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AlterActionLogTransactionIdFields extends Migration
{
    private string $table = 'affiliate_action_log';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->string('transaction_id', 64)
                ->nullable()
                ->default(null)
                ->after('payout_currency');
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->dropColumn('transaction_id');
        });
    }
}
