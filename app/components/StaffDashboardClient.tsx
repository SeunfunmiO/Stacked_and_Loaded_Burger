'use client';

import React, { useEffect, useState } from 'react';
import {
    ShoppingBag,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChefHat,
    Search,
    Filter,
    MoreVertical,
    ThumbsUp,
    Bike,
    Package,
    Plus
} from 'lucide-react';
import { IOrder } from '@/lib/type';
import { formatNaira, NairaIcon } from '@/app/components/NairaIcon';
import { staffMembers } from '@/lib/MapItems';
import { deleteAllProducts, getAllOrders, updateOrderStatus } from '@/lib/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const StaffDashboardClient = () => {
    // const [activeTab, setActiveTab] = useState<StaffTabType>('orders');
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [activeOrders, setActiveOrders] = useState<IOrder[]>([]);
    const [statsState, setStatsState] = useState({
        revenue: 0,
        revenueTrend: '',
        customersToday: 0,
        ordersTrend: ''
    });
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAllOrders();

                if (!res.success) {
                    return toast.error(res.message);
                }

                setOrders(res.data);


                // Active orders
                const active = res.data.filter(
                    (order: IOrder) =>
                        ['pending', 'confirmed', 'out-for-delivery'].includes(order.status)
                );
                setActiveOrders(active);

                // Revenue today
                const today = new Date();
                const revenueOrders = res.data.filter(
                    (order: IOrder) =>
                        new Date(order.createdAt).toDateString() === today.toDateString() &&
                        order.status === 'delivered'
                );

                const totalRevenue = revenueOrders.reduce((total: number, order: IOrder) => total + order.total, 0);


                // Revenue yesterday
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const previousRevenueOrders = res.data.filter(
                    (order: IOrder) =>
                        new Date(order.createdAt).toDateString() === yesterday.toDateString() &&
                        order.status === 'delivered'
                );
                const previousRevenue = previousRevenueOrders.reduce((total: number, order: IOrder) => total + order.total, 0);

                const revenuePercentage =
                    previousRevenue === 0
                        ? 100
                        : ((totalRevenue - previousRevenue) / previousRevenue) * 100;

                // Customers today
                const customersSet = new Set();
                res.data.forEach((order: IOrder) => {
                    if (new Date(order.createdAt).toDateString() === today.toDateString()) {
                        customersSet.add(order.user);
                    }
                });

                setStatsState({
                    revenue: totalRevenue,
                    revenueTrend: `${revenuePercentage.toFixed(2)}% ${revenuePercentage >= 0 ? '↑' : '↓'
                        } from yesterday`,
                    customersToday: customersSet.size,
                    ordersTrend: '' // can compute if needed
                });
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch orders');
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status: IOrder['status']): string => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30 ';
            case 'confirmed':
                return 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30'
            case 'out-for-delivery':
                return 'bg-orange-500/20 border-orange-500/30 text-orange-400 hover:bg-orange-500/30'
            case 'delivered':
                return 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'
            case 'cancelled':
                return 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
            default:
                return 'bg-gray-500/20 border-gray-500/30 text-gray-400 hover:bg-gray-500/30'
        }
    };

    const getStatusIcon = (status: IOrder['status']) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'confirmed':
                return <ThumbsUp className="w-4 h-4" />;
            case 'out-for-delivery':
                return <Bike className="w-4 h-4" />;
            case 'delivered':
                return <CheckCircle className="w-4 h-4" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    const handleStatusChange = async (
        orderId: string,
        newStatus: IOrder['status']
    ) => {
        setLoadingId(orderId);
        try {
            const res = await updateOrderStatus(orderId, newStatus);

            if (!res?.success) {
                toast.error(res?.message || 'Failed to update order');
                return;
            }

            setActiveOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );

            toast.success('Order status updated!');
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoadingId(null);
        }
    };



    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [searchQuery]);


    const filteredOrders = activeOrders.filter((order) => {
        const query = debouncedQuery.toLowerCase();

        // Search by order ID, user name/email, or any other field
        return (
            order._id.toLowerCase().includes(query) ||
            order.user.toLowerCase().includes(query) ||
            order.items.some((item) => item.name.toLowerCase().includes(query))
        );
    });

    // const deleteAll = async () => {
    //     try {
    //         await deleteAllProducts()
    //     } catch (error) {

    //     }
    // }


    return (
        <div className="max-w-480 mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-sandbrown to-[#f4a261]">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-green-400 text-sm font-medium">{statsState.ordersTrend}</span>
                    </div>
                    <h3 className="text-neutral-400 text-sm mb-1">Total Orders</h3>
                    <p className="text-white text-3xl font-bold">{orders.length}</p>
                </div>

                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-blue-500 to-blue-400">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-yellow-400 text-sm font-medium">Live</span>
                    </div>
                    <h3 className="text-neutral-400 text-sm mb-1">Active Orders</h3>
                    <p className="text-white text-3xl font-bold">{activeOrders.length}</p>
                </div>

                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-green-500 to-green-400">
                            <NairaIcon />
                        </div>
                        <span className="text-green-400 text-sm font-medium">{statsState.revenueTrend}</span>
                    </div>
                    <h3 className="text-neutral-400 text-sm mb-1">Today&apos;s Revenue</h3>
                    <p className="text-white text-3xl font-bold">{formatNaira(statsState.revenue)}</p>
                </div>

                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-purple-500 to-purple-400">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-green-400 text-sm font-medium">+{statsState.customersToday}</span>
                    </div>
                    <h3 className="text-neutral-400 text-sm mb-1">Customers Today</h3>
                    <p className="text-white text-3xl font-bold">{statsState.customersToday}</p>
                </div>
            </div>

            {/* Orders List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                    <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                        <div className="flex md:items-center items-start flex-col md:flex-row mb-3 gap-2 md:gap-0 justify-between md:mb-6">
                            <h2 className="text-white text-xl font-bold">Active Orders</h2>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-sandbrown transition-colors"
                                    />
                                </div>
                                <button className="p-2 bg-neutral-700/50 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-600 transition-all">
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order._id}
                                    className={`p-4 bg-neutral-700/30 rounded-xl border hover:border-neutral-600 transition-all`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-white font-bold">{order._id}</h3>
                                                <span className="text-neutral-500 text-sm">{new Date(order.createdAt).toLocaleString()}</span>
                                            </div>
                                            <p className="text-neutral-300 font-medium mb-1">{order.user}</p>
                                            <div className="text-neutral-400 text-sm">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="border-b py-2">
                                                        <p><strong>{item.name}</strong> x {item.quantity}</p>
                                                        <p>Meat: {item.meatType}</p>
                                                        <p>Side: {item.side}</p>
                                                        <p>Beverage: {item.beverage}</p>
                                                        {item.toppings.length > 0 && (
                                                            <p>
                                                                Toppings: {item.toppings.map(t => `${t.name} (${formatNaira(t.price)})`).join(', ')}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-bold text-lg mb-2">{formatNaira(order.total)}</p>
                                            <button className="text-neutral-400 hover:text-white transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex md:items-center flex-col md:flex-row  justify-between pt-3 border-t 
                                    border-neutral-700 items-start gap-2 md:gap-0">
                                        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="text-sm font-medium capitalize">{order.status}</span>
                                        </div>
                                        <div className="flex items-center md:flex-nowrap flex-wrap space-x-2">
                                            {['confirmed', 'out-for-delivery', 'delivered'].map((statusOption) => (
                                                <button
                                                    key={statusOption}
                                                    onClick={() => handleStatusChange(order._id, statusOption as IOrder['status'])}
                                                    className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all"
                                                    disabled={['delivered', 'cancelled'].includes(order.status)}
                                                >
                                                    {statusOption.replace(/-/g, ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Staff Quick Actions */}
                <div className="lg:col-span-4 space-y-6">
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
                                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-neutral-800 ${staff.status === 'active' ? 'bg-green-500' : 'bg-neutral-500'}`}></span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{staff.name}</p>
                                            <p className="text-neutral-400 text-xs">{staff.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sandbrown font-bold">{staff.ordersCompleted}</p>
                                        <p className="text-neutral-500 text-xs">orders</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                        <h2 className="text-white text-xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/staff/manage-orders')}
                                className="w-full py-3 px-4 bg-linear-to-r from-sandbrown7] to-[#f4a261]
                             text-white rounded-lg font-medium hover:scale-105 transition-all flex items-center justify-center">
                                <ChefHat className="w-5 h-5 mr-2" />
                                Manage Orders
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
                                <Plus className="w-5 h-5 mr-2" />
                                Manage Menu Options
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboardClient;
