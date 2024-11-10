'use client'
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import useOrderStore from '@/store/useOrderStore';
type orderTableProps = {
    orders: {
        id: number;
        userId: string;
        date_commande: Date;
        statut: string;
        montant_total: number;
        moyen_paiement: string;
        numero_commande: string;
        adresse_livraison: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}
export default function OrderTable({ orders }: orderTableProps) {
    const { setOrderid,orderid } = useOrderStore();

    useEffect(() => {
        if (orders.length > 0) {
            setOrderid(orders[0].id);
        }
    }, [orders, setOrderid]);

    return (
        <div className='flex-1'>

      
        <Table className='cursor-pointer'>

            <TableHeader>
                <TableRow >
                    <TableHead >Num</TableHead>
                    <TableHead>Date order</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                   <TableRow  onClick={() => setOrderid(order.id)} className={`${orderid===order.id ? 'bg-zinc-200/40 dark:bg-zinc-800/50 ' : ''}`} >

                        <TableCell className="font-medium">{order.numero_commande.slice(0, 14)}...</TableCell>
                        <TableCell>{order.date_commande.toISOString().split("T")[0]}</TableCell>
                        <TableCell>${order.montant_total.toFixed(2)}</TableCell>
                        <TableCell>{order.statut}</TableCell>
                        <TableCell>{order.moyen_paiement}</TableCell>
                      

                    </TableRow>
                ))}
            </TableBody>

        </Table>
        </div>
    )
}
