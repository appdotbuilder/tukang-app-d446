import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { InputError } from '@/components/input-error';

interface Skill {
    id: number;
    name: string;
    icon: string;
    description: string;
    base_rate: number;
}

interface HandymanSkill {
    id: number;
    name: string;
    icon: string;
    pivot: {
        certification_level: string;
        hourly_rate: number;
        years_experience: number;
    };
}

interface Handyman {
    id: number;
    name: string;
    location: string;
    rating: number;
    total_reviews: number;
    skills: HandymanSkill[];
}



interface Props {
    handyman: Handyman | null;
    skills: Skill[];
    [key: string]: unknown;
}

export default function BookingCreate({ handyman, skills }: Props) {
    const [selectedSkill, setSelectedSkill] = useState<Skill | HandymanSkill | null>(null);
    const [estimatedCost, setEstimatedCost] = useState<number>(0);

    const { data, setData, post, processing, errors } = useForm({
        handyman_id: handyman?.id || 0,
        skill_id: 0,
        title: '',
        description: '',
        location: '',
        estimated_hours: 1,
        scheduled_at: '',
        notes: '',
    });

    // Update estimated cost when skill or hours change
    useEffect(() => {
        if (selectedSkill && data.estimated_hours) {
            const rate = 'pivot' in selectedSkill ? selectedSkill.pivot.hourly_rate : selectedSkill.base_rate;
            setEstimatedCost(rate * data.estimated_hours);
        }
    }, [selectedSkill, data.estimated_hours]);

    const handleSkillChange = (skillId: number) => {
        const skill = handyman 
            ? handyman.skills.find(s => s.id === skillId)
            : skills.find(s => s.id === skillId);
        
        setSelectedSkill(skill || null);
        setData('skill_id', skillId);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    const availableSkills = handyman ? handyman.skills : skills;

    return (
        <AppLayout>
            <Head title="Book Service" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            📅 Book a Service
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {handyman 
                                ? `Book a service with ${handyman.name}` 
                                : 'Fill out the details to book a handyman service'}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Booking Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Handyman Selection (if not pre-selected) */}
                                    {!handyman && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Select Handyman
                                            </label>
                                            <p className="text-sm text-red-600">
                                                Please select a handyman from the handymen listing first.
                                            </p>
                                        </div>
                                    )}

                                    {/* Skill Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Service Type *
                                        </label>
                                        <select
                                            value={data.skill_id}
                                            onChange={(e) => handleSkillChange(Number(e.target.value))}
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select a service</option>
                                            {availableSkills.map((skill) => (
                                                <option key={skill.id} value={skill.id}>
                                                    {skill.icon} {skill.name}
                                                    {' - '}$
                                                    {'pivot' in skill ? skill.pivot.hourly_rate : skill.base_rate}
                                                    /hr
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.skill_id} className="mt-2" />
                                    </div>

                                    {/* Job Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Job Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g., Fix kitchen sink leak"
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    {/* Job Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Job Description *
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe the work that needs to be done in detail..."
                                            rows={4}
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Job Location *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="Enter the full address where work will be done"
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        <InputError message={errors.location} className="mt-2" />
                                    </div>

                                    {/* Estimated Hours */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Estimated Hours *
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="24"
                                            value={data.estimated_hours}
                                            onChange={(e) => setData('estimated_hours', Number(e.target.value))}
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            How many hours do you think this job will take?
                                        </p>
                                        <InputError message={errors.estimated_hours} className="mt-2" />
                                    </div>

                                    {/* Scheduled Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Preferred Start Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={data.scheduled_at}
                                            onChange={(e) => setData('scheduled_at', e.target.value)}
                                            min={new Date().toISOString().slice(0, 16)}
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Leave empty if flexible with timing
                                        </p>
                                        <InputError message={errors.scheduled_at} className="mt-2" />
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Any special instructions, materials needed, access details, etc."
                                            rows={3}
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        <InputError message={errors.notes} className="mt-2" />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <Button 
                                            type="submit" 
                                            disabled={processing || !handyman}
                                            className="w-full"
                                            size="lg"
                                        >
                                            {processing ? 'Creating Booking...' : '📅 Create Booking'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Booking Summary */}
                        <div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📋 Booking Summary
                                </h3>
                                
                                {handyman && (
                                    <div className="space-y-3 mb-6">
                                        <div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Handyman:</span>
                                            <p className="font-medium">{handyman.name}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Location:</span>
                                            <p className="font-medium">{handyman.location}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                                            <p className="font-medium">⭐ {handyman.rating}/5 ({handyman.total_reviews} reviews)</p>
                                        </div>
                                    </div>
                                )}

                                {selectedSkill && (
                                    <div className="border-t pt-4">
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Service:</span>
                                                <p className="font-medium">
                                                    {selectedSkill.icon} {selectedSkill.name}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Hourly Rate:</span>
                                                <p className="font-medium text-indigo-600">
                                                    ${'pivot' in selectedSkill ? selectedSkill.pivot.hourly_rate : selectedSkill.base_rate}/hr
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Hours:</span>
                                                <p className="font-medium">{data.estimated_hours} hours</p>
                                            </div>
                                            <div className="border-t pt-3">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Total:</span>
                                                <p className="text-xl font-bold text-green-600">
                                                    ${estimatedCost.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                                        💡 Booking Process
                                    </h4>
                                    <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                                        <li>1. Submit your booking request</li>
                                        <li>2. Handyman reviews and accepts</li>
                                        <li>3. Work begins as scheduled</li>
                                        <li>4. Pay after completion</li>
                                        <li>5. Leave a review</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}