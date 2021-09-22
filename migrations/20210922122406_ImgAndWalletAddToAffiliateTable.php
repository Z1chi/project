<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class ImgAndWalletAddToAffiliateTable extends Migration
{
    private string $table = 'affiliate';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->string('wallet', 70)->default('');
            $table->string('img', 255)->default('');
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->dropColumn('wallet');
            $table->dropColumn('img');
        });
    }
}
