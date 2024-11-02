import { FilterProduct } from "@/components/FilterProducts";
import { Suspense } from "react";
import ProductList from "./productList";
import SkeletonList from "@/components/Skeleton";
import { PaginationComp } from "@/components/Pagination";
import { fetchProducts } from "@/actions/productsAction";
import NotFound from "@/app/not-found";
import { SearchParmFilterType } from "@/types/type";


type homeProps = {
  searchParams: SearchParmFilterType
}
export default async function Home({ searchParams }: homeProps) {
  const numpage = searchParams.page
  if (numpage < 1) {
    return <NotFound />
  }
  const products = await fetchProducts(searchParams);
  return (
    <>
      <div className="my-10  flex items-center justify-between  ">

        <h1 className="text-3xl font-semibold  ">Products</h1>
        <FilterProduct searchParams={searchParams} />
      </div>
      <Suspense fallback={<SkeletonList />}>
        <ProductList products={products} />
      </Suspense>
{products.length>0 &&   <PaginationComp searchParams={searchParams} numpage={numpage} totalItems={products.length} itemsPerPage={2} />}
    
    </>
  );
}
