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
            $table->string('first_name', 64)->nullable()->default('NULL');
            $table->string('last_name', 64)->nullable()->default('NULL');
            $table->string('email', 128);
            $table->string('telegram', 128)->nullable();;
            $table->string('password', 128)->nullable();;
            $table->integer('created');
            $table->integer('updated')->nullable();;
            $table->tinyInteger('level')->default(0);
            $table->tinyInteger('callcenter_percent')->default(7);
            $table->integer('activity')->nullable();
            $table->smallInteger('active')->default(0);
            $table->float('balance_btc')->default(0.00);
            $table->float('total_income_btc')->default(0.00);
            $table->smallInteger('revshare_percent')->default(20);
            $table->text('postback_url');
            $table->float('balance_eur')->default(0.);
            $table->float('total_income_eur')->default(0);
            $table->float('total_turnover_btc')->default(0);
            $table->float('total_turnover_eur')->default(0);
            $table->smallInteger('first_deposit_percent')->default(20);
            $table->integer('parent_id')->default(0);
            $table->integer('team_account')->default(0);
            $table->float('total_withdraw_btc')->default(0);
            $table->unsignedInteger('project_id')->nullable();
            $table->string('user_uid', 64)->nullable();

        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
