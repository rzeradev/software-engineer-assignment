<?php

namespace Tests\Feature\Candidate;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

abstract class CandidateControllerBaseTestCase extends TestCase
{
    use RefreshDatabase;

    final const REQ_URI = '/api/v1/candidates';


    protected function log($data): void
    {
        fwrite(STDERR, print_r($data, TRUE));
    }
}
