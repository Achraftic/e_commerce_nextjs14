"use client"

import { CartesianGrid, LabelList, Line, LineChart, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react"
import { GetInventoryLevels } from "@/actions/AnalyticsAction"
import { cn } from "@/lib/utils"

type DataType = {
  name: string;
  stock: number;
}

// Helper function to truncate labels
const truncateLabel = (label: string, length = 14) => {
  return label.length > length ? `${label.slice(0, length)}...` : label;
};

export function InventoryLevels({className}:{className?:string}) {
  const [data, setData] = React.useState<DataType[]>([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const result = await GetInventoryLevels();
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
        <CardTitle>Inventory Levels</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          data={data}
          margin={{
            top: 24,
            left: 24,
            right: 24,
          }}
          width={500}
          
          height={200}
        >
          <CartesianGrid vertical={false} />
          <Tooltip  />
          <Line
            dataKey="stock"
            type="natural"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ fill: "#8884d8" }}
            activeDot={{ r: 6 }}
            
          >
            <LabelList
              position="top"
              offset={16}
              className="fill-foreground"
              fontSize={10}
              dataKey="name"
              formatter={(name: string) => truncateLabel(name)}
            />
          </Line>
        </LineChart>
      </CardContent>
    </Card>
  )
}
