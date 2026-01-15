"use client"

import { register } from '@/lib/actions'
import { useFormik } from 'formik'
import { ArrowRight, Eye, EyeOff, LockIcon, Mail, User} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'

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
        },
        validationSchema: yup.object({
            fullname: yup.string().required("Please enter your fullname"),
            email: yup.string().required("Email is required!").email("Please enter a valid email address"),
            password: yup.string().required("Password is required!")
                .required("Password is required!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
                    'Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character')
                .min(6, 'Password must be at least 6 characters'),
            confirmpassword: yup.string().required("Please confirm your password")
                .oneOf([yup.ref("password")], "Passwords must match"),
        }),
        onSubmit: async (values: {
            fullname: string,
            email: string,
            password: string,
            confirmpassword: string
        }) => {
            try {
                setLoading(true);

                const response = await register(values);

                if (!response?.success) {
                    toast.error(response.message || "Email already in use");
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
                            autoFocus
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

                <div className="flex items-start text-sm">
                    <input type="checkbox" className="mt-1 mr-3 rounded" />
                    <label className="text-neutral-700 dark:text-neutral-400 cursor-pointer">
                        I agree to the <button className="text-amber-400 hover:text-amber-300 transition-colors">
                            Terms of Service</button> and <button className="text-amber-400 hover:text-amber-300 
                                        transition-colors">Privacy Policy</button>
                    </label>
                </div>

                <button
                    disabled={loading || !formik.values}
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
    )
}

export default AuthForm