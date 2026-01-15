"use client"

import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-neutral-900 text-white py-5 '>
            <div className="flex flex-col items-center justify-center h-100">
                <Image
                    alt='Logo'
                    src={'/stacked&loaded.png'}
                    className='size-30'
                    width={400}
                    height={400}
                />

                <div className="flex flex-col border-t-2 border-b-2 py-5">
                    <div className="flex flex-col gap-8">
                        <div className="font-medium text-xs lg:text-sm">
                            123, Ogooluwa street, Osogbo, Osun State,
                            Nigeria
                        </div>

                        <div className="font-semibold text-sm flex flex-col gap-4">
                            <p>Monday-Wednesday: 11am-9pm</p>
                            <p>Thursday-Saturday: 11am-10pm</p>
                            <p>Sunday: 2pm-6pm</p>
                        </div>

                    </div>
                </div>

                <div className="gap-2 flex flex-col text-sm lg:text-base mt-6">
                    <div className="flex items-center font-bold gap-2">
                        <Phone size={16} />
                        +234 1567 890 000
                    </div>

                    <div className="flex items-center font-bold gap-2">
                        <Mail size={16} />
                        bookings@stackedandloadedburger.com
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer