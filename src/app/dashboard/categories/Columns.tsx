'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { CommandeType } from "@/types/type"
import Link from "next/link"
import { IoEyeOutline } from "react-icons/io5"

export const columns: ColumnDef<CommandeType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")

                }
                onCheckedChange={(value) => {
                    table.toggleAllPageRowsSelected(!!value)

                }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()} // Boolean value expected here
                onCheckedChange={(value) => {
                    row.toggleSelected(!!value);
                    console.log(row.original);
                }}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "id",
        header: "id",
        cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,

    },
    {
        accessorKey: "category",
        header: "Category Name",
        cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,

    },
    

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const order = row.original
            return (
                <Link href={`/dashboard/orders/${order.id}`}> <IoEyeOutline className="h-5 w-5 text-zinc-800" /></Link>


            )
        },
    },
]
