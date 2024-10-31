'use client'
import Image from 'next/image'
import React from 'react'
import { Input } from './ui/input'
import { HiOutlineTrash } from 'react-icons/hi2'
import { CartItemsType } from '@/types/type'
import { removeFromCart } from '@/actions/action'
import { toast } from 'sonner'

export default function CartItem({ item }: { item: CartItemsType }) {
    const handleDelte = async () => {
        const res = await removeFromCart(item.product.id)
        toast.success(res?.message)
    }

    return (
        <div key={item.product.id} className="flex items-center justify-between gap-5 py-3 text-lg">
            <div className='flex gap-4 items-center'>
                <Image width={45} height={45} src={item.product.imageUrl ? item.product.imageUrl : ""} alt={item.product.name} />
                <h2 className='text-sm w-32 line-clamp-2'>{item.product.name}</h2>
            </div>
            <Input type="number" defaultValue={item.quantity} min={1} max={item.product.stock} className="w-16" />
            <p className='text-sm '>${(item.product.price * item.quantity).toFixed(2)}</p>
            <span onClick={handleDelte} className='text-lg text-red-500 cursor-pointer'>
                <HiOutlineTrash />
            </span>
        </div>
    )
}
