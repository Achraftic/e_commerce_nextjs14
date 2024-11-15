import { getCartItems } from '@/actions/action'
import React from 'react';
export default async function CartPage() {
    // cookies().delete("cart")
  const cartItems=await getCartItems();

  return (
    <div>
      <h1>Your Cart</h1>
      <div className='grid grid-cols-2 gap-4 m-auto  max-w-2xl'>

   
      {cartItems? (
        cartItems.map((item:any, index:number) => (
          <div key={index} className="cart-item border p-3 text-lg ">
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Stock: {item.stock}</p>
            <p className='font-bold text-2xl'>price: ${item.quantity * item.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
         </div>
    </div>
  );
}
