"use client"

import { useActionState } from "react"
import { useCartStore } from "@/app/store/useCartStore"

import { createOrder, CreateOrderState } from "@/lib/customer/order.actions"
import { CheckoutButton } from "@/components/buttons/checkout-button"

export function CheckoutForm() {
  const { cartItems } = useCartStore()
  const initialState: CreateOrderState = {
  message: null,
  errors: {},
}
const [state, formAction] = useActionState(
  createOrder,
  initialState
)

  return (
    <form
      action={formAction}
    >
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