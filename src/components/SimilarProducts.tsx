import * as React from "react"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Product from "./Product"
import prisma from "../../prisma/db"

export async function SimilarProducts({ category, id }: { category: number, id: number }) {

  const products = await prisma.product.findMany({
    include: {
      Category: true,
    },
    where: {
      AND: [{
        Category: {
          id: category
        },
        id: {
          not: id
        }

      }]

    }

  })

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-semibold   my-5  "> Smilare Products</h1>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-6xl m-auto"
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2  lg:basis-1/3">
             
                <Product product={product} />
           
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  className="absolute max-sm:-left-3 top-1/2 -translate-y-1/2" />
        <CarouselNext  className="absolute max-sm:-right-3 top-1/2 -translate-y-1/2" />
      </Carousel>

    </div>
  )
}
