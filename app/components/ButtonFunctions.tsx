"use client"

import { Edit, Eye, EyeOff, Star, Trash2 } from 'lucide-react'
import React from 'react'

const ButtonFunctions = () => {
    return (
        <div className="flex gap-2">
            <button onClick={() => toggleAvailability(product._id)} className="flex-1 border rounded p-2">
                {product.available ? <Eye /> : <EyeOff />}
            </button>
            <button onClick={() => toggleFeatured(product._id)} className="border rounded p-2">
                <Star className={product.featured ? 'fill-yellow-400' : ''} />
            </button>
            <button
                onClick={() => handleOpenModal('edit', product)}
                className="border rounded p-2"
            >
                <Edit />
            </button>
            <button
                onClick={() => handleDelete(product._id)}
                className="border rounded p-2"
            >
                <Trash2 />
            </button>
        </div>
    )
}

export default ButtonFunctions