import { TrendingUp } from "lucide-react"
import { getTopSellingChartData } from "@/lib/data"
import { TopSellingChart } from "@/components/charts/top-selling-chart"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export async function TopSellingCard(){
    const chartData = await getTopSellingChartData()

    return(
         <Card>
      <CardHeader>
        <CardTitle>Top Selling Items  </CardTitle>
        <CardDescription>January - June 2026</CardDescription>
      </CardHeader>
      <CardContent className="pr-24">
        <TopSellingChart chartData={chartData} />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top menu items for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
    
}