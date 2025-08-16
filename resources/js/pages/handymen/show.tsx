import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';

interface HandymanSkill {
    id: number;
    name: string;
    icon: string;
    pivot: {
        certification_level: string;
        hourly_rate: number;
        years_experience: number;
        certification_notes: string;
    };
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    customer: {
        name: string;
    };
}

interface Handyman {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    rating: number;
    total_reviews: number;
    is_verified: boolean;
    skills: HandymanSkill[];
    reviews: Review[];
    created_at: string;
    [key: string]: unknown;
}

interface Props {
    handyman: Handyman;
    [key: string]: unknown;
}

export default function HandymanShow({ handyman }: Props) {
    const getRatingStars = (rating: number) => {
        return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
    };

    const getCertificationColor = (level: string) => {
        switch (level) {
            case 'expert':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout>
            <Head title={`${handyman.name} - Handyman Profile`} />
            
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {handyman.name}
                                </h1>
                                {handyman.is_verified && (
                                    <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm">
                                        <span>✓</span>
                                        <span>Verified</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2 text-gray-600 dark:text-gray-400 mb-4">
                                <p className="flex items-center gap-2">
                                    <span>📍</span>
                                    {handyman.location}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span>📞</span>
                                    {handyman.phone}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span>📅</span>
                                    Member since {formatDate(handyman.created_at)}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">{getRatingStars(handyman.rating)}</span>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {handyman.rating}/5
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    ({handyman.total_reviews} reviews)
                                </span>
                            </div>

                            {handyman.bio && (
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {handyman.bio}
                                </p>
                            )}
                        </div>

                        <div className="md:w-64">
                            <Button asChild className="w-full mb-4" size="lg">
                                <Link href={route('bookings.create', { handyman_id: handyman.id })}>
                                    📅 Book Service
                                </Link>
                            </Button>
                            
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Stats</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Skills:</span>
                                        <span className="font-medium">{handyman.skills.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Reviews:</span>
                                        <span className="font-medium">{handyman.total_reviews}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                                        <span className="font-medium">{handyman.rating}/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Skills */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                🛠️ Skills & Expertise
                            </h2>
                            
                            <div className="space-y-4">
                                {handyman.skills.map((skill) => (
                                    <div key={skill.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{skill.icon}</span>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {skill.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCertificationColor(skill.pivot.certification_level)}`}>
                                                    {skill.pivot.certification_level.charAt(0).toUpperCase() + skill.pivot.certification_level.slice(1)}
                                                </span>
                                                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                                    ${skill.pivot.hourly_rate}/hr
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div>
                                                <span className="font-medium">Experience:</span> {skill.pivot.years_experience} years
                                            </div>
                                            <div>
                                                <span className="font-medium">Rate:</span> ${skill.pivot.hourly_rate}/hour
                                            </div>
                                        </div>

                                        {skill.pivot.certification_notes && (
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                {skill.pivot.certification_notes}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                💬 Customer Reviews
                            </h2>
                            
                            {handyman.reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {handyman.reviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                        {review.customer.name}
                                                    </span>
                                                    <span className="ml-2 text-lg">{getRatingStars(review.rating)}</span>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(review.created_at)}
                                                </span>
                                            </div>
                                            {review.comment && (
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    "{review.comment}"
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">💬</div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        No reviews yet. Be the first to leave a review!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📋 Book This Handyman
                            </h3>
                            
                            <div className="space-y-3 mb-6">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Ready to get your project done? Book {handyman.name} for professional service.
                                </p>
                                
                                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Available Skills:</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {handyman.skills.map((skill) => (
                                            <span key={skill.id} className="inline-flex items-center px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                                {skill.icon} {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Button asChild className="w-full" size="lg">
                                <Link href={route('bookings.create', { handyman_id: handyman.id })}>
                                    📅 Book Now
                                </Link>
                            </Button>

                            <div className="mt-4 text-xs text-center text-gray-500">
                                💡 Tip: Describe your project clearly to get accurate quotes
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}