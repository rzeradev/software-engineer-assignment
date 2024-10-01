<?php

namespace App\Http\Resources\Candidate;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'created_at' => Carbon::parse($this->created_at)->format('F j, Y \a\t g:i A'),
            'updated_at' => $this->updated_at,
            'disposition' => new DispositionResource($this->whenLoaded('disposition')),
        ];
    }
}
