<?php

namespace App\Http\Requests\Candidate;

use App\Enums\Candidate\CandidateDisposition;
use App\Enums\Candidate\CandidateHireType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDispositionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'disposition' =>  ['required', Rule::in(array_column(CandidateDisposition::cases(), 'value'))],
            'hire_type' =>  ['required_if:disposition,' . CandidateDisposition::Hired->value, Rule::in(array_column(CandidateHireType::cases(), 'value'))],
            'fee' => 'nullable|numeric|min:0.1',
            'currency' => 'required_with:fee|nullable|string',
            'rejection_reason' => 'required_if:disposition,' . CandidateDisposition::Rejected->value . '|string',
        ];
    }

    public function messages(): array
    {
        return [
            'disposition.in' => 'The selected disposition is invalid.',
            'hire_type.in' => 'The selected hire type is invalid.',
            'rejection_reason.required_if' => 'The rejection reason field is required when disposition is rejected.',
            'currency.required_with' => 'The currency field is required when fee is present.',
        ];
    }
}
