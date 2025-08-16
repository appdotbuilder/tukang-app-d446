import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';

interface Stats {
    total_customers: number;
    total_handymen: number;
    total_bookings: number;
    completed_bookings: number;
    total_revenue: number;
    pending_earnings: number;
}

interface Booking {
    id: number;
    booking_number: string;
    title: string;
    status: string;
    total_amount: number;
    created_at: string;
    customer: {
        name: string;
    };
    handyman: {
        name: string;
    };
    skill: {
        name: string;
        icon: string;
    };
}

interface MonthlyEarning {
    month: string;
    revenue: number;
}

interface Props {
    stats: Stats;
    recentBookings: Booking[];
    monthlyEarnings: MonthlyEarning[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentBookings }: Props) {
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🛠️ Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your handyman service platform
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 dark:text-blue-300">👥</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.total_customers}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Customers</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 dark:text-green-300">🔨</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.total_handymen}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Handymen</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 dark:text-purple-300">📋</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.total_bookings}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 dark:text-green-300">✅</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.completed_bookings}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Jobs</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                                    <span className="text-yellow-600 dark:text-yellow-300">💰</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(stats.total_revenue)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Platform Revenue</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                                    <span className="text-orange-600 dark:text-orange-300">⏳</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(stats.pending_earnings)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Payouts</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <Link
                        href={route('admin.skills')}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center"
                    >
                        <div className="text-3xl mb-2">💼</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Manage Skills</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Set pricing & rates</p>
                    </Link>

                    <Link
                        href={route('admin.certifications')}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center"
                    >
                        <div className="text-3xl mb-2">🏆</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Certifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Manage handyman levels</p>
                    </Link>

                    <Link
                        href={route('admin.users')}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center"
                    >
                        <div className="text-3xl mb-2">👥</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Manage Users</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">View all users</p>
                    </Link>

                    <Link
                        href={route('admin.reports')}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center"
                    >
                        <div className="text-3xl mb-2">📊</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Reports</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">View analytics</p>
                    </Link>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Recent Bookings
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Booking
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Handyman
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {booking.booking_number}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {booking.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {booking.customer.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {booking.handyman.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span>{booking.skill.icon}</span>
                                                <span className="text-sm text-gray-900 dark:text-white">
                                                    {booking.skill.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                                {booking.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(booking.total_amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(booking.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {recentBookings.length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-2">📋</div>
                            <p className="text-gray-600 dark:text-gray-400">No recent bookings</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}