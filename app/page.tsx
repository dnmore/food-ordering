import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  SignInAsAdmin,
  SignInAsCustomer,
} from "@/components/auth/auth-components"
import { DEMO_MODE } from "@/lib/config"
import { verifySession } from "@/lib/dal"
import { ValueStripe } from "@/components/landing/value-strip"
import { Features } from "@/components/landing/features"
import { OwnBusiness } from "@/components/landing/own-business"

export default async function Page() {
  const isAuthenticated = await verifySession()

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 px-4">
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-16 bg-zinc-50 dark:bg-neutral-900 shadow-sm">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-10 text-center">
          <h1 className="text-4xl font-semibold md:text-6xl">
            Your restaurant deserves an ordering system you own.
          </h1>

          <p className="text-muted-foreground">
            Cravewaves gives restaurants a complete direct-ordering
            experience—from menus and checkout to orders, menu management, and
            business analytics.
          </p>

          {DEMO_MODE && !isAuthenticated && (
            <>
              <div className="w-full bg-muted-foreground/20 p-2 text-center capitalize">
                <p>
                  Demo Mode: OAuth disabled. Use read-only demo accounts to
                  explore.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 pt-6 md:flex-row">
                <SignInAsAdmin />
                <SignInAsCustomer />
              </div>
            </>
          )}
        </div>
      </div>
      {/* Value Strip */}
      <ValueStripe />

      {/* Features */}
      <Features />
      {/* Own Your Business */}
      <OwnBusiness />
      {/* CTA */}
      <Card className="w-full bg-zinc-50 py-12 text-center md:px-8 dark:bg-neutral-900">
        <CardHeader>
          <CardTitle>
            <h3 className="text-xl font-bold md:text-2xl">
              Want to see it in action?
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <SignInAsAdmin />
            <SignInAsCustomer />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
