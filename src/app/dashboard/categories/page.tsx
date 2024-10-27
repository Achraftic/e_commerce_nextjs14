import H1 from '@/components/ui/h1'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './Columns'
import { getALLCategories } from '@/actions/CategoryAction'

export default async function CategoriesPage() {
     const data=await getALLCategories();
  return (
    <>
    <H1> Categories <span className="text-zinc-400  text-xl"> ({data.length})</span> </H1>
    <DataTable columns={columns} data={data} />
  </>
  )
}
