import StaffDashboardClient from "@/app/components/StaffDashboardClient";
import { Bell, UserCheck2 } from "lucide-react";
import Image from "next/image";



const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Top Navigation */}
      <nav className="bg-neutral-800/50 backdrop-blur-xl border-b border-neutral-700 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#dc9457] to-[#f4a261]">
                <span className="text-2xl">
                  <Image
                    alt='Burger'
                    src={'/Cheeseburger.png'}
                    width={40}
                    height={40}
                  />
                </span>
              </div>
              <span className="ml-3 text-white font-bold text-xl">Stacked & Loaded Burger</span>
              <span className="ml-3 px-3 py-1 bg-neutral-700 rounded-full text-neutral-400 text-sm">Staff Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-neutral-400 hover:text-white transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-white text-sm font-medium">Staff Admin</p>
                  <p className="text-neutral-400 text-xs">Manager</p>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#dc9457] to-[#f4a261]">
                  <span className="text-xl"><UserCheck2 /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <StaffDashboardClient />

    </div>
  );
}

export default Page