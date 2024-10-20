"use client"
import { addToCart } from '@/actions/action'
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { FaCartPlus } from 'react-icons/fa'
import { toast } from 'sonner'
import { AiOutlineLoading } from 'react-icons/ai'


export default function ButtonAddToCart({ product_id }: { product_id: number }) {
    // USE TRANSTION

    const [isPending, startTransition] = useTransition()
    const handleAddToCart = async () => {
        startTransition(async () => {
            const response = await addToCart(product_id)
            toast.success(response.message)

        })
    }
    return (

        <Button onClick={handleAddToCart} className='  group-hover:bg-zinc-100 group-hover:text-zinc-900 '>
            {isPending ? <>  <AiOutlineLoading className="mr-2  animate-spin"  size={20} />
                Please wait</> : <>
                <FaCartPlus className="mr-2 "  size={15}/> Add to Cart
            </>}


        </Button>


    )
}
