

import Link from 'next/link'
import React from 'react'
import { Home, ShoppingBag, MapPin, Menu } from 'lucide-react'
import Footer from './components/Footer'

export default function NotFound() {
    return (
        <div>
            <div className='min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sandbrown/10 dark:bg-sandbrown/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f4a261]/10 dark:bg-[#f4a261]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content */}
            <div className='relative z-10 max-w-2xl w-full text-center'>
                {/* Large 404 with Burger Icon */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        <h1 className="font-black text-[150px] sm:text-[200px] lg:text-[250px] leading-none bg-linear-to-r from-sandbrown to-[#f4a261] bg-clip-text text-transparent select-none">
                            404
                        </h1>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl lg:text-8xl animate-bounce">
                            🍔
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Oops! Burger Not Found
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Looks like this page took a wrong turn. Don&apos;t worry, we&apos;ll help you find your way back to delicious burgers!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link
                        href="/"
                        className="group w-full sm:w-auto px-8 py-3 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg shadow-sandbrown/30"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Go Home
                    </Link>
                    <Link
                        href="/order-delivery"
                        className="group w-full sm:w-auto px-8 py-3 bg-white dark:bg-neutral-950 border-2 border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-sandbrown dark:hover:border-sandbrown transition-all transform hover:scale-105 flex items-center justify-center"
                    >
                        <Menu className="w-5 h-5 mr-2" />
                        Browse Menu
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="border-t border-gray-200 dark:border-neutral-800 pt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Or explore these pages:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/menu"
                            className="px-6 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-sandbrown dark:hover:border-sandbrown transition-all flex items-center"
                        >
                            <Menu className="w-4 h-4 mr-2" />
                            Menu
                        </Link>
                        <Link
                            href="/user/track-orders"
                            className="px-6 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-sandbrown dark:hover:border-sandbrown transition-all flex items-center"
                        >
                            <MapPin className="w-4 h-4 mr-2" />
                            Track Order
                        </Link>
                        <Link
                            href="/cart"
                            className="px-6 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 hover:border-sandbrown dark:hover:border-sandbrown transition-all flex items-center"
                        >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Cart
                        </Link>
                    </div>
                </div>

                {/* Fun Message */}
                <div className="mt-12 p-6 bg-linear-to-r from-sandbrown/10 to-[#f4a261]/10 dark:from-sandbrown/5 dark:to-[#f4a261]/5 border border-sandbrown/20 dark:border-sandbrown/10 rounded-2xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Pro tip:</span> While you&apos;re here, why not check out our menu?
                        We&apos;ve got some amazing burgers waiting for you! 🍟
                    </p>
                </div>
            </div>
        </div>

        
        <Footer/>
        </div>
    )
}