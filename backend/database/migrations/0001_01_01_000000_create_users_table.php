<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('first_name');
            $table->string('last_name');
            $table->date('date_of_birth');
            $table->char('gender', 1); //Male (M) , Female(F)
            $table->string('city');
            $table->string('address')->nullable();
            $table->string('email')->unique();
            $table->char('role', 1)->default('F'); //Manger (M) , Fan(F) , Admin(A) 

            $table->tinyInteger('status')->default(0); // 1: Approved by Administrator, 0: Not Approved yet

            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
