'use client';
import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  DollarSign,
  Clock,
  CheckCircle,
  Package,
  Phone,
  Bell,
  User,
  TrendingUp,
  Star,
  Menu as MenuIcon,
  X,
  ChevronRight,
  Bike,
  Home,
  AlertCircle
} from 'lucide-react';

const Page = () => {
  // app/rider/dashboard/page.tsx


  // Types
  interface DeliveryOrder {
    id: string;
    orderId: string;
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    distance: string;
    estimatedTime: string;
    amount: string;
    items: string;
    status: 'available' | 'accepted' | 'picked-up' | 'on-the-way' | 'delivered';
    priority: 'normal' | 'urgent';
  }

  interface RiderStats {
    todayDeliveries: number;
    todayEarnings: string;
    averageRating: number;
    totalDistance: string;
    deliveriesTrend: string;
    earningsTrend: string;
  }

  interface EarningHistory {
    date: string;
    amount: string;
    deliveries: number;
  }

  type TabType = 'active' | 'available' | 'history';


  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const stats: RiderStats = {
    todayDeliveries: 12,
    todayEarnings: '$156.50',
    averageRating: 4.8,
    totalDistance: '45.2 km',
    deliveriesTrend: '+3',
    earningsTrend: '+$24'
  };

  const activeOrders: DeliveryOrder[] = [
    {
      id: 'DEL-001',
      orderId: '#ORD-345',
      customerName: 'Sarah Johnson',
      customerPhone: '+1 234 567 8900',
      deliveryAddress: '123 Main Street, Apt 4B, Downtown',
      distance: '2.3 km',
      estimatedTime: '15 min',
      amount: '$28.50',
      items: 'Classic Burger x2, Fries, Coke',
      status: 'on-the-way',
      priority: 'normal'
    },
    {
      id: 'DEL-002',
      orderId: '#ORD-346',
      customerName: 'Mike Wilson',
      customerPhone: '+1 234 567 8901',
      deliveryAddress: '456 Oak Avenue, Suite 12',
      distance: '1.8 km',
      estimatedTime: '12 min',
      amount: '$32.00',
      items: 'Cheese Burger, Bacon Burger, Onion Rings',
      status: 'picked-up',
      priority: 'urgent'
    }
  ];

  const availableOrders: DeliveryOrder[] = [
    {
      id: 'DEL-003',
      orderId: '#ORD-347',
      customerName: 'Emily Davis',
      customerPhone: '+1 234 567 8902',
      deliveryAddress: '789 Pine Road, Building C',
      distance: '3.5 km',
      estimatedTime: '20 min',
      amount: '$45.99',
      items: 'Double Burger x3, Fries x2, Drinks x3',
      status: 'available',
      priority: 'normal'
    },
    {
      id: 'DEL-004',
      orderId: '#ORD-348',
      customerName: 'David Brown',
      customerPhone: '+1 234 567 8903',
      deliveryAddress: '321 Elm Street, Floor 2',
      distance: '1.2 km',
      estimatedTime: '8 min',
      amount: '$18.99',
      items: 'Classic Burger, Salad',
      status: 'available',
      priority: 'urgent'
    }
  ];

  const earningsHistory: EarningHistory[] = [
    { date: 'Today', amount: '$156.50', deliveries: 12 },
    { date: 'Yesterday', amount: '$142.30', deliveries: 11 },
    { date: 'Dec 4', amount: '$168.90', deliveries: 13 },
    { date: 'Dec 3', amount: '$135.20', deliveries: 10 }
  ];

  const getStatusColor = (status: DeliveryOrder['status']): string => {
    switch (status) {
      case 'available':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'accepted':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'picked-up':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'on-the-way':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
    }
  };

  const handleAcceptOrder = (orderId: string) => {
    console.log(`Order ${orderId} accepted`);
    // Implement accept logic here
  };

  const handlePickup = (orderId: string) => {
    console.log(`Order ${orderId} picked up`);
    // Implement pickup logic here
  };

  const handleDeliver = (orderId: string) => {
    console.log(`Order ${orderId} delivered`);
    // Implement delivery logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Top Navigation */}
      <nav className="bg-neutral-800/50 backdrop-blur-xl border-b border-neutral-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#dc9457] to-[#f4a261]">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-white font-bold text-xl">Burger Palace</span>
              <span className="ml-3 px-3 py-1 bg-neutral-700 rounded-full text-neutral-400 text-sm">Rider</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Online/Offline Toggle */}
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${isOnline
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                  : 'bg-neutral-700 border border-neutral-600 text-neutral-400'
                  }`}
              >
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-neutral-500'}`}></div>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </button>

              <button className="text-neutral-400 hover:text-white transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-white text-sm font-medium">John Rider</p>
                  <p className="text-neutral-400 text-xs">ID: RDR-1234</p>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#dc9457] to-[#f4a261]">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#dc9457] to-[#f4a261]">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stats.deliveriesTrend}</span>
            </div>
            <h3 className="text-neutral-400 text-sm mb-1">Today&apos;s Deliveries</h3>
            <p className="text-white text-3xl font-bold">{stats.todayDeliveries}</p>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-400">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stats.earningsTrend}</span>
            </div>
            <h3 className="text-neutral-400 text-sm mb-1">Today&apos;s Earnings</h3>
            <p className="text-white text-3xl font-bold">{stats.todayEarnings}</p>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-400">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-yellow-400 text-sm font-medium">★ {stats.averageRating}</span>
            </div>
            <h3 className="text-neutral-400 text-sm mb-1">Average Rating</h3>
            <p className="text-white text-3xl font-bold">{stats.averageRating}</p>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-400">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <span className="text-blue-400 text-sm font-medium">Today</span>
            </div>
            <h3 className="text-neutral-400 text-sm mb-1">Distance Covered</h3>
            <p className="text-white text-3xl font-bold">{stats.totalDistance}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-2 mb-6 flex space-x-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === 'active'
              ? 'bg-gradient-to-r from-[#dc9457] to-[#f4a261] text-white'
              : 'text-neutral-400 hover:text-white'
              }`}
          >
            Active Deliveries
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === 'available'
              ? 'bg-gradient-to-r from-[#dc9457] to-[#f4a261] text-white'
              : 'text-neutral-400 hover:text-white'
              }`}
          >
            Available Orders
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === 'history'
              ? 'bg-gradient-to-r from-[#dc9457] to-[#f4a261] text-white'
              : 'text-neutral-400 hover:text-white'
              }`}
          >
            Earnings History
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Orders List - 8 columns */}
          <div className="lg:col-span-8 space-y-4">
            {activeTab === 'active' && (
              <>
                {activeOrders.length === 0 ? (
                  <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-12 text-center">
                    <Package className="w-16 h-16 mx-auto mb-4 text-neutral-600" />
                    <h3 className="text-white text-xl font-bold mb-2">No Active Deliveries</h3>
                    <p className="text-neutral-400">Check available orders to start earning!</p>
                  </div>
                ) : (
                  activeOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`bg-neutral-800/50 backdrop-blur-xl rounded-2xl border p-6 ${order.priority === 'urgent' ? 'border-red-500/30 bg-red-500/5' : 'border-neutral-700'
                        }`}
                    >
                      {/* Order Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-white font-bold text-lg">{order.orderId}</h3>
                            {order.priority === 'urgent' && (
                              <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-medium rounded flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                URGENT
                              </span>
                            )}
                            <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-2xl">{order.amount}</p>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="mb-4 p-4 bg-neutral-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-white font-bold">{order.customerName}</p>
                            <p className="text-neutral-400 text-sm">{order.customerPhone}</p>
                          </div>
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#dc9457] to-[#f4a261] hover:scale-110 transition-all"
                          >
                            <Phone className="w-5 h-5 text-white" />
                          </a>
                        </div>
                        <div className="flex items-start space-x-2 text-neutral-300">
                          <MapPin className="w-5 h-5 text-[#dc9457] flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{order.deliveryAddress}</p>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-neutral-700/30 rounded-lg">
                          <Navigation className="w-5 h-5 text-[#dc9457] mx-auto mb-1" />
                          <p className="text-white font-bold">{order.distance}</p>
                          <p className="text-neutral-400 text-xs">Distance</p>
                        </div>
                        <div className="text-center p-3 bg-neutral-700/30 rounded-lg">
                          <Clock className="w-5 h-5 text-[#dc9457] mx-auto mb-1" />
                          <p className="text-white font-bold">{order.estimatedTime}</p>
                          <p className="text-neutral-400 text-xs">Est. Time</p>
                        </div>
                        <div className="text-center p-3 bg-neutral-700/30 rounded-lg">
                          <Package className="w-5 h-5 text-[#dc9457] mx-auto mb-1" />
                          <p className="text-white font-bold text-xs">{order.items.split(',').length}</p>
                          <p className="text-neutral-400 text-xs">Items</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        {order.status === 'picked-up' && (
                          <>
                            <button className="flex-1 py-3 px-4 bg-neutral-700 border border-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-600 transition-all flex items-center justify-center">
                              <Navigation className="w-5 h-5 mr-2" />
                              Navigate
                            </button>
                            <button
                              onClick={() => handleDeliver(order.id)}
                              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center"
                            >
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Mark Delivered
                            </button>
                          </>
                        )}
                        {order.status === 'on-the-way' && (
                          <>
                            <button className="flex-1 py-3 px-4 bg-neutral-700 border border-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-600 transition-all flex items-center justify-center">
                              <Navigation className="w-5 h-5 mr-2" />
                              Navigate
                            </button>
                            <button
                              onClick={() => handleDeliver(order.id)}
                              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center"
                            >
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Mark Delivered
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === 'available' && (
              <>
                {availableOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-neutral-800/50 backdrop-blur-xl rounded-2xl border p-6 hover:border-neutral-600 transition-all ${order.priority === 'urgent' ? 'border-red-500/30 bg-red-500/5' : 'border-neutral-700'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-bold text-lg">{order.orderId}</h3>
                          {order.priority === 'urgent' && (
                            <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-medium rounded flex items-center">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              URGENT
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-400 text-sm mb-1">{order.deliveryAddress}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-2xl">{order.amount}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center space-x-2 p-3 bg-neutral-700/30 rounded-lg">
                        <Navigation className="w-5 h-5 text-[#dc9457]" />
                        <div>
                          <p className="text-white font-bold text-sm">{order.distance}</p>
                          <p className="text-neutral-400 text-xs">Distance</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-neutral-700/30 rounded-lg">
                        <Clock className="w-5 h-5 text-[#dc9457]" />
                        <div>
                          <p className="text-white font-bold text-sm">{order.estimatedTime}</p>
                          <p className="text-neutral-400 text-xs">Est. Time</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-[#dc9457] to-[#f4a261] text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center"
                    >
                      Accept Order
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'history' && (
              <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                <h2 className="text-white text-xl font-bold mb-6">Earnings History</h2>
                <div className="space-y-3">
                  {earningsHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg border border-neutral-700">
                      <div>
                        <p className="text-white font-bold">{record.date}</p>
                        <p className="text-neutral-400 text-sm">{record.deliveries} deliveries</p>
                      </div>
                      <p className="text-green-400 font-bold text-xl">{record.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            {/* Today's Summary */}
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-2xl border border-neutral-700 p-6">
              <h3 className="text-white font-bold text-lg mb-4">Today&apos;s Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Deliveries</span>
                  <span className="text-white font-bold">{stats.todayDeliveries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Earnings</span>
                  <span className="text-green-400 font-bold">{stats.todayEarnings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Distance</span>
                  <span className="text-white font-bold">{stats.totalDistance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Rating</span>
                  <span className="text-yellow-400 font-bold">★ {stats.averageRating}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
              <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-gradient-to-r from-[#dc9457] to-[#f4a261] text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center">
                  <Home className="w-5 h-5 mr-2" />
                  Go to Restaurant
                </button>
                <button className="w-full py-3 px-4 bg-neutral-700/50 border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-700 transition-all flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Support
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 p-6">
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-bold mb-2">Pro Tip!</h3>
                  <p className="text-neutral-300 text-sm">Accept orders quickly to increase your earnings. Priority deliveries earn bonus points!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page