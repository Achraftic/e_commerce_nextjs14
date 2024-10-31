import { getCartItems } from '@/actions/action';
import React from 'react';
import { cn } from '@/lib/utils';
import CartItem from './CartItem';
;

export default async function CartList({ className }: { className?: string }) {
  const cartItems = await getCartItems();
  const total = cartItems?.reduce((acc: number, item) => acc + item.product.price * item.quantity, 0);

  return (

    <div className={`${cn(className)}`}>
      <div className='grid gap-4 mt-10  '>
        {cartItems?.length ? (
          cartItems.map((item, index: number) => (
            <CartItem key={index} item={item} />
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
