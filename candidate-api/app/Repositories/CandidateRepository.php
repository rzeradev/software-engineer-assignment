<?php

namespace App\Repositories;

use App\Models\Candidate;
use Illuminate\Support\Facades\DB;
use App\Dto\Candidate\CandidateCreateDto;
use App\Dto\Candidate\CandidateUpdateDto;
use App\Dto\Candidate\DispositionUpdateDto;
use App\Enums\Candidate\CandidateDisposition;
use App\Models\Disposition;
use Illuminate\Pagination\LengthAwarePaginator;

class CandidateRepository
{
    public function all(int $perPage, int $page, string $sort, string $order): LengthAwarePaginator
    {
        return Candidate::orderByRelation($sort, $order)
            ->paginate($perPage, ['candidates.*'], 'page', $page);
    }

    public function create(CandidateCreateDto $dto): Candidate
    {
        DB::beginTransaction();
        try {
            $candidate = Candidate::create([
                'name' => $dto->name,
                'email' => $dto->email,
                'phone' => $dto->phone,
            ]);

            $candidate->disposition()->create([
                'disposition' => CandidateDisposition::Undecided,
            ]);

            DB::commit();

            return $candidate->load('disposition');
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    public function update(Candidate $candidate, CandidateUpdateDto $dto): Candidate
    {
        $candidate->update([
            'name' => $dto->name,
            'email' => $dto->email,
            'phone' => $dto->phone,
        ]);


        return $candidate;
    }

    public function delete(Candidate $candidate): void
    {
        $candidate->delete();
    }

    public function updateDisposition(Candidate $candidate, DispositionUpdateDto $dispositionUpdateDto): Candidate
    {
        $candidate->disposition()->update([
            'disposition' => $dispositionUpdateDto->disposition,
            'hire_type' => $dispositionUpdateDto->hire_type,
            'fee' => $dispositionUpdateDto->fee,
            'currency' => $dispositionUpdateDto->currency,
            'rejection_reason' => $dispositionUpdateDto->rejection_reason,
            'created_at' => now(),
        ]);

        return $candidate->load('disposition');
    }
}
