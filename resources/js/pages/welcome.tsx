import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: '🔧',
            title: 'Expert Handymen',
            description: 'Certified professionals with verified skills and experience'
        },
        {
            icon: '📱',
            title: 'Easy Booking',
            description: 'Book services with just a few clicks, track progress in real-time'
        },
        {
            icon: '⭐',
            title: 'Quality Assured',
            description: 'Read reviews and ratings from previous customers'
        },
        {
            icon: '💰',
            title: 'Fair Pricing',
            description: 'Transparent hourly rates with no hidden fees'
        }
    ];

    const skills = [
        { name: 'Electrical', icon: '⚡' },
        { name: 'Plumbing', icon: '🔧' },
        { name: 'Carpentry', icon: '🪚' },
        { name: 'Painting', icon: '🎨' },
        { name: 'AC Repair', icon: '❄️' },
        { name: 'Cleaning', icon: '🧽' },
    ];

    return (
        <>
            <Head title="TukangPro - Professional Handyman Services">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="w-full px-6 py-4">
                    <div className="mx-auto max-w-7xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">🔨</div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TukangPro</h1>
                        </div>
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                    {auth.user.role === 'customer' && (
                                        <Link
                                            href={route('handymen.index')}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300"
                                        >
                                            Find Handymen
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 px-6 py-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                🔨 Professional Handyman Services
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                                Connect with certified handymen (tukang) for all your home improvement needs. 
                                From electrical work to plumbing, carpentry to painting - we've got you covered!
                            </p>
                            {!auth.user && (
                                <div className="flex gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-3 bg-indigo-600 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300"
                                    >
                                        🎯 Find a Handyman
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-3 bg-green-600 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300"
                                    >
                                        💼 Become a Handyman
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Available Skills */}
                        <div className="mb-16">
                            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                                🛠️ Available Services
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                {skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                                    >
                                        <div className="text-4xl mb-2">{skill.icon}</div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="mb-16">
                            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                                ✨ Why Choose TukangPro?
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="text-4xl mb-4">{feature.icon}</div>
                                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* How It Works */}
                        <div className="mb-16">
                            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                                📋 How It Works
                            </h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">1️⃣</span>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Search & Choose
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Browse handymen by skill, location, and ratings. Choose the perfect match for your needs.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">2️⃣</span>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Book Service
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Schedule your service with clear pricing and timeline. Track progress in real-time.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">3️⃣</span>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Get It Done
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Enjoy professional service completion and rate your experience to help others.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">500+</div>
                                    <div className="text-gray-600 dark:text-gray-400">Verified Handymen</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">1,200+</div>
                                    <div className="text-gray-600 dark:text-gray-400">Jobs Completed</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">4.8⭐</div>
                                    <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
                                    <div className="text-gray-600 dark:text-gray-400">Customer Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8 px-6">
                    <div className="mx-auto max-w-7xl text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="text-2xl">🔨</div>
                            <h1 className="text-xl font-bold">TukangPro</h1>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Professional handyman services at your fingertips. Quality work, fair pricing, trusted professionals.
                        </p>
                        <p className="text-sm text-gray-500">
                            © 2024 TukangPro. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}