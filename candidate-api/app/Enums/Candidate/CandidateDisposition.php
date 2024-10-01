<?php

namespace App\Enums\Candidate;

enum CandidateDisposition: string
{
    case Undecided = 'undecided';
    case Hired = 'hired';
    case Rejected = 'rejected';
}
