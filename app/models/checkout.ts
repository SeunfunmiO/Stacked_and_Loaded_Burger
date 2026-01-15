import { Schema, model, models, Types } from 'mongoose'

interface ICheckout {
    user:Types.ObjectId
    order:Types.ObjectId
    deliveryAddress:string
    phoneNumber:string
    paymentMethod:string
    paymentReference:string
    notes:string
    paymentStatus:string
}



const CheckoutSchema = new Schema<ICheckout>(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },

        order: {
            type: Types.ObjectId,
            ref: 'Order',
            required: true,
        },

        deliveryAddress: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ['card', 'transfer', 'cash'],
            required: true,
        },

        paymentReference: {
            type: String,
        },

        notes:{
            type:String
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },
    },
    { timestamps: true }
)

const CheckoutModel = models.Checkout || model('Checkout', CheckoutSchema)
export default CheckoutModel
