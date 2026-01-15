import React from 'react'
import { NavigationMenuDemo } from '../components/Navbar'
import FilteredOrder from '../components/FilteredOrder'
import Footer from '../components/Footer'
import OrderCat from '../components/OrderCat'

const Page = () => {
    return (
        <div className='bg:white dark:black'>
            <NavigationMenuDemo />
            <OrderCat />
            <FilteredOrder />
            <Footer />
        </div>
    )
}

export default Page