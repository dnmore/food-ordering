import { Suspense } from "react"
import prisma from "@/lib/db"
import EditMenuItemForm from "@/components/forms/edit-item"
import { getCategoriesSelectOptions } from "@/lib/data"
import { notFound } from "next/navigation"
import { SkeletonForm } from "@/components/layout/skeletons"

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
      <h1 className="mb-2 ml-1 text-2xl font-bold">Edit Item</h1>
      <div className="container max-w-lg py-10">
        <Suspense fallback={<SkeletonForm/>}>
         <EditMenuItemForm categoryOptions={categoriesData} menuItem={{...itemToUpdate, price:itemToUpdate.price.toNumber() }} />
        </Suspense>
       
      </div>
    </div>
  )
}
