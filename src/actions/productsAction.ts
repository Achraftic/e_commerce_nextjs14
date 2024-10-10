'use server'

import { revalidatePath } from "next/cache";
import prisma from "../../prisma/db";

export const fetchProducts = async (searchParams: { category?: string; price?: string }) => {
    const categories = searchParams?.category ? searchParams.category.split(',').filter(Boolean) : [];

    const price = searchParams.price ? parseFloat(searchParams.price) : 0
    const products = await prisma.product.findMany({
        include: {
            Category: true,
        },
        where: {
            AND: [
                
                ...(categories.length > 0 ? [{
                    Category: {
                        name: {
                            in: categories,
                        },
                    },
                }] : []),
    
                {
                    price: {
                        gte: price,
                    },
                },
            ],
        },
      
    });

    revalidatePath("/products");
    return products;
};
