import React from 'react'
import RepeatingLines from '../components/Repeating-lines'
import { NavigationMenuDemo } from '../components/Navbar'
import Image from 'next/image'
import { burgerMenus, foodMenus } from '../../lib/MapItems'
import Deliveryorder from '../components/delivery-order'
import Footer from '../components/Footer'



const Page = () => {
  return (
    <div className='bg:white dark:black'>
      <NavigationMenuDemo />

      <div className="mx-5">
        <div className="flex flex-col gap-8 lg:gap-10 mt-10 items-center justify-center">
          <RepeatingLines />
          <h1 className="font-bold text-3xl lg:text-5xl uppercase">Our Menus</h1>
          <RepeatingLines />
        </div></div>

      <p
        className="uppercase font-bold text-xs lg:text-sm mt-10 text-center text-sandbrown lg:mx-auto mx-5"
      >
        Smoked brisket, tender ribs, smoked sausage, bacon & cheddar with lettuce, tomato, house BBQ & ranch.
      </p>


      {
        burgerMenus.map((burgerMenu) => (
          <div key={burgerMenu.id}>
            <div className='flex my-25 flex-col md:flex-row gap-2 justify-evenly lg:mx-auto mx-5 text-center'>
              <Image
                alt={burgerMenu.name}
                src={burgerMenu.image}
                width={300}
                height={300}
              />

              <div className="flex flex-col gap-5">
                <h1 className="font-bold text-3xl lg:text-4xl uppercase">
                  {burgerMenu.name}
                </h1>
                <p className="font-medium lg:text-xl text-neutral-600">
                  {burgerMenu.tagline}
                </p>
              </div>

              <p className="text-sandbrown text-xl">₦{(burgerMenu.price).toString()}</p>
            </div>
          </div>
        ))
      }

      <div className="flex items-center gap-4 justify-center mx-5 lg:mx-14">
        <div className="flex-1 h-px bg-sandbrown"></div>
        <span className="text-sandbrown font-bold text-lg lg:text-2xl">
          ORIGINAL BURGERS
        </span>
        <div className="flex-1 h-px bg-sandbrown"></div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-18 uppercase items-center lg:mx-auto mx-5 text-center">

        {/* FIRST HALF */}
        {foodMenus.slice(0, 6).map((foodMenu) => (
          <div key={foodMenu.id} className="relative group cursor-pointer">

            <div className="flex flex-col lg:flex-row justify-evenly">
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-lg">{foodMenu.name}</h1>
                <p className="font-medium text-neutral-600">
                  {foodMenu.ingredient}
                </p>
              </div>
              <p className="text-sandbrown text-xl">
                ₦{(foodMenu.price).toString()}
              </p>
            </div>

            {/* HOVER POPUP */}
            <div className="
              absolute right-full top-1/2 -translate-y-1/2 ml-4
               opacity-0 scale-95 
               group-hover:opacity-100 group-hover:scale-100
               pointer-events-none
               bg-white dark:bg-neutral-900 
               p-4 rounded-lg  w-64 z-50 text-left normal-case
                transition-all duration-300 ease-out overflow-hidden
                ">
              <h4 className="font-semibold mb-2">MENU INFORMATION</h4>

              <ul className="space-y-1 text-sm">
                <li><span className="font-bold">Calories:</span> 480</li>
                <li><span className="font-bold">Total Fat:</span> 20g</li>
                <li><span className="font-bold">Cholesterol:</span> 60mg</li>
                <li><span className="font-bold">Sodium:</span> 220mg</li>
                <li><span className="font-bold">Carbs:</span> 71g</li>
                <li><span className="font-bold">Protein:</span> 5g</li>
              </ul>

              <p className="text-xs text-neutral-500 mt-2">
                * Values may vary based on serving size.
              </p>
            </div>

          </div>
        ))}

        {/* SECOND HALF */}
        {foodMenus.slice(6,12).map((foodMenu) => (
          <div key={foodMenu.id} className="relative group cursor-pointer">

            <div className="flex flex-col lg:flex-row justify-evenly">
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-lg">{foodMenu.name}</h1>
                <p className="font-medium text-neutral-600">
                  {foodMenu.ingredient}
                </p>
              </div>
              <p className="text-sandbrown text-xl">
                ₦{(foodMenu.price).toString()}
              </p>
            </div>

            {/* HOVER POPUP */}
            <div className="
              absolute right-full top-1/2 -translate-y-1/2 ml-4
              opacity-0 scale-95 
              group-hover:opacity-100 group-hover:scale-100
              pointer-events-none
             bg-white dark:bg-neutral-900 
              p-4 rounded-lg w-64 z-50 text-left normal-case
              transition-all duration-300 ease-out overflow-hidden
            ">
              <h4 className="font-semibold mb-2">MENU INFORMATION</h4>

              <ul className="space-y-1 text-sm">
                <li><span className="font-bold">Calories:</span> 480</li>
                <li><span className="font-bold">Total Fat:</span> 20g</li>
                <li><span className="font-bold">Cholesterol:</span> 60mg</li>
                <li><span className="font-bold">Sodium:</span> 220mg</li>
                <li><span className="font-bold">Carbs:</span> 71g</li>
                <li><span className="font-bold">Protein:</span> 5g</li>
              </ul>

              <p className="text-xs text-neutral-500 mt-2">
                * Values may vary based on serving size.
              </p>
            </div>

          </div>
        ))}

      </div>
      <Deliveryorder />
      <Footer />
    </div>
  )
}

export default Page