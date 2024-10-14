/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";

const ProductWithCategory = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: { Category: true },
})
export type ProductsType = Prisma.ProductGetPayload<typeof ProductWithCategory>



const CartItemWithProduct = Prisma.validator<Prisma.CartItemDefaultArgs>()({
  select: {
    quantity: true,
    product: {
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
        imageUrl: true,
      },
    },
  },
});

export type CartItemsType = Prisma.CartItemGetPayload<typeof CartItemWithProduct>;

