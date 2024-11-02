/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { User } from "next-auth";

const ProductWithCategory = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: { Category: true },
})
export type ProductsType = Prisma.ProductGetPayload<typeof ProductWithCategory>

const CommandeWithUser = Prisma.validator<Prisma.CommandeDefaultArgs>()({
  include: { user: true },
})


const OrderItemWithUser = Prisma.validator<Prisma.LigneCommandeDefaultArgs>()({
  include: {
    commande: {
      select: {
        montant_total: true,
      }
    },
    product: {
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
        imageUrl: true,
      },
    }
  },
})
export type OrderItemsType = Prisma.LigneCommandeGetPayload<typeof OrderItemWithUser>

export type CommandeType = Prisma.CommandeGetPayload<typeof CommandeWithUser>

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

export type UserProfile = Pick<User, "name" | "email" | "image" | "id">;

export type SearchParmFilterType = {
  category?: string
  price: string
  s: string
  page: number
}