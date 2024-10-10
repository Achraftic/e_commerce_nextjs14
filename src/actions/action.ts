/* eslint-disable prefer-const */
'use server';
import { cookies } from "next/headers";
import { handleMergeArray } from "@/utils/utils";
import prisma from "../../prisma/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";

export type ProductCart = {
    id: number;
    name: string;
    price: number;
    stock: number;
    quantity: number;
};

async function userid() {
    const session = await auth();
    return session?.user?.id;
}

async function getOrCreateCart(userId: string) {
    let existingCart = await prisma.cart.findFirst({
        where: { userId },
    });

    // Create a cart if it doesn't exist
    if (!existingCart) {
        existingCart = await prisma.cart.create({
            data: {
                userId: userId,
                User: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
    return existingCart;
}

async function fetchCartItems(cartId: number) {
    return await prisma.cartItem.findMany({
        where: { cartId },
        select: {
            product: true,
            quantity: true,
        },
    });
}

export async function getCartItems() {
    const userId = await userid();

    if (userId) {
        const existingCart = await getOrCreateCart(userId);
        let existingCartItems = await fetchCartItems(existingCart.id);

        // If there are no items in the database, check the cookies
        if (existingCartItems.length === 0) {
            const cartCookie = cookies().get("cart");
            if (cartCookie) {
                const cartFromCookie: ProductCart[] = JSON.parse(cartCookie.value) || [];

                // Add items from the cookie to the database
                await Promise.all(
                    cartFromCookie.map(async (item: ProductCart) => {
                        return await prisma.cartItem.create({
                            data: {
                                quantity: item.quantity,
                                productId: item.id,
                                cartId: existingCart.id,
                            },
                        });
                    })
                );

                // Fetch the updated cart items from the database
                existingCartItems = await fetchCartItems(existingCart.id);
            }
        }

        // Map the database items to the format of ProductCart[]
        const cartItemsFromDB: ProductCart[] = existingCartItems.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            stock: item.product.stock,
            quantity: item.quantity,
        }));

        // Fetch the cart items from the cookies
        const cartCookie = cookies().get("cart");
        console.log(cartCookie);
        const cartFromCookie: ProductCart[] = cartCookie && cartCookie.value ? JSON.parse(cartCookie.value) : [];

        // const cartFromCookie: ProductCart[] = cartCookie ? JSON.parse(cartCookie.value) : [];

        // Merge cart items from database and cookie
        const mergedCartItems = handleMergeArray(cartItemsFromDB, cartFromCookie);
      

        // Loop through each merged cart item and update its quantity in the database
        await Promise.all(
            mergedCartItems.map(async (item) => {
                await prisma.cartItem.upsert({
                    where: {
                        cartId_productId: {
                            cartId: existingCart.id,
                            productId: item.id,
                        },
                    },
                    update: {
                        quantity: item.quantity,
                    },
                    create: {
                        cartId: existingCart.id,
                        productId: item.id,
                        quantity: item.quantity,
                    },
                });
            })
        );

        return mergedCartItems;

    } else {
        // Handle the case for non-authenticated users
        const cartCookie = cookies().get("cart");
        return cartCookie ? JSON.parse(cartCookie.value) : [];
    }
}

export async function addToCart(productId: number) {
    const userId = await userid();

    if (userId) {
        const existingCart = await getOrCreateCart(userId);
        if (cookies().get("cart")) {
            cookies().delete("cart");
        }

        await prisma.cartItem.upsert({
            where: {
                cartId_productId: { cartId: existingCart.id, productId },
            },
            create: {
                cartId: existingCart.id,
                productId,
                quantity: 1,
            },
            update: {
                quantity: {
                    increment: 1,
                },
            },
        });
    } else {
        // Non-authenticated user case
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        const productInfo: ProductCart = {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: 1,
        };

        const cartCookie = cookies().get("cart");
        const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

        // Update the cart in cookies
        const existingProductIndex = cart.findIndex((item: ProductCart) => item.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(productInfo);
        }

        cookies().set("cart", JSON.stringify(cart));
    }

    revalidatePath('/');
    return { message: "Added to cart successfully" };
}
