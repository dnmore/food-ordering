"use client"

import { render, screen } from "@testing-library/react"
import Cart from "@/components/cart/cart"
import { CartItem } from "@/lib/definitions"

// ---------- Mocks ----------

const mockUseCartStore = jest.fn()
const removeFromCart = jest.fn()
const increaseQuantity = jest.fn()
const decreaseQuantity = jest.fn()
const clearCart = jest.fn()

jest.mock("@/app/store/useCartStore", () => ({
  useCartStore: (...args: unknown[]) => mockUseCartStore(...args),
}))

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

jest.mock("lucide-react", () => ({
  ShoppingCart: () => <svg data-testid="shopping-cart-icon" />,
  Trash2: () => <svg data-testid="trash-icon" />,
  Plus: () => <svg data-testid="plus-icon" />,
  Minus: () => <svg data-testid="minus-icon" />,
}))

jest.mock("@/components/ui/button", () => ({
  Button: ({ children }: React.PropsWithChildren) => children,
}))

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <>{children}</>,
  DropdownMenuContent: ({ children }: any) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuSeparator: () => <hr data-testid="separator" />,
}))

const createState = (cartItems: CartItem[]) => ({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
})

const setupStore = (cartItems: CartItem[]) => {
  const state = createState(cartItems)

  mockUseCartStore.mockImplementation((selector?: any) => {
    if (typeof selector === "function") {
      return selector(state)
    }

    return state
  })
}

const items: CartItem[] = [
  {
    id: "1",
    name: "Pizza",
    imageUrl: "/pizza.jpg",
    quantity: 2,
    price: 12.5,
  },
  {
    id: "2",
    name: "Burger",
    imageUrl: "/burger.jpg",
    quantity: 2,
    price: 8,
  },
]

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("rendering", () => {
    it("renders empty cart correctly", () => {
      setupStore([])

      render(<Cart session={null} />)

      expect(screen.getByText("Your Cart")).toBeInTheDocument()
      expect(screen.getByText("0 items")).toBeInTheDocument()
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    })

    it("renders populated cart correctly", () => {
      setupStore(items)

      render(<Cart session={null} />)

      expect(screen.getByText("Pizza")).toBeInTheDocument()
      expect(screen.getByText("Burger")).toBeInTheDocument()

      expect(screen.getByText("€12.50")).toBeInTheDocument()
      expect(screen.getByText("€8.00")).toBeInTheDocument()

      expect(screen.getByText("€41.00")).toBeInTheDocument()
    })

    it("renders images with alt text", () => {
      setupStore(items)

      render(<Cart session={null} />)

      expect(screen.getByAltText("Pizza")).toBeInTheDocument()
      expect(screen.getByAltText("Burger")).toBeInTheDocument()
    })
  })

  describe("conditional rendering", () => {
    it("shows badge only when items exist", () => {
      setupStore([])

      const { rerender } = render(<Cart session={null} />)

      expect(screen.queryByText("4")).not.toBeInTheDocument()

      setupStore(items)

      rerender(<Cart session={null} />)

      expect(screen.getByText("4")).toBeInTheDocument()
    })

    it("shows checkout link when session exists", () => {
      setupStore(items)

      render(<Cart session={{ user: {} } as any} />)

      const checkout = screen.getByRole("link", { name: /checkout/i })

      expect(checkout).toHaveAttribute("href", "/checkout")
    })

    it("shows login button when unauthenticated", () => {
      setupStore(items)

      render(<Cart session={null} />)
      expect(screen.getByText(/login to checkout/i)).toBeInTheDocument()
    })
  })
})
