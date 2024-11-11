"use server"

import prisma from "../../prisma/db";


export const GetTopUsers=async()=>{
    const users=await prisma.user.findMany({
        where: {
            role: 'user', // Filter by users with role 'user'
        },
        orderBy: {
            Commande: {
                _count: 'desc', // Order by the count of 'Commande' in descending order
            } 
        },
        distinct: ['name'],

        select: {
            
            name: true, // Select name  
            _count:{
                select: {
                    Commande: true, // Count the number of 'Commande' for each user
                },
            
  
            },      

        },
        take: 5, // Limit the result to top 5 users
    });
    return users;
}