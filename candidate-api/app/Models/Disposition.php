<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Disposition extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false; // Disable created_at and updated_at columns

    protected $fillable = [
        'candidate_id',
        'disposition',
        'hire_type',
        'fee',
        'currency',
        'rejection_reason',
        'created_at',
    ];

    protected $casts = [
        'fee' => 'float',
        'created_at' => 'datetime',
    ];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}
