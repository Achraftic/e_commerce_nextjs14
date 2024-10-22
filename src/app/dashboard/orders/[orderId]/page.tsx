import React from 'react'

import H1 from '@/components/ui/h1'
import { DataTable } from './data-table'
import { columns } from './Columns'
import prisma from '../../../../../prisma/db'

export default async function page({ params }: { params: { orderId: number } }) {
    const data = await prisma.ligneCommande.findMany({
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
        where:{
            CommandeId:  parseInt(params.orderId.toString()),
        }
    }
    )


    return (
        <>
            <H1> Order Items <span className="text-zinc-400  text-xl"> ({data.length})</span> </H1>
            <DataTable columns={columns} data={data} />
          <div className='flex justify-end p-4 my-5 text-lg font-semibold gap-1'>
          Total: <span>${data[0].commande.montant_total.toFixed(2)}</span>

          </div>
        </>
    )
}


