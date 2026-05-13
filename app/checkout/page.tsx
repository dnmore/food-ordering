"use client"
import { useContext } from "react"
import CartContext from "../context/cart-context"

export default function Page() {
  const { cartItems, totalPrice } = useContext(CartContext)

  return (
    <div className="container mx-auto">
      <div className="flex-col items-center gap-4 py-10">
        <h1 className="mb-6 text-center text-3xl font-extrabold md:text-5xl">
          Checkout
        </h1>
        <ul className="flex flex-col max-w-sm mx-auto gap-4 p-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center border p-4 rounded-lg">
              {item.quantity} x {item.name} - €
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="mt-4 p-4 text-2xl font-bold text-center">
          Total: €{totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  )
}
