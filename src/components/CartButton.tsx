import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import CartList from './CartList'
import { cartCount, getCartItems } from '@/actions/action'
import Link from 'next/link'
export default async function CartButton() {
    const { count } = await cartCount()



    return (
        <>

            <Sheet>
                <SheetTrigger asChild>
                    <div className="bg-slate-400 cursor-pointer font-semibold block px-2 py-2 rounded-full bg-opacity-10  relative   ">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>

                        <span className="flex  items-center -right-3 -top-3 justify-center w-5 h-5 bg-primary   text-white rounded-full  text-[9px] absolute">
                            {count}
                        </span>
                    </div>
                </SheetTrigger>
                <SheetContent className='w-[400px] overflow-y-auto overflow-x-hidden'>
                    <SheetHeader>
                        <SheetTitle>Shopping Cart</SheetTitle>

                    </SheetHeader>

                    {/*// ? cart list here */}
                    <CartList />

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button asChild type="submit">
                                <Link href="/checkout">Checkout</Link>
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

        </>
    )
}
