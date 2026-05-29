import { Suspense } from "react"
import { DataTable } from "@/components/ui/data-table"
import { orderColumns } from "./columns"
import { getOrdersTable } from "@/lib/data"
import { SkeletonTable } from "@/components/layout/skeletons"

export default async function Page() {
  const orderTableData = await getOrdersTable()
  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <div className="container mx-auto py-10">
        <Suspense fallback={<SkeletonTable/>}>
          <DataTable columns={orderColumns} data={orderTableData} />
        </Suspense>
      
      </div>
    </div>
  )
}
