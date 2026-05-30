import type { Metadata} from "next"
import { Suspense } from "react"
import prisma from "@/lib/db"
import EditOrderStatusForm from "@/components/forms/edit-status"
import { notFound } from "next/navigation"
import { SkeletonForm } from "@/components/layout/skeletons"

export const metadata: Metadata = {
  title: 'Update Order Status',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const itemToUpdate = await prisma?.order.findUnique({
    where: { id: id },
    select: {
      id: true,
      status: true,
    },
  })

  if (!itemToUpdate) {
    notFound()
  }

  return (
    <div className="pt-6">
      <h1 className="mb-2 ml-1 text-xl md:text-2xl">
        Update Order Status 
      </h1>
      <p className="text-sm md:text-xl  text-muted-foreground"> #{itemToUpdate.id}</p>
      <div className="container max-w-lg py-10">
        <Suspense fallback={<SkeletonForm />}>
          <EditOrderStatusForm
            id={itemToUpdate.id}
            status={itemToUpdate.status}
          />
        </Suspense>
      </div>
    </div>
  )
}
