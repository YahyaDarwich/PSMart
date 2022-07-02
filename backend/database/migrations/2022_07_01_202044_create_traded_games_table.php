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
        Schema::create('traded_games', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('publisher')->nullable();
            $table->string('image')->nullable();
            $table->string('description')->nullable();
            $table->string('trade_to')->nullable();
            $table->string('status')->nullable();
            $table->double('price')->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('traded_games');
    }
};
