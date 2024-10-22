"use server";

import { auth } from "@/auth.config";
import prisma from "../../prisma/db";
import { redirect } from "next/navigation";

export const CreateCommande = async (formdata: FormData) => {
    let message=""
    try {
        const address = formdata.get("address");
        const session = await auth();

        if (!session?.user) {
            return redirect("/");
        }

        const userId = session.user.id;

        // Vérifiez si l'ID de l'utilisateur est défini avant de continuer
        if (!userId) {
            throw new Error("L'utilisateur n'est pas authentifié.");
        }

        // Récupérer le panier de l'utilisateur
        const cart = await prisma.cart.findFirst({ where: { userId } });

        if (!cart) {
            throw new Error("Panier introuvable");
        }

        // Récupérer les articles du panier
        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true // Inclure le produit pour calculer le prix total
            }
        });

        if (cartItems.length === 0) {
            throw new Error("Aucun article dans le panier");
        }

        // Calculer le montant total de la commande
        const montantTotal = cartItems.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);

        // Utilisation d'une transaction pour créer la commande et les lignes de commande ensemble
        await prisma.$transaction(async (tx) => {
            // Créer la commande
            const commande = await tx.commande.create({
                data: {
                    adresse_livraison: address as string,
                    statut: "EN_COURS",
                    moyen_paiement: "paypal",
                    userId, // `userId` est maintenant une `string` définie
                    montant_total: montantTotal
                }
            });

            // Créer les lignes de commande
            await Promise.all(
                cartItems.map(async (item) => {
                    await tx.ligneCommande.create({
                        data: {
                            productId: item.productId,
                            quantite: item.quantity,
                            CommandeId: commande.id,
                            total_ligne: item.product.price * item.quantity
                        }
                    });
                })
            );

            await tx.cartItem.deleteMany({
                where: { cartId: cart.id }
            });
            message="order created succussfully"

        });
        console.log("from the serveur")

    } catch (error) {
          message="Erreur lors de la création de la commande"
        console.error("Erreur lors de la création de la commande :", error);
    }
    finally {
      
        redirect("/checkout/success")
    }
};
