'use client'

import { addOptions } from '@/lib/actions'
import { IOptionsForm } from '@/lib/type'
import { Plus } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

const AddMenuOptions = () => {
    const [formData, setFormData] = useState<IOptionsForm>({
        meatTypes: '',
        sides: '',
        beverages: '',
        categories: '',
        toppings: [{ name: '', price: 0 }],
    })

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const addTopping = () => {
        setFormData(prev => ({
            ...prev,
            toppings: [...prev.toppings, { name: '', price: 0 }],
        }))
    }

    const removeTopping = (index: number) => {
        setFormData(prev => ({
            ...prev,
            toppings: prev.toppings.filter((_, i) => i !== index),
        }))
    }

    const handleToppingChange = (
        index: number,
        field: 'name' | 'price',
        value: string
    ) => {
        const updatedToppings = [...formData.toppings]

        updatedToppings[index] = {
            ...updatedToppings[index],
            [field]: field === 'price' ? Number(value) : value,
        }

        setFormData(prev => ({
            ...prev,
            toppings: updatedToppings,
        }))
    }

    const handleAddOptions = async () => {
        const payload = {
            meatTypes: formData.meatTypes.split(',').map(i => i.trim()),
            sides: formData.sides.split(',').map(i => i.trim()),
            beverages: formData.beverages.split(',').map(i => i.trim()),
            categories: formData.categories.split(',').map(i => i.trim()),
            toppings: formData.toppings.filter(
                t => t.name.trim() && t.price > 0
            ),
        }

        const res = await addOptions(payload)

        if (!res.success) toast.error(res.message)
        else toast.success(res.message)
    }

    return (
        <div>
            <div className="p-4 space-y-4">
                <input
                    className="w-full border p-2"
                    placeholder="Meat Types (beef, chicken)"
                    name="meatTypes"
                    value={formData.meatTypes}
                    onChange={handleInput}
                />

                <input
                    className="w-full border p-2"
                    placeholder="Sides (fries, salad)"
                    name="sides"
                    value={formData.sides}
                    onChange={handleInput}
                />

                <input
                    className="w-full border p-2"
                    placeholder="Beverages (coke, fanta)"
                    name="beverages"
                    value={formData.beverages}
                    onChange={handleInput}
                />

                <input
                    className="w-full border p-2"
                    placeholder="Categories (burger, combo)"
                    name="categories"
                    value={formData.categories}
                    onChange={handleInput}
                />

                <div className="space-y-2">
                    {formData.toppings.map((topping, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                className="border p-2 w-full"
                                placeholder="Topping name"
                                value={topping.name}
                                onChange={e =>
                                    handleToppingChange(
                                        index,
                                        'name',
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                className="border p-2 w-32"
                                type="number"
                                placeholder="Price"
                                value={topping.price}
                                onChange={e =>
                                    handleToppingChange(
                                        index,
                                        'price',
                                        e.target.value
                                    )
                                }
                            />

                            {formData.toppings.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTopping(index)}
                                    className="text-red-500"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addTopping}
                        className="text-sm text-sandbrown"
                    >
                        + Add another topping
                    </button>
                </div>
            </div>

            <button
                onClick={handleAddOptions}
                className="px-4 py-2 rounded-lg bg-linear-to-r from-sandbrown to-[#f4a261] text-white flex items-center gap-2 text-sm"
            >
                <Plus className="w-4 h-4" />
                Add Menu Options
            </button>
        </div>
    )
}

export default AddMenuOptions
