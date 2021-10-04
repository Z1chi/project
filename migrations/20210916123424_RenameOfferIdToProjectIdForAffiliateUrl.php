<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class RenameOfferIdToProjectIdForAffiliateUrl extends Migration
{
    private string $table = 'affiliate_url';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
//            $table->dropIndex(['offer_id']); // todo: SQLSTATE[42704]: Undefined object: 7 ERROR:  index "affiliate_url_offer_id_index" does not exist (SQL: drop index "affiliate_url_offer_id_index")
            $table->renameColumn('offer_id', 'project_id');
            $table->index(['project_id']);
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->dropIndex(['project_id']);
            $table->renameColumn('project_id', 'offer_id');
            $table->index(['offer_id']);
        });
    }
}
