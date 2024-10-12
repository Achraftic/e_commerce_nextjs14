import { columns } from "./Columns"
import { DataTable } from "./data-table"
import prisma from "../../../../prisma/db"




export default async function DemoPage() {
  const data = await prisma.product.findMany({
    include: {
      Category: true
    }
  })
  

  return (
    <div className="max-w-6xl p-6 w-full mx-auto py-10 overflow-x-auto">
       <h1 className="text-3xl font-semibold my-5"> Products <span className="text-zinc-400 text-base"> ({data.length})</span> </h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
