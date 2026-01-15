'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    Clock,
    XCircle,
    Package,
    Phone,
    MapPin,
    User,
    Calendar,
    DollarSign,
    ChevronDown,
    RefreshCw
} from 'lucide-react';


interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryAddress: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
    paymentStatus: 'paid' | 'pending' | 'failed';
    paymentMethod: string;
    orderDate: string;
    estimatedDelivery: string;
    rider?: string;
    notes?: string;
}

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

type FilterStatus = 'all' | Order['status'];

const ManageOrderClient = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const orders: Order[] = [
        {
            id: '1',
            orderNumber: 'ORD-2024-001',
            customerName: 'John Smith',
            customerPhone: '+1 234 567 8900',
            customerEmail: 'john.smith@email.com',
            deliveryAddress: '123 Main Street, Apt 4B, Downtown, City 12345',
            items: [
                { name: 'Classic Burger', quantity: 2, price: 12.99 },
                { name: 'French Fries', quantity: 1, price: 4.99 },
                { name: 'Coke', quantity: 2, price: 2.50 }
            ],
            subtotal: 35.97,
            deliveryFee: 3.99,
            total: 39.96,
            status: 'preparing',
            paymentStatus: 'paid',
            paymentMethod: 'Credit Card',
            orderDate: '2024-12-10 14:30',
            estimatedDelivery: '2024-12-10 15:30',
            rider: 'Mike Rodriguez',
            notes: 'Extra ketchup please'
        },
        {
            id: '2',
            orderNumber: 'ORD-2024-002',
            customerName: 'Sarah Johnson',
            customerPhone: '+1 234 567 8901',
            customerEmail: 'sarah.j@email.com',
            deliveryAddress: '456 Oak Avenue, Suite 12, Uptown, City 12346',
            items: [
                { name: 'Cheese Burger', quantity: 1, price: 14.99 },
                { name: 'Onion Rings', quantity: 1, price: 5.99 }
            ],
            subtotal: 20.98,
            deliveryFee: 2.99,
            total: 23.97,
            status: 'ready',
            paymentStatus: 'paid',
            paymentMethod: 'PayPal',
            orderDate: '2024-12-10 14:45',
            estimatedDelivery: '2024-12-10 15:45',
            rider: 'Lisa Chen'
        },
        {
            id: '3',
            orderNumber: 'ORD-2024-003',
            customerName: 'Michael Brown',
            customerPhone: '+1 234 567 8902',
            customerEmail: 'mbrown@email.com',
            deliveryAddress: '789 Pine Road, Building C, Floor 3, City 12347',
            items: [
                { name: 'Double Burger', quantity: 3, price: 18.99 },
                { name: 'Caesar Salad', quantity: 2, price: 7.99 }
            ],
            subtotal: 72.95,
            deliveryFee: 4.99,
            total: 77.94,
            status: 'out-for-delivery',
            paymentStatus: 'paid',
            paymentMethod: 'Cash on Delivery',
            orderDate: '2024-12-10 13:15',
            estimatedDelivery: '2024-12-10 14:30',
            rider: 'James Wilson',
            notes: 'Call upon arrival'
        },
        {
            id: '4',
            orderNumber: 'ORD-2024-004',
            customerName: 'Emily Davis',
            customerPhone: '+1 234 567 8903',
            customerEmail: 'emily.d@email.com',
            deliveryAddress: '321 Elm Street, House 15, Suburb, City 12348',
            items: [
                { name: 'Bacon Burger', quantity: 1, price: 16.99 }
            ],
            subtotal: 16.99,
            deliveryFee: 2.99,
            total: 19.98,
            status: 'pending',
            paymentStatus: 'pending',
            paymentMethod: 'Credit Card',
            orderDate: '2024-12-10 15:00',
            estimatedDelivery: '2024-12-10 16:15'
        },
        {
            id: '5',
            orderNumber: 'ORD-2024-005',
            customerName: 'David Wilson',
            customerPhone: '+1 234 567 8904',
            customerEmail: 'dwilson@email.com',
            deliveryAddress: '555 Maple Drive, Apt 8A, City Center, City 12349',
            items: [
                { name: 'Classic Burger', quantity: 1, price: 12.99 },
                { name: 'Milkshake', quantity: 1, price: 5.99 }
            ],
            subtotal: 18.98,
            deliveryFee: 3.99,
            total: 22.97,
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'Credit Card',
            orderDate: '2024-12-10 12:00',
            estimatedDelivery: '2024-12-10 13:00',
            rider: 'Maria Garcia'
        }
    ];

    const getStatusColor = (status: Order['status']): string => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
            case 'confirmed':
                return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30';
            case 'preparing':
                return 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30';
            case 'ready':
                return 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30';
            case 'out-for-delivery':
                return 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30';
            case 'delivered':
                return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30';
            case 'cancelled':
                return 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30';
        }
    };

    const getPaymentStatusColor = (status: Order['paymentStatus']): string => {
        switch (status) {
            case 'paid':
                return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
            case 'failed':
                return 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerPhone.includes(searchQuery);
        const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        ready: orders.filter(o => o.status === 'ready').length,
        'out-for-delivery': orders.filter(o => o.status === 'out-for-delivery').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length
    };
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-sandbrown to-[#f4a261]">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Manage Orders</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{filteredOrders.length} orders found</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Search */}
                <div className="mb-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by order number, customer name or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-sandbrown transition-colors"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors flex items-center"
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>
                            <button className="px-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors flex items-center">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Status Filter Tabs */}
                    {showFilters && (
                        <div className="flex flex-wrap gap-2">
                            {(['all', 'pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'] as FilterStatus[]).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterStatus === status
                                        ? 'bg-gradient-to-r from-sandbrown to-[#f4a261] text-white'
                                        : 'bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800'
                                        }`}
                                >
                                    {status === 'all' ? 'All' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    <span className="ml-2 text-xs opacity-75">({statusCounts[status]})</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-2xl p-12 text-center">
                            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No orders found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-neutral-700 transition-colors"
                            >
                                {/* Order Header */}
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 pb-4 border-b border-gray-200 dark:border-neutral-800">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{order.orderNumber}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status.replace('-', ' ').toUpperCase()}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                {order.paymentStatus.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {order.orderDate}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                ETA: {order.estimatedDelivery}
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="w-4 h-4 mr-1" />
                                                {order.paymentMethod}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 lg:mt-0 text-right">
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</p>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <User className="w-4 h-4 mr-2 mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{order.customerName}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerEmail}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerPhone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start">
                                            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{order.deliveryAddress}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Order Items:</h4>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    {item.quantity}x {item.name}
                                                </span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="pt-2 border-t border-gray-200 dark:border-neutral-800">
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                                <span className="text-gray-900 dark:text-white">${order.subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                                                <span className="text-gray-900 dark:text-white">${order.deliveryFee.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white">
                                                <span>Total</span>
                                                <span>${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rider Info */}
                                {order.rider && (
                                    <div className="mb-4 p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-medium text-gray-900 dark:text-white">Rider:</span> {order.rider}
                                        </p>
                                    </div>
                                )}

                                {/* Notes */}
                                {order.notes && (
                                    <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                        <p className="text-sm text-yellow-800 dark:text-yellow-400">
                                            <span className="font-medium">Note:</span> {order.notes}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <button className="px-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors flex items-center">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
                                    </button>
                                    <button className="px-4 py-2 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors flex items-center">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </button>
                                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                                        <button className="px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Update Status
                                        </button>
                                    )}
                                    <button className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageOrderClient