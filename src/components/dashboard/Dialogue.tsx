import React, { forwardRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import FormCategory from "./FormCategory";

interface DialogueProps {
    children: React.ReactNode;
    id?: number;
}

const Dialogue = forwardRef<HTMLDivElement, DialogueProps>(({ children, id }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div ref={ref} className='cursor-pointer ' >
                    {children}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[350px]">
                <DialogHeader>
                    <DialogTitle> {id ? "Edit" : "Add"} Category </DialogTitle>
                   
                </DialogHeader>
                <FormCategory id={id} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
});

Dialogue.displayName = "Dialogue";

export default Dialogue;
