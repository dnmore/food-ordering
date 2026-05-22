import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CartItem } from "@/lib/definitions"

type CartStore = {
  cartItems: CartItem[]

  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void

  hydrated: boolean
  setHydrated: (value: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),

      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id)

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                    }
                  : i
              ),
            }
          }

          return {
            cartItems: [...state.cartItems, item],
          }
        })
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }))
      },

      increaseQuantity: (id) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        }))
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: Math.max(0, item.quantity - 1),
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }))
      },

      clearCart: () => {
        set({ cartItems: [] })
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)
