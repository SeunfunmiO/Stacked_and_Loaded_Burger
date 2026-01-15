import { models } from "mongoose";
import { model } from "mongoose";
import { Schema } from "mongoose";

interface ITopping {
    name: string
    price: number
}

interface IOptions {
    meatTypes: string[]
    sides: string[]
    beverages: string[]
    toppings: ITopping[]
    categories: string[]
}



const OptionsSchema = new Schema<IOptions>({
    meatTypes: {
        type: [String],
        default: [],
        required: true
    },
    sides: {
        type: [String],
        default: [],
        required: true
    },
    beverages: {
        type: [String],
        default: [],
        required: true
    },
    toppings: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    categories: {
        type: [String],
        default: [],
        required: true
    }
}, { timestamps: true })

const OptionsModel = models.Option<IOptions> || model("Option", OptionsSchema)
export default OptionsModel