import { DataTable } from "@/components/ui/data-table"
import { orderColumns } from "./columns"
import { getOrdersTable } from "@/lib/data"

export default async function Page() {
  const orderTableData = await getOrdersTable()
  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={orderColumns} data={orderTableData} />
      </div>
    </div>
  )
}
