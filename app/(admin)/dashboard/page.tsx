import DashboardCards from "@/components/cards/dashboard-cards"
import { RevenueCard } from "@/components/cards/revenue-card"


export default function Page(){
    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <DashboardCards />
            <RevenueCard />
        </div>
    )
}