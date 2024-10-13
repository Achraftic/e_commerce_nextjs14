import ProductForm from '@/components/dashboard/ProductForm'
import React from 'react'
import prisma from '../../../../../../prisma/db'
import { ProductsType } from '@/types/type'

export default async function EditPage({ params }: { params: { productId: number } }) {
  const product: ProductsType | null = await prisma.product.findUnique({
    where: { id: Number(params.productId) },
    include: {
      Category: true
    }
  });

  
  if (!product) {
    return <div>Product not found</div>; 
  }

  return (
    <ProductForm type="edit" product={product} />
  );
}
