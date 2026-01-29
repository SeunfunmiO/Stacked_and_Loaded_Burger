"use client"

import { register } from '@/lib/actions'
import { useFormik } from 'formik'
import { ArrowRight, Eye, EyeOff, LockIcon, Mail, User, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { NavigationMenuDemo } from './Navbar'

const AuthForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
            confirmpassword: "",
            agree: false,
        },
        validationSchema: yup.object({
            fullname: yup.string().required("Please enter your fullname"),
            email: yup.string().required("Email is required!").email("Please enter a valid email address"),
            password: yup.string().required("Password is required!")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                    'Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character'),
            confirmpassword: yup.string().required("Please confirm your password")
                .oneOf([yup.ref("password")], "Passwords must match"),
            agree: yup.boolean().oneOf([true], "You must agree to continue"),
        }),
        onSubmit: async (values: {
            fullname: string,
            email: string,
            password: string,
            confirmpassword: string,
            agree: boolean
        }) => {
            const payload = {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
            }
            try {
                setLoading(true);

                const response = await register(payload);

                if (!response?.success) {
                    toast.error(response?.message ?? "Signup failed");
                    return;
                } else {
                    toast.success(response.message || "Account created successfully");
                    router.push("/sign-in");
                }
            } catch (error) {
                console.log("Error creating account : ", error);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        }

    });


    return (
        <div>
            <NavigationMenuDemo />

            <div className="min-h-screen bg-linear-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 
                        flex items-center justify-center p-4 from-neutral-100 via-neutral-50 to-neutral-100">
                <div className="absolute inset-0 overflow-hidden w-full pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: '1s' }}></div>
                </div>

                <div
                    className="relative w-full max-w-md">
                    <div className="dark:bg-neutral-800/50 bg-neutral-100/50 backdrop-blur-xl rounded-2xl shadow-2xl border
                                 border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden">
                        <div className="bg-linear-to-r dark:from-neutral-800 dark:to-neutral-700 p-8 
                                from-neutral-200 to-neutral-100 text-center relative">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/5 to-transparent"></div>
                            <div className="relative">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                                    style={{ background: 'linear-gradient(135deg, #dc9457 0%, #f4a261 100%)' }}>
                                    <User2 className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold mb-2">
                                    Create Your Account
                                </h1>
                                <p className="text-neutral-700 dark:text-neutral-400">
                                    Sign up and continue to enjoy our burgers
                                </p>
                            </div>
                        </div>


                        <div className="p-8">
                            <form
                                onSubmit={formik.handleSubmit}
                                className="space-y-5"
                            >
                                <div className="relative">
                                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formik.values.fullname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`w-full pl-12 pr-4 py-3 dark:bg-neutral-900/50 border border-neutral-700 rounded-lg           
                                          placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-2
                                          focus:ring-amber-500/20 transition-all bg-neutral-200/50
                                           ${formik.touched.fullname && formik.errors.fullname ?
                                                    'border-red-600 dark:border-red-500 focus:border-red-500  focus:ring-red-500/20' :
                                                    ''}`}
                                            placeholder="John Doe"
                                        />
                                        {formik.touched.fullname && formik.errors.fullname &&
                                            <small className="text-red-600 dark:text-red-500">
                                                {formik.errors.fullname}</small>}
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`w-full pl-12 pr-4 py-3 dark:bg-neutral-900/50 border border-neutral-700 rounded-lg 
                                          placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-2
                                          focus:ring-amber-500/20 transition-all bg-neutral-200/50
                                         ${formik.touched.email && formik.errors.email ?
                                                    'border-red-600 dark:border-red-500 focus:border-red-500  focus:ring-red-500/20' :
                                                    ''} `}
                                            placeholder="you@example.com"
                                        />
                                        {formik.touched.email && formik.errors.email &&
                                            <small className="text-red-600 dark:text-red-500">
                                                {formik.errors.email}</small>}
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`w-full pl-12 pr-12 py-3 dark:bg-neutral-900/50 border border-neutral-700 
                                        rounded-lg  placeholder-neutral-500 focus:outline-none focus:border-amber-500 
                                        focus:ring-2 focus:ring-amber-500/20 transition-all bg-neutral-200/50
                                          ${formik.touched.password && formik.errors.password ?
                                                    'border-red-600 dark:border-red-500 focus:border-red-500  focus:ring-red-500/20' :
                                                    ''}`}
                                            placeholder="••••••••"
                                        />
                                        {formik.touched.password && formik.errors.password &&
                                            <small className="text-red-600 dark:text-red-500">
                                                {formik.errors.password}</small>}
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400
                                         hover:text-neutral-300 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-300 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                                     text-neutral-400" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmpassword"
                                            value={formik.values.confirmpassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`w-full pl-12 pr-12 py-3 dark:bg-neutral-900/50 border border-neutral-700
                                         rounded-lg  placeholder-neutral-500 focus:outline-none focus:border-amber-500
                                         focus:ring-2 focus:ring-amber-500/20 transition-all bg-neutral-200/50
                                        ${formik.touched.confirmpassword && formik.errors.confirmpassword ?
                                                    'border-red-600 dark:border-red-500 focus:border-red-500  focus:ring-red-500/20' :
                                                    ''} `}
                                            placeholder="••••••••"
                                        />
                                        {formik.touched.confirmpassword && formik.errors.confirmpassword &&
                                            <small className="text-red-600 dark:text-red-500">
                                                {formik.errors.confirmpassword}</small>}
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400
                                         hover:text-neutral-300 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start text-sm">
                                        <input
                                            type="checkbox"
                                            name="agree"
                                            checked={formik.values.agree}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="mt-1 mr-3 rounded"
                                        />
                                        <label className="text-neutral-700 dark:text-neutral-400 cursor-pointer">
                                            I agree to the <button className="text-amber-400 hover:text-amber-300 transition-colors">
                                                Terms of Service</button> and <button className="text-amber-400 hover:text-amber-300 
                                        transition-colors">Privacy Policy</button>
                                        </label>
                                    </div>
                                    {formik.touched.agree && formik.errors.agree && (
                                        <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                                            {formik.errors.agree}
                                        </p>
                                    )}
                                </div>

                                <button
                                    disabled={loading || !formik.isValid || !formik.dirty}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105
                                 hover:shadow-lg shadow-amber-500/50 flex items-center justify-center group
                                 ${loading && 'bg-amber-50 cursor-not-allowed'}`}
                                    style={{ background: 'linear-gradient(135deg, #dc9457 0%, #f4a261 100%)' }}
                                >
                                    {loading ? 'Creating...' : ' Create Account'}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>


                            <div className="mt-6 text-center text-sm text-neutral-700 dark:text-neutral-400">
                                Already have an account?
                                <button
                                    onClick={() => router.push('/sign-in')}
                                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors ml-1"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm