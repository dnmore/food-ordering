import type { Metadata} from "next"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTable } from "@/components/ui/data-table"
import { menuItemsColumns } from "../items/columns"
import { getMenuItemsTable } from "@/lib/data"
import { SkeletonTable } from "@/components/layout/skeletons"
import { Folder } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export const metadata: Metadata = {
  title: 'Menu Items',
};

export default async function Page() {
  const menuItemsData = await getMenuItemsTable()
  return (
    <div>
      <h1 className="text-xl font-semibold md:text-2xl">Menu Items</h1>
      {menuItemsData.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder />
            </EmptyMedia>
            <EmptyTitle>No Menu Items Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any menu item yet. Get started by
              creating your first item.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild size="lg" >
              <Link href="/dashboard/items/create"> Add Item</Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="container mx-auto py-10">
          <Button asChild size="lg" className="mb-2">
            <Link href="/dashboard/items/create"> Add Item</Link>
          </Button>
          <Suspense fallback={<SkeletonTable />}>
            <DataTable columns={menuItemsColumns} data={menuItemsData} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
