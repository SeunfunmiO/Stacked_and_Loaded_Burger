import Image from 'next/image'
import React from 'react'

const Featuredsection = () => {
    return (
        <div className="bg-white h-full dark:bg-black py-10">
            <div
                className='flex justify-center items-center max-mx-auto mx-14 flex-col gap-15 '
            >
                <div className="grid md:grid-cols-3 justify-center gap-10">
                    <h3
                        className="font-bold lg:text-xl text-center py-3 hidden md:block
                        text-gray-500 uppercase border-t-2 border-b-2 border-gray-500">
                        Don't need a silver fork to eat a good burger
                    </h3>

                    <h3
                        className="font-bold items-center text-2xl justify-center lg:text-3xl text-center py-3 
                        text-[#dc9457] uppercase border-t-2 border-b-2 border-[#dc9457]">
                        Our Burgers
                    </h3>

                    <h3
                        className="font-bold lg:text-xl text-center py-3  hidden md:block
                        text-gray-500 uppercase border-t-2 border-b-2 border-gray-500">
                        Because we never play with someone’s health
                    </h3>
                </div>

                <div
                    className='grid md:grid-cols-3 justify-center gap-12'
                >
                    <Image
                        alt='Fish Burger'
                        src={'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/fish-burger.png'}
                        width={300}
                        height={200}
                    />

                    <Image
                        alt='Beef Burger'
                        src={'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/beef-burger.png'}
                        width={300}
                        height={200}
                    />

                    <Image
                        alt='Veggie Burger'
                        src={'https://grandrestaurantv6.b-cdn.net/grandrestaurantv6/demo9/wp-content/uploads/sites/9/2021/01/veggie-burger.png'}
                        width={300}
                        height={200}
                    />
                </div>

                <div className='grid md:grid-cols-3 justify-center gap-12'>
                    <div className='flex items-center flex-col gap-5'>
                        <h1 className="text-3xl lg:text-4xl font-bold uppercase text-center">
                            fish burger
                        </h1>

                        <p className="text-gray-500 font-medium text-center uppercase">
                            Life is like a burger the more you add to it, the better it becomes
                        </p>
                    </div>

                    <div className='flex items-center flex-col gap-5'>
                        <h1 className="text-3xl lg:text-4xl font-bold uppercase text-center">
                            beef burger
                        </h1>

                        <p className="text-gray-500 font-medium text-center uppercase">
                            Burger for the body is not enough there must be a burger for the soul
                        </p>
                    </div>

                    <div className='flex items-center flex-col gap-5'>
                        <h1 className="text-3xl lg:text-4xl font-bold uppercase text-center">
                            Veggie burger
                        </h1>

                        <p className="text-gray-500 font-medium text-center uppercase">
                            Roses are red, violets are blue. The burger costs less than dinner for two
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featuredsection