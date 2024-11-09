'use server'

import { revalidatePath, unstable_cache } from "next/cache";
import prisma from "../../prisma/db";
import { UTApi } from "uploadthing/server";
import { redirect } from "next/navigation";




export const fetchProducts = async (searchParams: {
    category?: string;
    price?: string;
    s?: string;
    page?: number
}) => {

    try {
        // Extract and parse search parameters
        const categories = searchParams.category ? searchParams.category.split(',').filter(Boolean) : [];
        const price = searchParams.price ? parseFloat(searchParams.price) : 0;
        const page = searchParams.page || 1; // Default to page 1 if not provided

        // Create base query for product filtering
        const whereConditions: any = {
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
        };

        // Add search term to conditions if provided
        if (searchParams.s) {
            whereConditions.AND.push({
                name: {
                    contains: searchParams.s,
                },
            });
        }

        // Fetch products from the database with filtering, ordering, and pagination

        const products = await prisma.product.findMany({
            include: {
                Category: true,

            },
            where: whereConditions,
            orderBy: {
                price: 'desc',
            },

            take: 3, // Number of items per page
            skip: (page - 1) * 3,
        });

        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
};



export const AddProduct = async (data: FormData) => {
    const productData = Object.fromEntries(data.entries());
    console.log(productData.image);
    const utapi = new UTApi();


    const imageFile = productData.image as File;

    if (!(imageFile instanceof File)) {
        throw new Error("Image is not a valid file");
    }

    const response = await utapi.uploadFiles([imageFile]);

    const resulte = await prisma.product.create({
        data: {
            name: productData.name as string,
            price: Number(productData.price),
            stock: Number(productData.stock),
            description: productData.description as string,
            imageUrl: response[0].data?.url as string,
            Category: {
                connect: {
                    id: Number(productData.category), // Convert to number before connecting productData.category ,
                },
            },
        },
    });
    redirect("/dashboard/products");

}

export const editProduct = async (data: FormData, id: number) => {

    const productData = Object.fromEntries(data.entries());
    const utapi = new UTApi();
    const imageFile = productData.image as File;

    const product = await prisma.product.findUnique({ where: { id: id } });
    if (!product) {
        throw "product not found"
    }
    const updateData = {
        name: productData.name as string,
        price: Number(productData.price),
        stock: Number(productData.stock),
        description: productData.description as string,
        imageUrl: product?.imageUrl as string,
        Category: {
            connect: {
                id: Number(productData.category), // Convert to number before connecting productData.category,
            },
        },
    };

    // Only update image if a new image file is provided
    if (imageFile instanceof File && imageFile.size > 0) {

        const response = await utapi.uploadFiles([imageFile]);
        updateData.imageUrl = response[0].data?.url as string;
        if (product?.imageUrl) {
            const newUrl = product?.imageUrl.substring(product?.imageUrl.lastIndexOf("/") + 1);
            console.log(newUrl)
            const resulte = await utapi.deleteFiles(newUrl);
            console.log(resulte)
        }
    }

    // Update the product with the conditional data
    const resulte = await prisma.product.update({
        data: updateData,
        where: {
            id: id,
        },
    });


    // Redirect to dashboard
    redirect("/dashboard/products");
};

export const deleteProduct = async (id: number) => {
    console.log(id)
    try {

        await prisma.product.delete({ where: { id: id } });
        revalidatePath("/dashboard/products");
    }
    catch (error) {
        console.log(error)
    }
}
export const getCategories = async () => {
    const categories = await prisma.category.findMany();
    return categories;
}
const delteMultipleProduct = async () => {
    const products = await prisma.product.deleteMany({
        where: {
            id: {
                in: [1, 2, 3]
            }
        }
    })
}

export const getLastestProducts = async () => {
    const products = await prisma.product.findMany({
        include: {
            Category: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 4
    })
    return products
}

export const getAllProducts = unstable_cache(async () => {
    const data = await prisma.product.findMany({
        include: {
            Category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return data
})


export const getProductsById = async (id: number) => {
    //   const cookieStore = cookies();
    //   let recentlyViewed = cookieStore.get("recentlyViewed")?.value;

    //   let viewedArray = recentlyViewed ? JSON.parse(recentlyViewed) : [];

    //   if (!viewedArray.includes(id)) {
    //     if (viewedArray.length >= 5) {
    //       viewedArray.shift();
    //     }
    //     viewedArray.push(id);
    //     console.log(viewedArray);
    //     cookieStore.set("recentlyViewed", JSON.stringify(viewedArray));
    //   }

    const product = await prisma.product.findUnique({
        where: { id },
        include: { Category: true }
    });

    return product;
};


export const GetOrderClient = async (userId: string) => {
    const orders = await prisma.commande.findMany({
      
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    return orders
}

export const GetOrderItems = async (orderid: number) =>{

 const orderitems=await prisma.ligneCommande.findMany(
    {
        where: {
            CommandeId: orderid

        },
        include: {
            product: {
                select: {
                    name: true,
                    price: true,
                    imageUrl: true,

                }
            }
        }
    }
)
return orderitems;
}
