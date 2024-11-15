import { columns } from "./Columns"
import { DataTable } from "./data-table"
import H1 from "@/components/ui/h1"
import { getAllProducts } from "@/actions/productsAction";

export default async function ProductsPage() {
  const data =  await getAllProducts();


  return (
    <>
      <H1> Products <span className="text-zinc-400 text-base"> ({data.length})</span> </H1>
      <DataTable columns={columns} data={data} />
    </>
  )
}
