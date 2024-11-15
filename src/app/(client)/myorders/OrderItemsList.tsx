'use client'
import React, { useEffect, useState } from 'react'
import { GetOrderItems } from '@/actions/productsAction'
import Image from 'next/image';
import {motion } from 'framer-motion';
import Loading from '../loading';

type OrderItem = {
    id: number;
    product: { name: string; price: number, imageUrl: string };
    quantite: number;
};

export default function OrderItemsList({ orderid }: { orderid: number | null }) {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderid) return;

        const fetchOrderItems = async () => {
            try {
                setLoading(true);
                const items = await GetOrderItems(orderid);
                setOrderItems(items as any );
            } catch (err) {
                setError('Failed to load order items');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderItems();
    }, [orderid]);

    if (!orderid) return null;
    if (loading) return <Loading/>;
    if (error) return <p>{error}</p>;

    return (
        <motion.div  initial={{ opacity: 0,y: 20 }} animate={{ opacity: 1,y: 0 }}   className=' p-5    '>
            <h1 className='text-2xl font-bold'>Order Items ({orderItems.length})</h1>
            <div className='grid grid-cols-2 gap-3 mt-5' >

          
            {orderItems.map((item) => (
                <div key={item.id} className=' gap-2 flex flex-col bg-zinc-100/60 dark:bg-zinc-800 p-4 rounded-md   text-zinc-500  dark:text-zinc-300 '>
                    <Image src={item?.product.imageUrl} width={70} height={70} alt="Product image" />
                    <h2 className=' line-clamp-1 text-wrap text-lg text-zinc-800 dark:text-zinc-50 font-semibold'>{item.product.name}</h2>
                    <p  className=' '>Price: ${item.product.price.toFixed(2)}</p>
                    <p >Quantity: {item.quantite}</p>
                    <p className='font-bold'>
                        Total: ${(item.quantite * item.product.price).toFixed(2)}
                    </p>
                </div>
            ))}
              </div>
        </motion.div>
    )
}
