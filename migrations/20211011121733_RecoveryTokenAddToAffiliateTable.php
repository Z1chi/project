<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class RecoveryTokenAddToAffiliateTable extends Migration
{
    private string $table = 'recovery_token';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->string('token', 32)->unique()->index();
            $table->dateTime('created_at')->useCurrent();
            $table->integer('affiliate_id');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
