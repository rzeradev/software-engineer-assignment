<?php

namespace App\Dto\Candidate;

class CandidateCreateDto
{
    public string $name;
    public string $email;
    public ?string $phone;

    public function __construct(string $name, string $email, ?string $phone)
    {
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            $data['name'],
            $data['email'],
            $data['phone'] ?? null
        );
    }
}
