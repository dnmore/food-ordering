import CreateMenuItemForm from "@/components/forms/create-item"
import { getCategoriesSelectOptions } from "@/lib/data"

export default async function Page() {
  const categoriesData = await getCategoriesSelectOptions()

  return (
    <div className="pt-6">
      <h1 className="mb-2 ml-1 text-xl md:text-2xl">Create Menu Item</h1>
      <div className="container max-w-lg py-10">
        <CreateMenuItemForm categoryOptions={categoriesData} />
      </div>
    </div>
  )
}
