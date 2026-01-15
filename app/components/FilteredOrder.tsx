"use client"


import { getAllProducts } from '@/lib/actions'
import { Products } from '@/lib/type'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { formatNaira } from './NairaIcon'
import Link from 'next/link'
import { OrderCategories } from '@/lib/order-sorting'


const FilteredOrder = () => {
    const [products, setProducts] = useState<Products[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [productCat, setProductCat] = useState('')


    useEffect(() => {
        const fetchedProducts = async () => {
            try {
                const res = await getAllProducts()
                const data = res.data

                if (!res.success) {
                    toast.error(res.message)
                } else {
                    toast.success(res.message)
                    setProducts(data)
                    setProductCat(data.categories)
                }
            } catch (error) {
                console.log("Error fetching products : ", error)
            }
        }
        fetchedProducts()
    }, [])

    return (
        <div className="py-12 dark:bg-black/ bg-white">
            <div className='flex justify-between items-center mx-5'>
                <p className='text-black text-sm md:text-base'>
                    Showing all {products.length} results
                </p>
                <h3
                    className="font-semibold text-black md:text-lg border-b-2 border-black dark:/border-white
                    flex items-center gap-3 relative">
                    Default sorting
                    {
                        isOpen ?
                            <ChevronUp onClick={() => setIsOpen(false)} />
                            : <ChevronDown onClick={() => setIsOpen(true)} />
                    }
                    {
                        isOpen && (
                            <div
                                className="border bg-transparent border-neutral-100 h-70 absolute top-10 w-full
                             rounded flex flex-col text-center justify-center gap-2"
                            >
                                {
                                    OrderCategories.map((each) => (
                                        <div key={each.id}>
                                            <button
                                                onClick={() => (productCat)}
                                                className="bg-transparent outline-0 capitalize"
                                            >
                                                {each.category}
                                            </button>
                                            <div className="border-b-neutral-300 border"></div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </h3>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl-gap-0 gap-5 mt-20 '>
                {
                    products.map((product) => (
                        <div key={product._id}>
                            <div className="flex flex-col items-center gap-2 ">
                                <Image
                                    alt={product.name}
                                    src={product.picture}
                                    width={300}
                                    height={300}
                                />
                                <div className="flex gap-2 flex-col">
                                    <h1 className="font-bold text-lg capitalize dark:text-/white text-black">
                                        {product.name}
                                    </h1>
                                    <span className="font-bold text-sandbrown">
                                        {formatNaira(product.price)}
                                    </span>
                                </div>

                                <Link href={`/order-delivery/${product._id}`}
                                    className="bg-sandbrown shadow min-w-11/12 py-3 mt-3 mb-8 rounded font-semibold text-sm
                                    hover:bg-transparent lg:border lg:border-sandbrown hover:text-sandbrown outline-0 text-center"
                                >
                                    Select Options
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilteredOrder