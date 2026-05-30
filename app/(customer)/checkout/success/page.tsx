import type { Metadata} from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/dal"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: 'Success',
};

export default async function Page() {
    const session = await verifySession()
    if (!session) {
      redirect("/")
    }

  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-16">
      <div className="w-full rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-20 w-20 text-primary" />
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Order Placed Successfully
        </h1>

        <p className="mb-8 text-muted-foreground">
          Thank you for your order. We’ve received it and it is now being
          processed.
        </p>

        <div>
          <Button asChild size="lg">
            <Link href="/menu/categories/Appetizers">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
