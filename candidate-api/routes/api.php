<?php

use App\Http\Controllers\CandidateController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'candidates'], function () {
        Route::get('/', [CandidateController::class, 'index']);
        Route::post('/', [CandidateController::class, 'store']);
        Route::get('/{candidate}', [CandidateController::class, 'show']);
        Route::put('/{candidate}', [CandidateController::class, 'update']);
        Route::delete('/{candidate}', [CandidateController::class, 'destroy']);
        Route::put('/{candidate}/disposition', [CandidateController::class, 'updateDisposition']);
    });
});
