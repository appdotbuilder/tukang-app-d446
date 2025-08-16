import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';

interface User {
    name: string;
}

interface Skill {
    name: string;
    icon: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
}

interface Booking {
    id: number;
    booking_number: string;
    title: string;
    description: string;
    location: string;
    hourly_rate: number;
    estimated_hours: number;
    total_amount: number;
    status: string;
    scheduled_at: string | null;
    started_at: string | null;
    completed_at: string | null;
    created_at: string;
    customer?: User;
    handyman?: User;
    skill: Skill;
    review?: Review;
}

interface Props {
    bookings: {
        data: Booking[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    [key: string]: unknown;
}

export default function BookingsIndex({ bookings }: Props) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'accepted':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'pending':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not scheduled';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusActions = (booking: Booking) => {
        if (user?.role === 'handyman' && booking.status === 'pending') {
            return (
                <Button
                    onClick={() => {
                        // Handle booking acceptance
                        window.location.href = route('bookings.show', booking.id);
                    }}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                >
                    Accept
                </Button>
            );
        }

        if (user?.role === 'customer' && booking.status === 'completed' && !booking.review) {
            return (
                <Button
                    asChild
                    size="sm"
                    variant="outline"
                >
                    <Link href={route('reviews.create', booking.id)}>
                        ⭐ Review
                    </Link>
                </Button>
            );
        }

        return null;
    };

    const getOtherPartyName = (booking: Booking) => {
        if (user?.role === 'customer') {
            return booking.handyman?.name || 'Unknown Handyman';
        }
        return booking.customer?.name || 'Unknown Customer';
    };

    const getOtherPartyLabel = () => {
        return user?.role === 'customer' ? 'Handyman' : 'Customer';
    };

    return (
        <AppLayout>
            <Head title="My Bookings" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            📋 My Bookings
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {user?.role === 'customer' 
                                ? 'Track your service requests and bookings'
                                : 'Manage your service jobs and appointments'
                            }
                        </p>
                    </div>
                    
                    {user?.role === 'customer' && (
                        <Button asChild>
                            <Link href={route('handymen.index')}>
                                ➕ Book New Service
                            </Link>
                        </Button>
                    )}
                </div>

                {bookings.data.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.data.map((booking) => (
                            <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {booking.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Booking #{booking.booking_number}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                {booking.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">{getOtherPartyLabel()}:</span>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {getOtherPartyName(booking)}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Service:</span>
                                                <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                                                    <span>{booking.skill.icon}</span>
                                                    {booking.skill.name}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Location:</span>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    📍 {booking.location}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount:</span>
                                                <p className="font-bold text-green-600 dark:text-green-400">
                                                    {formatCurrency(booking.total_amount)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Scheduled:</span>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    🕐 {formatDate(booking.scheduled_at)}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    📅 {formatDate(booking.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
                                            {booking.description}
                                        </p>

                                        {/* Review Display */}
                                        {booking.review && (
                                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-yellow-500">⭐</span>
                                                    <span className="font-medium">Your Review: {booking.review.rating}/5</span>
                                                </div>
                                                {booking.review.comment && (
                                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                                        "{booking.review.comment}"
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 mt-4 lg:mt-0 lg:ml-6">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Link href={route('bookings.show', booking.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {getStatusActions(booking)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No bookings yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {user?.role === 'customer' 
                                ? "You haven't booked any services yet. Find handymen and book your first service!"
                                : "You haven't received any booking requests yet. Make sure your profile is complete and attractive to customers."
                            }
                        </p>
                        {user?.role === 'customer' && (
                            <Button asChild>
                                <Link href={route('handymen.index')}>
                                    🔍 Find Handymen
                                </Link>
                            </Button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {bookings.links.length > 3 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex space-x-2">
                            {bookings.links.map((link, index) => (
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
            </div>
        </AppLayout>
    );
}