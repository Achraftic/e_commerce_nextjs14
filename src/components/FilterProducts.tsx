import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MdFilterList } from "react-icons/md"
import Filter from "./filter"
import prisma from "../../prisma/db"

export async function FilterProduct({ searchParams }: {
    searchParams: {
        category: string
        price: string

    }
}) {
    const categories = await prisma.category.findMany({
        select: {
            name: true,
            id: true,
        }
    })
    return (
        <Sheet>
            <SheetTrigger asChild>
                <span className="bg-primary text-white rounded-full p-1.5 cursor-pointer" >

                    <MdFilterList size={17} className="  " />
                </span>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Filter By</SheetTitle>
                </SheetHeader>

                <Filter categories={categories} searchParams={searchParams} />
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
