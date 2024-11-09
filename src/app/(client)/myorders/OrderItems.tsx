'use client'
import React from 'react'
import useOrderStore from '@/store/useOrderStore'
import OrderItemsList from './OrderItemsList'

export default  function OrderItems() {
    const {orderid}=useOrderStore()

    
    return (
        <div className='flex-1'>
        <OrderItemsList orderid={orderid} />    
        </div>
    )
}
