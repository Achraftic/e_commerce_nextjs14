import prisma from "../../../../prisma/db";
import { unstable_cache } from "next/cache";
import { FilterProduct } from "@/components/FilterProducts";
import Loading from "./loading";
import { Suspense } from "react";
import ProductList from "./productList";
export default async function Home() {
  const fetchProducts = unstable_cache(async () => {

    const products = await prisma.product.findMany({
      include: {
        Category: true,
      },
    });

    return products;
  });

  // Fetch products and user's cart items
  const products = await fetchProducts();



  return (
    <div>
      <div className="my-10 flex items-center  gap-3 ">

        <h1 className="text-3xl font-semibold  ">Products</h1>
        <FilterProduct />
      </div>

      <Suspense fallback={<Loading />}>
        <ProductList products={products} />
      </Suspense>

    </div>
  );
}
