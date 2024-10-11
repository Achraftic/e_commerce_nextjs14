import React from 'react'
import { fetchProducts } from '@/actions/productsAction';
import Product from '@/components/Product';

interface ProductListProps {
    searchParams: { category?: string, price?: string }; // Correctly type the products as an array of ProductsType
}
export default async function ProductList({ searchParams }: ProductListProps) {
    const products = await fetchProducts(searchParams);
    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:max-w-full   max-w-[320px] m-auto  gap-5">
            {products.map((product) => (
             <Product product={product} key={product.id} />
            ))}
        </div>
    )
}
