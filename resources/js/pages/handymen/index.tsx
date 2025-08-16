import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';

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
    email: string;
    phone: string;
    location: string;
    bio: string;
    rating: number;
    total_reviews: number;
    is_verified: boolean;
    skills: HandymanSkill[];
    [key: string]: unknown;
}

interface Props {
    handymen: {
        data: Handyman[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    skills: Skill[];
    filters: {
        skill_id?: number;
        location?: string;
        min_rating?: number;
        sort_by?: string;
    };
    [key: string]: unknown;
}

export default function HandymenIndex({ handymen, skills, filters }: Props) {
    const [searchFilters, setSearchFilters] = useState({
        skill_id: filters.skill_id || '',
        location: filters.location || '',
        min_rating: filters.min_rating || '',
        sort_by: filters.sort_by || 'rating',
    });

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...searchFilters, [key]: value };
        setSearchFilters(newFilters);
        
        // Remove empty filters
        const cleanFilters = Object.entries(newFilters).reduce((acc, [k, v]) => {
            if (v) acc[k] = String(v);
            return acc;
        }, {} as Record<string, string>);

        router.get(route('handymen.index'), cleanFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getRatingStars = (rating: number) => {
        return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
    };

    return (
        <AppLayout>
            <Head title="Find Handymen" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🔍 Find Professional Handymen
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Browse and connect with certified handymen in your area
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Skill
                            </label>
                            <select
                                value={searchFilters.skill_id}
                                onChange={(e) => handleFilterChange('skill_id', e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All Skills</option>
                                {skills.map((skill) => (
                                    <option key={skill.id} value={skill.id}>
                                        {skill.icon} {skill.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={searchFilters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                                placeholder="Enter city or area"
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Minimum Rating
                            </label>
                            <select
                                value={searchFilters.min_rating}
                                onChange={(e) => handleFilterChange('min_rating', e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Any Rating</option>
                                <option value="4">4+ Stars</option>
                                <option value="4.5">4.5+ Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Sort By
                            </label>
                            <select
                                value={searchFilters.sort_by}
                                onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Handymen Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {handymen.data.map((handyman) => (
                        <div key={handyman.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            {handyman.name}
                                            {handyman.is_verified && (
                                                <span className="text-blue-500" title="Verified">✓</span>
                                            )}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            📍 {handyman.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">{getRatingStars(handyman.rating)}</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {handyman.rating}/5 ({handyman.total_reviews} reviews)
                                        </span>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {handyman.skills.slice(0, 3).map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                                            >
                                                {skill.icon} {skill.name}
                                            </span>
                                        ))}
                                        {handyman.skills.length > 3 && (
                                            <span className="text-xs text-gray-500">
                                                +{handyman.skills.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {handyman.bio && (
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                        {handyman.bio}
                                    </p>
                                )}

                                <div className="flex gap-2">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        <Link href={route('handymen.show', handyman.id)}>
                                            View Profile
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm"
                                        className="flex-1"
                                    >
                                        <Link href={route('bookings.create', { handyman_id: handyman.id })}>
                                            Book Now
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {handymen.links.length > 3 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex space-x-2">
                            {handymen.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : link.url
                                            ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}

                {handymen.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No handymen found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search filters to find more results.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}