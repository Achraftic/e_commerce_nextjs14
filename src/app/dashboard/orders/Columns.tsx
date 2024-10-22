'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {  DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { CommandeType } from "@/types/type"

export const columns: ColumnDef<CommandeType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")

                }
                onCheckedChange={(value) => {table.toggleAllPageRowsSelected(!!value)
                    
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
        accessorKey: "numorder", 
        header: "Num Order",
        cell: ({ row }) => <div className="capitalize">{row.original.numero_commande}</div>,

    },
    {
        accessorKey: "nameuser", 
        header: "Username",
        cell: ({ row }) => <div className="capitalize">{row.original.user.name}</div>,

    },
    {
        accessorKey: "Total Order",
        header: "Total Order",
        cell: ({ row }) => (
            <div className="capitalize">
                ${row.original.montant_total.toFixed(2) }
            </div>
        ),
    },
    {
        accessorKey: "status", 
        header: "status",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.statut }
            </div>
        ),
    },
  
    
    {
        accessorKey: "date_commande",
        header: "Date Order",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date_commande"))
            return <div>{date.toLocaleDateString()}</div>
        },
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original
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
                            {/* <Link href={`/dashboard/products/edit/${product.id}`}>Edit</Link> */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            View
                            
                            </DropdownMenuItem>
                        {/* <DropdownMenuItem
                            className="text-red-400 hover:text-red-500 "
                            onClick={async () => await deleteProduct(product.id)}
                        >
                            Delete
                        </DropdownMenuItem> */}

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
