import { getCartItems, ProductCart } from '@/actions/action';
import React from 'react';
import img3 from "@/public/images_product/pngwing.com.png";
import Image from 'next/image';
import { Input } from './ui/input';

export default async function CartList() {
  const cartItems = await getCartItems();
  const total = cartItems?.reduce((acc: number, item: ProductCart) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <div className='grid gap-4 mt-10'>
        {cartItems?.length ? (
          cartItems.map((item: ProductCart, index: number) => (
            <div key={index} className="flex items-center gap-5 py-3 text-lg">
              <div className='flex gap-4 items-center'>
                <Image width={45} height={45} src={img3} alt={item.name} />
                <h2 className='text-sm w-32'>{item.name}</h2>
              </div>
              <Input type="number" defaultValue={item.quantity} min={1} max={item.stock} className="w-16" />
              <p className='text-sm w-24'>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {cartItems && (
        <div className='flex justify-between p-4 my-5 text-lg font-semibold'>
          <h1 className='capitalize'>Subtotal:</h1>
          <h1>${total.toFixed(2)}</h1>
        </div>
      )}
    </div>
  );
}
