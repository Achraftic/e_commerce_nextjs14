'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductsType } from "@/types/type"
import Image from "next/image"

import img3 from "@/public/images_product/pngwing.com.png";
import Link from "next/link"
import { deleteProduct } from "@/actions/productsAction"
import { Alert } from "@/components/dashboard/Alert"
import { useState } from "react"
import { toast } from "sonner"

// Define the ProductsType structure

// Columns definition for the DataTable
export const columns: ColumnDef<ProductsType>[] = [
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
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => {

            return <Image src={row.getValue("imageUrl") || img3} alt="Product Image" width={30} height={30} />
        },
    },
    {
        accessorKey: "name", // Product Name
        header: ({ column }) => (
            <Button
                className="p-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Product Name
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,

    },
    {
        accessorKey: "Category.name", // Category Name
        header: "Category",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.Category?.name || "Uncategorized"}
            </div>
        ),
    },
    {
        accessorKey: "stock",
        header: ({ column }) => (
            <Button
                className="p-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Stock
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("stock")}</div>,

    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div>{formatted}</div>
        },

    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return <div>{date.toLocaleDateString()}</div>
        },
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original
            const [isOpen, setIsOpen] = useState(false);
            return (
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen} >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/products/edit/${product.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>View</DropdownMenuItem>

                        <DropdownMenuItem
                            asChild
                            className="text-red-400 hover:text-red-500 "

                        >
                            <Alert fn={async () => {
                                setIsOpen(false)
                                await deleteProduct(product.id)
                                toast.success("Category deleted successfully")
                            }

                            }>
                                <div className="p-1.5 rounded-md text-red-500 cursor-pointer hover:bg-zinc-100">

                                    Delete
                                </div>
                            </Alert>
                        </DropdownMenuItem>


                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
