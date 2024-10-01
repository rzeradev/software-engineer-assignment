<?php

namespace App\Dto\Candidate;

use App\Enums\Candidate\CandidateDisposition;
use App\Enums\Candidate\CandidateHireType;

class DispositionUpdateDto
{
    public CandidateDisposition $disposition;
    public ?CandidateHireType $hire_type;
    public ?float $fee;
    public ?string $currency;
    public ?string $rejection_reason;


    public function __construct(CandidateDisposition $disposition, ?CandidateHireType $hire_type, ?float $fee, ?string $currency, ?string $rejection_reason)
    {
        $this->disposition = $disposition;
        $this->hire_type = $hire_type;
        $this->fee = $fee;
        $this->currency = $currency;
        $this->rejection_reason = $rejection_reason;
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            CandidateDisposition::from($data['disposition']),
            isset($data['hire_type']) ? CandidateHireType::from($data['hire_type']) : null,
            $data['fee'] ?? null,
            $data['currency'] ?? null,
            $data['rejection_reason'] ?? null
        );
    }
}
