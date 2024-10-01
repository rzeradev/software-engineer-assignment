<?php

namespace Tests\Feature;

use Tests\Feature\Candidate\CandidateControllerBaseTestCase;

class CandidateControllerCreateTest extends CandidateControllerBaseTestCase
{
    public function test_create_candidate(): void
    {
        $data = [
            "name" => "John Doe",
            "email" => "john@email.com",
            "phone" => "1234567890",

        ];

        $res = $this->postJson(self::REQ_URI, $data);

        $res->assertStatus(201)
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

    public function test_create_candidate_with_missing_name(): void
    {
        $data = [
            "email" => "john@email.com",
            "phone" => "1234567890",
        ];

        $res = $this->postJson(self::REQ_URI, $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_create_candidate_with_missing_email(): void
    {
        $data = [
            "name" => "John Doe",
            "phone" => "1234567890",
        ];

        $res = $this->postJson(self::REQ_URI, $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_create_candidate_with_invalid_email(): void
    {
        $data = [
            "name" => "John Doe",
            "email" => "invalid_email",
            "phone" => "1234567890",
        ];

        $res = $this->postJson(self::REQ_URI, $data);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_create_candidate_without_phone(): void
    {
        $data = [
            "name" => "John Doe",
            "email" => "john@email.com",
        ];

        $res = $this->postJson(self::REQ_URI, $data);

        $res->assertStatus(201)
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
}
