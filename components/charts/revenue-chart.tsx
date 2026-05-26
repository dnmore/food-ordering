"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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

type RevenueChartProps={
    chartData: {
    day: string,
    revenue: number
    }[]
}

export function RevenueChart({chartData}: RevenueChartProps){

    return(
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--chart-2)"
              fillOpacity={0.4}
              stroke="var(--chart-2)"
            />
          </AreaChart>
        </ChartContainer>
    )
}