import { render, screen } from "@testing-library/react"
import Page from "@/app/(admin)/dashboard/items/page"
import { getMenuItemsTable } from "@/lib/data"
import { requireAdminRouteAccess } from "@/lib/dal";

// ---------- Mocks ----------

jest.mock("@/lib/data", () => ({
  getMenuItemsTable: jest.fn(),
}))

jest.mock("@/lib/dal", () => ({
  requireAdminRouteAccess: jest.fn(),
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

jest.mock("@/components/ui/button", () => ({
  Button: ({ children }: React.PropsWithChildren) => children,
}))

jest.mock("@/components/ui/data-table", () => ({
  DataTable: jest.fn(({ data }) => (
    <div data-testid="data-table">
      <span>Rows: {data.length}</span>
    </div>
  )),
}))

jest.mock("@/app/(admin)/dashboard/items/columns", () => ({
  menuItemsColumns: [{ accessorKey: "name" }],
}))

jest.mock("@/components/layout/skeletons", () => ({
  SkeletonTable: jest.fn(() => (
    <div data-testid="skeleton-table">Loading...</div>
  )),
}))

jest.mock("lucide-react", () => ({
  Folder: () => <svg data-testid="folder-icon" />,
}))

jest.mock("@/components/ui/empty", () => ({
  Empty: ({ children }: any) => <section>{children}</section>,
  EmptyHeader: ({ children }: any) => <header>{children}</header>,
  EmptyMedia: ({ children }: any) => <div>{children}</div>,
  EmptyTitle: ({ children }: any) => <h2>{children}</h2>,
  EmptyDescription: ({ children }: any) => <p>{children}</p>,
  EmptyContent: ({ children }: any) => <div>{children}</div>,
}))

const mockedGetMenuItemsTable = getMenuItemsTable as jest.Mock
const mockedRequireAdminRouteAccess = requireAdminRouteAccess as jest.MockedFunction<
  typeof requireAdminRouteAccess
>

describe("Menu Items Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

   async function renderPage() {
        const ui = await Page()
        return render(ui)
      }

  describe("rendering", () => {
    it("renders page heading", async () => {
       mockedRequireAdminRouteAccess.mockResolvedValue({
        
          id: "1",
          role: "ADMIN",
          isDemo: false,
        
      })
      mockedGetMenuItemsTable.mockResolvedValue([])

     await renderPage()

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /menu items/i,
        })
      ).toBeInTheDocument()
    })

    it("renders populated table", async () => {
       mockedRequireAdminRouteAccess.mockResolvedValue({
        
          id: "1",
          role: "ADMIN",
          isDemo: false,
        
      })
      mockedGetMenuItemsTable.mockResolvedValue([
        { id: "1", name: "Tech" },
        { id: "2", name: "News" },
      ])

      await renderPage()

      expect(screen.getByTestId("data-table")).toBeInTheDocument()
      expect(screen.getByText("Rows: 2")).toBeInTheDocument()
    })
  })

  describe("conditional rendering", () => {
    it("renders empty state when there are no items", async () => {
       mockedRequireAdminRouteAccess.mockResolvedValue({
        
          id: "1",
          role: "ADMIN",
          isDemo: false,
        
      })
      mockedGetMenuItemsTable.mockResolvedValue([])

      await renderPage()

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: /no menu items yet/i,
        })
      ).toBeInTheDocument()

      expect(screen.queryByTestId("data-table")).not.toBeInTheDocument()
    })

    it("renders table when menu items exist", async () => {
      mockedRequireAdminRouteAccess.mockResolvedValue({
        
          id: "1",
          role: "ADMIN",
          isDemo: false,
        
      })
      mockedGetMenuItemsTable.mockResolvedValue([{ id: "1", name: "A" }])

      await renderPage()

      expect(screen.getByTestId("data-table")).toBeInTheDocument()

      expect(screen.queryByText(/no menu items yet/i)).not.toBeInTheDocument()
    })

    it("renders folder icon in empty state", async () => {
      mockedRequireAdminRouteAccess.mockResolvedValue({
        
          id: "1",
          role: "ADMIN",
          isDemo: false,
        
      })
      mockedGetMenuItemsTable.mockResolvedValue([])

      await renderPage()

      expect(screen.getByTestId("folder-icon")).toBeInTheDocument()
    })
  })

  describe("empty state", () => {
    it("shows empty description", async () => {
       mockedRequireAdminRouteAccess.mockResolvedValue({
        
          id: "1",
          role: "ADMIN",
          isDemo: false,
        
      })
      mockedGetMenuItemsTable.mockResolvedValue([])

      await renderPage()

      expect(
        screen.getByText(/you haven't created any menu item yet/i)
      ).toBeInTheDocument()
    })

    it("shows add item link", async () => {
       mockedRequireAdminRouteAccess.mockResolvedValue({
        
          id: "1",
          role: "ADMIN",
          isDemo: false,
        
      })
      mockedGetMenuItemsTable.mockResolvedValue([])

      await renderPage()

      const link = screen.getByRole("link", {
        name: /add item/i,
      })

      expect(link).toHaveAttribute("href", "/dashboard/items/create")
    })
  })

  describe("loading state", () => {
    it("does not render the Suspense fallback after async page resolves", async () => {
       mockedRequireAdminRouteAccess.mockResolvedValue({
        
          id: "1",
          role: "ADMIN",
          isDemo: false,
        
      })
      mockedGetMenuItemsTable.mockResolvedValue([{ id: "1" }])

      await renderPage()

      expect(screen.queryByTestId("skeleton-table")).not.toBeInTheDocument()
    })
  })

  describe("error state", () => {
    it("propagates fetch errors", async () => {
      const error = new Error("Database unavailable")

      mockedGetMenuItemsTable.mockRejectedValue(error)

      await expect(Page()).rejects.toThrow("Database unavailable")
    })
  })
})
