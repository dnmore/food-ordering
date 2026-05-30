import type { Metadata} from "next"
import { Suspense } from "react"
import { DataTable } from "@/components/ui/data-table"
import { orderColumns } from "./columns"
import { getOrdersTable } from "@/lib/data"
import { SkeletonTable } from "@/components/layout/skeletons"
import { Folder } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page() {
  const orderTableData = await getOrdersTable()
  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      {orderTableData.length === 0 ? (
  <Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Folder />
    </EmptyMedia>
    <EmptyTitle>No Orders Yet</EmptyTitle>
    <EmptyDescription>You haven&apos;t received any order yet. </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
     
  </EmptyContent>
</Empty>
      ):(
         <div className="container mx-auto py-10">
        <Suspense fallback={<SkeletonTable/>}>
          <DataTable columns={orderColumns} data={orderTableData} />
        </Suspense>
      
      </div>
      )}
     
    </div>
  )
}
