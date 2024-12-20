import { ProductsType } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiHeart } from 'react-icons/ci'
import ButtonAddToCart from './ButtonAddToCart'
import img3 from "@/public/images_product/pngwing.com.png";


export default function Product({product}:{product:ProductsType}) {
    return (
        <div key={product.id} className=" hover:bg-primary/80 group transition-colors duration-200  h-full     relative rounded-lg shadow-lg  flex flex-col gap-4 shadow-neutral-200/30 bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-primary dark:shadow-none px-4 py-6 w-full">

            <CiHeart className=" group-hover:text-white text-2xl cursor-pointer absolute z-50 right-2 top-2 text-primary " />
            <Link href={"/products/" + product.id} className='group-hover:scale-105 transition-transform duration-200  cursor-pointer flex-1 flex justify-center items-center'>

                <Image width={150} height={150} src={product.imageUrl ? product.imageUrl : img3} priority={false} alt="ps4" className="m-auto my-4" />
            </Link>
            <div>
                <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-50 group-hover:text-zinc-100">{product.name}</h1>
                <h4 className='text-zinc-400   group-hover:text-zinc-300'>{product.Category?.name}</h4>
            </div>

            <div className="flex  flex-wrap items-center gap-4 text-zinc-800 group-hover:text-zinc-50 justify-between">
                <h4 className="text-lg font-semibold">${parseFloat(product.price.toString()).toFixed(2)} </h4>

                <ButtonAddToCart product_id={product.id} />
            </div>
        </div>
    )
}
