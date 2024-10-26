import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { FormProfile } from "./FormProfile"
import { auth } from "@/auth.config";
import { UserProfile } from "@/types/type";
import { cp } from "fs";

export async function Profile() {
    const session=await auth();
    const user=session?.user;
   
    return (
        <Dialog >
            <DialogTrigger asChild className=" px-2 w-full cursor-pointer py-1.5 hover:bg-zinc-100 block">
                <span className="w-full">Profile</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[505px] max-w-[450px] rounded-xl ">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                 {/* // ? form */}
                <FormProfile user={user as UserProfile} />

                <DialogFooter>
                  
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}