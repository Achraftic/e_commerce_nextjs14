'use server'
import prisma from "../../prisma/db";

export async function getStatsForCard() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1);

    const [products_count, order, earnThisMonth, earnThisYear] = await Promise.all([
        prisma.product.count(),
        prisma.commande.count(),
        prisma.commande.aggregate({
            _sum: { montant_total: true },
            where: { createdAt: { gte: firstDayOfMonth } }
        }),
        prisma.commande.aggregate({
            _sum: { montant_total: true },
            where: { createdAt: { gte: firstDayOfYear } }
        })
    ])

    return { products_count, order, earnThisMonth, earnThisYear }

}