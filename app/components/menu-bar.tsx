"use client"

import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const Menubar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="block lg:hidden">
            <MenuIcon
                size={24}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer"
            />

            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black z-50 shadow-lg p-6 
                transform transition-transform duration-300 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <X
                    size={24}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer mb-6"
                />

                <nav className="flex flex-col gap-4 text-lg font-medium">
                    <Link href="/">HOME</Link>
                    <Link href="/menu">OUR MENUS</Link>
                    <Link href="/order-now">ORDER ONLINE</Link>
                    <Link href="/location">FIND US</Link>
                    <Link href="/about">ABOUT US</Link>
                    <Link href="/contact">CONTACT</Link>
                    <Link href="/user/user-dashboard">DASHBOARD</Link>
                    <Link href="/sign-in">SIGN IN</Link>
                </nav>
            </div>

        </div>
    )
}

export default Menubar