import { verifySession } from "@/lib/dal"
import Link from "next/link"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Cart from "@/components/cart/cart"
import { UserIcon } from "lucide-react"
import { SignIn, SignOut } from "@/components/auth/auth-components"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AdminNavigation from "@/components/layout/admin-navigation"
import CustomerNavigation from "@/components/layout/customer-navigation"

export default async function Navbar() {
  const isAuthenticated = await verifySession()

  return (
    <header className="w-full border-b border-b-muted bg-background p-4">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between"
      >
        <p className="font-mono font-medium">CraveWaves</p>

        <div className="flex items-center gap-2">
          {isAuthenticated?.user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open user menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`${isAuthenticated.user?.image ?? ""}`}
                        alt={`${isAuthenticated.user?.name}'s profile picture`}
                      />
                      <AvatarFallback aria-hidden="true">
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  role="menu"
                  className="w-40 p-2"
                >
                  <DropdownMenuItem>
                    <Link href="/menu">Menu</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <CustomerNavigation />
                  <AdminNavigation />
                  <DropdownMenuSeparator />

                  <DropdownMenuItem variant="destructive">
                    <SignOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <SignIn />
          )}
          <Cart session={isAuthenticated} />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
