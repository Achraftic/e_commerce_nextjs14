import prisma from "../../../../prisma/db";
import { revalidatePath, unstable_cache } from "next/cache";
import { FilterProduct } from "@/components/FilterProducts";
import Loading from "./loading";
import { Suspense } from "react";
import ProductList from "./productList";
import { fetchProducts } from "@/actions/productsAction";

type homeProps = {
  searchParams: {
    category: string
    price:string

  }
}
export default async function Home({ searchParams }:homeProps ) {
 

  

  const products = await fetchProducts(searchParams);



  return (
    <>
      <div className="my-10 flex items-center  gap-3 ">
        <h1 className="text-3xl font-semibold  ">Products</h1>
        <FilterProduct searchParams={searchParams} />
      </div>
      <Suspense fallback={<Loading />}>
        <ProductList products={products} />
      </Suspense>
    </>
  );
}
