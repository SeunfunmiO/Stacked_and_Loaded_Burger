"use server"

import UserModel from "@/app/models/user";
import * as bcrypt from "bcrypt"
import dbConnect from "./dbconnect";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "./session";
import ProductModel from "@/app/models/product";
import { revalidatePath } from "next/cache";
import cloudinary from "./cloudinary";
import OptionsModel from "@/app/models/meunOptions";
import { CreateOrderInput, GetOrdersResponse, IProduct, OrderItemPayload} from "./type";
import OrderModel from "@/app/models/order";
import { Types } from "mongoose";



export const register = async (userData: {
    fullname: string;
    email: string;
    password: string;
}) => {
    try {
        await dbConnect();

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userData.password, salt);

        const user = await UserModel.create({
            ...userData,
            password: hash,
        });

        if (!user) {
            return {
                success: false,
                message: "An error occurred. Please try again",
            };
        }

        let emailStatus: "sent" | "failed" = "failed";

        try {
            const res = await fetch(
                "https://stacked-and-loaded-burger.vercel.app/api/sendEmail",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fullname: userData.fullname,
                        email: userData.email,
                    }),
                }
            );

            if (res.ok) {
                emailStatus = "sent";
            } else {
                console.error("Email API error:", await res.text());
            }
        } catch (emailError) {
            console.error("Email request failed:", emailError);
        }

        return {
            success: true,
            message: "Account created successfully",
            emailStatus,
        };
    } catch (error) {
        console.error("Error creating account:", error);
        return {
            success: false,
            message: "Internal server error",
        };
    }
};


export const signIn = async (userData: {
    id: string,
    email: string,
    password: string
}) => {
    try {
        await dbConnect()

        const user = await UserModel.findOne({ email: userData.email }).select("+password")

        if (!user) {
            return {
                success: false,
                message: "Invalid Credentials"
            }
        }

        const validPassword = await bcrypt.compare(userData.password, user.password)
        if (!validPassword) {
            return {
                success: false,
                message: "Invalid Credentials",
            }
        }

        const cookieStore = await cookies()
        const token = await encrypt({ _id: user._id.toString() })
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: "lax",
            path: '/',
        })


        return {
            success: true,
            message: "You are signed in",
        }

    } catch (error) {
        console.log("Error logging into account :", error);
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

export const getCustomer = async () => {
    await dbConnect()
    try {
        const cookieStore = await cookies()

        const token = cookieStore.get("token")?.value;

        if (!token) {
            return {
                success: false,
                message: "No token found"
            }
        }

        const decrypted = await decrypt(token)

        const user = await UserModel.findById({ _id: decrypted._id })

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }


        const fetchedUser = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            createdAt: user.createdAt,
            isAdmin: user.isAdmin
        }

        const plainUser = JSON.parse(JSON.stringify(fetchedUser))

        return {
            success: true,
            message: "Customer's details retrieved successfully",
            user: plainUser,
            decryptedToken: decrypted
        }

    } catch (error) {
        console.log("Get User Error : ", error);
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

export const updateUser = async (data: {
    email: string,
    fullname: string
}) => {
    await dbConnect();

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { success: false, message: "No token found" };
        }

        const decrypted = await decrypt(token);

        if (!decrypted.success) {
            return { success: false, message: "Session expired" };
        }

        const existingUser = await UserModel.findById(decrypted._id);

        if (!existingUser) {
            return { success: false, message: "User not found" };
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            decrypted._id,
            {
                email: data.email,
                fullname: data.fullname,
            },
            { new: true }
        );

        const plainUser = JSON.parse(JSON.stringify(updatedUser))

        revalidatePath("/user/user-dashboard");

        return {
            success: true,
            message: "Profile updated",
            user: plainUser
        };

    } catch (error) {
        console.log("Update user error : ", error);
        return { success: false, message: "Error updating user" };
    }
};




export const logOut = async () => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.delete("token")

        if (!token) {
            return {
                success: false,
                message: "can't log out at this time, please try again"
            }
        }

        return { success: true, message: "You have logged out successfully" }
    } catch (error) {
        console.log("Error signing out : ", error);
        return {
            success: false,
            message: "Error signing out"
        }
    }

}

