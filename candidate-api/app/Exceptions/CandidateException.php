<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CandidateException extends Exception
{
    protected $message;
    protected int $statusCode;

    /**
     * CandidateException constructor.
     *
     * @param string|null $message
     * @param int $statusCode
     */
    public function __construct($message = null, int $statusCode = 422)
    {
        parent::__construct($message);
        $this->message = $message;
        $this->statusCode = $statusCode;
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => $this->message,
        ], $this->statusCode);
    }
}
