import type { Metadata} from "next"
import { Suspense } from "react"
import { getOrderDetails } from "@/lib/data"
import {OrderTable} from "@/components/table/order-table"
import { notFound } from "next/navigation"
import { SkeletonTable } from "@/components/layout/skeletons"

export const metadata: Metadata = {
  title: 'Order Details',
};


export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const orderDetails = await getOrderDetails(id)

  if (!orderDetails) {
    notFound()
  }

  return (
    <div className="pt-6">
      <h1 className="mb-2 ml-1 text-2xl font-bold">Order Details</h1>
      <div className="container max-w-3xl py-10">
        <Suspense fallback={<SkeletonTable/>}>
          <OrderTable order={orderDetails} />
        </Suspense>
      
      </div>
       
    </div>
  )
}