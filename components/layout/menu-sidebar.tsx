"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from "clsx"

import { CategorySelectOption } from "@/lib/definitions"


type MenuSidebarProps = {
  categories: CategorySelectOption[]
}

export function MenuSidebar({ categories }: MenuSidebarProps) {
  const pathname = usePathname()
  
  

  return (
    <aside
      className="flex h-auto w-32 flex-col border-r bg-background md:w-64"
      aria-label="Sidebar"
    >
      <nav
        className="flex flex-1 flex-col gap-2 p-2"
        aria-label="Menu navigation"
      > <Link href="/menu" className="flex h-10 uppercase items-center rounded-md bg-background text-sm text-foreground transition-colors hover:bg-muted mb-4 md:px-3">Menu</Link>
      <p className="text-muted-foreground text-xs uppercase">Categories</p>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/menu/categories/${category.title}`}
            aria-label={category.title}
            aria-current={pathname === `/menu/categories/${category.title}` ? "page" : undefined}
            className={clsx(
              "group flex h-10 items-center justify-center gap-3 rounded-md bg-background text-sm text-foreground transition-colors hover:bg-muted md:justify-start md:px-3",
              {
                "bg-muted font-semibold": pathname === `/menu/categories/${category.title}`,
              }
            )}
          >
          

            {category.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
