'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { OrderItemsType } from "@/types/type"
import Link from "next/link"

export const columns: ColumnDef<OrderItemsType>[] = [
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
        header: "Id",
        cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,

    },
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => <div className="capitalize">{row.original.product.name}</div>,

    },
    {
        accessorKey: "Qte",
        header: "Qte",
        cell: ({ row }) => <div className="capitalize">{row.original.quantite}</div>,

    },
    {
        accessorKey: "Price",
        header: "Price",
        cell: ({ row }) => (
            <div className="capitalize">
                ${row.original.product.price.toFixed(2)}
            </div>
        ),
    },
    {
        accessorKey: "Total Ligne",
        header: "Total Ligne",
        cell: ({ row }) => (
            <div className="capitalize">
                ${row.original.total_ligne.toFixed(2)}
            </div>
        ),
    },




    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const order = row.original
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
                            {/* <Link href={`/dashboard/orders/edit/${order.id}`}>Edit</Link> */}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>

                            {/* <Link href={`/dashboard/orders/${order.id}`}>Detail</Link> */}

                        </DropdownMenuItem>
                        {/* <DropdownMenuItem
                            className="text-red-400 hover:text-red-500 "
                            onClick={async () => await deleteOrder(product.id)}
                        >
                            Delete
                        </DropdownMenuItem> */}

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
