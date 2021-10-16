<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class ChangeAdminDate extends Migration
{
    private string $table = 'admin';

    public function up(): void
    {
        $this->schema->getConnection()->statement("
            ALTER TABLE admin
            ALTER COLUMN created SET DATA TYPE TIMESTAMP(0) WITHOUT TIME ZONE
            USING timestamp(0) without time zone 'epoch' + created * interval '1 second';
            ");
        $this->schema->getConnection()->statement("
            ALTER TABLE admin
            ALTER COLUMN updated SET DATA TYPE TIMESTAMP(0) WITHOUT TIME ZONE
            USING timestamp(0) without time zone 'epoch' + updated * interval '1 second';
            ");

        $this->schema->table($this->table, function(Blueprint $table) {
            $table->renameColumn('created', 'created_at');
            $table->renameColumn('updated', 'updated_at');
        });
    }

    public function down(): void {
        $this->schema->getConnection()->statement("
            ALTER TABLE ". $this->table ."
            ALTER COLUMN created_at SET DATA TYPE INT
            USING cast(extract(epoch from created_at) as integer);
            ");
        $this->schema->getConnection()->statement("
            ALTER TABLE ". $this->table ."
            ALTER COLUMN updated_at SET DATA TYPE INT
            USING cast(extract(epoch from updated_at) as integer);
            ");

        $this->schema->table($this->table, function(Blueprint $table) {
            $table->renameColumn('created_at', 'created');
            $table->renameColumn('updated_at', 'updated');
        });
    }
}
