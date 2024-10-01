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

    public function scopeOrderByRelation(Builder $query, $sort, $order = 'asc')
    {
        $sortMappings = [
            'candidate'            => 'candidates.name',
            'candidate_created'    => 'candidates.created_at',
            'disposition'          => 'disposition.disposition',
            'hire_type'            => 'disposition.hire_type',
            'disposition_created'  => 'disposition.created_at',
        ];

        $sort = $sortMappings[$sort] ?? 'candidates.name';

        if (in_array($sort, ['disposition.disposition', 'disposition.hire_type', 'disposition.created_at'])) {
            return $query->leftJoin('dispositions as disposition', 'candidates.id', '=', 'disposition.candidate_id')
                ->orderBy($sort, $order);
        }

        return $query->orderBy($sort, $order);
    }
}
