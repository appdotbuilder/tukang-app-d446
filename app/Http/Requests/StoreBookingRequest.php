<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isCustomer();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'handyman_id' => 'required|exists:users,id',
            'skill_id' => 'required|exists:skills,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'location' => 'required|string|max:500',
            'estimated_hours' => 'required|integer|min:1|max:24',
            'scheduled_at' => 'nullable|date|after:now',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'handyman_id.required' => 'Please select a handyman.',
            'handyman_id.exists' => 'Selected handyman is not valid.',
            'skill_id.required' => 'Please select a skill.',
            'skill_id.exists' => 'Selected skill is not valid.',
            'title.required' => 'Job title is required.',
            'description.required' => 'Job description is required.',
            'location.required' => 'Job location is required.',
            'estimated_hours.required' => 'Estimated hours is required.',
            'estimated_hours.min' => 'Minimum 1 hour required.',
            'estimated_hours.max' => 'Maximum 24 hours allowed.',
            'scheduled_at.after' => 'Scheduled time must be in the future.',
        ];
    }
}