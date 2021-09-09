<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateAffiliateActionLogTable extends Migration
{
    private string $table = 'affiliate_action_log';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->integer('affiliate_id');
            $table->integer('url_id')->nullable();
            $table->smallInteger('offer_id')->default(1);
            $table->smallInteger('action');
            $table->date('created_dt')->useCurrent();
            $table->integer('user_id')->nullable();
            $table->float('deposit')->nullable();
            $table->string('currency', 4)->nullable()->default(null);
            $table->smallInteger('unique')->nullable();
            $table->string('ip')->nullable();
            $table->string('geo',2)->nullable()->default(null);
            $table->integer('created');
            $table->float('payout')->nullable();
            $table->text('http_referrer')->nullable();
            $table->string('user_uid',64)->nullable();

        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
