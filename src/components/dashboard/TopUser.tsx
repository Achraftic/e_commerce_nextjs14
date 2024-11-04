import React from 'react'
import prisma from '../../../prisma/db'
import H1 from '../ui/h1';
import Image from 'next/image';

export default async function TopUser() {
    const users = await prisma.user.findMany({
        where: {
            role: 'user', // Filter by users with role 'user'
        },
        take: 5, // Limit the result to top 5 users
        orderBy: {
            Commande: {
                _count: 'desc', // Order by the count of 'Commande' in descending order
            },
        },
        select: {
            name: true, // Select name
            email: true, // Select email
            image: true,
            _count: {
                select: { Commande: true }, // Count the number of 'Commande' for each user
            },
        },
    });



    return (
        <div className='bg-zinc-100/70 dark:bg-zinc-800  shadow shadow-stone-200/60 dark:shadow-zinc-700/70    p-5 pb-2  rounded-md '>
            <H1 className='text-lg m-0  w-max'>Users Most Order</H1>
            <div className='flex flex-col gap-3 mt-5 w-max  '>
                {users.map((user,index) => (
                    <div key={index} className='flex gap-3 items-center'>
                        <Image src={user?.image as string} width={100} height={100} alt="ps4" className="w-8 h-8 rounded-full object-cover   " />
                        <div>

                        <H1 className='text-zinc-600 dark:text-zinc-100 text-sm m-0'>{user.name}</H1>
                        <p className='text-zinc-400  dark:text-zinc-500'>{user.email}</p>
                        
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
