"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/app/store/useCartStore"

import { createOrder, CreateOrderState } from "@/lib/customer/order.actions"
import { CheckoutButton } from "@/components/buttons/checkout-button"

export function CheckoutForm() {
  const { cartItems, clearCart } = useCartStore()
  const router = useRouter()
  const initialState: CreateOrderState = {
    success: false,
    message: null,
    errors: {},
  }
  const [state, formAction] = useActionState(createOrder, initialState)

  useEffect(() => {
    if (state.success) {
      router.push("/checkout/success")
      clearCart()
    }
  }, [state.success, clearCart, router])

  return (
    <form action={formAction}>
      {cartItems.map((item) => (
        <input
          key={item.id}
          type="hidden"
          name="items"
          value={JSON.stringify({
            menuItemId: item.id,
            quantity: item.quantity,
          })}
        />
      ))}

      <CheckoutButton disabled={cartItems.length === 0} />
      {state.errors?.items?.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </form>
  )
}
