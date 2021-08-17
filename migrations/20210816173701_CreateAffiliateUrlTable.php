<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateAffiliateUrlTable extends Migration
{
    private string $table = 'affiliate_url';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
            $table->increments('id');
            $table->string('title', 64)->nullable(false);
            $table->integer('affiliate_id')->nullable(false);
            $table->smallInteger('offer_id')->nullable(false)->default(1);
            $table->integer('created')->nullable(false);
            $table->smallInteger('deleted')->nullable(false)->default(0);
            $table->text('iframe_conversion');
            $table->text('iframe_lead');

        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
