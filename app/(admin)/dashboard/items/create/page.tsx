import type { Metadata} from "next"
import { Suspense } from "react"
import CreateMenuItemForm from "@/components/forms/create-item"
import { getCategoriesSelectOptions } from "@/lib/data"
import { SkeletonForm } from "@/components/layout/skeletons"

export const metadata: Metadata = {
  title: 'Create Menu Item',
};

export default async function Page() {
  const categoriesData = await getCategoriesSelectOptions()

  return (
    <div className="pt-6">
      <h1 className="mb-2 ml-1 text-2xl font-bold">Create Menu Item</h1>
      <div className="container max-w-lg py-10">
        <Suspense fallback={<SkeletonForm />}>
          <CreateMenuItemForm categoryOptions={categoriesData} />
        </Suspense>
      </div>
    </div>
  )
}
