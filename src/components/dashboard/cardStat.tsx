'use client';
import React, { useEffect, useState } from 'react';
import { getStatsForCard } from '@/actions/dashboardAction';
import H1 from '../ui/h1';
import { BsBoxSeam, BsCartCheck, BsCurrencyDollar } from 'react-icons/bs';
import SkeltonCardStat from './SkeltonCardStat';

type Stats = {
    products_count: number;
    order: number;
    earnThisMonth: number;
    earnThisYear: number;
};

export default function CardStat() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const { products_count, order, earnThisMonth, earnThisYear } = await getStatsForCard();
            setStats({
                products_count,
                order,
                earnThisMonth: earnThisMonth?._sum?.montant_total || 0,
                earnThisYear: earnThisYear?._sum?.montant_total || 0,
            });
        };

        fetchStats();
    }, []);

    if (!stats) {
        return <><SkeltonCardStat /></>;
    }

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-4 *:rounded-lg mt-6">
            {/* Products Count */}
            <div className="bg-zinc-100/70 dark:bg-zinc-800 shadow-zinc-100 dark:text-zinc-50 py-3 shadow-md dark:shadow-sm    px-4 flex items-center gap-4 ">
                <div className="bg-purple-300/40 dark:bg-purple-300 p-3 rounded-full">
                    <BsBoxSeam className="text-purple-800" size={20} />
                </div>
                <div className="">
                    <H1 className="mb-0 text-2xl text-zinc-900 dark:text-zinc-100">{stats.products_count}</H1>
                    <span className="text-zinc-400 dark:text-zinc-400 font-medium">Products</span>
                </div>
            </div>

            {/* Orders Count */}
            <div className="bg-zinc-100/70 dark:bg-zinc-800 shadow-zinc-100 dark:text-zinc-50 py-3 shadow-md dark:shadow-sm    px-4 flex items-center  gap-4 ">
                <div className="bg-green-300/40 dark:bg-green-300 p-3 rounded-full">
                    <BsCartCheck className="text-green-800" size={20} />
                </div>
                <div className="">
                    <H1 className="mb-0 text-2xl text-zinc-900 dark:text-zinc-100">{stats.order}</H1>
                    <span className="text-zinc-400  font-medium">Orders</span>
                </div>
            </div>

            {/* Earnings This Month */}
            <div className="bg-zinc-100/70 dark:bg-zinc-800 shadow-zinc-100 dark:text-zinc-50 py-3 shadow-md dark:shadow-sm    px-4 flex items-center  gap-4 ">
                <div className="bg-blue-300/40 dark:bg-blue-300 p-3 rounded-full">
                    <BsCurrencyDollar className="text-blue-800" size={20} />
                </div>
                <div className="">
                    <H1 className="mb-0 text-2xl text-zinc-900 dark:text-zinc-100">${stats.earnThisMonth}</H1>
                    <span className="text-zinc-400  font-medium">Earnings (This Month)</span>
                </div>
            </div>

            {/* Earnings This Year */}
            <div className="bg-zinc-100/70 dark:bg-zinc-800 shadow-zinc-100 dark:text-zinc-50 py-3 shadow-md dark:shadow-sm    px-4 flex items-center  gap-4 ">
                <div className="bg-yellow-300/40 dark:bg-yellow-300 p-3 rounded-full h-max">
                    <BsCurrencyDollar className="text-yellow-800" size={20} />
                </div>
                <div className="">
                    <H1 className="mb-0 text-2xl text-zinc-900 dark:text-zinc-100">${stats.earnThisYear}</H1>
                    <span className="text-zinc-400  font-medium">Earnings (This Year)</span>
                </div>
            </div>
        </div>
    );
}
