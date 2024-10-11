"use client"
import { addToCart } from '@/actions/action'
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { FaCartPlus } from 'react-icons/fa'
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'


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

        <Button onClick={handleAddToCart} className='w-max group-hover:bg-zinc-100 group-hover:text-zinc-900 px-5 '>
            {isPending ? <>  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait</> : <>
                <FaCartPlus className="mr-2 h-4 w-4" /> Add to Cart
            </>}


        </Button>


    )
}
