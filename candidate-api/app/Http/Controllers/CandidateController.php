<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CandidateController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'index']);
    }

    public function store()
    {
        return response()->json(['message' => 'store']);
    }

    public function show($candidate)
    {
        return response()->json(['message' => 'show']);
    }

    public function update($candidate)
    {
        return response()->json(['message' => 'update']);
    }

    public function destroy($candidate)
    {
        return response()->json(['message' => 'destroy']);
    }

    public function updateDisposition($candidate)
    {
        return response()->json(['message' => 'updateDisposition']);
    }
}
