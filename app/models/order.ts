// import { Schema, model, models, Types } from 'mongoose'






// interface IOrder {
//     user: Types.ObjectId
//     items: IOrderItems[]
//     note: string
//     subtotal: number
//     deliveryFee: number
//     totalAmount: number
//     paymentStatus: string
//     orderStatus: string
// }


// const OrderSchema = new Schema<IOrder>(
//     {
//         user: {
//             type: Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },

//         items: [
//             {
//                 product: {
//                     type: Types.ObjectId,
//                     ref: 'Product',
//                     required: true,
//                 },

//                 name: {
//                     type: String,
//                     required: true,
//                 },

//                 price: {
//                     type: Number,
//                     required: true,
//                 },

//                 quantity: {
//                     type: Number,
//                     required: true,
//                     default: 1,
//                 },

//                 meatType: {
//                     type: String,
//                     required: true,
//                 },

//                 side: {
//                     type: String,
//                     required: true,
//                 },

//                 beverage: {
//                     type: String,
//                     required: true,
//                 },

//                 toppings: [
//                     {
//                         name: {
//                             type: String,
//                         },
//                         price: {
//                             type: Number,
//                         },
//                     },
//                 ],
//                 itemTotal: {
//                     type: Number,
//                     required: true,
//                 },
//             },
//         ],

//         subtotal: {
//             type: Number,
//             required: true,
//         },

//         deliveryFee: {
//             type: Number,
//             default: 0,
//         },

//         totalAmount: {
//             type: Number,
//             required: true,
//         },

//         paymentStatus: {
//             type: String,
//             enum: ['pending', 'paid', 'failed'],
//             default: 'pending',
//         },

//         orderStatus: {
//             type: String,
//             enum: ['pending', 'preparing', 'ready', 'Rider picked up', 'Rider is on his way', 'delivered', 'cancelled'],
//             default: 'pending',
//         },

//         note: {
//             type: String,
//         },
//     },
//     { timestamps: true }
// )

// const OrderModel = models.Order || model('Order', OrderSchema)
// export default OrderModel


import mongoose, { Schema, Document, Types } from 'mongoose'

/* ---------------- TOPPING ---------------- */
interface ITopping {
    name: string
    price: number
}

const ToppingSchema = new Schema<ITopping>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true }
    },
    { _id: false }
)

/* ---------------- ORDER ITEM ---------------- */
export interface IOrderItem {
    product: Types.ObjectId
    name: string
    price: number
    quantity: number
    meatType: string
    beverage: string
    side: string
    itemTotal: number
    toppings: ITopping[]
}

interface ICustomer {
    name: string
    email: string
    phone: string
}

const OrderItemSchema = new Schema<IOrderItem>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        meatType: { type: String, required: true },
        beverage: { type: String, required: true },
        side: { type: String, required: true },
        itemTotal: { type: Number, required: true },
        toppings: { type: [ToppingSchema], default: [] }
    },
    { _id: false }
)

/* ---------------- ORDER ---------------- */

type OrderStatus =
     'pending'
    | 'confirmed'
    | 'preparing'
    | 'out-for-delivery'
    | 'delivered'
    | 'cancelled'


export interface IOrder extends Document {
    user: Types.ObjectId
    items: IOrderItem[]
    delivery: string
    deliveryFee: number
    customer: ICustomer
    subtotal: number
    total: number
    note?: string,
    status: OrderStatus,
    paymentMethod: 'card' | 'transfer' | 'cash'
    paymentStatus: 'pending' | 'paid' | 'failed'
    paymentReference?: string,
    createdAt:Date
}

const OrderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        items: {
            type: [OrderItemSchema],
            required: true
        },

        customer: {
            name: String,
            email: String,
            phone: String
        },

        delivery: { type: String, required: true },
        deliveryFee: { type: Number, required: true },

        subtotal: { type: Number, required: true },
        total: { type: Number, required: true },

        note: { type: String },

        paymentMethod: {
            type: String,
            enum: ['card', 'transfer', 'cash'],
            required: true
        },

        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending'
        },
        status: {
            type: String,
            enum: [
                'pending',
                'confirmed',
                'preparing',
                'out-for-delivery',
                'delivered',
                'cancelled'
            ],
            default: 'pending'
        },

        paymentReference: { type: String },
        createdAt: {
            type: Date,
            default: new Date()
        }
    },
)

const OrderModel =
    mongoose.models.Order ||
    mongoose.model<IOrder>('Order', OrderSchema)

export default OrderModel

