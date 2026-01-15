'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { CheckCircle, LucidePackageOpen, X, ShoppingCart, Trash2, Plus, Minus, Tag } from 'lucide-react'
import { CartItem } from '@/lib/type'
import { useRouter } from 'next/navigation'
import { formatNaira } from './NairaIcon'
import Image from 'next/image'

const CartItems = () => {
    const [cart, setCart] = useState<CartItem[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCart = () => {
            const storedCartItems = localStorage.getItem('cart')
            if (storedCartItems) {
                setCart(JSON.parse(storedCartItems))
            }
        }
        fetchCart()
    }, [])

    const grandTotal = cart.reduce(
        (sum, item) => sum + item.subtotal,
        0
    )

    const handleRemoveFromCart = () => {
        localStorage.removeItem('cart')
        setCart([])
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                        <ShoppingCart className="w-8 h-8 mr-3 text-[#dc9457]" />
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {/* Empty Cart State */}
                {cart.length === 0 && (
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                                <LucidePackageOpen className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Looks like you haven't added any delicious burgers yet!
                            </p>
                            <Button
                                onClick={() => router.push('/order-delivery')}
                                className="bg-gradient-to-r from-[#dc9457] to-[#f4a261] hover:opacity-90 text-white rounded-lg px-8 py-6 font-semibold text-lg transition-all"
                            >
                                Start Shopping
                            </Button>
                        </div>
                    </div>
                )}

                {/* Cart with Items */}
                {cart.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items - Left Side (2 columns on large screens) */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-4 sm:p-6 hover:border-gray-300 dark:hover:border-neutral-700 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0">
                                            <div className="w-full sm:w-32 h-32 bg-gray-100 dark:bg-neutral-800 rounded-xl overflow-hidden relative">
                                                <Image
                                                    alt={item.name}
                                                    src={item.image}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1 min-w-0 pr-4">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                                        {item.name}
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {item.options.meatType && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                <span className="font-medium">Meat:</span> {item.options.meatType}
                                                            </p>
                                                        )}
                                                        {item.options.side && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                <span className="font-medium">Side:</span> {item.options.side}
                                                            </p>
                                                        )}
                                                        {item.options.beverage && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                <span className="font-medium">Beverage:</span> {item.options.beverage}
                                                            </p>
                                                        )}
                                                        {item.options.toppings.length > 0 && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                <span className="font-medium">Toppings:</span>{' '}
                                                                {item.options.toppings.map(t => t.name).join(', ')}
                                                                {' '}({formatNaira(Number(item.options.toppings.reduce((sum, t) => sum + t.price, 0)))})
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={handleRemoveFromCart}
                                                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    title="Remove from cart"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            {/* Price and Quantity */}
                                            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        Price: <span className="font-semibold text-gray-900 dark:text-white">{formatNaira(item.price)}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        Qty: <span className="font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="text-xl font-bold text-[#dc9457]">
                                                    {formatNaira(item.subtotal)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Coupon Section - Mobile/Desktop */}
                            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <Tag className="w-5 h-5 mr-2 text-[#dc9457]" />
                                    Have a coupon code?
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        className="flex-1 px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#dc9457] transition-colors"
                                        placeholder="Enter coupon code"
                                    />
                                    <Button className="bg-[#dc9457] hover:bg-[#c58346] text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
                                        Apply Coupon
                                    </Button>
                                </div>
                            </div>

                            {/* Update Cart Button - Mobile Only */}
                            <div className="lg:hidden">
                                <Button
                                    onClick={() => router.push('/order-delivery')}
                                    className="w-full bg-white dark:bg-neutral-900 border-2 border-[#dc9457] text-[#dc9457] hover:bg-[#dc9457] hover:text-white font-semibold py-4 rounded-lg transition-all"
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary - Right Side (1 column on large screens) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 sticky top-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {formatNaira(grandTotal)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Delivery Fee</span>
                                        <span className="font-semibold text-green-600 dark:text-green-400">
                                            Free
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Discount</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {formatNaira(0)}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-neutral-800 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            Total
                                        </span>
                                        <span className="text-2xl font-bold text-[#dc9457]">
                                            {formatNaira(grandTotal)}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => router.push('/checkout')}
                                    className="w-full bg-gradient-to-r from-[#dc9457] to-[#f4a261] hover:opacity-90 text-white font-semibold py-4 rounded-lg text-lg transition-all mb-3"
                                >
                                    Proceed to Checkout
                                </Button>

                                <Button
                                    onClick={() => router.push('/order-delivery')}
                                    className="w-full bg-transparent border-2 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 hover:border-[#dc9457] hover:text-[#dc9457] dark:hover:border-[#dc9457] dark:hover:text-[#dc9457] font-semibold py-4 rounded-lg transition-all hidden lg:block"
                                >
                                    Continue Shopping
                                </Button>

                                {/* Security Badge */}
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-800">
                                    <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                        Secure Checkout
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartItems