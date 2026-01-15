'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { Asterisk } from 'lucide-react'

import { Button } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { formatNaira } from './NairaIcon'

import { CartItem, PlaceOrderPayload } from '@/lib/type'
import { createOrder, getCustomer } from '@/lib/actions'

declare global {
    interface Window {
        PaystackPop: {
            setup(options: {
                key: string
                email: string
                amount: number
                currency: string
                ref: string
                callback: (response: { reference: string }) => void
                onClose: () => void
            }): {
                openIframe: () => void
            }
        }
    }
}

interface CheckoutFormValues {
    fullname: string
    email: string
    address: string
    phone: string
    note: string
}

const CheckoutComponent = ({userId}:{userId:string}) => {
    const router = useRouter()

    const [cart, setCart] = useState<CartItem[]>([])
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('card')
    const [loading, setLoading] = useState(false)
   
    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) setCart(JSON.parse(storedCart))
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getCustomer()

                if (!res.success) {
                    return toast.error(res.message)
                }
             
            } catch (error) {
                console.error('Cannot get user', error)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://js.paystack.co/v1/inline.js'
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0)
    const deliveryFee = 1000
    const grandTotal = subtotal + deliveryFee

    const formik = useFormik<CheckoutFormValues>({
        initialValues: {
            fullname: '',
            email: '',
            address: '',
            phone: '',
            note: ''
        },
        validationSchema: yup.object({
            fullname: yup.string().required('Full name is required'),
            email: yup.string().email('Invalid email').required('Email is required'),
            address: yup.string().required('Address is required'),
            phone: yup.string().required('Phone number is required'),
            note: yup.string().notRequired()
        }),
        onSubmit: async () => {
            if (paymentMethod === 'cash') {
                await createCashOrder()
            } else {
                await payWithPaystack()
            }
        }
    })

    const createCashOrder = async () => {
        try {
            setLoading(true)

            const payload: PlaceOrderPayload = {
                userId,
                delivery: formik.values.address,
                note: formik.values.note || '',
                deliveryFee,
                items: cart.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    meatType: item.options.meatType,
                    side: item.options.side,
                    beverage: item.options.beverage,
                    itemTotal: item.subtotal,
                    toppings: item.options.toppings.map(t => ({
                        name: t.name,
                        price: t.price
                    }))
                }))
            }

            const res = await createOrder({
                ...payload,
                paymentMethod: 'cash',
                paymentStatus: 'pending',
                customer: {
                    name: formik.values.fullname,
                    email: formik.values.email,
                    phone: formik.values.phone
                },
            })

            if (!res.success) {
                toast.error(res.message)
                return
            }

            localStorage.removeItem('cart')
            toast.success('Order placed successfully')
            router.push(`/order-confirmation/${res.orderId}`)
        } catch {
            toast.error('Failed to place order')
        } finally {
            setLoading(false)
        }
    }

    const payWithPaystack = async () => {
        if (!window.PaystackPop) {
            toast.error('Paystack not loaded')
            return
        }

        const reference = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000000)}`

        const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
            email: formik.values.email,
            amount: grandTotal * 100,
            currency: 'NGN',
            ref: reference,
            callback: function (response: { reference: string }) {
                finalizePaidOrder(response.reference)
            },
            onClose: () => {
                toast.info('Payment cancelled')
            }
        })

        handler.openIframe()
    }

    const finalizePaidOrder = async (reference: string) => {
        try {
            setLoading(true)

            const payload: PlaceOrderPayload = {
                userId,
                delivery: formik.values.address,
                note: formik.values.note || '',
                deliveryFee,
                items: cart.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    meatType: item.options.meatType,
                    side: item.options.side,
                    beverage: item.options.beverage,
                    itemTotal: item.subtotal,
                    toppings: item.options.toppings.map(t => ({
                        name: t.name,
                        price: t.price
                    }))
                }))
            }

            const res = await createOrder({
                ...payload,
                paymentMethod,
                paymentReference: reference,
                paymentStatus: 'paid',
                customer: {
                    name: formik.values.fullname,
                    email: formik.values.email,
                    phone: formik.values.phone
                },
            })

            if (!res.success) {
                toast.error(res.message)
                return
            }

            localStorage.removeItem('cart')
            toast.success('Payment successful')
            router.push(`/order-confirmation/${res.orderId}`)
        } catch {
            toast.error('Could not finalize order')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="mx-6 md:mx-14">
            <form onSubmit={formik.handleSubmit} className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1">
                    <h1 className="font-bold my-6 text-lg">Billing details</h1>

                    <div className="mb-4">
                        <label className="flex font-medium">Full Name <Asterisk size={12} color="red" /></label>
                        <input
                            name="fullname"
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            className="border rounded p-3 w-full"
                        />
                        {formik.touched.fullname && formik.errors.fullname && (
                            <small className="text-red-600">{formik.errors.fullname}</small>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="flex font-medium">Email <Asterisk size={12} color="red" /></label>
                        <input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="border rounded p-3 w-full"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <small className="text-red-600">{formik.errors.email}</small>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="flex font-medium">Phone <Asterisk size={12} color="red" /></label>
                        <input
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            className="border rounded p-3 w-full"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <small className="text-red-600">{formik.errors.phone}</small>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="flex font-medium">Address <Asterisk size={12} color="red" /></label>
                        <textarea
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            className="border rounded p-3 w-full"
                        />
                        {formik.touched.address && formik.errors.address && (
                            <small className="text-red-600">{formik.errors.address}</small>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="flex font-medium">Note (optional)</label>
                        <textarea
                            name="note"
                            value={formik.values.note}
                            onChange={formik.handleChange}
                            className="border rounded p-3 w-full"
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="border rounded p-5 mb-6">
                        <p>Subtotal: {formatNaira(subtotal)}</p>
                        <p>Delivery: {formatNaira(deliveryFee)}</p>
                        <p className="font-bold">Total: {formatNaira(grandTotal)}</p>
                    </div>

                    <RadioGroup
                        value={paymentMethod}
                        onValueChange={(value: 'card' | 'transfer' | 'cash') => setPaymentMethod(value)}
                        className="flex flex-col gap-3 mb-6"
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="card" id="card" />
                            <label htmlFor="card">Card</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="transfer" id="transfer" />
                            <label htmlFor="transfer">Bank Transfer</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="cash" id="cash" />
                            <label htmlFor="cash">Cash on Delivery</label>
                        </div>
                    </RadioGroup>


                    <Button disabled={loading} type="submit" className="w-full py-6 mb-6
                    text-white hover:bg-transparent hover:border hover:border-sandbrown hover:text-sandbrown bg-sandbrown">
                        {loading ? 'Processing...' : 'Pay & Place Order'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutComponent
