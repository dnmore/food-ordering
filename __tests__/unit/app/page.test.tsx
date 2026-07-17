import { render, screen, cleanup } from "@testing-library/react"

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
  Button: ({ children }: React.PropsWithChildren) => children,
}))

const adminClick = jest.fn()
const customerClick = jest.fn()

jest.mock("@/components/auth/auth-components", () => ({
  SignInAsAdmin: () => <button onClick={adminClick}>Sign in as Admin</button>,
  SignInAsCustomer: () => (
    <button onClick={customerClick}>Sign in as Customer</button>
  ),
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

  afterEach(() => {
    cleanup()
  })

  describe("rendering", () => {
    it("renders the main heading", async () => {
      await renderPage()

      expect(
        screen.getByRole("heading", {
          name: /crave\. savor\. repeat\./i,
          level: 1,
        })
      ).toBeInTheDocument()
    })

    it("renders the marketing description", async () => {
      await renderPage()

      expect(
        screen.getByText(
          /from juicy burgers to tex-mex delights, nachos, nuggets, and irresistible desserts/i
        )
      ).toBeInTheDocument()
    })

    it("renders the menu link", async () => {
      await renderPage()

      const link = screen.getByRole("link", {
        name: /explore our menu/i,
      })

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/menu")
    })
  })

  describe("conditional rendering", () => {
    it("shows demo banner and sign-in buttons when demo mode is enabled and user is unauthenticated", async () => {
      verifySession.mockResolvedValue(false)

      await renderPage()

      expect(
        screen.getByText(
          /demo mode: oauth disabled\. use demo accounts to explore\./i
        )
      ).toBeInTheDocument()

      expect(
        screen.getByRole("button", { name: /sign in as admin/i })
      ).toBeInTheDocument()

      expect(
        screen.getByRole("button", { name: /sign in as customer/i })
      ).toBeInTheDocument()
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
