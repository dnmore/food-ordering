import Link from "next/link"
import { getUserRole } from "@/lib/dal"
import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { DEMO_MODE } from "@/lib/config"

export default async function AdminNavigation() {
  const userRole = await getUserRole()

  if (userRole !== "ADMIN") {
    return null
  }

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          Admin Panel {DEMO_MODE && <p>(DEMO MODE - View Only)</p>}
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/dashboard">Analytics</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/categories">Categories</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/items">Items</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/orders">Orders</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}
