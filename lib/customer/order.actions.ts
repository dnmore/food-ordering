"use server"

import prisma from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { Prisma, OrderStatus } from "@prisma/client"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { DEMO_MODE } from "@/lib/config"


const OrderItemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().int().positive(),
})

const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1, "Cart is empty"),
})

export type CreateOrderState = {
  success: boolean
  errors?: {
    items?: string[]
  }
  message?: string | null
}

export async function createCheckoutSession(
  prevState: CreateOrderState | undefined,
  formData: FormData
): Promise<CreateOrderState> {
  let checkoutUrl: string

  // Authenticate User
  const session = await auth()

  if (!session?.user?.id || DEMO_MODE) {
    redirect("/")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    redirect("/")
  }

  let customerId = user.stripeCustomerId

  if (!user.email) {
    return {
      success: false,
      message: "User email is required.",
    }
  }

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
    })

    customerId = customer.id

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    })
  }

  // Validate Cart

  const rawItems = formData.getAll("items")

  const parsedItems = rawItems.map((item) => JSON.parse(item as string))

  const validatedFields = CreateOrderSchema.safeParse({
    items: parsedItems,
  })

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)

    return {
      success: false,
      errors: {
        items: tree.properties?.items?.errors,
      },
      message: "Invalid order submission.",
    }
  }

  const { items } = validatedFields.data

  // Load Menu Prices From DB

  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: items.map((item) => item.menuItemId),
      },
    },
  })

  if (menuItems.length !== items.length) {
    return {
      success: false,
      message: "Some menu items no longer exist.",
    }
  }
  // Build Order Items

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

  // Calculate Total Amount

  const totalAmount = orderItems.reduce(
    (acc, item) => acc.add(item.totalPrice),
    new Prisma.Decimal(0)
  )
  try {
    // Create Pending Order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,

        status: OrderStatus.PENDING,

        totalAmount,

        items: {
          create: orderItems,
        },
      },
    })

    // Build Stripe Line Items
    const lineItems = orderItems.map((item) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId)!

      return {
        price_data: {
          currency: "eur",

          product_data: {
            name: menuItem.name,
          },

          unit_amount: Math.round(Number(item.unitPrice) * 100),
        },

        quantity: item.quantity,
      }
    })

    // Create Checkout Session

    const stripeSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",

      line_items: lineItems,

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`,

      metadata: {
        orderId: order.id,
        userId: session.user.id,
      },
    })

    if (!stripeSession.url) {
      return {
        success: false,
        message: "Failed to create checkout session URL.",
      }
    }

    checkoutUrl = stripeSession.url

    // Save Stripe Session
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        stripeSessionId: stripeSession.id,
      },
    })
    revalidatePath("/dashboard/orders")
  } catch (error) {
    return {
      success: false,
      message: "Failed to create checkout session",
    }
  }
  redirect(checkoutUrl)
}
