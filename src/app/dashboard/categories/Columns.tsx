'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Category } from "@prisma/client"
import Dialogue  from "@/components/dashboard/Dialogue"
import { deleteCategory } from "@/actions/CategoryAction"


export const columns: ColumnDef<Category>[] = [
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
        accessorKey: "categoryName",
        header: "Category Name",
        cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
        enableGlobalFilter: true,
       

    },
    

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original
            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Dialogue id={category.id} >

                              <span className="px-2 rounded-md py-1.5 block hover:bg-zinc-100">
                              Edit
                                </span> 
                            </Dialogue>
                        </DropdownMenuItem>
                      
                        <DropdownMenuItem
                            className="text-red-400 hover:text-red-500 "
                            onClick={async ()=> deleteCategory(category.id)}
                        >
                            Delete
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
