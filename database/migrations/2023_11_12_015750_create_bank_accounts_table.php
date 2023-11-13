<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
//soft delete
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
            $table->tinyInteger('type')->description('0 - conta_corrente, 1 - conta_poupanca');
            $table->tinyInteger('pix_type')->description('0 - cpf, 1 - cnpj, 2 - email, 3 - phone, 4 - random');
            $table->string('pix_key', 255);
            $table->tinyInteger('status',)->default(0)->description('0 - pending, 1 - approved, 2 - disapproved');
            $table->text('disapproval_justification')->nullable();
            // $table->dateTime('date_request')->default(\Illuminate\Support\Facades\DB::raw('(CONVERT(datetime, GETDATE()))'));
            $table->dateTime('date_request')->default(now());
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
