import Link from "next/link"
import { getUserRole } from "@/lib/dal"

import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { DEMO_MODE } from "@/lib/config"

export default async function CustomerNavigation() {
  const userRole = await getUserRole()

  if (userRole !== "CUSTOMER") {
    return null
  }

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          Customer Panel {DEMO_MODE && <p>(DEMO MODE - Read Only)</p>}
        </DropdownMenuLabel>
         <DropdownMenuItem>
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/menu">Menu</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/checkout">Checkout</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}
