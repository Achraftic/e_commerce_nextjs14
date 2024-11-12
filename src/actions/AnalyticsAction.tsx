"use server"

import prisma from "../../prisma/db";


export const GetTopUsers = async () => {
    const users = await prisma.user.findMany({
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
            _count: {
                select: {
                    Commande: true, // Count the number of 'Commande' for each user
                },


            },

        },
        take: 5, // Limit the result to top 5 users
    });
    return users;
}


export const GetTopProducts = async () => {
    const products = await prisma.product.findMany({
        orderBy:{
            LigneCommande: {
                _count: 'desc', // Order by the count of 'LigneCommande' in descending order
            }
        },
        select: {
            name: true,
            _count: {
                select: {
                    LigneCommande: true
                }
            }
        },

        take: 5,
    })
    return products
}

export const GetInventoryLevels=async()=>{
    const products=await prisma.product.findMany({
        
        orderBy: {
            stock: 'asc',
        },
        select: {
            name: true,
            stock: true,
            
        },
        take:6
    })
    return products
}