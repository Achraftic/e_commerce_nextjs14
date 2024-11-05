"use client"
import { Button } from '@/components/ui/button'
import H1 from '@/components/ui/h1'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { productSchema } from '@/shema/shema'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React, { useState } from 'react'
import { PiImageSquareLight } from 'react-icons/pi'
import { Category } from '@prisma/client'
import { AddProduct, editProduct, getCategories } from '@/actions/productsAction'
import { ProductsType } from '@/types/type'
import SubmitBtn from './SubmitBtn'


type ProductForm = {
    type: "add" | "edit",
    product?: ProductsType
}

export default function ProductForm({ type = "add", product }: ProductForm) {
    const [errors, setErrors] = useState<Record<string, string[]>>({})
    const [image, setImage] = useState<File | null>(null)  // State for storing the image file
    const [isUploading, setIsUploading] = useState<boolean>(false)  // State for upload progress
    const [categories, setCategories] = useState<Category[]>([])

    const handleSubmit = async (formData: FormData) => {
        const productData = Object.fromEntries(formData.entries());
        const parsedData = {
            name: productData.name as string,
            price: Number(productData.price),
            stock: Number(productData.stock),
            description: productData.description as string,
            category: productData.category as string,
            image: image || "",
        };

        const validationResult = productSchema.safeParse(parsedData);

        if (!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            console.log("error:", fieldErrors);
            setErrors(fieldErrors);
        } else {

            setErrors({});
            console.log("Form submitted successfully:", parsedData);

            if (type === "edit" && product?.id) {
                await editProduct(formData, product.id)
                return;

            }
            await AddProduct(formData);
        }

    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true); // Start uploading state
            setImage(file); // Save the image to state

            // Simulate an upload process
            setTimeout(() => {
                setIsUploading(false); // Stop uploading after file "upload" completes
                console.log("File uploaded successfully:", file);
            }, 2000);  // Simulate upload delay (e.g., 2 seconds)
        }
    };

    React.useEffect(() => {
        const GetCategories = async () => {

            const categories = await getCategories()

            setCategories(categories)
        }
        GetCategories()
    }, [])

    return (
        <>
            <H1>{type === "add" ? "Add" : "Edit"} Products</H1>
            <form action={handleSubmit} className='sm:grid flex flex-col my-5 md:p-5 p-0 grid-cols-3 gap-3 sm:items-center'>
                {/* Name Input */}
                <div className='gap-1.5 grid'>
                    <Label className='text-dark font-semibold'>Name</Label>
                    <Input defaultValue={product?.name} name="name" className='text-xs' placeholder='Product Name' />
                    <div className='error text-red-500 h-2 text-xs'>
                        {errors.name && <p>{errors.name[0]}</p>}
                    </div>
                </div>

                {/* Price Input */}
                <div className='gap-1.5 grid'>
                    <Label className='text-dark font-semibold'>Price</Label>
                    <Input defaultValue={product?.price} name="price" type="number" className='text-xs' placeholder='Product Price' />
                    <div className='error text-red-500 h-2 text-xs'>
                        {errors.price && <p>{errors.price[0]}</p>}
                    </div>
                </div>

                {/* Stock Input */}
                <div className='gap-1.5 grid'>
                    <Label className='text-dark font-semibold'>Stock</Label>
                    <Input defaultValue={product?.stock} name="stock" type="number" className='text-xs' placeholder='Product Stock' />
                    <div className='error text-red-500 h-2 text-xs'>
                        {errors.stock && <p>{errors.stock[0]}</p>}
                    </div>
                </div>

                {/* Description Textarea */}
                <div className='gap-1.5 grid col-span-3'>
                    <Label className='text-dark font-semibold'>Description</Label>
                    <Textarea defaultValue={product?.description as string} name="description" className='text-xs h-40' placeholder='Product Description' />
                    <div className='error text-red-500 h-2 text-xs'>
                        {errors.description && <p>{errors.description[0]}</p>}
                    </div>
                </div>

                {/* Category Select */}
                <div className='gap-1.5 grid col-span-3'>
                    <Label className='text-dark font-semibold'>Category</Label>

                    <select name="category" id="" className='bg-transparent border border-zinc-200 dark:border-zinc-800 p-2 text-xs ' >
                        <option value="" className='dark:text-black'>Select Category</option>
                        {categories.map((category) => (
                            <option className='dark:text-black' selected={category.id === product?.Category?.id} key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {/* <SelectOptions data={categories} /> */}
                    <div className='error text-red-500 h-2 text-xs'>
                        {errors.category && <p>{errors.category[0]}</p>}
                    </div>
                </div>

                {/* Upload Component */}
                <div className='gap-1.5 grid col-span-3'>
                    <Label className='text-dark font-semibold'>Upload Image</Label>
                    <div className="w-full py-9 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-gray-300 gap-3 grid border-dashed">


                        <div className="grid gap-1.5">
                            <PiImageSquareLight className='text-center m-auto' size={30} />
                            <h2 className="text-center text-gray-300 text-xs leading-4">PNG, JPG or smaller than 15MB</h2>
                        </div>
                        <div className="grid gap-2">
                            <h4 className="text-center text-zinc-500 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>
                            <div className="flex items-center justify-center">
                                <label>
                                    <input type="file" name='image' hidden onChange={handleImageChange} />
                                    <div className={`flex w-28 h-9 px-2 flex-col border-2 border-primary rounded-md shadow text-zinc-900 dark:text-zinc-50 text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none `}>
                                        {isUploading ? "loading..." : "Choose File"}
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>
                    {
                        image && <>
                            <Image src={image ? URL.createObjectURL(image) : ""} alt="Product Image" width={200} height={200} className='rounded-2xl mt-4' />
                        </>


                    }
                    {product?.imageUrl &&
                        <>
                            <Image src={product?.imageUrl} alt="Product Image" width={200} height={200} className='rounded-2xl mt-4' />
                        </>
                    }
                </div>

                {/* Submit Button */}
                <div className='col-span-3 justify-end flex'>
                    <SubmitBtn />
                </div>
            </form >
        </>
    )
}
