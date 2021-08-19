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
            $table->integer('affiliate_id')->nullable(false);
            $table->integer('url_id');
            $table->smallInteger('offer_id')->nullable(false)->default(1);
            $table->smallInteger('action')->nullable(false);
            $table->date('created_dt')->nullable(false)->useCurrent();
            $table->integer('user_id');
            $table->float('deposit');
            $table->string('currency', 4)->default(null)->unique();
            $table->string('ip');
            $table->string('geo',2)->default(null);
            $table->integer('created')->nullable(false);
            $table->float('payout');
            $table->text('http_referrer');
            $table->string('user_uid',64);

            $table->index('affiliate_id');
            $table->index('url_id');
            $table->index('offer_id');
            $table->index('user_id');
            $table->index('user_uid');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
