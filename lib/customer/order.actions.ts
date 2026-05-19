"use server"

import prisma from "@/lib/db"
import { Prisma, OrderStatus } from "@prisma/client"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const OrderItemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().int().positive(),
})

const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1, "Cart is empty"),
})

export type CreateOrderState = {
  errors?: {
    items?: string[]
  }
  message?: string | null
}

export async function createOrder(
  prevState: CreateOrderState,
  formData: FormData
): Promise<CreateOrderState> {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/")
  }

  const rawItems = formData.getAll("items")

  const parsedItems = rawItems.map((item) => JSON.parse(item as string))

  const validatedFields = CreateOrderSchema.safeParse({
    items: parsedItems,
  })

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)

    return {
      errors: {
        items: tree.properties?.items?.errors,
      },

      message: "Invalid order submission.",
    }
  }

  const { items } = validatedFields.data

  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: items.map((item) => item.menuItemId),
      },
    },
  })

  if (menuItems.length !== items.length) {
    return {
      message: "Some menu items no longer exist.",
    }
  }

  const orderItems = items.map((cartItem) => {
    const menuItem = menuItems.find((item) => item.id === cartItem.menuItemId)

    if (!menuItem) {
      throw new Error("Menu item not found")
    }

    const unitPrice = new Prisma.Decimal(menuItem.price)

    return {
      menuItemId: menuItem.id,
      quantity: cartItem.quantity,
      unitPrice,
      totalPrice: unitPrice.mul(cartItem.quantity),
    }
  })

  const totalAmount = orderItems.reduce(
    (acc, item) => acc.add(item.totalPrice),
    new Prisma.Decimal(0)
  )

  await prisma.order.create({
    data: {
      userId: session.user.id,

      status: OrderStatus.PENDING,

      totalAmount,

      items: {
        create: orderItems,
      },
    },
  })

  revalidatePath("/dashboard/orders")
  redirect("/checkout/success")
}
