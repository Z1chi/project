<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateAffiliateWithdrawTable extends Migration
{
    private string $table = 'affiliate_withdraw';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->integer('affiliate_id');
            $table->float('amount_btc');
            $table->string('btc_address', 128);
            $table->integer('created');
            $table->smallInteger('deleted');

        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
