import { render, screen } from "@testing-library/react"
import Page from "@/app/page"

jest.mock("@/lib/dal", () => ({
  verifySession: jest.fn(),
}))

jest.mock("@/lib/config", () => ({
  DEMO_MODE: true,
}))

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...props
  }: React.PropsWithChildren<{ href: string }>) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

jest.mock("@/components/ui/button", () => ({
  Button: ({ children }: React.PropsWithChildren) => (
    <button>{children}</button>
  ),
}))

const mockAdminClick = jest.fn()
const mockCustomerClick = jest.fn()

jest.mock("@/components/auth/auth-components", () => ({
  SignInAsAdmin: () => (
    <button onClick={mockAdminClick}>Sign in as Admin</button>
  ),
  SignInAsCustomer: () => (
    <button onClick={mockCustomerClick}>Sign in as Customer</button>
  ),
}))

jest.mock("@/components/landing/value-stripe", () => ({
  ValueStripe: () => <div data-testid="value-stripe" />,
}))

jest.mock("@/components/landing/features", () => ({
  Features: () => <div data-testid="features" />,
}))

jest.mock("@/components/landing/own-business", () => ({
  OwnBusiness: () => <div data-testid="own-business" />,
}))

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  CardContent: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  CardHeader: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  CardTitle: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}))

const { verifySession } = jest.requireMock("@/lib/dal") as {
  verifySession: jest.Mock
}

async function renderPage() {
  const ui = await Page()
  return render(ui)
}

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    verifySession.mockResolvedValue(false)
  })

  describe("rendering", () => {
    it("renders the main heading", async () => {
      await renderPage()

      expect(
        screen.getByRole("heading", {
          name: /Your restaurant deserves an ordering system you own/i,
          level: 1,
        })
      ).toBeInTheDocument()
    })

    it("renders the marketing description", async () => {
      await renderPage()

      expect(
        screen.getByText(
          /Cravewaves gives restaurants a complete direct-ordering experience—from menus and checkout to orders, menu management, and business analytics/i
        )
      ).toBeInTheDocument()
    })
  })

  describe("conditional rendering", () => {
    it("shows demo banner and sign-in buttons when demo mode is enabled and user is unauthenticated", async () => {
      verifySession.mockResolvedValue(false)

      await renderPage()

      expect(
        screen.getByText(
          /Demo Mode: OAuth disabled\. Use read-only demo accounts to explore\./i
        )
      ).toBeInTheDocument()

      expect(
        screen.getAllByRole("button", {
          name: /sign in as admin/i,
        })
      ).toHaveLength(2)

      expect(
        screen.getAllByRole("button", {
          name: /sign in as customer/i,
        })
      ).toHaveLength(2)
    })

    it("does not render demo controls for authenticated users", async () => {
      verifySession.mockResolvedValue(true)

      await renderPage()

      expect(screen.queryByText(/demo mode/i)).not.toBeInTheDocument()

      expect(
        screen.queryByRole("button", {
          name: /sign in as admin/i,
        })
      ).not.toBeInTheDocument()

      expect(
        screen.queryByRole("button", {
          name: /sign in as customer/i,
        })
      ).not.toBeInTheDocument()
    })
  })
})
