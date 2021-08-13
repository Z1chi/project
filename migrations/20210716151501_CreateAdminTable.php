<?php
declare(strict_types=1);

use Ufo\Component\Migration\Migration;
use Illuminate\Database\Schema\Blueprint;

final class CreateAdminTable extends Migration
{
    private string $table = 'admin';

    public function up(): void
    {
        $this->schema->create($this->table, function(Blueprint $table) {
// todo            $table->increments('id');
//            $table->string('name', 64);
//            $table->string('email', 128);
//            $table->string('password', 128);
//            $table->integer('created');
//            $table->integer('updated');
//            $table->tinyInteger('level')->default(0);
//            $table->tinyInteger('callcenter_percent')->default(7);
//            $table->integer('activity')->nullable();
//            $table->integer('active')->nullable()->default(1);
//            $table->unsignedInteger('callcenter_id')->nullable();
//
//            $table->index('callcenter_id');
        });
    }

    public function down(): void
    {
//        $this->schema->dropIfExists($this->table);
    }
}
