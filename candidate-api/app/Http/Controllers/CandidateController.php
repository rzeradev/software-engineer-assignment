<?php

namespace App\Http\Controllers;

use App\Dto\Candidate\CandidateCreateDto;
use App\Dto\Candidate\CandidateUpdateDto;
use App\Dto\Candidate\DispositionUpdateDto;
use App\Http\Requests\Candidate\CreateCandidateRequest;
use App\Http\Requests\Candidate\UpdateCandidateRequest;
use App\Http\Requests\Candidate\UpdateDispositionRequest;
use App\Http\Resources\Candidate\CandidateCollection;
use App\Http\Resources\Candidate\CandidateResource;
use App\Http\Resources\Candidate\DispositionResource;
use App\Models\Candidate;
use App\Services\CandidateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CandidateController extends Controller
{

    public function __construct(private CandidateService $candidatesService)
    {
        $this->candidatesService = $candidatesService;
    }

    public function index(Request $request): CandidateCollection
    {
        $filters = $request->all();
        return new CandidateCollection($this->candidatesService->all($filters));
    }

    public function store(CreateCandidateRequest $request): CandidateResource
    {
        return CandidateResource::make(
            $this->candidatesService->create(
                CandidateCreateDto::fromRequest($request->validated())
            )
        );
    }

    public function show(Candidate $candidate): CandidateResource
    {
        return CandidateResource::make($candidate);
    }

    public function update(UpdateCandidateRequest $request, Candidate $candidate): CandidateResource
    {
        return CandidateResource::make(
            $this->candidatesService->update(
                $candidate,
                CandidateUpdateDto::fromRequest($request->validated())
            )
        );
    }

    public function destroy(Candidate $candidate): JsonResponse
    {
        $this->candidatesService->delete($candidate);
        return response()->json(null, 204);
    }

    public function updateDisposition(UpdateDispositionRequest $request, Candidate $candidate): DispositionResource
    {
        return DispositionResource::make(
            $this->candidatesService->updateDisposition(
                $candidate,
                DispositionUpdateDto::fromRequest($request->validated())
            )
        );
    }
}
