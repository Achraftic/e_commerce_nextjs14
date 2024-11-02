'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { Input } from './ui/input'
import { HiOutlineTrash } from 'react-icons/hi2'
import { CartItemsType } from '@/types/type'
import { removeFromCart, updateQuantity } from '@/actions/action'
import { toast } from 'sonner'
import { GoPlus } from 'react-icons/go'
import { AiOutlineMinus } from 'react-icons/ai'


export default function CartItem({ item }: { item: CartItemsType }) {
    
    const handleDelte = async () => {
        const res = await removeFromCart(item.product.id)
        toast.success(res?.message)
    }

    const [quantity, setQuantity] = React.useState(item.quantity)
    const prevQte = useRef(item.quantity);


    const handleUpdateQte = async () => {
        const res = await updateQuantity(item.product.id, quantity)
        toast.success(res?.message)
    }

    const handleQuantityChange = (type: string) => {
        if (type === "plus") {
            if (quantity < item.product.stock) {
                setQuantity(quantity + 1)
            }
            else {
                toast.error("out of stock")
            }
        }
        if (type === "minus") {
            if (quantity > 1) {
                setQuantity(quantity - 1)
            }
            else {
                toast.error("minimum quantity is 1")
            }
        }


    }
    useEffect(() => {
    
        if(prevQte.current !== quantity){
            handleUpdateQte()
            prevQte.current = quantity
        }
      
    }, [quantity])


    return (
        <div key={item.product.id} className="flex items-center justify-between gap-4 py-3 text-lg">
            <div className='flex gap-4 items-center'>
                <Image width={45} height={45} src={item.product.imageUrl ? item.product.imageUrl : ""} alt={item.product.name} />
                <h2 className='text-sm w-32 line-clamp-2'>{item.product.name}</h2>
            </div>
            <div className='flex items-center gap-1'>
                <span onClick={() => handleQuantityChange("minus")} className='border block border-zinc-300 rounded-2xl p-1 w-max cursor-pointer  '>
                    <AiOutlineMinus size={12} />
                </span>

                <Input
                    type="number"
                    readOnly
                    min={1}
                    max={item.product.stock}
                    value={quantity}
                    className="w-10"
                />

                <span onClick={() => handleQuantityChange("plus")} className='border block border-zinc-300 rounded-2xl p-1 w-max cursor-pointer  '>
                    <GoPlus size={12} />
                </span>
            </div>
            <p className='text-sm font-medium '>${(item.product.price * item.quantity).toFixed(2)}</p>
            <span onClick={handleDelte} className='text-lg text-red-500 cursor-pointer'>
                <HiOutlineTrash />
            </span>
        </div>
    )
}
