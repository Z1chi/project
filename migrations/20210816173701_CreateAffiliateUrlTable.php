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
            $table->string('title', 64);
            $table->integer('affiliate_id');
            $table->smallInteger('offer_id')->default(1);
            $table->integer('created');
            $table->smallInteger('deleted')->default(0);
            $table->text('iframe_conversion')->nullable();
            $table->text('iframe_lead')->nullable();

            $table->index('affiliate_id');
            $table->index('offer_id');
        });
    }

    public function down(): void
    {
        $this->schema->dropIfExists($this->table);
    }
}
