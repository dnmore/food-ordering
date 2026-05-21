import prisma from "@/lib/db"
import EditOrderStatusForm from "@/components/forms/edit-status"
import { getOrderStatusSelectOptions } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const statusOptions = await getOrderStatusSelectOptions()
  

  const itemToUpdate = await prisma?.order.findUnique({
    where: { id: id },
    select: {
      id: true,
      status: true
    }
  })

  if (!itemToUpdate) {
    notFound()
  }

  return (
    <div className="pt-6">
      <h1 className="mb-2 ml-1 text-xl md:text-2xl">Update Order Status</h1>
      <div className="container max-w-lg py-10">
       <EditOrderStatusForm id={itemToUpdate.id} status={itemToUpdate.status}/>
      </div>
    </div>
  )
}
