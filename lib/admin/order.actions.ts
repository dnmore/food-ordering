"use server"
import prisma from "@/lib/db"
import { requireAdmin } from "@/lib/dal"
import { revalidateTag, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { ORDER_STATUS_OPTIONS } from "@/lib/constants"

const OrderStatusSchema = z.object({
    status: z.enum(ORDER_STATUS_OPTIONS),
})

export type OrderStatusState = {
  errors?: {
    status?: string[]
  }
  message?: string | null
}

export async function updateOrderStatus(
  id: string,
  formData: FormData,
  prevState: OrderStatusState
) {
  await requireAdmin()

  const rawData = {
    status: formData.get("status"),
  }
  const validatedFields = OrderStatusSchema.safeParse(rawData)
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)
    return {
      errors: {
        status: tree.properties?.status?.errors,
      },
      message: "Missing or Invalid Fields. Failed to Update Order.",
    }
  }
  const { status } = validatedFields.data
  await prisma.order.update({
    where: { id: id },
    data: {
      status: status,
    },
  })
  revalidateTag("orders", "max")
  revalidateTag("dashboard", "max")
  revalidatePath("/dashboard/orders")
  revalidatePath(`/dashboard/orders/${id}/details`)
  redirect("/dashboard/orders")
}