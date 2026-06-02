import type { Metadata} from "next"
import {redirect} from "next/navigation"
import { verifySession } from "@/lib/dal"
import CheckoutTable from "@/components/table/checkout-table"
import { CheckoutForm } from "@/components/forms/checkout-form"

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function Page() {
  const session = await verifySession()
  if (!session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex-col items-center gap-4 px-2 py-10">
        <h1 className="mb-6 text-xl font-semibold md:text-2xl">Checkout</h1>

        <CheckoutTable />
        <CheckoutForm />
      </div>
    </div>
  )
}
