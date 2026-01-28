
'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, Award, Clock, MapPin, User, Settings, LogOut, Package, Heart, Bell, ChevronRight, TrendingUp, ChefHat } from 'lucide-react';
import Image from 'next/image';
import { FavoriteItem, IOrder, OrderItemPayload, Reward, TabType } from '@/lib/type';
import { getCustomer, getSingleOrder, logOut, updateUser } from '@/lib/actions';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { formatNaira } from './NairaIcon';
import { Button } from './ui/button';



const UserClient = ({ userId }: { userId: string }) => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [orders, setOrders] = useState<IOrder[]>([])
    const [recentOrder, setRecentOrder] = useState<IOrder[]>([])
    const [customer, setCustomer] = useState(
        {
            fullname: "",
            email: "",
            createdAt: "",
            isAdmin: false
        }
    )

    const router = useRouter()

    const maskEmail = (email: string) => {
        if (!email) return '';

        const [username, domain] = email.split("@")

        if (username.length <= 3) {
            return username[0] + "*".repeat(username.length - 2) + username[username.length - 1] + "@" + domain;
        }

        const visibleStart = username.slice(0, 3);
        const visibleEnd = username.slice(-1);
        const masked = "*".repeat(username.length - 4);
        return `${visibleStart}${masked}${visibleEnd}@${domain}`
    }

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getCustomer()

                if (!response.user && !response.success && userId) {
                    return;
                } else {
                    const customerData = {
                        fullname: response.user.fullname,
                        email: maskEmail(response.user.email),
                        createdAt: response.user.createdAt
                            ? new Date(response.user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                            : '',
                        isAdmin: response.user.isAdmin
                    }
                    setCustomer(customerData)

                }

            } catch (error) {
                console.error("Error fetching customer ", error);
            }
        }
        fetchCustomer()
    }, [userId])

    const handleLogOut = async () => {
        try {
            const res = await logOut()
            if (res.success) {
                toast.success(res.message)
            }
            router.push('/sign-in')
        } catch (error) {
            console.log("Error logging out", error);
        }
    }


    useEffect(() => {
        const fetchOrder = async () => {
            const res = await getSingleOrder({ userId })

            if (!res.success) {
                return toast.error(res.message)
            }

            setOrders(res.orders)
            
            setRecentOrder(res.orders.slice(0, 1))
        }
        fetchOrder()
    }, [userId])

    const updateCustomerDetails = async (data: { email: string, fullname: string }) => {
        try {
            const response = await updateUser(data);
            if (!response.success) {
                return toast.error(response.message)
            }
            setCustomer(prev => ({
                ...prev,
                email: data.email,
                fullname: data.fullname
            }))
            toast.success('User details updated successfully!');
        } catch (error) {
            console.error('error updating user details:', error);
            toast.error('Failed to update user details.');
        }
    }

    const getStatusColor = (status: IOrder['status']): string => {
        switch (status) {
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

    // const orderAgain = (orders) => {
    //     if (!orders || orders.length === 0) return;

    //     const lastOrder = orders[orders.length - 1]; 
    //     setCartItems(lastOrder.items);
    // };



    return (
        <div>
            <nav className="bg-neutral-800/50 backdrop-blur-xl border-b border-neutral-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r 
                            from-sandbrown to-[#f4a261]">
                                <span className="text-2xl">
                                    <Image
                                        onClick={() => router.push('/')}
                                        alt='Burger'
                                        src={'/Cheeseburger.png'}
                                        width={40}
                                        height={40}
                                    />
                                </span>
                            </div>
                            <span className="ml-3 text-white font-bold text-xl">Stacked & Loaded Burger</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-neutral-400 hover:text-white transition-colors relative">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white 
                                bg-linear-to-r from-sandbrown to-[#f4a261]">
                                    <User className="w-5 h-5" />
                                </div>
                                <span className="text-white font-medium hidden sm:block">{customer.fullname}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center 
                                text-white text-3xl bg-linear-to-r from-sandbrown to-[#f4a261]">
                                    <User className="w-12 h-12" />
                                </div>
                                <h2 className="text-white font-bold text-xl mb-1">{customer.fullname}</h2>
                                <p className="text-neutral-400 text-sm mb-2">{customer.email}</p>
                                <span className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white
                                 bg-linear-to-r from-sandbrown to-[#f4a261]">
                                    {orders.length < 6 ? 'Bronze Member' : "Gold Member"}
                                </span>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'overview' ?
                                        'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                                        }`}
                                >
                                    <TrendingUp className="w-5 h-5 mr-3" />
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'orders' ?
                                        'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                                        }`}
                                >
                                    <ShoppingBag className="w-5 h-5 mr-3" />
                                    My Orders
                                </button>
                                {/* <button
                                    onClick={() => setActiveTab('favorites')}
                                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${activeTab === 'favorites' ?
                                        'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                                        }`}
                                >
                                    <Heart className="w-5 h-5 mr-3" />
                                    Favorites
                                </button> */}
                                {/* <button
                                    onClick={() => setActiveTab('rewards')}
                                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all 
                                        ${activeTab === 'rewards' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                                        }`}
                                >
                                    <Award className="w-5 h-5 mr-3" />
                                    Rewards
                                </button> */}
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all 
                                        ${activeTab === 'settings' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-700/50 hover:text-white'
                                        }`}
                                >
                                    <Settings className="w-5 h-5 mr-3" />
                                    Settings
                                </button>
                                <button
                                    onClick={() => handleLogOut()}
                                    className="w-full flex items-center px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-700/50 
                                    hover:text-red-400 transition-all">
                                    <LogOut className="w-5 h-5 mr-3" />
                                    Logout
                                </button>

                                {
                                    customer.isAdmin === true && (
                                        <Link
                                            href={'/staff/staff-dashboard'}
                                            className="w-full flex items-center px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-700/50 
                                         hover:text-white-400 transition-all"
                                        >
                                            <ChefHat className="w-5 h-5 mr-3" />
                                            Staff Panel
                                        </Link>
                                    )
                                }
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r 
                                            from-sandbrown to-[#f4a261]">
                                                <ShoppingBag className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-green-400 text-sm font-medium">+{orders.length}%</span>
                                        </div>
                                        <h3 className="text-neutral-400 text-sm mb-1">Total Orders</h3>
                                        <p className="text-white text-3xl font-bold">{orders.length}</p>
                                    </div>

                                    <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r 
                                            from-sandbrown to-[#f4a261]">
                                                <Award className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-green-400 text-sm font-medium">+10</span>
                                        </div>
                                        <h3 className="text-neutral-400 text-sm mb-1">Reward Points</h3>
                                        <p className="text-white text-3xl font-bold">{orders.length * 10}</p>
                                    </div>

                                    <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r 
                                            from-sandbrown to-[#f4a261]">
                                                <Star className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-green-400 text-sm font-medium"> {orders.length < 6 ? 'Bronze' : "Gold"}</span>
                                        </div>
                                        <h3 className="text-neutral-400 text-sm mb-1">Member Since</h3>
                                        <p className="text-white text-xl font-bold">{customer.createdAt}</p>
                                    </div>
                                </div>

                                {/* Recent Orders */}
                                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-white text-xl font-bold">Recent Orders</h2>
                                        <button
                                            onClick={() => setActiveTab('orders')}
                                            className="text-sandbrown text-sm font-medium hover:text-white transition-colors">
                                            View All
                                        </button>
                                    </div>

                                    {
                                        orders.length === 0 && (

                                            <div className='flex flex-col gap-4 justify-center items-center'>
                                                <p className="text-neutral-400 text-center">No recent orders found.</p>
                                                <Button
                                                    onClick={() => router.push('/order-delivery')}
                                                    className='bg-sandbrown rounded text-white'
                                                >
                                                    Order Now
                                                </Button>
                                            </div>
                                        )
                                    }
                                    <div className="space-y-4">
                                        {recentOrder.map((order) => (
                                            <div key={order._id} className="flex md:flex-row flex-col md:items-center justify-between p-4
                                             bg-neutral-700/30 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-all">
                                                <div className="flex items-center space-x-4">
                                                    <div>
                                                        <p className="font-medium">ORDERID : {order.paymentReference}</p>
                                                        <div className="text-neutral-400 text-sm">
                                                            {order.items.map((item, index) => (
                                                                <div key={index} className="border-b py-2">
                                                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl 
                                                                     bg-linear-to-r from-sandbrown to-[#f4a261]"
                                                                    >
                                                                        <Image
                                                                            alt={item.name}
                                                                            src={'/cheeseBurger.png'}
                                                                            width={40}
                                                                            height={40}
                                                                        />
                                                                    </div>

                                                                    <p><strong>{item.name}</strong> x {item.quantity}</p>
                                                                    <p>Meat: {item.meatType}</p>
                                                                    <p>Side: {item.side}</p>
                                                                    <p>Beverage: {item.beverage}</p>
                                                                    {item.toppings.length > 0 && (
                                                                        <p>
                                                                            Toppings: {item.toppings.map(t => `${t.name} 
                                                                                (${formatNaira(t.price)})`).join(', ')}
                                                                        </p>
                                                                    )}
                                                                    <p>Item Total: {formatNaira(item.itemTotal)}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="flex items-center justify-between">
                                                        <h1 className="font-bold">Total</h1>
                                                        <p className="text-white font-bold">{formatNaira(order.total)}</p>
                                                    </div>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                                                        ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>


                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6 
                                    hover:border-neutral-600 transition-all cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-white font-bold text-lg mb-2">Order Again</h3>
                                                <p className="text-neutral-400 text-sm">Reorder your favorites in seconds</p>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-neutral-400" />
                                        </div>
                                    </div>
                                    <div 
                                    onClick={()=>router.push('/user/track-orders')}
                                    className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6 
                                    hover:border-neutral-600 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-white font-bold text-lg mb-2">Track Order</h3>
                                                <p className="text-neutral-400 text-sm">See where your burger is now</p>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-neutral-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* {activeTab === 'favorites' && (
                            <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                                <h2 className="text-white text-xl font-bold mb-6">Your Favorite Burgers</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {favorites.map((item, index) => (
                                        <div key={index} className="bg-neutral-700/30 rounded-xl border border-neutral-700 p-4 
                                        hover:border-neutral-600 transition-all">
                                            <div className="text-6xl text-center mb-4">{item.image}</div>
                                            <h3 className="text-white font-bold mb-2">{item.name}</h3>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sandbrown text-2xl font-bold">{item.price}</span>
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                                    <span className="text-white text-sm">{item.rating}</span>
                                                </div>
                                            </div>
                                            <button className="w-full py-2 rounded-lg font-medium text-white transition-all 
                                            hover:scale-105 bg-linear-to-r from-sandbrown to-[#f4a261]">
                                                Order Now
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'rewards' && (
                            <div className="space-y-6">
                                <div className="bg-linear-to-r from-neutral-800 to-neutral-700 rounded-2xl border border-neutral-700
                                 p-8 text-center">
                                    <Award className="w-16 h-16 mx-auto mb-4 text-sandbrown" />
                                    <h2 className="text-white text-3xl font-bold mb-2">{customer.points || "1250"} Points</h2>
                                    <p className="text-neutral-400 mb-6">You're 250 points away from your next reward!</p>
                                    <div className="max-w-md mx-auto bg-neutral-700 rounded-full h-4 overflow-hidden">
                                        <div className="h-full rounded-full bg-linear-to-r from-sandbrown to-[#f4a261]"
                                            style={{ width: '83%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                                    <h2 className="text-white text-xl font-bold mb-6">Available Rewards</h2>
                                    <div className="space-y-4">
                                        {rewards.map((reward) => (
                                            <div key={reward.id} className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg border border-neutral-700">
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-4xl">{reward.icon}</div>
                                                    <div>
                                                        <p className="text-white font-bold">{reward.name}</p>
                                                        <p className="text-neutral-400 text-sm">{reward.pointsRequired} points required</p>
                                                    </div>
                                                </div>
                                                <button
                                                    disabled={customer.points < reward.pointsRequired}
                                                    className={`px-6 py-2 rounded-lg font-medium text-white
                                                         ${customer.points >= reward.pointsRequired
                                                            ? 'bg-linear-to-r from-sandbrown to-[#f4a261] hover:scale-105'
                                                            : 'bg-neutral-600 cursor-not-allowed opacity-50'
                                                        } transition-all`}
                                                >
                                                    Redeem
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )} */}

                        {activeTab === 'orders' && (
                            <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                                <h2 className="text-white text-xl font-bold mb-6">All Orders</h2>

                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order._id} className="p-4 bg-neutral-700/30 rounded-lg border border-neutral-700">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-white font-bold">{order.paymentReference}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                                    ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="text-neutral-400 text-sm mb-2"> {order.items.map((item, index) => (
                                                <div key={index} className="border-b py-2">
                                                    <p><strong>{item.name}</strong> x {item.quantity}</p>
                                                    <p>Meat: {item.meatType}</p>
                                                    <p>Side: {item.side}</p>
                                                    <p>Beverage: {item.beverage}</p>
                                                    {item.toppings.length > 0 && (
                                                        <p>
                                                            Toppings: {item.toppings.map(t => `${t.name} 
                                                                                (${formatNaira(t.price)})`).join(', ')}
                                                        </p>
                                                    )}
                                                    <p>Item Total: {formatNaira(item.itemTotal)}</p>
                                                </div>
                                            ))}</div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-neutral-500 text-sm">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}

                                                </span>
                                                <span className="text-white font-bold">{formatNaira(order.total)}</span>
                                            </div>
                                        </div>
                                    ))}

                                    {
                                        orders.length === 0 && (

                                            <div className='flex flex-col gap-4 justify-center items-center'>
                                                <p className="text-neutral-400 text-center">No orders found.</p>
                                                <Button
                                                    onClick={() => router.push('/order-delivery')}
                                                    className='bg-sandbrown rounded text-white'
                                                >
                                                    Order Now
                                                </Button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700 p-6">
                                <h2 className="text-white text-xl font-bold mb-6">Account Settings</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-neutral-400 text-sm mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue={customer.fullname}
                                            className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-700 
                                            rounded-lg text-white focus:outline-none focus:border-sandbrown transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-neutral-400 text-sm mb-2">Email</label>
                                        <input
                                            type="email"
                                            defaultValue={customer.email}
                                            className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-700 
                                            rounded-lg text-white focus:outline-none focus:border-sandbrown transition-colors"
                                        />
                                    </div>
                                    <button
                                        onClick={() => updateCustomerDetails({ email: customer.email, fullname: customer.fullname })}
                                        className="w-full py-3 rounded-lg font-medium text-white bg-linear-to-r 
                                    from-sandbrown to-[#f4a261] hover:scale-105 transition-all">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserClient