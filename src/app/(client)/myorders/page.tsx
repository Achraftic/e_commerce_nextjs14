import { GetOrderClient } from '@/actions/productsAction'
import { auth } from '@/auth.config';
import React from 'react'

import OrderTable from './OrderTable';
import OrderItems from './OrderItems';


export default async function MyOrdersPage() {
    const session = await auth();
    const orders = await GetOrderClient(session?.user?.id as string);

    return (
        <div>
            <h1 className='text-3xl font-semibold'>My Orders</h1>
            <div className='flex max-lg:flex-col  gap-4  my-10'>
                <div className=''>
                    <OrderTable orders={orders} />
                </div>
                <OrderItems />

            </div>

        </div>
    )
}



