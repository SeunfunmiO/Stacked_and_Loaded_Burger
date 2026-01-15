import { models } from "mongoose";
import { model, Schema } from "mongoose";

interface ITopping {
    name: string
    price: string
}

interface IProduct {
    picture: string
    name: string
    tagline: string
    price: string
    categories: string[]
    buntypes: string[]
    toppings: ITopping[]
    description: string
    available: boolean
    preparationTime: number
    rating: number
    soldCount: number
}


const ProductSchema = new Schema<IProduct>({
    picture: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        default:[],
        required: true,
    },
    buntypes: {
        type: [String],
        default:[],
        required: true
    },
    toppings: [
       {
        name:String,
        price:String
       }
    ],
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    preparationTime: {
        type: Number,
        default: null
    },
    rating: {
        type: Number,
        default: null
    },
    soldCount: {
        type: Number,
        default: null
    },
}, { timestamps: true })

const ProductModel = models.Product<IProduct> || model("Product", ProductSchema)
export default ProductModel