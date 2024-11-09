
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logoutbtn from "./auth/Logoutbtn"
import { Profile } from "./Profile"
import { Session } from "next-auth"
import Link from "next/link"

export function DropDown({ children,session }: { children: React.ReactNode,session?:Session }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                        <Profile /> 
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                   
                        <Link href="/myorders">My orders</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Logoutbtn />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}