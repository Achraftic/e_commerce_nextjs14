import CartList from '@/components/CartList'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import React from 'react'

export default function CheckoutPage() {
    return (
        <div className='flex flex-wrap gap-5'>
            <CheckoutForm />
            <CartList className='max-md:flex-1' />
        </div>
    )
}
