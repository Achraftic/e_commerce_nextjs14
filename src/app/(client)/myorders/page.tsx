import { GetOrderClient } from '@/actions/productsAction';
import { auth } from '@/auth.config';
import React from 'react';

import OrderTable from './OrderTable';
import OrderItems from './OrderItems';

export default async function MyOrdersPage() {  
    const session = await auth();
    const orders = await GetOrderClient(session?.user?.id as string);

    return (
        <div>
            <h1 className='text-3xl font-semibold'>My Orders</h1>
            <div className='flex max-lg:flex-col gap-4 my-10'>
                
                
                {orders.length === 0 ? (
                    <div className=''>
                      
                        <p className='text-zinc-400 text-base p-4 dark:text-zinc-600'>
                            No orders found , please place an order to see your orders
                        </p>
                    </div>
                ): <OrderTable orders={orders} />}
                
                
                <OrderItems />
            </div>
        </div>
    );
}
