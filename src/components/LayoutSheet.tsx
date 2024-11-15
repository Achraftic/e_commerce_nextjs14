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

export async function LayoutSheet({ children }: { children: React.ReactNode }) {

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

                {children}
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
