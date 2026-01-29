"use client"

import { deleteAllProducts } from '@/lib/actions'
import { Trash, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'


const DeleteAllProducts = () => {
        const [openDeleteModal, setOpenDeleteModal] = useState(false)

        const deleteAllProductsAction = async () => {
            const res = await deleteAllProducts()
            if (res.success) {
                toast.success(res.message)
                setOpenDeleteModal(false)
            } else {
                toast.error(res.message)
            }
        }

        return (
            <div>
                <button
                    onClick={() => setOpenDeleteModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg
                         hover:bg-red-100 transition-colors duration-200 font-medium">
                    <Trash2 className="w-4 h-4" />
                    Delete All
                </button>

                {openDeleteModal && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setOpenDeleteModal(false)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-4 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-lg font-bold text-gray-800 text-center mb-4">Delete Product Confirmation</h2>
                            <hr className='border border-gray-200' />
                            <p className="text-gray-800 my-5 text-center text-sm lg:text-base">
                                Are you sure you want to delete all products ? If you click proceed , all your data will be deleted permanently.
                            </p>

                            <div className='flex justify-center items-center my-5'>
                                <Trash
                                    size={100}
                                />
                            </div>

                            <div className="flex justify-center items-center gap-3 mt-6">
                                <button
                                    onClick={() => setOpenDeleteModal(false)}
                                    className="py-2 rounded-lg outline outline-slate-600 hover:bg-slate-600  hover:text-white
                                            font-medium w-full text-sm lg:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={deleteAllProductsAction}
                                    className="py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium w-full text-sm 
                                            lg:text-base"
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
}

export default DeleteAllProducts