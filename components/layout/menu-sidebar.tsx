"use client"

import Link from "next/link"
import { CategorySelectOption } from "@/lib/definitions"
import { Button } from "@/components/ui/button"

type MenuSidebarProps = {
  categories: CategorySelectOption[]
}

export function MenuSidebar({ categories }: MenuSidebarProps) {


  return (
    <aside
      className="flex h-auto w-32 flex-col border-r bg-background md:w-64"
      aria-label="Sidebar"
    >
      <nav
        className="flex flex-1 flex-col gap-2 p-2"
        aria-label="Menu navigation"
      >
        <Button asChild variant="link">
          <Link href="/">Home</Link>
        </Button>
        
        <div className="mt-4 flex flex-col gap-2 border-t pt-4">
         <Button asChild >
          <Link href="/menu">Menu</Link>
        </Button>
          {categories.map((category) => (
            <Button asChild variant="link" key={category.id}>
              <Link
                href={`/menu/categories/${category.title}`}
                aria-label={category.title}
              >
                {category.title}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
    </aside>
  )
}
