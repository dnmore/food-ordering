import { getDashboardStats } from "@/lib/data"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingBag, ReceiptText } from "lucide-react"

const iconMap = {
  
  orders: ShoppingBag,
  revenue: DollarSign,
  aov: ReceiptText,
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
        title="Total Orders"
        value={totalOrders}
        type="orders"
      />

      <DashboardCard
        title="Total Revenue"
        value={totalRevenue}
        type="revenue"
      />

      <DashboardCard
        title="Average Order Value"
        value={averageOrderValue}
        type="aov"
      />
    </div>
  )
}
export function DashboardCard({
  title,
  value,
  type,
  
}: {
  title: string
  value: number | string
  type: "revenue" | "orders" | "aov"
  
}) {
  const Icon = iconMap[type]

  return (
    <Card>
      <CardHeader>
        <Icon aria-hidden="true" className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}


