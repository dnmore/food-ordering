import Link from "next/link"
import { getUserRole } from "@/lib/dal"

import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default async function CustomerNavigation() {
  
  const userRole = await getUserRole()

  if (userRole !== "CUSTOMER") {
    return null
  }

  return (
    <>
    
      <DropdownMenuGroup>
        <DropdownMenuLabel>Customer Panel</DropdownMenuLabel>
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