export const addProduct = async (
    formData: {
        picture: string,
        name: string,
        tagline: string,
        price: string,
        categories: string[],
        buntypes: string[],
        toppingsName: string,
        toppingsPrice: string,
        description: string,
        available: boolean,
        // preparationTime: number,
        // rating: number,
        // soldCount: number,
    }) => {
    try {
        await dbConnect()

        const product = await ProductModel.findOne({ name: formData.name })
        if (product) {
            return {
                success: false,
                message: 'Product already exists'
            }
        }

        let uploadedImage;

        if (formData.picture) {
            uploadedImage = await cloudinary.uploader.upload(formData.picture, {
                folder: "stackedandloaded/pictures",
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            })
        }

        const postData = {
            picture: formData.picture,
            name: formData.name,
            tagline: formData.tagline,
            price: formData.price,
            categories: formData.categories,
            buntypes: formData.buntypes,
            toppingsName: formData.toppingsName,
            toppingsPrice: formData.toppingsPrice,
            description: formData.description,
            available: formData.available,
            // preparationTime: formData.preparationTime,
            // rating: formData.rating,
            // soldCount: formData.soldCount
        }
        await ProductModel.create({
            ...postData,
            picture: uploadedImage?.secure_url
        })
        revalidatePath("/staff/manage-menu")
        return {
            success: true,
            message: "Product added successfully"
        }
    } catch (error) {
        console.log("Error adding product : ", error);
        return {
            success: false,
            message: "Error adding product "
        }
    }
}

export const getAllProducts = async () => {
    try {
        await dbConnect()
        const products = await ProductModel.find()
        if (!products) {
            return {
                success: false,
                message: "No Products Found"
            }
        }

        const plainProducts = JSON.parse(JSON.stringify(products))

        return {
            success: true,
            message: "Product fetched successfully",
            data: plainProducts
        }
    } catch (error) {
        console.log("Error fetching products : ", error);
        return {
            success: false,
            message: "Error fetching products "
        }
    }
}

export const getProduct = async ({ _id }: { _id: string }) => {
    try {
        await dbConnect()
        const product = await ProductModel.findById(_id)
        if (!product) {
            return {
                success: false,
                message: "No Product Found"
            }
        }

        const plainProduct = JSON.parse(JSON.stringify(product))

        return {
            success: true,
            message: "Product fetched successfully",
            data: plainProduct
        }
    } catch (error) {
        console.log("Error fetching product : ", error);
        return {
            success: false,
            message: "Error fetching product "
        }
    }
}

export const addOptions = async (formData: {
    categories: string[]
    meatTypes: string[]
    sides: string[]
    beverages: string[]
    toppings: { name: string; price: number }[];
}) => {
    try {
        await dbConnect()

        const postData = {
            categories: formData.categories,
            meatTypes: formData.meatTypes,
            sides: formData.sides,
            beverages: formData.beverages,
            toppings: formData.toppings
        }
        await OptionsModel.create(postData)
        revalidatePath("/staff/manage-menu-options")
        return {
            success: true,
            message: "Menu Options added successfully"
        }

    } catch (error) {
        console.log("Error adding menu options : ", error);
        return {
            success: false,
            message: "Error adding menu options "
        }
    }
}

export const addToCart = async (formData: {
    categories: string[]
    meatTypes: string[]
    sides: string[]
    beverages: string[]
    toppings: { name: string; price: number }[];
}) => {
    try {
        await dbConnect()

        const postData = {
            categories: formData.categories,
            meatTypes: formData.meatTypes,
            sides: formData.sides,
            beverages: formData.beverages,
            toppings: formData.toppings
        }
        await OptionsModel.create(postData)
        revalidatePath("/staff/manage-menu-options")
        return {
            success: true,
            message: "Menu Options added successfully"
        }

    } catch (error) {
        console.log("Error adding menu options : ", error);
        return {
            success: false,
            message: "Error adding menu options "
        }
    }
}

export const getMenuOptions = async () => {
    await dbConnect()
    try {
        const menuOptions = await OptionsModel.find()
        if (!menuOptions) {
            return {
                success: false,
                message: "No Menu Options Found"
            }
        }

        const plainOptions = JSON.parse(JSON.stringify(menuOptions))

        return {
            success: true,
            message: "Menu options fetched successfully",
            data: plainOptions
        }
    } catch (error) {
        console.log("Error fetching menu options : ", error);
        return {
            success: false,
            message: "Error fetching menu options "
        }
    }
}



