import { getCartItems } from '@/actions/action';
import React from 'react';
import img3 from "@/public/images_product/pngwing.com.png";
import Image from 'next/image';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { HiOutlineTrash } from 'react-icons/hi2';
;

export default async function CartList({ className }: { className?: string }) {
  const cartItems = await getCartItems();
  const total = cartItems?.reduce((acc: number, item) => acc + item.product.price * item.quantity, 0);

  return (

    <div className={`${cn(className)}`}>
      <div className='grid gap-4 mt-10  '>
        {cartItems?.length ? (
          cartItems.map((item, index: number) => (
            <div key={index} className="flex items-center justify-between gap-5 py-3 text-lg">
              <div className='flex gap-4 items-center'>
                <Image width={45} height={45} src={item.product.imageUrl ? item.product.imageUrl : img3} alt={item.product.name} />
                <h2 className='text-sm w-32 line-clamp-2'>{item.product.name}</h2>
              </div>
              <Input type="number" defaultValue={item.quantity} min={1} max={item.product.stock} className="w-16" />
              <p className='text-sm '>${(item.product.price * item.quantity).toFixed(2)}</p>
              <HiOutlineTrash className='text-lg text-red-500 cursor-pointer' />
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {cartItems && (
        <div className='flex justify-between p-4 my-5 text-lg font-semibold'>
          <h1 className='capitalize'>Subtotal:</h1>
          <h1>${total!.toFixed(2)}</h1>
        </div>
      )}
    </div>
  );
}
