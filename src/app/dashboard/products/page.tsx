import { columns } from "./Columns"
import { DataTable } from "./data-table"
import prisma from "../../../../prisma/db"
import H1 from "@/components/ui/h1"




export default async function DemoPage() {
  const data = await prisma.product.findMany({
    include: {
      Category: true
    },
    orderBy:{
      createdAt: 'desc'
    }
  })


  return (
    <>
      <H1> Products <span className="text-zinc-400 text-base"> ({data.length})</span> </H1>
      <DataTable columns={columns} data={data} />
    </>
  )
}
