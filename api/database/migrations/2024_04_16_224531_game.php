<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function(Blueprint $table){
            $table->id();
            $table->foreignId('player1_id')->constrained('users');
            $table->foreignId('player2_id')->nullable()->constrained('users');
            $table->unsignedTinyInteger('turn')->nullable();
            $table->enum('status', ['pending', 'ongoing', 'finished'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
};
