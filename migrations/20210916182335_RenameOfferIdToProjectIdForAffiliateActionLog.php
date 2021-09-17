<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class RenameOfferIdToProjectIdForAffiliateActionLog extends Migration
{
    private string $table = 'affiliate_action_log';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
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
