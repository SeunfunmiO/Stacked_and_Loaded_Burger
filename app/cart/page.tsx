import React from 'react'
import { NavigationMenuDemo } from '../components/Navbar'
import { ShoppingCart } from 'lucide-react'
import Footer from '../components/Footer'
import CartItems from '../components/CartItems'

const Page = () => {
    return (
        <div >
            <NavigationMenuDemo />
            <div className='bg-white h-full flex /items-center flex-col'>

                <CartItems />
            </div >
            <Footer />
        </div >
    )
}

export default Page