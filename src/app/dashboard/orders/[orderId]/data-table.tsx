/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CiSearch } from "react-icons/ci"
import { OrderItemsType } from "@/types/type" // Assuming you have a type for the order items

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("") // For global search
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter, // Track global filter for all fields
    },
    globalFilterFn: (row: OrderItemsType | any, columnId, filterValue) => {

      const id = String(row.original.id).toLowerCase();
      const productName = row.original?.product?.name?.toLowerCase() || "";
      const filter = filterValue.toLowerCase();

      return id.includes(filter) || productName.includes(filter);
    },
  })

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-5">
        <div className="relative w-max group">
          <Input
            placeholder="Search by ID or Product..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-xs h-8 w-60 border border-zinc-300"
          />
          <CiSearch className="absolute right-2 text-zinc-500 top-2" size={18} />
        </div>
      </div>

      <div className="rounded-md">
        <Table>
          <TableHeader className="bg-zinc-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
