import { TrendingUp } from "lucide-react"
import { getRevenueChartData } from "@/lib/data"
import { RevenueChart } from "@/components/charts/revenue-chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export async function RevenueCard() {

  const chartData = await getRevenueChartData()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
        <CardDescription>
          Showing total revenue for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RevenueChart chartData={chartData} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
