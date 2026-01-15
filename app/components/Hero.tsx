import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div
            className='bg-[url(/backgroundImg.jpg)] flex justify-center items-center bg-cover h-full 
            flex-col bg-[#a81e2f] bg-blend-multiply relative overflow-hidden'
        >
            <div className="flex flex-col gap-3 z-10 translate-y-2 transition-transform">
                <h1 className="font-extrabold text-4xl text-white text-center lg:text-7xl">BIG BURGERS</h1>
                <h1 className="font-extrabold text-4xl text-white text-center lg:text-7xl">BIG FLAVORS</h1>
            </div>

            <div className='relative'>
                <Image
                    alt='Cheese burger'
                    src={'/Cheeseburger.png'}
                    className='lg:size-[400px]'
                    width={300}
                    height={300}
                />
                <Image
                    alt='Ketchup'
                    src={'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/source.png'}
                    className='absolute bottom-0 right-0'
                    width={200}
                    height={200}
                />
            </div>

            <Image
                alt='Tomatoes'
                src={'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/tomatos.png'}
                className='absolute -left-43 lg:-left-10 '
                width={200}
                height={200}
            />

            <Image
                alt='Onions'
                src={'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/onions.png'}
                className='absolute -right-38 lg:-right-30 '
                width={200}
                height={200}
            />

            <div className='px-8 lg:px-0 text-white'>
                <h3 className="font-bold text-xl lg:text-2xl">
                    THE BEEF BURGER
                </h3>
                <p className="font-semibold lg:text-lg uppercase">
                    Smoked brisket, tender ribs, smoked sausage, bacon & cheddar with lettuce, tomato, house BBQ & ranch.
                </p>
            </div>
        </div>
    )
}

export default Hero