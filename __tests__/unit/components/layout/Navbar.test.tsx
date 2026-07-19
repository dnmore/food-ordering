import { render, screen } from "@testing-library/react"
import Navbar from "@/components/layout/navbar"
import { verifySession } from "@/lib/dal"

jest.mock("@/lib/dal", () => ({
  verifySession: jest.fn(),
}))

jest.mock("@/components/ui/mode-toggle", () => ({
  ModeToggle: () => (
    <button type="button" aria-label="Toggle theme">
      Theme
    </button>
  ),
}))

jest.mock("@/components/cart/cart", () => ({
  __esModule: true,
  default: ({ session }: { session: unknown }) => (
    <div data-testid="cart">Cart-{session ? "session" : "guest"}</div>
  ),
}))

jest.mock("@/components/auth/auth-components", () => ({
  SignIn: () => <button>Sign in</button>,
  SignOut: () => <button>Sign out</button>,
}))

jest.mock("@/components/layout/admin-navigation", () => ({
  __esModule: true,
  default: () => <div>Admin Navigation</div>,
}))

jest.mock("@/components/layout/customer-navigation", () => ({
  __esModule: true,
  default: () => <div>Customer Navigation</div>,
}))

jest.mock("lucide-react", () => ({
  User: () => <svg data-testid="user-icon" />,
}))

jest.mock("@/components/ui/button", () => ({
  Button: ({ children }: React.PropsWithChildren) => children,
}))

jest.mock("@/components/ui/avatar", () => ({
  Avatar: ({ children }: any) => <div>{children}</div>,
  AvatarImage: ({ alt, src }: any) =>
    src ? <img src={src} alt={alt} data-testid="avatar-image" /> : null,
  AvatarFallback: ({ children }: any) => (
    <div data-testid="avatar-fallback">{children}</div>
  ),
}))

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <>{children}</>,
  DropdownMenuItem: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: any) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuSeparator: () => <hr data-testid="separator" />,
}))

const mockedVerifySession = verifySession as jest.Mock

async function renderNavbar() {
  const ui = await Navbar()
  return render(ui)
}

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("rendering", () => {
    it("renders branding and navigation", async () => {
      mockedVerifySession.mockResolvedValue(null)

      await renderNavbar()

      expect(screen.getByRole("banner")).toBeInTheDocument()
      expect(
        screen.getByRole("navigation", {
          name: /main navigation/i,
        })
      ).toBeInTheDocument()

      expect(screen.getByText("CraveWaves")).toBeInTheDocument()
      expect(
        screen.getByRole("button", {
          name: /toggle theme/i,
        })
      ).toBeInTheDocument()
    })
  })

  describe("conditional rendering", () => {
    it("renders sign in for guests", async () => {
      mockedVerifySession.mockResolvedValue(null)

      await renderNavbar()

      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toBeInTheDocument()

      expect(
        screen.queryByRole("button", {
          name: /open user menu/i,
        })
      ).not.toBeInTheDocument()

      expect(screen.getByTestId("cart")).toBeInTheDocument()
    })

    it("renders authenticated user menu", async () => {
      mockedVerifySession.mockResolvedValue({
        user: {
          name: "Jane",
          image: "/avatar.png",
          role: "CUSTOMER",
        },
      })

      await renderNavbar()

      

      expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument()
      expect(screen.getByTestId("cart")).toBeInTheDocument()
    })

    it("does not render cart for admin", async () => {
      mockedVerifySession.mockResolvedValue({
        user: {
          name: "Admin",
          image: "",
          role: "ADMIN",
        },
      })

      await renderNavbar()

      expect(screen.queryByTestId("cart")).not.toBeInTheDocument()
    })

    it("renders cart for customer", async () => {
      mockedVerifySession.mockResolvedValue({
        user: {
          name: "Customer",
          image: "",
          role: "CUSTOMER",
        },
      })

      await renderNavbar()

      expect(screen.getByTestId("cart")).toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("has accessible navigation landmarks", async () => {
      mockedVerifySession.mockResolvedValue(null)

      await renderNavbar()

      expect(
        screen.getByRole("navigation", {
          name: /main navigation/i,
        })
      ).toBeInTheDocument()
    })

    it("renders avatar image with descriptive alt text", async () => {
      mockedVerifySession.mockResolvedValue({
        user: {
          name: "Jane",
          image: "/avatar.png",
          role: "CUSTOMER",
        },
      })

      await renderNavbar()

      expect(screen.getByAltText("Jane's profile picture")).toBeInTheDocument()
    })
  })

  describe("callbacks", () => {
    it("calls verifySession once", async () => {
      mockedVerifySession.mockResolvedValue(null)

      await renderNavbar()

      expect(mockedVerifySession).toHaveBeenCalledTimes(1)
    })
  })
})
