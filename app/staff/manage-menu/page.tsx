'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    X,
    Save,
    Eye,
    EyeOff,
    Star,
    Package,
    Clock,
    AlertCircle,
} from 'lucide-react';
import { ModeToggle } from '@/app/components/theme-icon';
import { CategoryType, FormData, Products } from '@/lib/type';
import Image from 'next/image';
import { addProduct, deleteProduct, editProduct, getAllProducts } from '@/lib/actions';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<CategoryType>('all');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedItem, setSelectedItem] = useState<Products | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [preview, setPreview] = useState('')
    const [products, setProducts] = useState<Products[]>([])

    const [menuItems, setMenuItems] = useState<Products[]>([]);

    const [formData, setFormData] = useState<FormData>({
        picture: "",
        name: "",
        tagline: "",
        price: "",
        categories: [],
        buntypes: [],
        toppingsName:'',
        toppingsPrice: '',
        description: "",
        available: true
    });

    const handleOpenModal = (mode: 'add' | 'edit', item?: Products) => {
        setModalMode(mode);
        if (mode === 'edit' && item) {
            setSelectedItem(item);
            setFormData({
                picture: item.picture,
                name: item.name,
                tagline: item.tagline,
                price: item.price,
                // preparationTime: item.preparationTime,
                categories: item.categories,
                // calories: item.calories,
                // ingredients: item.ingredients,
                description: item.description,
                available: item.available,
                buntypes: item.buntypes,
                toppingsName: item.toppingsName,
                toppingsPrice:item.toppingsPrice
            });
        } else {
            setSelectedItem(null);
            setFormData({
                picture: "",
                name: "",
                tagline: "",
                price: "",
                categories: [],
                buntypes: [],
                toppingsName: '',
                toppingsPrice: '',
                description: "",
                // const payload = {
                //     ...formData,
                //     categories: formData.categories.split(',').map(c => c.trim()),
                //     buntypes: formData.buntypes.split(',').map(b => b.trim()),
                //     toppings: formData.toppings.split(',').map(t => t.trim()),
                // };

                available: true
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleSubmit = async () => {
        if (modalMode === 'add') {
            const response = await addProduct(formData)
            if (!response.success) {
                toast.error(response.message)
            } else {
                toast.success(response.message)
            }
            // setMenuItems(prev => [...prev, newItem]);
        }

        if (modalMode === 'edit' && selectedItem) {
            const res = await editProduct(selectedItem._id, formData)

            if (!res.success) return toast.error(res.message)
            toast.success(res.message)
        }
        handleCloseModal();
    };

    const handleDelete = async (_id: string) => {
        setItemToDelete(_id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        const res = await deleteProduct(itemToDelete);

        if (!res.success) {
            toast.error(res.message);
        } else {
            toast.success(res.message);
        }

        setShowDeleteConfirm(false);
        setItemToDelete(null);
    };


    const toggleAvailability = (id: string) => {
        setMenuItems(prev => prev.map(i => (i._id === id ? { ...i, available: !i.available } : i)));
    };

    const toggleFeatured = (id: string) => {
        setMenuItems(prev => prev.map(i => (i._id === id ? { ...i, featured: !i.featured } : i)));
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value

        const updatedProduct = {
            ...formData,
            [name]: value,
        }

        setFormData(updatedProduct)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        const reader = new FileReader()

        reader.onloadend = () => {
            const photoBase64 = reader.result as string;
            setPreview(photoBase64)

            setFormData(prev => ({
                ...prev,
                picture: photoBase64
            }))
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        const fetchedProducts = async () => {
            try {
                const res = await getAllProducts()
                const data = res.data

                if (!res.success) {
                    toast.error(res.message)
                } else {
                    toast.success(res.message)
                    setProducts(data)
                }
            } catch (error) {
                console.log("Error fetching products : ", error)
            }
        }
        fetchedProducts()
    }, [])


    return (
        <div>
            <div className="min-h-screen bg-white dark:bg-black">
                <header className="bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-sandbrown to-[#f4a261]">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Manage Menu</h1>
                                <p className="text-sm text-gray-500">{products.length} items</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <ModeToggle />
                            <button onClick={() => handleOpenModal('add')} className="px-4 py-2 rounded-lg bg-linear-to-r
                             from-sandrown to-[#f4a261] text-white flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Item
                            </button>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        products.map((product) => (
                            <div key={product._id} className="border rounded-2xl p-6 relative">
                                {/* {product.featured &&
                                    <span
                                        className="absolute top-3 right-3 text-xs bg-yellow-400 px-2 py-1 rounded"
                                    >FEATURED</span>
                                } */}

                                <Link
                                href={'/'}
                                >
                                <Image className="text-center mb-3"
                                    src={product.picture}
                                    alt='Burger Image'
                                    width={300}
                                    height={300}
                                />
                                </Link>

                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">{product.description}</p>

                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-sandbrown">₦{product.price}</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        {/* {product.rating } */}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button onClick={() => toggleAvailability(product._id)} className="flex-1 border rounded p-2">
                                        {product.available ? <Eye /> : <EyeOff />}
                                    </button>
                                    <button onClick={() => toggleFeatured(product._id)} className="border rounded p-2">
                                        <Star className={product.featured ? 'fill-yellow-400' : ''} />
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal('edit', product)}
                                        className="border rounded p-2"
                                    >
                                        <Edit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="border rounded p-2"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    products.length === 0 && (
                        <div
                            className='flex items-center justify-center border border-gray-200 dark:border-neutral-700
                            mx-4 h-30 rounded text-sm lg:text-base'
                        >
                            No Products Added
                        </div>
                    )
                }
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-neutral-950 rounded-2xl max-w-xl w-full">
                            <div className="p-4 flex justify-between items-center border-b">
                                <h2 className="font-bold">{modalMode === 'add' ? 'Add Item' : 'Edit Item'}</h2>
                                <button onClick={handleCloseModal}><X /></button>
                            </div>

                            <div className="p-4 space-y-4">
                                <input
                                    className="w-full border p-2"
                                    placeholder="Name"
                                    type='text'
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInput}
                                />
                                <input
                                    className="w-full border p-2"
                                    placeholder="Tagline"
                                    type='text'
                                    value={formData.tagline}
                                    name='tagline'
                                    onChange={handleInput}
                                />
                                <input
                                    className="w-full border p-2"
                                    type='number'
                                    placeholder="Price"
                                    value={formData.price}
                                    name='price'
                                    onChange={handleInput}
                                />
                                <input
                                    className="w-full border p-2"
                                    placeholder="Categories"
                                    type='text'
                                    value={formData.categories}
                                    name='categories'
                                    onChange={handleInput}
                                />

                                <input
                                    className="w-full border p-2"
                                    placeholder="Toppings Name"
                                    type='text'
                                    value={formData.toppingsName}
                                    name='toppingsname'
                                    onChange={handleInput}
                                />
                                <input
                                    className="w-full border p-2"
                                    placeholder="Toppings Price"
                                    type='number'
                                    value={formData.toppingsPrice}
                                    name='toppingsprice'
                                    onChange={handleInput}
                                />
                                <div className="flex justify-between items-center gap-3">
                                    <input
                                        className="w-full border p-2"
                                        placeholder="Bun Type"
                                        type='text'
                                        value={formData.buntypes}
                                        name='buntypes'
                                        onChange={handleInput}
                                    />
                                    <label
                                        htmlFor="picture"
                                        className="w-full border p-2 text-neutral-500"
                                    >
                                        Add an Image
                                        <input
                                            className='hidden'
                                            type="file"
                                            name="picture"
                                            id='picture'
                                            accept='image/*'
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                                <textarea
                                    className="w-full border p-2"
                                    placeholder="Description"
                                    value={formData.description}
                                    name='description'
                                    onChange={handleInput}
                                />

                                {
                                    preview && (
                                        <div className="border size-10 rounded">
                                            <Image
                                                alt='image'
                                                src={preview}
                                                width={200}
                                                height={200}
                                            />
                                        </div>
                                    )
                                }
                            </div>

                            <div className="p-4 border-t flex justify-end gap-2">
                                <button onClick={handleCloseModal} className="px-4 py-2 border rounded">Cancel</button>
                                <button onClick={handleSubmit} className="px-4 py-2 bg-linear-to-r from-sandbrown to-[#f4a261] text-white rounded flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-black/25 p-6 rounded-xl max-w-sm w-full">
                            <AlertCircle className="mx-auto mb-3 text-red-500" />
                            <p className="text-center mb-4">Delete this item?</p>
                            <div className="flex gap-2">
                                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 border p-2">Cancel</button>
                                <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white p-2">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
