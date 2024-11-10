'use client'
import React from 'react'
import useOrderStore from '@/store/useOrderStore'
import OrderItemsList from './OrderItemsList'

export default  function OrderItems() {
    const {orderid}=useOrderStore()

    
    return (
        <div className={` flex-1 ${orderid ? 'block flex-1' : 'hidden'}`}>
        <OrderItemsList orderid={orderid} />    
        </div>
    )
}
