<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateAffiliateTable extends Migration
{
    private string $table = 'affiliate';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->string('first_name', 64)->default(NULL);
            $table->string('last_name', 64)->default(NULL);
            $table->string('email', 128)->nullable(false);
            $table->string('telegram', 128);
            $table->string('password', 128);
            $table->integer('created');
            $table->integer('updated');
            $table->tinyInteger('level')->default(0);
            $table->tinyInteger('callcenter_percent')->default(7);
            $table->integer('activity')->nullable();
            $table->integer('active')->nullable(false)->default(0);
            $table->float('balance_btc')->nullable(false)->default(0.00);
            $table->float('total_income_btc')->nullable(false)->default(0.00);
            $table->smallInteger('revshare_percent')->nullable(false)->default(20);
            $table->text('postback_url');
            $table->float('balance_eur')->nullable(false)->default(0.00);
            $table->float('total_income_eur')->nullable(false)->default(0.00);
            $table->float('total_turnover_btc')->nullable(false)->default(0.00);
            $table->float('total_turnover_eur')->nullable(false)->default(0.00);
            $table->smallInteger('first_deposit_percent')->nullable(false)->default(20);
            $table->integer('parent_id')->nullable(false)->default(0);
            $table->integer('team_account')->nullable(false)->default(0);
            $table->float('total_withdraw_btc')->nullable(false)->default(0);
            $table->unsignedInteger('callcenter_id')->nullable();
            $table->integer('project_id');
            $table->string('user_uid',64)->nullable(true)->default(null);

            $table->index('active');
            $table->index('parent_id');
            $table->index('team_account');
            $table->index('callcenter_id');
            $table->index('project_id');
            $table->index('user_uid');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
