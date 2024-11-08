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
                ${row.original.montant_total.toFixed(2)}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "status",
        cell: ({ row }) => (
            <div className=" lowercase text-zinc-50 rounded-full text-xs px-2 py-1 bg-emerald-500 w-min">
                {row.original.statut}
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
            const order = row.original
            return (
                <Link href={`/dashboard/orders/${order.id}`}> <IoEyeOutline className="h-5 w-5 text-zinc-800 dark:text-zinc-200" /></Link>


            )
        },
    },
]
