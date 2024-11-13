"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { GetTopUsers } from "@/actions/AnalyticsAction";
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
        Commande: number;
    };
};

export function TopUsersChart({className}:{className?:string})  {
    const [data, setData] = React.useState<DataType[]>([]);

    React.useEffect(() => {
        async function getData() {
            try {
                const result = await GetTopUsers();
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
        count: item._count.Commande,
    }));

   
    return (
        <Card className={`${cn(className)}`}>
            <CardHeader>
                <CardTitle>Best Users</CardTitle>
                <CardDescription>Top User Command Counts</CardDescription>
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
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing top users by command count.
                </div>
            </CardFooter> */}
        </Card>
    );
}
