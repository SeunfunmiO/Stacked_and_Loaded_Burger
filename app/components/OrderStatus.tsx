// ============================================
// CLIENT COMPONENT
// ============================================

'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { updateOrderStatus } from '@/lib/actions'
import { IOrder } from '@/lib/type'

// Order status type for type safety
type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled'

export function OrderStatusButtons({ order }: { order: IOrder }) {
    const [isUpdating, setIsUpdating] = useState(false)
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status)

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        // Prevent multiple simultaneous updates
        if (isUpdating) return

        // Validate status change
        if (currentStatus === 'delivered' || currentStatus === 'cancelled') {
            toast.error('Cannot update a completed or cancelled order')
            return
        }

        setIsUpdating(true)

        try {
            const res = await updateOrderStatus(orderId, newStatus)

            if (!res?.success) {
                toast.error(res?.message || 'Failed to update order')
                return
            }

            // Update local state
            setCurrentStatus(newStatus)

            // Show success message
            toast.success(`Order status updated to ${newStatus.replace(/-/g, ' ')}`)
        } catch (error) {
            console.error('Error updating order status:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsUpdating(false)
        }
    }

    // Define available status options based on current status
    const getAvailableStatuses = (): OrderStatus[] => {
        switch (currentStatus) {
            case 'pending':
                return ['confirmed', 'cancelled']
            case 'confirmed':
                return ['preparing', 'cancelled']
            case 'preparing':
                return ['out-for-delivery', 'cancelled']
            case 'out-for-delivery':
                return ['delivered', 'cancelled']
            case 'delivered':
            case 'cancelled':
                return []
            default:
                return []
        }
    }

    const availableStatuses = getAvailableStatuses()

    // Get status button color
    const getStatusColor = (status: OrderStatus): string => {
        switch (status) {
            case 'confirmed':
                return 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30'
            case 'preparing':
                return 'bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30'
            case 'out-for-delivery':
                return 'bg-orange-500/20 border-orange-500/30 text-orange-400 hover:bg-orange-500/30'
            case 'delivered':
                return 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'
            case 'cancelled':
                return 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
            default:
                return 'bg-gray-500/20 border-gray-500/30 text-gray-400 hover:bg-gray-500/30'
        }
    }

    // If order is completed, show message
    if (currentStatus === 'delivered' || currentStatus === 'cancelled') {
        return (
            <div className="px-4 py-2 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                Order {currentStatus === 'delivered' ? 'completed' : 'cancelled'}
            </div>
        )
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {availableStatuses.length > 0 ? (
                availableStatuses.map((statusOption) => (
                    <button
                        key={statusOption}
                        onClick={() => handleStatusChange(order._id, statusOption)}
                        disabled={isUpdating}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${getStatusColor(statusOption)}`}
                    >
                        {isUpdating ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </span>
                        ) : (
                            <span className="capitalize">{statusOption.replace(/-/g, ' ')}</span>
                        )}
                    </button>
                ))
            ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    No actions available
                </div>
            )}
        </div>
    )
}

// ============================================
// ALTERNATIVE: Simple Version (Your Original Code - Fixed)
// ============================================

export function SimpleOrderStatusButtons({ order, setActiveOrders }: {
    order: IOrder
    setActiveOrders: React.Dispatch<React.SetStateAction<IOrder[]>>
}) {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        if (isUpdating) return

        setIsUpdating(true)

        try {
            const res = await updateOrderStatus(orderId, newStatus)

            if (!res?.success) {
                toast.error(res?.message || 'Failed to update order')
                return
            }

            setActiveOrders((prev) =>
                prev.map((o) =>
                    o._id === orderId ? { ...o, status: newStatus } : o
                )
            )

            toast.success('Order status updated!')
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {['confirmed', 'preparing', 'out-for-delivery', 'delivered'].map((statusOption) => (
                <button
                    key={statusOption}
                    onClick={() => handleStatusChange(order._id, statusOption as OrderStatus)}
                    disabled={['delivered', 'cancelled'].includes(order.status) || isUpdating}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {statusOption.replace(/-/g, ' ')}
                </button>
            ))}
        </div>
    )
}

// ============================================
// SERVER ACTION (lib/actions.ts)
// ============================================

'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/models/order'

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled'

export const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus
) => {
    try {
        // Validate inputs
        if (!orderId || !status) {
            return {
                success: false,
                message: 'Order ID and status are required'
            }
        }

        // Validate status
        const validStatuses: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled']
        if (!validStatuses.includes(status)) {
            return {
                success: false,
                message: 'Invalid status provided'
            }
        }

        await dbConnect()

        // Find the current order first to validate status change
        const currentOrder = await OrderModel.findById(orderId)

        if (!currentOrder) {
            return {
                success: false,
                message: 'Order not found'
            }
        }

        // Prevent updating delivered or cancelled orders
        if (currentOrder.status === 'delivered' || currentOrder.status === 'cancelled') {
            return {
                success: false,
                message: 'Cannot update a completed or cancelled order'
            }
        }

        // Update the order
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            {
                status,
                updatedAt: new Date() // Track when status was updated
            },
            { new: true }
        )

        if (!updatedOrder) {
            return {
                success: false,
                message: 'Failed to update order'
            }
        }

        // Revalidate all relevant paths
        revalidatePath('/staff/staff-dashboard')
        revalidatePath('/user/user-dashboard')
        revalidatePath('/user/track-orders')
        revalidatePath(`/order/${orderId}`)

        return {
            success: true,
            message: `Order status updated to ${status.replace(/-/g, ' ')}`,
            data: JSON.parse(JSON.stringify(updatedOrder)) // Serialize for Next.js
        }
    } catch (error) {
        console.error('Error updating order status:', error)
        return {
            success: false,
            message: 'Failed to update order. Please try again.'
        }
    }
}

