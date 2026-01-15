import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Deliveryorder = () => {
    return (
        <div className='bg-white dark:bg-black pb-10'>

            <div className="flex items-center gap-4 justify-center mx-8 lg:mx-14">
                <div className="flex-1 h-px bg-sandbrown"></div>
                <span className="text-sandbrown font-bold text-lg lg:text-2xl">
                    HAVE IT YOUR WAY
                </span>
                <div className="flex-1 h-px bg-sandbrown"></div>
            </div>

            <div className="mt-10 flex flex-col lg:flex-row mx-auto xl:mx-14">
                <Image
                    alt='Burger'
                    src={'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/delicious-burger-P8VTY5Y-683x1024.jpg'}
                    className='w-[500] md:w-full lg:w-[400]'
                    width={400}
                    height={600}
                />

                <div className="bg-neutral-500 max-w-full h-[500px] lg:h-[600px] flex flex-col justify-center
                     text-neutral-200 gap-3 px-10">
                    <div>
                        <h1 className="font-extrabold text-3xl">OUR</h1>
                        <div className='border-t-4 border-neutral-200 w-18 '></div>
                    </div>
                    <h1 className="font-extrabold text-4xl">MENUS</h1>

                    <p className="font-bold leading-8 lg:leading-10">Flavor doesn’t happen by accident.
                        <span>{' '}</span>
                        <span className="font-medium">
                            We build it.
                            Our menu is packed with creative combinations, premium patties, toasted buns, and toppings
                            stacked to perfection. Check out the full lineup and choose your flavor adventure.
                        </span>
                    </p>

                   <Link href={'/menu'}>
                        <button className="font-bold text-white bg-sandbrown rounded-lg w-3/5 md:w-1/2 py-3 mt-10 outline-0
                        cursor-pointer">
                            VIEW MENUS
                        </button>
                   </Link>
                </div>


                <div className="bg-slate-200 max-w-full text-gray-900 h-[500px] lg:h-[600px] flex flex-col justify-center
                    px-10 gap-3">
                    <div>
                        <h1 className="font-extrabold text-3xl">ORDER</h1>
                        <div className='border-t-4 border-gray-900 w-26'></div>
                    </div>
                    <h1 className="font-extrabold text-4xl">DELIVERY</h1>

                    <p className="font-bold leading-8 lg:leading-10">Hungry already?
                        <span>{' '}</span>
                        <span className="font-medium">
                            Let us bring the goodness to you.
                            Order online and get your favorite Stacked & Loaded meals delivered hot, fresh, and right on time. Whether you’re at home, work, or on the move, we’ve got you covered.
                        </span>
                    </p>

                    <Link href={'/order-delivery'}>
                        <button className="font-bold text-white bg-gray-950 rounded-lg w-3/5 md:w-1/2 py-3 mt-10 outline-0
                        cursor-pointer">
                            ORDER ONLINE
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Deliveryorder