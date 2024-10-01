<?php

namespace App\Models;

use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Candidate extends Model
{
    use HasFactory, SoftDeletes, CascadeSoftDeletes;

    protected $with = ['disposition'];

    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    protected $cascadeDeletes = ['disposition'];

    public function disposition()
    {
        return $this->hasOne(Disposition::class);
    }
}
