"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from "clsx"

import {
  Popcorn,
  Hamburger,
  Salad,
  IceCreamBowl,
  Flame,
  UtensilsCrossed,
} from "lucide-react"

const links = [
  {
    category: "Menu",
    href: "/menu",
    icon: UtensilsCrossed,
  },
  {
    category: "Appetizers",
    href: "/menu/categories/Appetizers",
    icon: Popcorn,
  },
  {
    category: "Burgers",
    href: "/menu/categories/Burgers",
    icon: Hamburger,
  },
  {
    category: "Sides",
    href: "/menu/categories/Sides",
    icon: Salad,
  },
  {
    category: "Desserts",
    href: "/menu/categories/Desserts",
    icon: IceCreamBowl,
  },
  {
    category: "Tex-Mex",
    href: "/menu/categories/Tex-Mex",
    icon: Flame,
  },
]

export function MenuSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="flex h-auto w-16 flex-col border-r bg-background md:w-64"
      aria-label="Sidebar"
    >
      <nav
        className="flex flex-1 flex-col gap-1 p-2"
        aria-label="Menu navigation"
      >
        {links.map(({ category, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={category}
            aria-current={pathname === href ? "page" : undefined}
            className={clsx(
              "group flex h-10 items-center justify-center gap-3 rounded-md bg-background text-sm text-foreground transition-colors hover:bg-muted md:justify-start md:px-3",
              {
                "bg-muted font-bold": pathname === href,
              }
            )}
          >
            <Icon aria-hidden="true" className="h-5 w-5" />

            <span className="hidden md:inline">{category}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
