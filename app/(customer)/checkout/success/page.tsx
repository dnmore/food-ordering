import type { Metadata} from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { stripe } from "@/lib/stripe"
import { ClearCartOnSuccess } from "@/components/cart/clearCartOnSuccess"

type Props = {
  searchParams: Promise<{
    session_id?: string
  }>
}

export const metadata: Metadata = {
  title: 'Success',
};

export default async function Page({searchParams}: Props) {
  const {session_id} = await searchParams
  if(!session_id){
    return <div>Invalid Checkout Session</div>
  }

  const session = await stripe.checkout.sessions.retrieve(session_id)

  if(!session || session.payment_status !== "paid"){
    return <div>Payment not successful</div>
  }

  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-16">
      <div className="w-full border bg-card p-8 text-center shadow-sm">
        <ClearCartOnSuccess/>
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-15 w-15 text-green-500" strokeWidth={1.5} />
        </div>

        <h1 className="mb-3 text-xl md:text-2xl font-semibold tracking-tight">
          Order Placed Successfully
        </h1>

        <p className="mb-8 text-muted-foreground">
          Thank you for your order. We’ve received it and it is now being
          processed.
        </p>

        <div>
          <Button asChild size="lg">
            <Link href="/menu">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
