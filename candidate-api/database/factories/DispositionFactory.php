<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Disposition;

class DispositionFactory extends Factory
{
    protected $model = Disposition::class;

    public function definition(): array
    {
        return [
            'disposition' => 'undecided',
        ];
    }
}
