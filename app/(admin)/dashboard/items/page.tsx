import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTable } from "@/components/ui/data-table"
import { menuItemsColumns } from "../items/columns"
import { getMenuItemsTable } from "@/lib/data"

export default async function Page() {
  const menuItemsData = await getMenuItemsTable()
  return (
    <div>
      <h1 className="text-2xl font-bold">Items</h1>
      <div className="mt-6 flex gap-4">
        <Button asChild size="lg">
          <Link href="/dashboard/menu/items/create"> Add Item</Link>
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={menuItemsColumns} data={menuItemsData} />
      </div>
    </div>
  )
}
