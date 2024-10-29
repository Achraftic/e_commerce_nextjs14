import React from 'react'
import H1 from './ui/h1'
import { getLastestProducts } from '@/actions/productsAction'
import Product from './Product'
import { Button } from './ui/button'
import Link from 'next/link'

export default async function LastestProducts() {
    const products = await getLastestProducts()
    return (
        <div className=''>
            <H1 className='mb-16'>Lastest Products</H1>
            <div className='grid my-4 sm:grid-cols-2 grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    products.map((product) => (
                        <Product key={product.id} product={product} />
                    )
                    )
                }
            </div>

            <div className='w-full flex justify-center items-center mt-10'>
                <Button asChild className='px-8 hover:-translate-y-3 transition-transform'>
                    <Link href={'/products'}>
                        Explore
                    </Link>

                </Button>
            </div>

        </div>
    )
}
