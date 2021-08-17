<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateLogAffiliateTable extends Migration
{
    private string $table = 'log_affiliate';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->integer('affiliate_id')->nullable(false);
            $table->string('action', 64)->nullable(false);
            $table->json('data');
            $table->string('ip', 64)->nullable(false);
            $table->integer('created')->nullable(false);
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
