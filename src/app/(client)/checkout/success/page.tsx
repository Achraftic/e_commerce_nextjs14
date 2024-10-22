import { Button } from '@/components/ui/button'
import H1 from '@/components/ui/h1'
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go'

export default function page() {
  return (
    <div className='flex space-y-2  h-[70vh] flex-col items-center justify-center'>
        <GoVerified  size={40} className='text-emerald-500'/>
        <H1>Thank you for your order!</H1>
        <p className='text-zinc-500'>Your order was successfully placed.</p>
        <Button asChild className='mt-10'> 
            <Link href='/'> Return to Home </Link> 
        </Button>
    </div>
  )
}
