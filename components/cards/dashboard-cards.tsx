import { getDashboardStats } from "@/lib/data"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ShoppingBag, EuroIcon, ChartNoAxesColumn } from "lucide-react"

const iconMap = {
  
  orders: ShoppingBag,
  revenue: EuroIcon,
  aov: ChartNoAxesColumn,
}

export default async function DashboardCards() {
  const {
    totalOrders,
    totalRevenue,
    averageOrderValue,
  } = await getDashboardStats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      

      <DashboardCard
        title="Total Revenue"
        value={totalRevenue}
        type="revenue"
        className="bg-emerald-100 text-emerald-600 p-3 w-sm"
      />

      <DashboardCard
        title="Total Orders"
        value={totalOrders}
        type="orders"
        className="bg-blue-100 text-blue-600 p-3 w-sm"
      />

      <DashboardCard
        value={averageOrderValue.toFixed(2)}
        title="Average Order Value"
        type="aov"
        className="bg-orange-100 text-orange-600 p-3 w-sm"
      />
    </div>
  )
}
export function DashboardCard({
  title,
  value,
  type,
  className
  
}: {
  title: string
  value: number | string
  type: "revenue" | "orders" | "aov"
  className: string
  
}) {
  const Icon = iconMap[type]

  return (
    <Card>
      <CardHeader>
        <div className={className}>
           <Icon aria-hidden="true" className="size-5"  />
        </div>
       
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}


