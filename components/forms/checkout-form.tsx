"use client"

import { useContext, useActionState } from "react"
import CartContext from "@/app/context/cart-context"

import { createOrder, CreateOrderState } from "@/lib/customer/order.actions"
import { CheckoutButton } from "@/components/buttons/checkout-button"

export function CheckoutForm() {
  const { cartItems } = useContext(CartContext)
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