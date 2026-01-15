import React from 'react'
import { NavigationMenuDemo } from '../components/Navbar'
import { ShoppingCart } from 'lucide-react'
import Footer from '../components/Footer'
import CartItems from '../components/CartItems'

const Page = () => {
    return (
        <div >
            <NavigationMenuDemo />

            <h1 className="font-bold text-3xl flex py-10 gap-3 justify-center text-black bg-white">
                <ShoppingCart size={30} /> CART
            </h1>
            <div className='bg-white h-full flex /items-center flex-col'>

                <CartItems />
            </div >
            <Footer />
        </div >
    )
}

export default Page