<?php

namespace App\Services;

use App\Dto\Candidate\CandidateCreateDto;
use App\Dto\Candidate\CandidateUpdateDto;
use App\Dto\Candidate\DispositionUpdateDto;
use App\Enums\Candidate\CandidateDisposition;
use App\Enums\Candidate\CandidateHireType;
use App\Exceptions\CandidateException;
use App\Models\Candidate;
use App\Models\Disposition;
use App\Repositories\CandidateRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class CandidateService
{

    public function __construct(private CandidateRepository $candidateRepository)
    {
        $this->candidateRepository = $candidateRepository;
    }

    public function all(array $filters): LengthAwarePaginator
    {
        $perPage = $filters['perPage'] ?? 10;
        $page = $filters['page'] ?? 1;
        $sort = $filters['sort'] ?? 'name';
        $order = $filters['order'] ?? 'asc';

        return $this->candidateRepository->all($perPage, $page, $sort, $order);
    }

    public function create(CandidateCreateDto $dto): Candidate
    {
        return $this->candidateRepository->create($dto);
    }

    public function update($candidate, CandidateUpdateDto $dto): Candidate
    {
        return $this->candidateRepository->update($candidate, $dto);
    }

    public function delete(Candidate $candidate): void
    {
        $this->candidateRepository->delete($candidate);
    }

    public function updateDisposition(Candidate $candidate, DispositionUpdateDto $dispositionUpdateDto): Candidate
    {
        if ($dispositionUpdateDto->disposition == CandidateDisposition::Rejected) {
            if (!empty($dispositionUpdateDto->hire_type) || !empty($dispositionUpdateDto->fee) || !empty($dispositionUpdateDto->currency)) {
                throw new CandidateException('Hire type, fee and currency should be null');
            }
        }

        if ($dispositionUpdateDto->disposition == CandidateDisposition::Hired && $dispositionUpdateDto->hire_type == CandidateHireType::Internal) {
            if (!empty($dispositionUpdateDto->fee) || !empty($dispositionUpdateDto->currency) || !empty($dispositionUpdateDto->rejection_reason)) {
                throw new CandidateException('Fee, currency and rejection reason should be null');
            }
        }

        if ($dispositionUpdateDto->disposition == CandidateDisposition::Hired && $dispositionUpdateDto->hire_type == CandidateHireType::External) {
            if (!empty($dispositionUpdateDto->rejection_reason)) {
                throw new CandidateException('Rejection reason should be null');
            }
        }

        if ($dispositionUpdateDto->hire_type == CandidateHireType::External && !empty($dispositionUpdateDto->currency && empty($dispositionUpdateDto->fee))) {
            throw new CandidateException('Fee should be greater than 0');
        }


        return $this->candidateRepository->updateDisposition($candidate, $dispositionUpdateDto);
    }
}
