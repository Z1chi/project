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
            $table->integer('affiliate_id');
            $table->string('action', 64);
            $table->json('data')->nullable();
            $table->string('ip', 64);
            $table->integer('created');

            $table->index('affiliate_id');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
