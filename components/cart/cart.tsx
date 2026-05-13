"use client"

import { useContext } from "react"
import CartContext from "@/app/context/cart-context"
import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default function Cart() {
  const {
    cartItems,
    totalItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          type="button"
          aria-label={`Shopping cart with ${totalItems} items`}
          className="relative inline-flex items-center justify-center p-5"
        >
          <ShoppingCart className="h-5 w-5" />

          {totalItems > 0 && (
            <span
              aria-live="polite"
              className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground"
            >
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[95vw] max-w-md rounded-2xl p-0"
      >
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <p className="text-sm text-muted-foreground">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="max-h-105 overflow-y-auto" aria-label="Cart items">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
              <ShoppingCart className="h-5 w-5" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add delicious food to get started.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b p-4 last:border-none"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="line-clamp-1 font-medium">{item.name}</h3>

                      <p className="text-sm text-muted-foreground">
                        €{item.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div
                      className="flex items-center rounded-lg border"
                      aria-label={`Quantity controls for ${item.name}`}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-2 transition hover:bg-muted"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span
                        className="min-w-10 text-center text-sm font-medium"
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => increaseQuantity(item.id)}
                        className="p-2 transition hover:bg-muted"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="font-semibold">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <DropdownMenuSeparator />

            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total</span>

                <span className="text-lg font-bold">
                  €{totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <Button onClick={clearCart} variant="outline">
                  Clear Cart
                </Button>
                <Button asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
