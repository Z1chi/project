<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateAffiliateOfferTable extends Migration
{
    private string $table = 'affiliate_offer';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->string('title', 64)->nullable(false);
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
