'use client'


import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { CheckCircle, LucidePackageOpen, X } from 'lucide-react'
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
    }

    return (
        <div>
            {
                cart.length === 0 && (
                    <div className='text-[13px] md:text-lg flex flex-col gap-6 mx-6 my-10'>
                       
                        <div className="bg-slate-400 text-white flex gap-2 py-4 items-center rounded px-3">
                            <LucidePackageOpen size={18} />
                            <h2 className="font-semibold">
                                Your cart is currently empty
                            </h2>
                        </div>

                        <Button
                            onClick={() => router.push('/order-delivery')}
                            className='bg-sandbrown rounded hover:bg-transparent hover:border hover:border-sandbrown
                            hover:text-sandbrown text-white mb-5 md:text-base w-50 '
                        >
                            Return to shop
                        </Button>
                    </div>

                )
            }

            {
                cart.length > 0 && (
                    <>
                        <table className="border border-neutral-200 h-50 py-5 px-4 w-11/12 border-collapse text-center">
                            <thead>
                                <tr className="font-semibold text-black text-lg border-b-2 border-neutral-200">
                                    <th className="py-5"></th>
                                    <th className="py-5">Image</th>
                                    <th className="py-5">Product</th>
                                    <th className="py-5">Price</th>
                                    <th className="py-5">Quantity</th>
                                    <th className="py-5">Subtotal</th>
                                </tr>
                            </thead>


                            <tbody>
                                <div className="border-b border-neutral-200 text-black">
                                    {
                                        cart.map((item, index) => (
                                            <tr key={index} >
                                                <td
                                                 className="py-4 text-gray-400 hover:text-red-500"
                                                >
                                                    <X
                                                    onClick={handleRemoveFromCart} 
                                                    /> 
                                                    </td>
                                                <td className="py-4">
                                                    <Image
                                                        alt={item.name}
                                                        src={item.image}
                                                        width={60}
                                                        height={60}
                                                    />
                                                </td>
                                                <div className="flex flex-col">
                                                    <td className="py-4">{item.name}</td>
                                                    <small
                                                        className='font-semibold'
                                                    >
                                                        Meat : {item.options.meatType || ' - '}
                                                    </small>
                                                    <small
                                                        className='font-semibold'
                                                    >
                                                        Side : {item.options.side || ' - '}
                                                    </small>
                                                    <small
                                                        className='font-semibold'
                                                    >
                                                        Beverage : {item.options.beverage || ' - '}
                                                    </small>
                                                    {
                                                        item.options.toppings.length > 0 && (
                                                            <small
                                                                className='font-semibold'
                                                            >
                                                                Topping : {' '}
                                                                {item.options.toppings.map(t => t.name).join(', ')}
                                                                ({formatNaira(Number(item.options.toppings.map(t => t.price)))})
                                                            </small>
                                                        )
                                                    }
                                                </div>
                                                <td className="py-4">{formatNaira(item.price)}</td>
                                                <td className="py-4">{item.quantity}</td>
                                                <td className="py-4">{formatNaira(item.subtotal)}</td>
                                            </tr>
                                        ))
                                    }
                                </div>
                            </tbody>
                        </table>
                        <div className='border border-b-neutral-200 border-l-neutral-200 border-r-neutral-200 w-11/12
                             h-30 md:h-20 flex gap-3 md:gap-0 md:flex-row flex-col md:justify-between items-center p-5'>
                            <div className='flex gap-3 '>
                                <input
                                    type="text"
                                    className='border border-neutral-200 px-2 text-black placeholder:text-sm placeholder:text-neutral-400'
                                    placeholder='Coupon Code'
                                />
                                <Button
                                    className='bg-sandbrown hover:bg-transparent hover:text-sandbrown font-bold text-white py-5
                            hover:border hover:border-sandbrown'>
                                    Apply Coupon
                                </Button>

                            </div>
                            <Button
                            onClick={()=>router.push('/order-delivery')}
                                className='hover:bg-sandbrown bg-transparent text-sandbrown font-bold hover:text-white py-5
                            border border-sandbrown'>
                                Update Cart
                            </Button>
                        </div>


                        <div className='border border-b-neutral-200 border-l-neutral-200 border-r-neutral-200 w-11/12
                    h-30 flex flex-col gap-3 p-5'>
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-black">Total</h3>
                                <strong className="text-sandbrown">{formatNaira(grandTotal)}</strong>
                            </div>
                        </div>

                        <Button
                            onClick={() => router.push('/checkout')}
                            className='bg-sandbrown hover:bg-transparent hover:text-sandbrown font-bold text-white py-6
                            hover:border hover:border-sandbrown w-11/23 my-8 text-base'>
                            Proceed to Checkout
                        </Button>
                    </>
                )
            }
        </div>
    )
}

export default CartItems