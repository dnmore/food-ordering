import Link from "next/link"
import { getOrderDetails } from "@/lib/data"
import {OrderTable} from "@/components/table/order-table"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"


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
        <OrderTable order={orderDetails} />
      </div>
       
    </div>
  )
}