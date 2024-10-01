<?php

namespace App\Http\Resources\Candidate;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DispositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'disposition' => $this->disposition,
            'hire_type' => $this->hire_type,
            'fee' => $this->fee,
            'currency' => $this->currency,
            'rejection_reason' => $this->rejection_reason,
            'created_at' => Carbon::parse($this->created_at)->format('F j, Y \a\t g:i A'),
        ];
    }
}
