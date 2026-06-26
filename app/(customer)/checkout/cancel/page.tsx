import type { Metadata } from "next"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { stripe } from "@/lib/stripe"

type Props = {
  searchParams: Promise<{
    session_id?: string
  }>
}

export const metadata: Metadata = {
  title: "Cancel",
}

export default async function Page({ searchParams }: Props) {
  const { session_id } = await searchParams
  if (!session_id) {
    return <p className="text-center">Invalid Checkout Session</p>
  }

   const session = await stripe.checkout.sessions.retrieve(session_id)
  if (!session || session.payment_status !== "paid") {
    return (
      <div className="container mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-16">
        <div className="w-full border bg-card p-8 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <X className="h-15 w-15 text-red-500" strokeWidth={1.5} />
          </div>

          <h1 className="mb-8 text-xl font-semibold tracking-tight md:text-2xl">
            Payment not successful
          </h1>

          <div className="flex items-center justify-center gap-2">
            <Button asChild>
              <Link href="/checkout">Checkout</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/menu">Menu</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
