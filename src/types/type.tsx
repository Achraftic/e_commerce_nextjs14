/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";

 const  ProductWithCategory = Prisma.validator<Prisma.ProductDefaultArgs>()({
    include: { Category: true },
  })
  export type ProductsType = Prisma.ProductGetPayload<typeof ProductWithCategory>