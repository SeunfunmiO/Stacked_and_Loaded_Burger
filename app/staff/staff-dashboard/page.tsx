// app/staff/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  ChefHat,
  Bell,
  Search,
  Filter,
  MoreVertical,
  User2,
  UserCheck2,
  ListOrdered
} from 'lucide-react';
import {
  StaffOrder, StaffTabType,

} from '@/lib/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { NairaIcon } from '@/app/components/NairaIcon';
import { orders, staffMembers, stats } from '@/lib/MapItems';


const Page = () => {
  const [activeTab, setActiveTab] = useState<StaffTabType>('orders');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter()


  const getStatusColor = (status: StaffOrder['status']): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'preparing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ready':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
    }
  };

  const getStatusIcon = (status: StaffOrder['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'preparing':
        return <ChefHat className="w-4 h-4" />;
      case 'ready':
        return <Package className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: StaffOrder['status']) => {
    console.log(`Order ${orderId} status changed to ${newStatus}`);
    // Implement status change logic here
  };

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

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#dc9457] to-[#f4a261]">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stats.ordersTrend}</span>
            </div>
            <h3 className="text-neutral-400 text-sm mb-1">Total Orders</h3>
            <p className="text-white text-3xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-400">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-yellow-400 text-sm font-medium">Live</span>
            </div>
            <h3 className="text-neutral-400 text-sm mb-1">Active Orders</h3>
            <p className="text-white text-3xl font-bold">{stats.activeOrders}</p>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-400">
                <NairaIcon />
              </div>
              <span className="text-green-400 text-sm font-medium">{stats.revenueTrend}</span>
            </div>
            <h3 className="text-neutral-400 text-sm mb-1">Today's Revenue</h3>
            <p className="text-white text-3xl font-bold">{stats.revenue}</p>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-400">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">+5</span>
            </div>
            <h3 className="text-neutral-400 text-sm mb-1">Customers Today</h3>
            <p className="text-white text-3xl font-bold">{stats.customers}</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Orders Section - Takes 8 columns */}
          <div className="lg:col-span-8">
            <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl font-bold">Active Orders</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#dc9457] transition-colors"
                    />
                  </div>
                  <button className="p-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-600 transition-all">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 bg-neutral-700/30 rounded-xl border ${order.priority === 'urgent' ? 'border-red-500/30 bg-red-500/5' : 'border-neutral-700'
                      } hover:border-neutral-600 transition-all`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-bold">{order.id}</h3>
                          {order.priority === 'urgent' && (
                            <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-medium rounded">
                              URGENT
                            </span>
                          )}
                          <span className="text-neutral-500 text-sm">{order.time}</span>
                        </div>
                        <p className="text-neutral-300 font-medium mb-1">{order.customerName}</p>
                        <p className="text-neutral-400 text-sm">{order.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg mb-2">{order.total}</p>
                        <button className="text-neutral-400 hover:text-white transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-700">
                      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium capitalize">{order.status}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleStatusChange(order.id, 'preparing')}
                          className="px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-all"
                          disabled={order.status === 'completed' || order.status === 'cancelled'}
                        >
                          Prepare
                        </button>
                        <button
                          onClick={() => handleStatusChange(order.id, 'ready')}
                          className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all"
                          disabled={order.status === 'completed' || order.status === 'cancelled'}
                        >
                          Ready
                        </button>
                        <button
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          className="px-4 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all"
                          disabled={order.status === 'completed' || order.status === 'cancelled'}
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Staff & Quick Actions - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            {/* Staff on Duty */}
            <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
              <h2 className="text-white text-xl font-bold mb-6">Staff on Duty</h2>
              <div className="space-y-4">
                {staffMembers.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg border border-neutral-700">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-neutral-600">
                          {staff.avatar}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-neutral-800 ${staff.status === 'active' ? 'bg-green-500' : 'bg-neutral-500'
                          }`}></span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{staff.name}</p>
                        <p className="text-neutral-400 text-xs">{staff.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#dc9457] font-bold">{staff.ordersCompleted}</p>
                      <p className="text-neutral-500 text-xs">orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
              <h2 className="text-white text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/staff/manage-order')}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#dc9457] to-[#f4a261] text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center">
                  <ChefHat className="w-5 h-5 mr-2" />
                  Customer Orders
                </button>
                <button
                  onClick={() => router.push('/staff/manage-menu')}
                  className="w-full py-3 px-4 bg-neutral-700/50 border border-neutral-700 
                text-white rounded-lg font-medium hover:bg-neutral-700 transition-all flex items-center justify-center">
                  <Package className="w-5 h-5 mr-2" />
                  Manage Menu
                </button>
                <button
                  onClick={() => router.push('/staff/manage-menu-options')}
                  className="w-full py-3 px-4 bg-neutral-700/50 border border-neutral-700 
                text-white rounded-lg font-medium hover:bg-neutral-700 transition-all flex items-center justify-center">
                  <ListOrdered className="w-5 h-5 mr-2" />
                  Manage Menu Options
                </button>
                <button className="w-full py-3 px-4 bg-neutral-700/50 border border-neutral-700 
                text-white rounded-lg font-medium hover:bg-neutral-700 transition-all flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Reports
                </button>
                <button
                  onClick={() => router.push('/user/user-dashboard')}
                  className="w-full py-3 px-4 bg-neutral-700/50 border border-neutral-700 
                text-white rounded-lg font-medium hover:bg-neutral-700 transition-all flex items-center justify-center">
                  <User2 className="w-5 h-5 mr-2" />
                  Customer Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page