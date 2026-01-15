'use client'

import React, { useEffect, useState } from 'react'
import { formatNaira } from './NairaIcon'
import { getMenuOptions, getProduct } from '@/lib/actions'
import { toast } from 'react-toastify'
import { CartItem, IToppingForm } from '@/lib/type'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Minus, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface Products {
    _id: string,
    picture: string,
    name: string,
    tagline: string,
    price: number,
    categories: [],
    category: string,
    buntypes: string[],
    toppingsName: string,
    toppingsPrice: string,
    description: string,
    available: boolean,
    featured?: boolean
}
const AllOrder = ({ _id }: { _id: string }) => {
    const [product, setProduct] = useState<Products | null>(null)
    const [beverages, setBeverages] = useState<string[]>([])
    const [sides, setSides] = useState<string[]>([])
    const [meatTypes, setMeatTypes] = useState<string[]>([])
    const [toppings, setToppings] = useState<IToppingForm[]>([])
    const [quantity, setQuantity] = useState(1)


    const [selectedOptions, setSelectedOptions] = useState({
        meatType: '',
        side: '',
        beverage: '',
        toppings: [] as IToppingForm[],
    })

    const router = useRouter()

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getProduct({_id})
            if (!res.success) return toast.error(res.message)
            setProduct(res.data)
            console.log(res.data);
        }
        fetchProduct()
    }, [_id])

    useEffect(() => {
        const fetchOptions = async () => {
            const res = await getMenuOptions()
            if (!res.success || !res.data) return toast.error(res.message)

            setBeverages(res.data[0]?.beverages || [])
            setSides(res.data[0]?.sides || [])
            setMeatTypes(res.data[0]?.meatTypes || [])
            setToppings(res.data[0].toppings || [])
        }
        fetchOptions()
    }, [])

    const toggleTopping = (topping: IToppingForm) => {
        setSelectedOptions(prev => {
            const exists = prev.toppings.find(t => t.name === topping.name)
            return {
                ...prev,
                toppings: exists
                    ? prev.toppings.filter(t => t.name !== topping.name)
                    : [...prev.toppings, topping],
            }
        })
    }

    const increment = () => setQuantity(prev => prev + 1)
    const decrement = () => {
        if (quantity > 1) setQuantity(prev => prev - 1)
    }

    const optionPrice = selectedOptions.toppings.reduce(
        (sum, t) => sum + Number(t.price),
        0
    )


    const itemTotal = product ? Number(product.price) + optionPrice : 0

    const subTotal = itemTotal * quantity

    const total = subTotal

    const addToCart = () => {
        if (!product) return

        const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')

        const itemTotal = product ? Number(product.price) + optionPrice : 0

        const subTotal = itemTotal * quantity

        const index = cart.findIndex(
            item =>
                item.productId === product._id &&
                item.options.meatType === selectedOptions.meatType &&
                item.options.side === selectedOptions.side &&
                item.options.beverage === selectedOptions.beverage &&
                item.image === product.picture &&
                JSON.stringify(item.options.toppings) ===
                JSON.stringify(selectedOptions.toppings)
        )

        if (index !== -1) {
            cart[index].quantity += quantity
        } else {
            cart.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.picture,
                quantity,
                options: selectedOptions,
                subtotal:subTotal,
            })
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        toast.success('Added to cart')
    }
    return (
        <div className='flex flex-col gap-8'>
            {
                product?.name === 'Burger Set' && (
                    <div>
                        <h5 className="font-bold text-gray-700 mb-3">Meat</h5>
                        <RadioGroup
                            className="text-neutral-700 grid grid-cols-2"
                            value={selectedOptions.meatType}
                            onValueChange={(value) =>
                                setSelectedOptions(prev => ({ ...prev, meatType: value }))}
                        >
                            {
                                meatTypes.map((type, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <RadioGroupItem value={type} id={type} />
                                        <Label htmlFor={type}>{type}</Label>
                                    </div>
                                ))
                            }
                        </RadioGroup>
                    </div>
                )
            }

            <div>
                <h5 className="font-bold text-gray-700 mb-3">Topping</h5>
                <div className="space-y-3 text-neutral-700 grid grid-cols-1">
                    {toppings.map((topping, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Checkbox
                                className='border border-neutral-700'
                                id={topping.name}
                                checked={selectedOptions.toppings.some(
                                    t => t.name === topping.name
                                )}
                                onCheckedChange={() => toggleTopping(topping)}
                            />
                            <Label htmlFor={topping.name}>
                                {topping.name} (+₦{topping.price})
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {
                product?.name === 'Burger Set' && (
                    <div>
                        <h5 className="font-bold text-gray-700 mb-3">Side</h5>
                        <RadioGroup
                            value={selectedOptions.side}
                            onValueChange={(value) =>
                                setSelectedOptions(prev => ({ ...prev, side: value }))}
                            className="text-neutral-700 grid grid-cols-2 md:grid-cols-3"
                        >
                            {sides.map((type, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <RadioGroupItem value={type} id={type} />
                                    <Label htmlFor={type}>{type}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )
            }

            <div>
                <h5 className="font-bold text-gray-700 mb-3">Beverage</h5>
                <RadioGroup
                    value={selectedOptions.beverage}
                    onValueChange={(value) =>
                        setSelectedOptions(prev => ({ ...prev, beverage: value }))}
                    className="text-neutral-700 grid grid-cols-3 md:grid-cols-5"
                >
                    {beverages.map((type, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <RadioGroupItem value={type} id={type} />
                            <Label htmlFor={type}>{type}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div className='flex flex-col gap-2'>
                <h5 className="font-bold text-gray-700 mb-3">Extra Request</h5>

                <textarea
                    name="request"
                    id="request"
                    className='border border-neutral-300 bg-transparent rounded focus-ring-neutral-400 outline-neutral-400
                 focus:text-black text-black px-3 text-sm h-30'
                >
                </textarea>

                <div className="border border-b-neutral-300 mt-3"></div>
            </div>

            <div className='flex flex-col gap-3 text-black'>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold">Product Total</h3>
                    <span className="text-sandbrown font-bold text-lg">{formatNaira(Number(product?.price))}</span>
                </div>

                <div className="flex justify-between items-center">
                    <h3 className="font-bold">Option Total</h3>
                    <span className="text-sandbrown font-bold text-lg">{formatNaira(optionPrice)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <h3 className="font-bold">Grand Total</h3>
                    <span className="text-sandbrown font-bold text-lg">{formatNaira(total)}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="border border-neutral-700 flex px-3.5 gap-2 items-center text-black">
                    <button
                        className='outline-0 border-0'
                        onClick={decrement}>
                        <Minus size={14} />
                    </button>

                    <span>{quantity}</span>

                    <button
                        className='outline-0 border-0'
                        onClick={increment}>
                        <Plus size={14} />
                    </button>
                </div>

                <Button
                    className='bg-sandbrown  hover:border-sandbrown hover:border hover:bg-transparent rounded py-6
                     hover:text-sandbrown text-white'
                    onClick={() => {
                        addToCart()
                        router.push('/cart')
                    }}
                >
                    Add to Cart ({formatNaira(total)})
                </Button>
            </div>

        </div >

    )
}


export default AllOrder