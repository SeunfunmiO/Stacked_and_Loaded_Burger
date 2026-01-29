import { model, models, Schema } from "mongoose"



interface IUser {
    fullname: string
    email: string
    password: string
    isAdmin: boolean
    isStaff: boolean
    isRider: boolean
    agree:boolean
}


const UserSchema = new Schema<IUser>({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    isRider: {
        type: Boolean,
        default: false
    },
    agree: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const UserModel = models.User<IUser> || model("User", UserSchema)

export default UserModel