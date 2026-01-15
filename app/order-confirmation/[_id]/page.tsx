
import { NavigationMenuDemo } from '@/app/components/Navbar'
import OrderModel from '@/app/models/order'
import ProductModel from '@/app/models/product'
import { Metadata } from 'next'
import React from 'react'
import { CheckCircle, Package, MapPin, Clock, Phone, Mail, User, CreditCard, Bike, Calendar, Download, Printer, Share2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatNaira } from '@/app/components/NairaIcon'

export const generateMetadata = async ({ params }: { params: Promise<{ _id: string }> }): Promise<Metadata> => {
    const { _id } = await params
    const order = await OrderModel.findById(_id)
    

    return {
        title: `Order Confirmation - Stacked & Loaded Burger | Order #${order.paymentReference}`,
        description: `Your order has been confirmed. Track your order status here.`,
    }
}

const Page = async ({ params }: { params: Promise<{ _id: string }> }) => {
    const { _id } = await params
    const order = await OrderModel.findById(_id)

    // Mock order data structure - adjust based on your actual model
    const orderData = {
        orderNumber: order?.paymentReference || 'ORD-2026-001',
        status: order?.paymentStatus || 'confirmed',
        customerName: order?.customer.name || 'Customer',
        customerEmail: order?.customer.email || ' - ',
        customerPhone: order?.customer.phone || ' - ',
        deliveryAddress: order?.delivery || ' - ',
        note:order.note || ' - ',
        items: order?.items || [
          ''
        ],
        subtotal: order?.subtotal || 30.97,
        deliveryFee: order?.deliveryFee || 3.99,
        total: order?.total || 38.46,
        paymentMethod: order?.paymentMethod || 'Credit Card',
        orderDate: order?.createdAt || new Date().toISOString(),
        estimatedDelivery: order?.estimatedDelivery || '30 minutes',
        rider: order?.rider || 'Assigning rider...'
    }

    return (
        <div className='bg-white dark:bg-black min-h-screen'>
            <NavigationMenuDemo />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Order Confirmed!
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                        Thank you for your order, {orderData.customerName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        Order Number: <span className="font-mono font-bold text-sandbrown">{orderData.orderNumber}</span>
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button className="px-6 py-2 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                    </button>
                    <button className="px-6 py-2 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors flex items-center">
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                    </button>
                    <button className="px-6 py-2 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors flex items-center">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </button>
                </div>

                <div className="bg-linear-to-r from-sandbrown/10 to-[#f4a261]/10 dark:from-sandbrown/5 dark:to-[#f4a261]/5 border border-sandbrown/20 dark:border-sandbrown/10 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-sandbrown" />
                        Order Status
                    </h2>
                    <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-sandbrown/30"></div>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="shrink-0 w-12 h-12 bg-sandbrown rounded-full flex items-center justify-center z-10">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Order Placed</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(orderData.orderDate).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Confirmed */}
                            <div className="flex items-start">
                                <div className="shrink-0 w-12 h-12 bg-sandbrown rounded-full flex items-center justify-center z-10">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Order Confirmed</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Your order has been confirmed</p>
                                </div>
                            </div>

                            {/* Preparing */}
                            <div className="flex items-start">
                                <div className="shrink-0 w-12 h-12 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center z-10">
                                    <Package className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold text-gray-600 dark:text-gray-400">Preparing</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">We'll start preparing soon</p>
                                </div>
                            </div>

                            {/* Out for Delivery */}
                            <div className="flex items-start">
                                <div className="shrink-0 w-12 h-12 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center z-10">
                                    <Bike className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold text-gray-600 dark:text-gray-400">Out for Delivery</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">Estimated: {orderData.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Order Details - 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Items Ordered */}
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <Package className="w-5 h-5 mr-2 text-sandbrown" />
                                Items Ordered
                            </h2>
                            <div className="space-y-4">
                                {orderData.items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-neutral-800 last:border-0 last:pb-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-900 rounded-lg flex items-center justify-center text-3xl">
                                                🍔
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900 dark:text-white">{formatNaira(item.price * item.quantity)}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-500">{formatNaira(item.price)} each</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-800 space-y-3">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{formatNaira(orderData.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Delivery Fee</span>
                                    <span>{formatNaira(orderData.deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Additional Note</span>
                                    <span>({orderData.note})</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-neutral-800">
                                    <span>Total</span>
                                    <span className="text-sandbrown">{formatNaira(orderData.total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-sandbrown" />
                                Delivery Details
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Delivery Address</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{orderData.deliveryAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Estimated Delivery</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{orderData.estimatedDelivery}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Bike className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Delivery Rider</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{orderData.rider}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <User className="w-5 h-5 mr-2 text-sandbrown" />
                                Customer Info
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</h3>
                                    <p className="text-gray-900 dark:text-white font-medium">{orderData.customerName}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                                    <p className="text-gray-900 dark:text-white">{orderData.customerEmail}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</h3>
                                    <p className="text-gray-900 dark:text-white">{orderData.customerPhone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 text-sandbrown" />
                                Payment
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Method</h3>
                                    <p className="text-gray-900 dark:text-white font-medium">{orderData.paymentMethod}</p>
                                </div>
                                <div className="pt-3 border-t border-gray-200 dark:border-neutral-800">
                                    <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Payment Successful
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-gradient-to-br from-sandbrown to-[#f4a261] rounded-2xl p-6 text-white">
                            <h2 className="text-xl font-bold mb-2">Need Help?</h2>
                            <p className="text-white/90 text-sm mb-4">
                                Our support team is here to assist you with your order.
                            </p>
                            <button className="w-full bg-white text-sandbrown py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>

                {/* Continue Shopping CTA */}
                <div className="bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Want to Order More?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Check out our menu and discover more delicious items
                    </p>
                    <Link
                        href="/order-delivery"
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sandbrown to-[#f4a261] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Browse Menu
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Page