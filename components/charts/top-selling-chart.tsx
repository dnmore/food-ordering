"use client"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type TopSellingChartProps={
    chartData: {
    name: string,
    revenue: number
    }[]
}

export function TopSellingChart({chartData}: TopSellingChartProps){
return(
    <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
             margin={{
              left: 15,
            }}
          >
            <XAxis type="number" dataKey="revenue" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--chart-2)" radius={5} />
          </BarChart>
        </ChartContainer>
)
}