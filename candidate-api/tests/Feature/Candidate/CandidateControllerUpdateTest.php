<?php

namespace Tests\Feature;

use Tests\Feature\Candidate\CandidateControllerBaseTestCase;
use App\Models\Candidate;

class CandidateControllerUpdateTest extends CandidateControllerBaseTestCase
{
    public function test_update_candidate(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "name" => "Jane Doe",
            "email" => "jane@email.com",
            "phone" => "0987654321",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id, $data);

        $res->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'phone',
                    'created_at',
                    'updated_at',
                ]
            ]);
    }

    public function test_update_candidate_with_missing_name(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "email" => "jane@email.com",
            "phone" => "0987654321",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id, $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_update_candidate_with_invalid_email(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "name" => "Jane Doe",
            "email" => "invalid_email",
            "phone" => "0987654321",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id, $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_update_candidate_that_does_not_exist(): void
    {
        $data = [
            "name" => "Jane Doe",
            "email" => "jane@email.com",
            "phone" => "0987654321",
        ];

        $res = $this->putJson(self::REQ_URI . '/99999', $data);

        $res->assertStatus(404);
    }

    public function test_set_candidate_disposition_hired_external_with_fee_and_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "external",
            "fee" => 1000,
            "currency" => "USD",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'disposition',
                    'hire_type',
                    'fee',
                    'currency',
                    'rejection_reason',
                    'created_at',
                ]
            ]);
    }

    public function test_set_candidate_disposition_hired_external_with_fee_without_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "external",
            "fee" => 1000,
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['currency']);
    }

    public function test_set_candidate_disposition_hired_external_without_fee_with_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "external",
            "currency" => "USD",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Fee should be greater than 0']);
    }

    public function test_set_candidate_disposition_hired_external_without_fee_without_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "external",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'disposition',
                    'hire_type',
                    'fee',
                    'currency',
                    'rejection_reason',
                    'created_at',
                ]
            ]);
    }

    public function test_set_candidate_disposition_hired_internal_with_fee_and_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "internal",
            "fee" => 1000,
            "currency" => "USD",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Fee, currency and rejection reason should be null']);
    }

    public function test_set_candidate_disposition_hired_internal_with_fee_without_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "internal",
            "fee" => 1000,
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['currency']);
    }

    public function test_set_candidate_disposition_hired_internal_without_fee_with_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "internal",
            "currency" => "USD",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Fee, currency and rejection reason should be null']);
    }

    public function test_set_candidate_disposition_hired_internal_rejection_reason(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "internal",
            "rejection_reason" => "Not enough experience",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Fee, currency and rejection reason should be null']);
    }

    public function test_set_candidate_disposition_rejected_with_rejection_reason(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "rejected",
            "rejection_reason" => "Not enough experience",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'disposition',
                    'hire_type',
                    'fee',
                    'currency',
                    'rejection_reason',
                    'created_at',
                ]
            ]);
    }

    public function test_set_candidate_disposition_rejected_without_rejection_reason(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "rejected",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['rejection_reason']);
    }

    public function test_set_candidate_disposition_rejected_with_hire_type(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "rejected",
            "hire_type" => "internal",
            "rejection_reason" => "Not enough experience",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Hire type, fee and currency should be null']);
    }

    public function test_set_candidate_disposition_rejected_with_fee(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "rejected",
            "fee" => 1000,
            "currency" => "USD",
            "rejection_reason" => "Not enough experience",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Hire type, fee and currency should be null']);
    }

    public function test_set_candidate_disposition_rejected_with_hire_type_and_fee(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "rejected",
            "hire_type" => "internal",
            "fee" => 1000,
            "currency" => "USD",
            "rejection_reason" => "Not enough experience",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Hire type, fee and currency should be null']);
    }

    public function test_set_candidate_disposition_rejected_with_hire_type_and_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "rejected",
            "hire_type" => "internal",
            "currency" => "USD",
            "rejection_reason" => "Not enough experience",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Hire type, fee and currency should be null']);
    }

    public function test_set_candidate_disposition_rejected_with_fee_and_currency(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "rejected",
            "fee" => 1000,
            "currency" => "USD",
            "rejection_reason" => "Not enough experience",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJson(['message' => 'Hire type, fee and currency should be null']);
    }

    public function test_set_candidate_disposition_that_does_not_exist(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "invalid_disposition",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['disposition']);
    }

    public function test_set_candidate_disposition_with_invalid_hire_type(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "invalid_hire_type",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['hire_type']);
    }

    public function test_set_candidate_disposition_with_invalid_fee(): void
    {
        $candidate = Candidate::factory()->create();

        $data = [
            "disposition" => "hired",
            "hire_type" => "external",
            "fee" => "invalid_fee",
            "currency" => "USD",
        ];

        $res = $this->putJson(self::REQ_URI . '/' . $candidate->id . '/disposition', $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['fee']);
    }
}
