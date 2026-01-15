
'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  Bike,
  ChefHat,
  Settings,
  Bell,
  Search,
  Calendar,
  Download,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  Star,
  Menu as MenuIcon,
  X,
  PieChart,
  BarChart3,
  UserPlus,
  ShoppingCart
} from 'lucide-react';

import { AdminTabType, RecentOrder, SystemUser } from '@/lib/type';
import { adminStats, recentOrders, revenueData, systemUsers, topProducts } from '@/lib/MapItems';


const Page = () => {
    const [activeTab, setActiveTab] = useState<AdminTabType>('overview');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [dateRange, setDateRange] = useState<string>('today');

   
    const getStatusColor = (status: RecentOrder['status']): string => {
      switch (status) {
        case 'completed':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'processing':
          return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'pending':
          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'cancelled':
          return 'bg-red-500/20 text-red-400 border-red-500/30';
        default:
          return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
      }
    };

    const getRoleColor = (role: SystemUser['role']): string => {
      switch (role) {
        case 'admin':
          return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        case 'staff':
          return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'rider':
          return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
        case 'customer':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        default:
          return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
      }
    };

    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

    return (
      <div className="min-h-screen bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        {/* Top Navigation */}
        <nav className="bg-neutral-800/50 backdrop-blur-xl border-b border-neutral-700 sticky top-0 z-50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="mr-4 text-neutral-400 hover:text-white transition-colors lg:hidden"
                >
                  <MenuIcon className="w-6 h-6" />
                </button>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-sandbrown to-[#f4a261]">
                  <span className="text-2xl">🍔</span>
                </div>
                <span className="ml-3 text-white font-bold text-xl">Burger Palace</span>
                <span className="ml-3 px-3 py-1 bg-linear-to-r from-purple-500/20 to-purple-400/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium">Admin Panel</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-sandbrown transition-colors w-64"
                  />
                </div>
                <button className="text-neutral-400 hover:text-white transition-colors relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3 cursor-pointer">
                  <div className="text-right hidden sm:block">
                    <p className="text-white text-sm font-medium">Super Admin</p>
                    <p className="text-neutral-400 text-xs">admin@burgerpalace.com</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-linear-to-r
                   from-sandbrown to-[#f4a261]">
                    <span className="text-xl">👤</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-neutral-800/50 backdrop-blur-xl border-r border-neutral-700 transition-transform duration-300 z-40 overflow-y-auto`}>
            <nav className="p-4 space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-linear-to-r from-sandbrown to-[#f4a261] text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                  }`}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'orders' ? 'bg-linear-to-r from-sandbrown to-[#f4a261] text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                  }`}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'users' ? 'bg-linear-to-r from-sandbrown to-[#f4a261] text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                  }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'products' ? 'bg-linear-to-r from-sandbrown to-[#f4a261] text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                  }`}
              >
                <Package className="w-5 h-5 mr-3" />
                Products
              </button>
              <button
                onClick={() => setActiveTab('riders')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'riders' ? 'bg-linear-to-r from-sandbrown to-[#f4a261] text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                  }`}
              >
                <Bike className="w-5 h-5 mr-3" />
                Riders
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'analytics' ? 'bg-linear-to-r from-sandbrown to-[#f4a261] text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                  }`}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-linear-to-r from-sandbrown to-[#f4a261] text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                  }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                    <p className="text-neutral-400">Welcome back, Admin! Here's what's happening today.</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="px-4 py-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-sandbrown transition-colors"
                    >
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                    <button className="px-4 py-2 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-green-500 to-green-400">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${adminStats.revenueTrend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {adminStats.revenueTrend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{Math.abs(adminStats.revenueTrend)}%</span>
                      </div>
                    </div>
                    <h3 className="text-neutral-400 text-sm mb-1">Total Revenue</h3>
                    <p className="text-white text-3xl font-bold">{adminStats.totalRevenue}</p>
                  </div>

                  <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-sandbrown to-[#f4a261]">
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${adminStats.ordersTrend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {adminStats.ordersTrend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{Math.abs(adminStats.ordersTrend)}%</span>
                      </div>
                    </div>
                    <h3 className="text-neutral-400 text-sm mb-1">Total Orders</h3>
                    <p className="text-white text-3xl font-bold">{adminStats.totalOrders.toLocaleString()}</p>
                  </div>

                  <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-blue-500 to-blue-400">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${adminStats.usersTrend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {adminStats.usersTrend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{Math.abs(adminStats.usersTrend)}%</span>
                      </div>
                    </div>
                    <h3 className="text-neutral-400 text-sm mb-1">Active Users</h3>
                    <p className="text-white text-3xl font-bold">{adminStats.activeUsers.toLocaleString()}</p>
                  </div>

                  <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-purple-500 to-purple-400">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${adminStats.aovTrend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {adminStats.aovTrend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{Math.abs(adminStats.aovTrend)}%</span>
                      </div>
                    </div>
                    <h3 className="text-neutral-400 text-sm mb-1">Avg. Order Value</h3>
                    <p className="text-white text-3xl font-bold">{adminStats.averageOrderValue}</p>
                  </div>
                </div>

                {/* Charts and Tables Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Chart */}
                  <div className="lg:col-span-2 bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-white text-xl font-bold">Weekly Revenue</h2>
                      <button className="text-neutral-400 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {revenueData.map((data) => (
                        <div key={data.day} className="flex items-center space-x-4">
                          <span className="text-neutral-400 text-sm w-12">{data.day}</span>
                          <div className="flex-1 bg-neutral-700/30 rounded-full h-10 relative overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-sandbrown to-[#f4a261] rounded-full flex items-center justify-end pr-3"
                              style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                            >
                              <span className="text-white text-sm font-bold">${data.revenue.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Products */}
                  <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <h2 className="text-white text-xl font-bold mb-6">Top Products</h2>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{product.icon}</span>
                            <div>
                              <p className="text-white font-medium text-sm">{product.name}</p>
                              <p className="text-neutral-400 text-xs">{product.orders} orders</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sandbrown font-bold text-sm">{product.revenue}</p>
                            <p className={`text-xs ${product.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {product.trend > 0 ? '+' : ''}{product.trend}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-xl font-bold">Recent Orders</h2>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-sandbrown text-sm font-medium hover:text-white transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-700">
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Order ID</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Customer</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Items</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Total</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Status</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Rider</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Time</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-neutral-700/50 hover:bg-neutral-700/20 transition-colors">
                            <td className="py-4 text-white font-medium">{order.id}</td>
                            <td className="py-4 text-neutral-300">{order.customer}</td>
                            <td className="py-4 text-neutral-300">{order.items}</td>
                            <td className="py-4 text-white font-bold">{order.total}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 text-neutral-300">{order.rider}</td>
                            <td className="py-4 text-neutral-400 text-sm">{order.time}</td>
                            <td className="py-4">
                              <button className="text-neutral-400 hover:text-white transition-colors">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                    <p className="text-neutral-400">Manage all system users and their permissions</p>
                  </div>
                  <button className="mt-4 sm:mt-0 px-4 py-2 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Add User
                  </button>
                </div>

                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                  <div className="space-y-4">
                    {systemUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-all">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-sandbrown to-[#f4a261] text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-bold">{user.name}</p>
                            <p className="text-neutral-400 text-sm">{user.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                          <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-400' : 'bg-neutral-500'}`}></div>
                          <span className="text-neutral-400 text-sm w-24">{user.lastActive}</span>
                          {user.ordersCompleted && (
                            <span className="text-sandbrown font-bold">{user.ordersCompleted} orders</span>
                          )}
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-neutral-400 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
                    <p className="text-neutral-400">Track and manage all orders</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <button className="px-4 py-2 bg-neutral-700/50 border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-700 transition-all flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Filter
                    </button>
                    <button className="px-4 py-2 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-700">
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Order ID</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Customer</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Items</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Total</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Status</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Rider</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Time</th>
                          <th className="text-left text-neutral-400 text-sm font-medium pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-neutral-700/50 hover:bg-neutral-700/20 transition-colors">
                            <td className="py-4 text-white font-medium">{order.id}</td>
                            <td className="py-4 text-neutral-300">{order.customer}</td>
                            <td className="py-4 text-neutral-300">{order.items}</td>
                            <td className="py-4 text-white font-bold">{order.total}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 text-neutral-300">{order.rider}</td>
                            <td className="py-4 text-neutral-400 text-sm">{order.time}</td>
                            <td className="py-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-neutral-400 hover:text-white transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Product Management</h1>
                    <p className="text-neutral-400">Manage your menu items and pricing</p>
                  </div>
                  <button className="mt-4 sm:mt-0 px-4 py-2 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Product
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topProducts.map((product, index) => (
                    <div key={index} className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6 hover:border-neutral-600 transition-all">
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-4">{product.icon}</div>
                        <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-sandbrown text-2xl font-bold mb-2">{product.revenue}</p>
                        <p className="text-neutral-400 text-sm">{product.orders} orders</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-700">
                        <span className={`text-sm font-medium ${product.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {product.trend > 0 ? '+' : ''}{product.trend}% trend
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-neutral-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'riders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Rider Management</h1>
                    <p className="text-neutral-400">Monitor and manage delivery riders</p>
                  </div>
                  <button className="mt-4 sm:mt-0 px-4 py-2 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Add Rider
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {systemUsers.filter(u => u.role === 'rider').map((rider) => (
                    <div key={rider.id} className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-linear-to-r from-sandbrown to-[#f4a261] text-white text-2xl font-bold relative">
                          {rider.name.charAt(0)}
                          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-neutral-800 ${rider.status === 'active' ? 'bg-green-400' : 'bg-neutral-500'}`}></div>
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{rider.name}</h3>
                          <p className="text-neutral-400 text-sm">{rider.id}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-400 text-sm">Status</span>
                          <span className={`text-sm font-medium ${rider.status === 'active' ? 'text-green-400' : 'text-neutral-500'}`}>
                            {rider.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-400 text-sm">Last Active</span>
                          <span className="text-white text-sm">{rider.lastActive}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-400 text-sm">Deliveries</span>
                          <span className="text-sandbrown font-bold">{rider.ordersCompleted}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-neutral-700">
                        <button className="flex-1 py-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white text-sm hover:bg-neutral-700 transition-all">
                          View Details
                        </button>
                        <button className="p-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
                  <p className="text-neutral-400">Detailed insights and performance metrics</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <h2 className="text-white text-xl font-bold mb-6">Revenue Breakdown</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <span className="text-neutral-300">Completed Orders</span>
                        </div>
                        <span className="text-white font-bold">$18,234</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                          <span className="text-neutral-300">Processing</span>
                        </div>
                        <span className="text-white font-bold">$4,567</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <span className="text-neutral-300">Pending</span>
                        </div>
                        <span className="text-white font-bold">$1,766</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <h2 className="text-white text-xl font-bold mb-6">Performance Metrics</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-neutral-400 text-sm">Order Fulfillment Rate</span>
                          <span className="text-white font-bold">94%</span>
                        </div>
                        <div className="w-full bg-neutral-700/30 rounded-full h-2">
                          <div className="bg-linear-to-r from-sandbrown to-[#f4a261] h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-neutral-400 text-sm">Customer Satisfaction</span>
                          <span className="text-white font-bold">4.8/5</span>
                        </div>
                        <div className="w-full bg-neutral-700/30 rounded-full h-2">
                          <div className="bg-linear-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-neutral-400 text-sm">Avg. Delivery Time</span>
                          <span className="text-white font-bold">28 min</span>
                        </div>
                        <div className="w-full bg-neutral-700/30 rounded-full h-2">
                          <div className="bg-linear-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                  <p className="text-neutral-400">Configure your system preferences</p>
                </div>

                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                  <h2 className="text-white text-xl font-bold mb-6">General Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-neutral-400 text-sm mb-2">Restaurant Name</label>
                      <input
                        type="text"
                        defaultValue="Burger Palace"
                        className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-sandbrown transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 text-sm mb-2">Contact Email</label>
                      <input
                        type="email"
                        defaultValue="admin@burgerpalace.com"
                        className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-sandbrown transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 text-sm mb-2">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+1 234 567 8900"
                        className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-sandbrown transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 text-sm mb-2">Business Address</label>
                      <input
                        type="text"
                        defaultValue="123 Burger Street, Food City"
                        className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-sandbrown transition-colors"
                      />
                    </div>
                    <button className="w-full py-3 rounded-lg font-medium text-white bg-linear-to-r from-sandbrown to-[#f4a261] hover:scale-105 transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

export default Page