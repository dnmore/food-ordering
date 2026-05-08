"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from "clsx"

import { LayoutDashboard, ChefHat, ShoppingBag } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const links = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: ChefHat,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="flex h-auto w-16 flex-col border-r bg-background md:w-64"
      aria-label="Sidebar"
    >
      <TooltipProvider delayDuration={0}>
        <nav
          className="flex flex-1 flex-col gap-1 p-2"
          aria-label="Dashboard navigation"
        >
          {links.map(({ name, href, icon: Icon }) => {
            const link = (
              <Link
                href={href}
                aria-label={name}
                aria-current={pathname === href ? "page" : undefined}
                className={clsx(
                  "group flex h-10 items-center justify-center gap-3 rounded-md bg-background text-sm text-foreground transition-colors hover:bg-muted md:justify-start md:px-3",
                  {
                    "bg-muted font-bold": pathname === href,
                  }
                )}
              >
                <Icon aria-hidden="true" />

                <span className="hidden md:inline">{name}</span>
              </Link>
            )

            return (
              <Tooltip key={href}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" className="md:hidden">
                  {name}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
      </TooltipProvider>
    </aside>
  )
}
