import mongoose, { model, models, Schema, Types } from 'mongoose'

const ToppingSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { _id: false }
)

const CartItemSchema = new Schema(
    {
        product: {
            type: Types.ObjectId,
            ref: 'Product',
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },

        options: {
            meatType: { type: String },
            side: { type: String },
            beverage: { type: String },
            toppings: {
                type: [ToppingSchema],
                default: [],
            },
        },

        itemTotal: {
            type: Number,
            required: true,
        },

        subtotal: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
)

const CartModel = models.Cart || model('Cart', CartItemSchema)
export default CartModel