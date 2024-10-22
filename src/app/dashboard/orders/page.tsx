import React from 'react'
import prisma from '../../../../prisma/db'
import H1 from '@/components/ui/h1'
import { DataTable } from './data-table'
import { columns } from './Columns'

export default async function page() {
    const data = await prisma.commande.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    
    
      return (
        <>
          <H1> Order <span className="text-zinc-400  text-xl"> ({data.length})</span> </H1>
          <DataTable columns={columns} data={data} />
        </>
      )
    }
    

