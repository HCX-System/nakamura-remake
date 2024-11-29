<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSvpAccessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('svp_accesses', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('content_id', 255);
            $table->string('action', 100); 
            $table->integer('currentTime');
            $table->float('playbackRate')->default(1);
            $table->string('ip', 15);
            $table->text('host');
            $table->text('user_agent');
            $table->text('custom_field');
            $table->timestamp('date_time')->useCurrent()->useCurrentOnUpdate();
            $table->string('session_token', 20);
            $table->index('user_id'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('svp_accesses');
    }
}