export const createOrder = async (data: CreateOrderInput) => {
    try {
        await dbConnect()

        const subtotal = data.items.reduce(
            (sum, item) => sum + item.itemTotal,
            0
        )

        const total = subtotal + (data.deliveryFee ?? 0)

        const normalizedItems = data.items.map(item => ({
            product: new Types.ObjectId(item.productId),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            meatType: item.meatType || 'none',
            side: item.side || 'none',
            beverage: item.beverage || 'none',
            itemTotal: item.itemTotal,
            toppings: item.toppings ?? []
        }))


        const order = await OrderModel.create({
            user: new Types.ObjectId(data.userId),
            customer: data.customer,
            items: normalizedItems,
            delivery: data.delivery,
            deliveryFee: data.deliveryFee ?? 0,
            subtotal,
            total,
            note: data.note,
            paymentMethod: data.paymentMethod,
            paymentStatus: data.paymentStatus,
            paymentReference: data.paymentReference,
        })

        return {
            success: true,
            orderId: order._id.toString()
        }
    } catch (error) {
        console.error('CREATE ORDER ERROR:', error)

        return {
            success: false,
            message: 'Failed to create order'
        }
    }
}


export const verifyPayment = async (orderId: string, reference: string) => {
    try {
        await dbConnect()

        const res = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        )

        const data = await res.json()

        if (!data.status || data.data.status !== 'success') {
            throw new Error('Payment not verified')
        }

        await OrderModel.findByIdAndUpdate(orderId, {
            paymentStatus: 'paid',
            orderStatus: 'pending',
        })

        return { success: true }
    } catch (error) {
        console.error("Error verifying payment : ", error);
        return {
            success: false,
            message: "Payment not verified"
        }
    }
}

export const updateOrderStatus = async (orderId: string,
    status: 'pending' | 'confirmed' | 'out-for-delivery' | 'delivered' | 'cancelled'
) => {
    try {
        await dbConnect();

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return { success: false, message: 'Order not found' };
        }

        revalidatePath('/staff/staff-dashboard');
        revalidatePath('/user/user-dashboard');
        revalidatePath('/user/track-orders');

        return {
            success: true,
            message: 'Order status updated',
            data: updatedOrder,
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to update order' };
    }
}

export const getAllOrders = async () => {
    try {
        await dbConnect()

        const orders = await OrderModel.find()

        if (!orders) {
            return {
                success: false,
                message: 'No orders yet'
            }
        }

        const plainOrders = JSON.parse(JSON.stringify(orders))

        return {
            success: true,
            message: "Orders fetched successfully",
            data: plainOrders
        }

    } catch (error) {
        console.error("Error getting orders : ", error);
        return {
            success: false,
            message: "Error getting orders"
        }
    }
}


export const getSingleOrder = async ({ userId }: { userId: string }):
    Promise<GetOrdersResponse> => {
    await dbConnect()
    try {

        if (!Types.ObjectId.isValid(userId)) {
            return {
                success: false,
                message: 'Invalid user id',
                orders: []
            }
        }

        const orders = await OrderModel.find({
            user: userId
        }).sort({ createdAt: -1 })
            .lean()

        const plainOrders = orders.map(order => ({
            ...order,
            _id: order._id.toString(),
            user: order.user.toString(),
            items: order.items.map((item: OrderItemPayload) => ({
                ...item,
                product: {
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    meatType: item.meatType,
                    side: item.side,
                    beverage: item.beverage,
                    note: item.note,
                    itemTotal: item.itemTotal,
                    toppings: item.toppings
                },
            }))
        }))



        if (!orders) {
            return {
                success: false,
                message: 'Error fetching user order',
                orders: []
            }
        }

        return {
            success: true,
            message: 'Order fetched successfully',
            orders: plainOrders
        }

    } catch (error) {
        console.error("Error getting order : ", error);
        return {
            success: false,
            message: "Error getting order",
            orders: []
        }
    }
}

export const deleteProduct = async (id: string) => {
    try {
        await dbConnect()
        await ProductModel.findByIdAndDelete(id)

        revalidatePath("/staff/manage-menu")

        return {
            success: true,
            message: "Product deleted successfully"
        }

    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error deleting product' }
    }
}

export const editProduct = async (id: string, data: Partial<IProduct>) => {
    try {
        await dbConnect()
        await ProductModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        revalidatePath("/staff/manage-menu")

        return {
            success: true,
            message: "Product updated successfully"
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error updating product' }
    }
}

export const deleteAllProducts = async () => {
    try {
        await dbConnect()
        await ProductModel.deleteMany()

        revalidatePath("/staff/manage-menu")

        return {
            success: true,
            message: "Products deleted successfully"
        }

    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error deleting products' }
    }
}

export const deleteAccount = async(id:string)=>{
    try {
        await dbConnect()
      const user =  await UserModel.findByIdAndDelete(id)

      if(!user){
        return{
            success:false,
            message:'User not found'
        }
      }

        return {
            success: true,
            message: "Account deleted successfully",
            
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error deleting account' }
    }
}