"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
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
import { GetOverView } from "@/actions/AnalyticsAction";
import React from "react";
import { cn } from "@/lib/utils";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type DataType = {
  month: string;
  totalMontant: number;
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Overview({className}:{className?:string}) {
  const [data, setData] = React.useState<DataType[]>([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const result = await GetOverView();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    getData();
  }, []);
 

  return (
    <Card className={`${cn(className)}`}>
      <CardHeader>
        <CardTitle>Bar Chart - Monthly Sales</CardTitle>
        <CardDescription>Monthly Sales for January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>  months[value.slice(5, value.length)]} // Use full names if required
            />
            
            <ChartTooltip
              cursor={{ fill: "rgba(200, 200, 200, 0.5)" }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="totalMontant" fill="#A020F0" radius={[8, 8, 0, 0]}>
              <LabelList
                dataKey="totalMontant"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
