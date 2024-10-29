import { FilterProduct } from "@/components/FilterProducts";
import { Suspense } from "react";
import ProductList from "./productList";
import SkeletonList from "@/components/Skeleton";

type homeProps = {
  searchParams: {
    category: string
    price: string

  }
}
export default async function Home({ searchParams }: homeProps) {
  return (
    <>
      <div className="my-10 flex items-center  gap-3 ">
        <h1 className="text-3xl font-semibold  ">Products</h1>
        <FilterProduct searchParams={searchParams} />
      </div>
      <Suspense fallback={<SkeletonList />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
