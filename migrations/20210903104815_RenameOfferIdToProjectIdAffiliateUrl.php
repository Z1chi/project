<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class RenameOfferIdToProjectIdAffiliateUrl extends Migration
{
    private string $table = 'affiliate_url';

    public function up(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->renameColumn('offer_id', 'project_id');
        });
    }

    public function down(): void
    {
        $this->schema->table($this->table, function(Blueprint $table) {
            $table->renameColumn('project_id', 'offer_id');
        });
    }
}
