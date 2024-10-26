import H1 from '@/components/ui/h1'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './Columns'

export default async function CategoriesPage() {
     const data
  return (
    <>
    <H1> Order <span className="text-zinc-400  text-xl"> ({data.length})</span> </H1>
    <DataTable columns={columns} data={data} />
  </>
  )
}
