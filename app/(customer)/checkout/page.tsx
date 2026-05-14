import {redirect} from "next/navigation"
import { verifySession } from "@/lib/dal"
import CheckoutTable from "@/components/table/checkout-table"

export default async function Page() {
  const session = await verifySession()
  if (!session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex-col items-center gap-4 px-2 py-10">
        <h1 className="mb-6 text-3xl font-extrabold md:text-5xl">Checkout</h1>

        <CheckoutTable />
      </div>
    </div>
  )
}
