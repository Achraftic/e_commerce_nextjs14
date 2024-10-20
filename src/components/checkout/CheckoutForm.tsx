// components/CheckoutForm.tsx
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CreateCommande } from '@/actions/checkoutAction';


export default function CheckoutForm() {

  return (
    <form action={CreateCommande} className="space-y-6  flex-1 p-4 ">
      {/* Shipping Information */}
      <h2 className="text-2xl  font-semibold text-zinc-800">Shipping Information</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="first-name">First Name</Label>
          <Input type="text" id="first-name" required placeholder="John" />
        </div>

        <div>
          <Label htmlFor="last-name">Last Name</Label>
          <Input type="text" id="last-name" required placeholder="Doe" />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input type="text" id="address" name='address' required placeholder="1234 Main St" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" required placeholder="City" />
        </div>

        <div>
          <Label htmlFor="postal-code">Postal Code</Label>
          <Input type="text" id="postal-code" required placeholder="12345" />
        </div>
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Input type="text" id="country" required placeholder="Country" />
      </div>

      {/* Payment Information */}
      <h2 className="text-2xl font-semibold text-zinc-800">Payment Information</h2>

      <div>
        <Label htmlFor="card-number">Card Number</Label>
        <Input type="text" id="card-number" required placeholder="1234 5678 9012 3456" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="expiry-date">Expiry Date</Label>
          <Input type="text" id="expiry-date" required placeholder="MM/YY" />
        </div>

        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input type="text" id="cvv" required placeholder="123" />
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full uppercase">Confirme your order</Button>
    </form>
  );
}
