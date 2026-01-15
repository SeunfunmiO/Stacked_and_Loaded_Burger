import AddMenuOptions from '@/app/components/AddMenuOptions'
import { ModeToggle } from '@/app/components/theme-icon'
import { Package } from 'lucide-react'
import React from 'react'

const Page = () => {
    return (
        <div>
            <div className="min-h-screen bg-white dark:bg-black">
                <header className="bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-sandbrown to-[#f4a261]">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-xl font-bold">Manage Menu Options</h1>
                        </div>

                        <ModeToggle />
                    </div>
                </header>
                <AddMenuOptions />
            </div>
        </div>
    )
}

export default Page