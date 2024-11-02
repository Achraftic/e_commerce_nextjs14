import React from 'react'
import { fetchProducts } from '@/actions/productsAction';
import Product from '@/components/Product';
import { HiOutlineFaceFrown } from "react-icons/hi2";
import { ProductsType } from '@/types/type';
interface ProductListProps {
    searchParams: { category?: string, price?: string,s?: string, page?: number }; // Correctly type the products as an array of ProductsType
}
export default async function ProductList({ products }: {products:ProductsType[]}) {
  
    if (products.length === 0) {
        return (
            <div className="grid place-items-center my-20">
                <HiOutlineFaceFrown size={50}  className='text-primary'/>
                <p className="text-center text-zinc-600 font-semibold text-2xl col-span-full">No products found</p>
                <p className='text-center text-zinc-400'>Try changing your filters</p>

            </div>
        )
    }
    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:max-w-full   max-w-[420px] m-auto  gap-5">
            {products.map((product) => (
                <Product product={product} key={product.id} />
            ))}
        </div>
    )
}
