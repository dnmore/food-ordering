import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  SignInAsAdmin,
  SignInAsCustomer,
} from "@/components/auth/auth-components"
import { DEMO_MODE } from "@/lib/config"
import { verifySession } from "@/lib/dal"

export default async function Page() {
  const isAuthenticated = await verifySession()

  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-16">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-10 text-center">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Crave. Savor. Repeat.
        </h1>

        <p className="text-muted-foreground">
          From juicy burgers to Tex-Mex delights, nachos, nuggets, and
          irresistible desserts, satisfy every craving today!
        </p>
        <Button variant="link" asChild size="lg" className="mt-2 px-6">
          <Link href="/menu">Explore Our Menu</Link>
        </Button>
        {DEMO_MODE && !isAuthenticated && (
          <>
            <div className="w-full bg-muted-foreground/20 p-2 text-center capitalize">
              <p>Demo Mode: OAuth disabled. Use demo accounts to explore.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 pt-6 md:flex-row">
              <SignInAsAdmin />
              <SignInAsCustomer />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
