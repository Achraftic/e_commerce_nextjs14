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
import Link from 'next/link';
import { FiShoppingCart } from "react-icons/fi";

export default async function CartButton() {
    const { count } = await cartCount()



    return (
        <>

            <Sheet>
                <SheetTrigger asChild>
                    <div className="bg-slate-400 cursor-pointer font-semibold block px-2 py-2 rounded-full bg-opacity-10  relative   ">

                       
                        <FiShoppingCart/>

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
                            {count < 1 ? null : (

                              
                            <Button asChild type="submit">

                                <Link href="/checkout">Checkout</Link>
                            </Button>
                            )}
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

        </>
    )
}
