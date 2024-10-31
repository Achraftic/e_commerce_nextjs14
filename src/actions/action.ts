/* eslint-disable prefer-const */
'use server';
import { cookies } from "next/headers";
import { handleMergeArray } from "@/utils/utils";
import prisma from "../../prisma/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import { CartItemsType } from "@/types/type";



async function getUserId() {
    const session = await auth();
    return session?.user?.id;
}

async function getOrCreateCart(userId: string) {
    let existingCart = await prisma.cart.findFirst({ where: { userId } });

    // Create a cart if it doesn't exist
    if (!existingCart) {
        existingCart = await prisma.cart.create({
            data: {
                User: { connect: { id: userId } },
            },
        });
    }
    return existingCart;
}

async function getOrCreateCartForAnonymous() {
    const Cookies = await cookies()
    const cartIdFromCookie = Cookies.get("cartid");

    if (cartIdFromCookie) {
        return JSON.parse(cartIdFromCookie.value);
    }

    try {
        const newCart = await prisma.cart.create({ data: { userId: null } });
        Cookies.set("cartid", JSON.stringify(newCart.id), { path: '/' });
        console.log('Cart created:', newCart);
        return newCart.id;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
}

async function fetchCartItems(cartId: number) {
    return await prisma.cartItem.findMany({
        where: { cartId },
        select: {
            quantity: true,
            product: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    stock: true,
                    imageUrl: true,
                },
            },
        },
    });
}

async function handleAnonymousCart(existingCartId: number, existingCartItems: CartItemsType[]) {
    const Cookies = cookies()
    console.log("lisstenning to anonymous cart");
    const cartCookie = Cookies.get("cartid");

    if (cartCookie) {
        const idCart = JSON.parse(cartCookie.value) as number;
        const cartFromCookie = await fetchCartItems(idCart);

        const mergedCartItems = handleMergeArray(cartFromCookie, existingCartItems);

        console.log("from cookie", cartFromCookie);
        console.log("from server", existingCartItems);
        console.log("from server", mergedCartItems);

        await Promise.all(
            mergedCartItems.map(async (item) => {
                await prisma.cartItem.upsert({
                    where: {
                        cartId_productId: {
                            cartId: existingCartId,
                            productId: item.product.id,
                        },
                    },
                    update: {
                        quantity: item.quantity,
                    },
                    create: {
                        cartId: existingCartId,
                        productId: item.product.id,
                        quantity: item.quantity,
                    },
                });
            })
        );

    }
}

export async function getCartItems() {
    const userId = await getUserId();

    if (userId) {
        const existingCart = await getOrCreateCart(userId);
        const existingCartItems = await fetchCartItems(existingCart.id);

        if (existingCartItems.length !== 0) {
            await handleAnonymousCart(existingCart.id, existingCartItems);
        }


        return existingCartItems;
    } else {
        const Cookies = cookies()
        const cartCookie = Cookies.get("cartid");

        if (cartCookie) {
            const idCart = JSON.parse(cartCookie.value);
            return await fetchCartItems(idCart);
        }
    }
}

export async function addToCart(productId: number) {
    const userId = await getUserId();
    const Cookies =  cookies()
    if (userId) {
        const existingCart = await getOrCreateCart(userId);
        const cartIdFromCookie = Cookies.get("cartid");

        if (cartIdFromCookie) {
            await prisma.cart.delete({ where: { id: JSON.parse(cartIdFromCookie.value) } });
            Cookies.delete("cartid");
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
        const product = await prisma.product.findUnique({ where: { id: productId } });

        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        const cartId = await getOrCreateCartForAnonymous();
        await prisma.cartItem.upsert({
            where: {
                cartId_productId: { cartId, productId },
            },
            create: {
                cartId,
                productId,
                quantity: 1,
            },
            update: {
                quantity: {
                    increment: 1,
                },
            },
        });
    }

    revalidatePath('/');
    return { message: "Added to cart successfully" };
}


export async function cartCount() {
    const userId = await getUserId();
    if (userId) {
        const existingCart = await prisma.cart.findFirst({ where: { userId } });

        if (!existingCart) {
            return {
                count: 0
            }
        }
        const cartcount = await prisma.cartItem.count({
            where: {
                cartId: existingCart.id,

            }
        });
        return {
            count: cartcount
        };
    } else {
        const cartCookie = cookies().get("cartid");
        if (cartCookie) {
            const idCart = JSON.parse(cartCookie.value);
            const cartcount = await prisma.cartItem.count({
                where: {
                    cartId: idCart,

                }
            });
            return { count: cartcount };
        }
        else {
            return {
                count: 0
            }
        }
    }

}

export const removeFromCart = async (productId: number) => {
    const userId = await getUserId();
    if (userId) {
        const existingCart = await prisma.cart.findFirst({ where: { userId } });

        if (!existingCart) {
            return { message: "Cart not found" };
        }
        await prisma.cartItem.delete({
            where: {
                cartId_productId: {
                    cartId: existingCart.id,
                    productId,
                },
            },
        });
        revalidatePath('/');
        return { message: "Removed from cart successfully" };
    } else {
        const cartCookie = cookies().get("cartid");
        if (cartCookie) {
            const idCart = JSON.parse(cartCookie.value);
            await prisma.cartItem.delete({
                where: {
                    cartId_productId: {
                        cartId: idCart,
                        productId,
                    },
                },
            });
            revalidatePath('/');
            return { message: "Removed from cart successfully" };
        }
    }
}