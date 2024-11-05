import React from 'react';
import Image from 'next/image';
import { CiStar } from "react-icons/ci";
import ButtonAddToCart from '@/components/ButtonAddToCart';
import { Input } from '@/components/ui/input';
import { SimilarProducts } from '@/components/SimilarProducts';
import NotFound from '@/app/not-found';
import { Metadata } from 'next';
import { getProductsById } from '@/actions/productsAction';

export async function generateMetadata({ params }: { params: { product_id: string } }): Promise<Metadata> {
  const productId = Number(params.product_id);
  const product = await getProductsById(productId)
  if (!product) {
    return {
      title: "Product Not Found - ElectroHub",
      description: "This product could not be found on ElectroHub.",
    };
  }

  return {
    title: `${product.name} - ElectroHub`,
    description: `Discover ${product.name} from the ${product.Category?.name || "electronics"} category. Buy it now for just $${product.price.toFixed(2)}!`,
  };
}

export default async function OneProductPage({ params }: { params: { product_id: string } }) {
  const { product_id } = params;
  const productId = Number(product_id);

  if (isNaN(productId)) {
    return <NotFound height="h-[60vh]" />;
  }

  const product = await getProductsById(productId);

  if (!product) {
    return <NotFound height="h-[60vh]" />;
  }

  return (
    <div>
      <div className="flex mb-10 md:flex-nowrap justify-center flex-wrap p-5 items-center max-w-6xl m-auto md:gap-2 gap-10">
        <div className="p-12 md:shrink rounded-md">
          <Image
            src={product.imageUrl || ""}
            width={300}
            height={300}
            alt={product.name || "Product image"}
            className=""
          />
        </div>
        <div className="flex flex-col flex-1 gap-3 md:px-5">
          <div>
            <p className="text-zinc-400/80 text-xs px-1">{product.Category?.name}</p>
            <h1 className="sm:text-5xl text-4xl font-semibold">{product.name}</h1>
          </div>

          <div className="flex gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, index) => (
              <CiStar key={index} size={20} />
            ))}
          </div>

          <p className="text-zinc-500 dark:text-zinc-300 max-w-xl">{product.description}</p>
          <h3 className="text-xs">
            Category: <span className="text-zinc-500 p-1">{product.Category?.name}</span>
          </h3>

          <h1 className="text-xl font-semibold">
            Price: <span className="text-primary">${product.price?.toFixed(2)}</span>
          </h1>

          <div className="flex gap-2 items-center">
            <Input
              type="number"
              defaultValue={1}
              min={1}
              max={product.stock}
              className="w-16"
              aria-label="Quantity"
            />
            <ButtonAddToCart product_id={product.id} />
          </div>
        </div>
      </div>

      <SimilarProducts category={product!.Category!.id} id={product.id} />
    </div>
  );
}
