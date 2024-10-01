<?php

namespace Tests\Feature;

use Tests\Feature\Candidate\CandidateControllerBaseTestCase;
use App\Models\Candidate;

class CandidateControllerDeleteTest extends CandidateControllerBaseTestCase
{
    public function test_delete_candidate(): void
    {
        $candidate = Candidate::factory()->create();

        $res = $this->deleteJson(self::REQ_URI . '/' . $candidate->id);

        $res->assertStatus(204);
    }

    public function test_delete_candidate_that_does_not_exist(): void
    {
        $res = $this->deleteJson(self::REQ_URI . '/99999');

        $res->assertStatus(404);
    }
}
