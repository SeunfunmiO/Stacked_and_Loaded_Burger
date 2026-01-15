"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { Home, ArrowLeft } from 'lucide-react'
import Footer from './components/Footer'
import Deliveryorder from './components/delivery-order'
import Image from 'next/image'

const Notfound = () => {
    const router = useRouter()

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
                            <h1 className="font-black text-[150px] sm:text-[200px] lg:text-[250px] leading-none bg-linear-to-r from-sandbrown to-[#f4a261] bg-clip-text text-transparent">
                                404
                            </h1>
                            <Image className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl lg:text-8xl animate-bounce"
                                alt='Burger Logo'
                                src={'/stacked&loaded.png'}
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="mb-8 space-y-3">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                            Oops! Burger Not Found
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            Looks like this page took a wrong turn. Don't worry, we'll help you find your way back to delicious burgers!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <button
                            onClick={() => router.push('/')}
                            className="group w-full sm:w-auto px-8 py-3 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg shadow-sandbrown/30"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Go Home
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="group w-full sm:w-auto px-8 py-3 bg-white dark:bg-neutral-950 border-2 border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-sandbrown dark:hover:border-sandbrown transition-all transform hover:scale-105 flex items-center justify-center"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Go Back
                        </button>
                    </div>


                    {/* Fun Message */}
                    <div className="mt-12 p-6 bg-linear-to-r from-sandbrown/10 to-[#f4a261]/10 dark:from-sandbrown/5 dark:to-[#f4a261]/5 border border-sandbrown/20 dark:border-sandbrown/10 rounded-2xl">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Pro tip:</span> While you're here, why not check out our menu?
                            We've got some amazing burgers waiting for you! 🍟
                        </p>
                    </div>
                </div>

            </div>
                <Deliveryorder />
                <Footer />
       </div>
    )
}

export default Notfound