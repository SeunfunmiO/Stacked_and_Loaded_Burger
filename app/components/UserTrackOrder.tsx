
'use client'

import React, { useEffect, useState } from 'react'
import { Search, MapPin, Clock, CheckCircle, Package, Bike, Home, Phone } from 'lucide-react'
import { getSingleOrder } from '@/lib/actions'
import { toast } from 'react-toastify'
import { IOrder, OrderItemPayload } from '@/lib/type'

export default function TrackOrderPage({ userId }: { userId: string }) {
    const [orderNumber, setOrderNumber] = useState('')
    const [orders, setOrders] = useState<IOrder[]>([])
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
            const res = await getSingleOrder({ userId })
            console.log(res)

            if (!res.success) {
                toast.error(res.message)
                setLoading(false)
                return
            }

            setOrders(res.orders)
            // Auto-select first order if available
            if (res.orders && res.orders.length > 0) {
                setSelectedOrder(res.orders[0])
                setOrderNumber(res.orders[0].paymentReference || '')
            }
            setLoading(false)
        }
        fetchOrder()
    }, [userId])

    const handleTrackOrder = () => {
        if (!orderNumber) {
            toast.error('Please enter an order number')
            return
        }

        const order = orders.find(o => o._id === orderNumber || o._id === orderNumber)
        if (order) {
            setSelectedOrder(order)
        } else {
            toast.error('Order not found')
            setSelectedOrder(null)
        }
    }

    const getStatusIcon = (status: string, completed: boolean) => {
        const iconClass = completed ? 'text-white' : 'text-gray-400 dark:text-gray-600'
        switch (status) {
            case 'placed': return <Package className={`w-5 h-5 ${iconClass}`} />
            case 'confirmed': return <CheckCircle className={`w-5 h-5 ${iconClass}`} />
            case 'preparing': return <Clock className={`w-5 h-5 ${iconClass}`} />
            case 'ready': return <Package className={`w-5 h-5 ${iconClass}`} />
            case 'out-for-delivery': return <Bike className={`w-5 h-5 ${iconClass}`} />
            case 'delivered': return <Home className={`w-5 h-5 ${iconClass}`} />
            default: return <Package className={`w-5 h-5 ${iconClass}`} />
        }
    }

    // Generate timeline based on order status
    const generateTimeline = (currentStatus: string) => {
        const allStatuses = [
            { status: 'placed', label: 'Order Placed' },
            { status: 'confirmed', label: 'Order Confirmed' },
            { status: 'preparing', label: 'Preparing' },
            { status: 'ready', label: 'Ready for Pickup' },
            { status: 'out-for-delivery', label: 'Out for Delivery' },
            { status: 'delivered', label: 'Delivered' }
        ]

        const currentIndex = allStatuses.findIndex(s => s.status === currentStatus)

        return allStatuses.map((step, index) => ({
            ...step,
            completed: index <= currentIndex,
            time: index <= currentIndex ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Track Your Order
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {orders.length > 0 ? `You have ${orders.length} order(s)` : 'Enter your order number to see real-time updates'}
                    </p>
                </div>

                {/* Search Box */}
                <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 mb-8">
                    <div className="flex flex-col gap-4">
                        {/* Order Selection Dropdown (if multiple orders) */}
                        {orders.length > 1 && (
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Select Your Order
                                </label>
                                <select
                                    value={orderNumber}
                                    onChange={(e) => {
                                        setOrderNumber(e.target.value)
                                        const order = orders.find(o => o._id === e.target.value)
                                        setSelectedOrder(order || null)
                                    }}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-sandbrown transition-colors"
                                >
                                    <option value="">Select an order</option>
                                    {orders.map((order) => (
                                        <option key={order._id} value={order.paymentReference}>
                                            Order #{order.paymentReference || order._id} - {order.status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Manual Search Input */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    placeholder="Or enter order ID manually"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-sandbrown transition-colors"
                                    onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                                />
                            </div>
                            <button
                                onClick={handleTrackOrder}
                                disabled={loading}
                                className="px-8 py-3 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 whitespace-nowrap"
                            >
                                {loading ? 'Loading...' : 'Track Order'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                {selectedOrder && (
                    <div className="space-y-6">
                        {/* Order Info Card */}
                        <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Order #{selectedOrder.paymentReference || selectedOrder._id}
                                </h2>
                                <span className="px-4 py-1 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                                    {selectedOrder.status.replace('-', ' ').toUpperCase()}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <MapPin className="w-4 h-4 mr-2 text-sandbrown" />
                                    {selectedOrder.delivery || selectedOrder.delivery || 'Delivery address not available'}
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <Clock className="w-4 h-4 mr-2 text-sandbrown" />
                                    Estimated arrival: {'30-45 minutes'}
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                                Order Progress
                            </h3>
                            <div className="relative">
                                {/* Progress Line */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-neutral-800"></div>
                                {(() => {
                                    const timeline = generateTimeline(selectedOrder.status)
                                    const completedCount = timeline.filter(t => t.completed).length
                                    const progressPercent = (completedCount / timeline.length) * 100

                                    return (
                                        <>
                                            <div
                                                className="absolute left-6 top-0 w-0.5 bg-linear-to-b from-sandbrown to-[#f4a261] transition-all duration-1000"
                                                style={{ height: `${progressPercent}%` }}
                                            ></div>

                                            {/* Timeline Steps */}
                                            <div className="space-y-6">
                                                {timeline.map((step, index) => (
                                                    <div key={index} className="flex items-start relative">
                                                        <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all ${step.completed
                                                            ? 'bg-linear-to-r from-sandbrown to-[#f4a261]'
                                                            : 'bg-gray-200 dark:bg-neutral-800'
                                                            }`}>
                                                            {getStatusIcon(step.status, step.completed)}
                                                        </div>
                                                        <div className="ml-4 flex-1 pt-2">
                                                            <h4 className={`font-semibold ${step.completed
                                                                ? 'text-gray-900 dark:text-white'
                                                                : 'text-gray-500 dark:text-gray-400'
                                                                }`}>
                                                                {step.label}
                                                            </h4>
                                                            {step.time && (
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {step.time}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )
                                })()}
                            </div>
                        </div>

                        {/* Rider Info */}

                        <div className="bg-linear-to-r from-sandbrown/10 to-[#f4a261]/10 dark:from-sandbrown/5 dark:to-[#f4a261]/5 border border-sandbrown/20 dark:border-sandbrown/10 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Bike className="w-5 h-5 mr-2 text-sandbrown" />
                                Your Delivery Rider
                            </h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {'Musa Abdullahi'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        On the way to you
                                    </p>
                                </div>

                                <a
                                    href={`tel:${'08012345678'}`}
                                    className="flex items-center px-4 py-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white rounded-lg font-medium hover:border-sandbrown transition-all"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                </a>

                            </div>
                        </div>
                       

                        {/* Order Items */}
                        {selectedOrder.items && selectedOrder.items.length > 0 && (
                            <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Order Items
                                </h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item: OrderItemPayload, index: number) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center mr-3 text-2xl">
                                                    🍔
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {item.name }
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                ₦{((item.price|| 0) * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="pt-3 border-t border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                                        <p className="font-bold text-gray-900 dark:text-white">Total</p>
                                        <p className="text-xl font-bold text-sandbrown">
                                            ₦{(selectedOrder.total ||  0).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* No Results */}
                {!selectedOrder && !loading && orderNumber && (
                    <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            No order found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Please check your order number and try again
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center animate-pulse">
                            <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Loading your orders...
                        </h3>
                    </div>
                )}
            </div>
        </div>
    )
}