'use client'


import { OrderCategories } from '@/lib/order-sorting'
import Image from 'next/image'
import React from 'react'

const OrderCat = () => {
  return (
    <div className='bg-neutral-100 dark:bg-neutral-900 md:h-50 flex items-center justify-evenly'>
         {
                            OrderCategories.map((order) => (
                                <div key={order.id}>
                                    <div className="flex-col items-center hidden md:block">
                                        <Image
                                            alt={order.category || "Burger"}
                                            src={order.image}
                                            className='md:w-[50]'
                                            width={80}
                                            height={80}
                                        />
                                        <h1 className="font-bold xl:text-lg uppercase">{order.category}</h1>
                                    </div>
                                </div>
                            ))
                        }
    </div>
  )
}

export default OrderCat