<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'id');
            $table->string('ispb', 99);
            $table->string('bank', 99);
            $table->string('agency', 255);
            $table->string('number', 255);
            $table->integer('digit')->default(0);
            $table->enum('type', ['current', 'savings']);
            $table->enum('pix_type', ['cpf', 'cnpj', 'email', 'phone', 'random']);
            $table->string('pix_key', 255);
            $table->enum('status', ['pending', 'approved', 'disapproved'])->default('pending');
            $table->text('disapproval_justification')->nullable();
            $table->dateTime('date_request')->default(now()->format('Y-d-m H:i:s'));
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_accounts');
    }
};
