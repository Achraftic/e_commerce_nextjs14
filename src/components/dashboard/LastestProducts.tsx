import { getLastestProducts } from '@/actions/productsAction'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import H1 from '../ui/h1'
export default async function LastestProducts() {
  const products = await getLastestProducts()
  return (
    <div className='flex-1 bg-zinc-100/70 shadow-xl shadow-stone-200/50   rounded-md p-4 overflow-x-auto'>
        <H1 className='text-lg m-0  w-max'>Lastest Product</H1>

   
    <Table >
    
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead >Stock</TableHead>
          <TableHead >Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">
              <Image src={product.imageUrl as string} alt="Product Image" width={30} height={30} />
            </TableCell>
            <TableCell className="font-medium line-clamp-2 " >{product.name}</TableCell>
            <TableCell className=' '>{product.Category?.name}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
 
    </Table>
    </div>
  )
}






