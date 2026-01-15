import React from 'react'
import { NavigationMenuDemo } from '../components/Navbar'
import CheckoutComponent from '../components/CheckoutComponent'
import { verifyUser } from '@/lib/session'
import { redirect } from 'next/navigation'

const page = async() => {
  const session = await verifyUser()

  if(!session){
    redirect('/sign-in')
  }
  
  return (
    <div>
      <NavigationMenuDemo />

      <h1 className='font-bold text-3xl text-center py-10 '>CHECKOUT</h1>

      <CheckoutComponent userId={session.user.id} />
    </div>
  )
}

export default page