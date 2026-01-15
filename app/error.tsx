"use client"

import { TriangleAlert, RefreshCw, Home, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    console.log(error.message);
    const router = useRouter();

    return (
        <div className='min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content */}
            <div className='relative z-10 max-w-2xl w-full text-center'>
                {/* Error Icon with Animation */}
                <div className="mb-8 relative inline-block">
                    <div className="relative">
                        {/* Pulsing background circle */}
                        <div className="absolute inset-0 bg-red-500/20 dark:bg-red-500/10 rounded-full animate-ping"></div>

                        {/* Icon container */}
                        <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-full flex items-center justify-center border-4 border-red-200 dark:border-red-800">
                            <TriangleAlert
                                size={64}
                                className="text-red-600 dark:text-red-400 animate-bounce"
                                strokeWidth={2}
                            />
                        </div>
                    </div>

                    {/* Floating burger emoji */}
                    <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                        😱
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8 space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                        Oops! Something Went Wrong
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Don't worry, even the best burgers get a little messy sometimes. Let's try to fix this!
                    </p>

                    {/* Error Details (optional, for debugging) */}
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mt-4 text-left">
                            <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                View Error Details (Dev Mode)
                            </summary>
                            <div className="mt-2 p-4 bg-gray-100 dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-800">
                                <code className="text-xs text-red-600 dark:text-red-400 break-all">
                                    {error.message}
                                </code>
                            </div>
                        </details>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <button
                        onClick={reset}
                        className="group w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#dc9457] to-[#f4a261] text-white rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg shadow-sandbrown/30"
                    >
                        <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="group w-full sm:w-auto px-8 py-3 bg-white dark:bg-neutral-950 border-2 border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-[#dc9457] dark:hover:border-[#dc9457] transition-all transform hover:scale-105 flex items-center justify-center"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Go Home
                    </button>
                </div>

                {/* Help Section */}
                <div className="border-t border-gray-200 dark:border-neutral-800 pt-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Still Having Issues?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            onClick={() => router.push('/contact')}
                            className="p-4 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl hover:border-[#dc9457] dark:hover:border-[#dc9457] transition-all group"
                        >
                            <div className="text-2xl mb-2"></div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Contact Us</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Get help from our team</p>
                        </button>
                        <button
                            onClick={() => router.push('/order-delivery')}
                            className="p-4 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl hover:border-[#dc9457] dark:hover:border-[#dc9457] transition-all group"
                        >
                            <div className="text-2xl mb-2">🍔</div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Browse Menu</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Check out our burgers</p>
                        </button>
                        <button
                            onClick={() => router.push('/user/order')}
                            className="p-4 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl hover:border-[#dc9457] dark:hover:border-[#dc9457] transition-all group"
                        >
                            <div className="text-2xl mb-2">📦</div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">My Orders</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Track your orders</p>
                        </button>
                    </div>
                </div>

                {/* Info Card */}
                <div className="mt-8 p-6 bg-gradient-to-r from-sandbrown/10 to-[#f4a261]/10 dark:from-sandbrown/5 dark:to-[#f4a261]/5 border border-sandbrown/20 dark:border-sandbrown/10 rounded-2xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Don't worry!</span> This is just a temporary hiccup.
                        Your order history and account are safe. If this keeps happening, please reach out to our support team. 🍟
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Error