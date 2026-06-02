import type { Metadata} from "next"
import { Suspense } from "react"
import DashboardCards from "@/components/cards/dashboard-cards"
import { RevenueCard } from "@/components/cards/revenue-card"
import { TopSellingCard } from "@/components/cards/top-selling-card"
import { SkeletonCard } from "@/components/layout/skeletons"


export const metadata: Metadata = {
  title: 'Analytics',
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold md:text-2xl">Analytics</h1>
      <Suspense fallback={<SkeletonCard />}>
        <DashboardCards />
      </Suspense>

      <Suspense fallback={<SkeletonCard />}>
        <RevenueCard />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <TopSellingCard />
      </Suspense>
    </div>
  )
}
