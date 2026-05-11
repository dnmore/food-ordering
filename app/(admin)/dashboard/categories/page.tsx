import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTable } from "@/components/ui/data-table"
import { categoriesColumns } from "../categories/columns"
import { getCategoriesTable } from "@/lib/data"

export default async function Page() {
  const categoriesData = await getCategoriesTable()

  return (
    <div>
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="mt-6 flex gap-4">
        <Button asChild size="lg">
          <Link href="/dashboard/menu/categories/create"> Add Category</Link>
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={categoriesColumns} data={categoriesData} />
      </div>
    </div>
  )
}
