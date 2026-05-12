import prisma from "@/lib/db"
import EditMenuItemForm from "@/components/forms/edit-item"
import { getCategoriesSelectOptions } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const categoriesData = await getCategoriesSelectOptions()
  

  const itemToUpdate = await prisma?.menuItem.findUnique({
    where: { id: id },
  })

  if (!itemToUpdate) {
    notFound()
  }

  return (
    <div className="pt-6">
      <h1 className="mb-2 ml-1 text-xl md:text-2xl">Edit Item</h1>
      <div className="container max-w-lg py-10">
        <EditMenuItemForm categoryOptions={categoriesData} menuItem={{...itemToUpdate, price:itemToUpdate.price.toNumber() }} />
      </div>
    </div>
  )
}
