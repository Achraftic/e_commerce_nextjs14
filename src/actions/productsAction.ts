'use server'

import { revalidatePath } from "next/cache";
import prisma from "../../prisma/db";
import { UTApi, UTFile } from "uploadthing/server";

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


export const AddProduct = async (data: FormData) => {
    const productData = Object.fromEntries(data.entries());
    console.log(productData.image);
    const utapi = new UTApi();

   
    const imageFile = productData.image as File; // Type assertion to File

    if (!(imageFile instanceof File)) {
        throw new Error("Image is not a valid file");
    }

    const response = await utapi.uploadFiles([imageFile]);
   
    const product = await prisma.product.create({
        data: {
            name: productData.name as string,
            price: Number(productData.price),
            stock: Number(productData.stock),
            description: productData.description as string,
            imageUrl: response[0].data?.url as string,
            Category: {
                connect: {
                    id: Number(productData.category) , // Convert to number before connecting productData.category ,
                },
            },
        },
    });
    revalidatePath("/products");
    return product;
}
export const getCategories = async () => {
    const categories = await prisma.category.findMany();
    return categories;
}