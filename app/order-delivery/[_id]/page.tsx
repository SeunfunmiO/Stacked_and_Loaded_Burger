import AllOrder from '@/app/components/AllOrder'
import { formatNaira } from '@/app/components/NairaIcon'
import { NavigationMenuDemo } from '@/app/components/Navbar'
import OrderCat from '@/app/components/OrderCat'
import ProductModel from '@/app/models/product'
import dbConnect from '@/lib/dbconnect'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

type PageProps = {
    params: {
        _id: string
    }
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    await dbConnect()
    const { _id } = params
    const product = await ProductModel.findById(_id)

    return {
        title: `Shop - Stacked & Loaded Burger | ${product.name} `,
        description: product.description,
        openGraph: {
            images: {
                url: product.picture
            }
        }
    }
}

const Page = async ({ params }: PageProps) => {
    await dbConnect()
    const { _id } = params 
    const product = await ProductModel.findById(_id)

    return (
        <div
            className='bg-white dark:bg-black h-screen'
        >
            <NavigationMenuDemo />
            <OrderCat />
            <div
                className='flex items-center md:items-start flex-col md:flex-row justify-evenly bg-white'
            >
                <Image
                    alt={product.name}
                    src={product.picture}
                    width={400}
                    height={400}
                />

                <div className="flex flex-col gap-8 my-5  md:mx-0">
                    <div className='flex flex-col gap-2'>
                        <h1 className="text-3xl lg:text-4xl font-bold capitalize text-black">
                            {product.name}
                        </h1>
                        <p className="font-bold text-sandbrown text-lg">
                            {formatNaira(product.price)}
                        </p>
                    </div>

                    <h3 className='text-black'>{product.description}</h3>

                    <AllOrder _id={_id} />

                    <p
                        className="text-black font-medium"
                    >
                        Category : <span className="font-semibold">{product.categories}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page