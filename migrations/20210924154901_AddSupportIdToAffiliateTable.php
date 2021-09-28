<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class AddSupportIdToAffiliateTable extends Migration
{
    private string $table = 'affiliate';

    public function up(): void
    {
        $this->schema->table($this->table, function (Blueprint $table) {
            $table->integer('support_id')->unsigned()->nullable();
            $table->index('support_id');
            $table->foreign('support_id')->references('id')->on('support')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function (Blueprint $table) {
            $table->dropForeign('support_id');
            $table->dropIndex('support_id');
            $table->dropColumn('support_id');
        });
    }
}
