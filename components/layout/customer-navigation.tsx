import Link from "next/link"
import { getUserRole } from "@/lib/dal"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default async function CustomerNavigation() {
  const userRole = await getUserRole()

  if (userRole !== "CUSTOMER") {
    return null
  }

  return (
    <>
      
      <DropdownMenuItem>
        <Link href="/checkout">Checkout</Link>
      </DropdownMenuItem>
    </>
  )
}
