"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { GetTopProducts } from "@/actions/AnalyticsAction";
import { cn } from "@/lib/utils";

// Configuration for chart colors
const chartConfig = {
    count: {
        label: "Count",
        color: "#A020F0",
    },
    name: {
        label: "Name",
        color: "#A020F0",
    },
} satisfies ChartConfig;

type DataType = {
    name: string | null;
    _count: {
        LigneCommande: number;
    };
};

export function TopProductsCharts({className}:{className?:string}) {
    const [data, setData] = React.useState<DataType[]>([]);

    React.useEffect(() => {
        async function getData() {
            try {
                const result = await GetTopProducts();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        getData();
    }, []);

    // Transform data for chart rendering
    const chartData = data.map((item) => ({
        name: item.name,
        count: item._count.LigneCommande,
    }));

    

    return (
        <Card className={`${cn(className)}`}>
            <CardHeader>
                <CardTitle>Best Selling Products </CardTitle>
                <CardDescription>Top Products was ordered </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer  config={chartConfig}>
                    <BarChart accessibilityLayer  width={600} height={300} data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="count" fill={chartConfig.count.color} radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
         
        </Card>
    );
}
