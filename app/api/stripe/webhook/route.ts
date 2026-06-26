import { Stripe } from "stripe"
import prisma from "@/lib/db"
import { OrderStatus } from "@prisma/client"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  let event: Stripe.Event

  try {
    const stripeSignature = req.headers.get("stripe-signature")
    const body = await req.text()

    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"

    if (error! instanceof Error) console.error(error)

    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "checkout.session.expired",
    "payment_intent.payment_failed",
  ]

  if (permittedEvents.includes(event.type)) {
    let data

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session

          const orderId = data.metadata?.orderId

          if (!orderId) {
            return new Response("Missing order")
          }

          await prisma.order.update({
            where: {
              id: orderId,
            },
            data: {
              stripePaymentIntentId: data.payment_intent?.toString(),
              status: OrderStatus.PAID,
            },
          })
          break
        case "checkout.session.expired":
          data = event.data.object as Stripe.Checkout.Session

          const expiredOrderId = data.metadata?.orderId

          await prisma.order.update({
            where: {
              id: expiredOrderId,
            },
            data: {
              status: "CANCELLED",
            },
          })
          break
        case "payment_intent.payment_failed":
          data = event.data.object as Stripe.PaymentIntent

          const failedOrderId = data.metadata?.orderId

          await prisma.order.update({
            where: {
              id: failedOrderId,
            },
            data: {
              status: "CANCELLED",
            },
          })
          break

        default:
          throw new Error(`Unhandled event: ${event.type}`)
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Webhook handler failed", error },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 })
}
