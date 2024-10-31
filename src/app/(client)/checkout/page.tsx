import { cartCount } from '@/actions/action'
import CartList from '@/components/CartList'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function CheckoutPage() {
    const { count } = await cartCount()
    if (count < 1) {
        redirect('/products')
    }

    return (
        <div className='flex flex-wrap gap-5'>
            <CheckoutForm />
            <CartList className='max-md:flex-1' />
        </div>
    )
}
