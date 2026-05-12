import prisma from "@/lib/db"
import EditMenuCategoryForm from "@/components/forms/edit-category"
import { notFound } from "next/navigation"

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const categoryToUpdate = await prisma?.menuCategory.findUnique({
    where: { id: id },
  })

  if (!categoryToUpdate) {
    notFound()
  }

  return (
    <div className="pt-6">
      <h1 className="mb-2 ml-1 text-xl md:text-2xl">Edit Category</h1>
      <div className="container max-w-lg py-10">
        <EditMenuCategoryForm category={categoryToUpdate} />
      </div>
    </div>
  )
}
