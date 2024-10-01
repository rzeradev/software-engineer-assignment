<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dispositions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->onDelete('cascade');
            $table->enum('disposition', ['undecided', 'hired', 'rejected']);
            $table->enum('hire_type', ['internal', 'external'])->nullable();
            $table->decimal('fee', 12, 2)->nullable();
            $table->string('currency')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->dateTime('created_at')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dispositions');
    }
};
