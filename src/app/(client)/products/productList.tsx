import ButtonAddToCart from '@/components/ButtonAddToCart'
import Image from 'next/image'
import React from 'react'
import img3 from "@/public/images_product/pngwing.com.png";
import { ProductsType } from '@/types/type';

interface ProductListProps {
    products: ProductsType[]; // Correctly type the products as an array of ProductsType
}
export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-row-3 md:grid-rows-2  gap-5">
            {products.map((product) => (
                <div key={product.id} className="rounded-lg shadow-lg h-max flex flex-col gap-4 shadow-neutral-200/30 bg-white/50 px-4 py-6 w-full">
                    <Image width={150} height={150} src={img3} priority={false} alt="ps4" className="m-auto my-4" />
                    <div>
                        <h1 className="text-xl font-semibold">{product.name}</h1>
                        <h4>{product.Category?.name}</h4>
                    </div>
                    <div className="flex items-center gap-4 justify-between">
                        <h4 className="text-lg font-semibold">${product.price}</h4>
                        {/* Pass the isInCart value to ButtonAddToCart */}
                        <ButtonAddToCart product_id={product.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}
