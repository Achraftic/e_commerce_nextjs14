import React from 'react'
import prisma from '../../../../../prisma/db'
import img3 from "@/public/images_product/pngwing.com.png";
import Image from 'next/image';
import { CiStar } from "react-icons/ci";
import ButtonAddToCart from '@/components/ButtonAddToCart';
import { Input } from '@/components/ui/input';
import { SimilarProducts } from '@/components/SmilarProducts';
export default async function OneProductPage({ params }: { params: { product_id: string } }) {
  const product = await prisma.product.findUnique({
    where:
      { id: Number(params.product_id) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
      Category: true
    }
  })
  return (
    <div>


      <div className='flex mb-10 md:flex-nowrap justify-center  flex-wrap p-5 items-center  max-w-6xl m-auto  md:gap-2 gap-10 '>

        <div className=' p-12 md:shrink  bg-primary rounded-md  '>

          <Image src={img3} width={280} height={280} alt="ps4" className="   " />
        </div>
        <div className='  flex flex-col flex-1 gap-2 px-5  '>


          <div>
            <p className='text-zinc-400/80 text-xs px-1 '>{product?.Category?.name} </p>
            <h1 className=' lg:text-6xl text-5xl font-semibold'>{product?.name} </h1>

          </div>

          <div className='flex gap-0.5 text-primary'>

            {Array.from({ length: 5 }).map((_, index) => (<CiStar key={index} size={20} />))}
          </div>
          <p className='text-zinc-500  text-base max-w-xl '>{product?.description} </p>
          <h3 className='text-xs  '>Category:  <span className='text-zinc-500 p-1'>{product?.Category?.name} </span>
          </h3>

          <h1 className='text-xl font-semibold'> Price: <span className='text-primary'>${product?.price.toFixed(2)}</span>   </h1>
          <div className='flex gap-2 items-center'>
            <Input type='number' defaultValue={1} min={1} max={product?.stock} className='w-16' />
            <ButtonAddToCart product_id={product!.id} />
          </div>
        </div>

      </div>

      <SimilarProducts category={product!.Category!.id} id={product!.id}/>
    </div>

  )
}
