import { render, screen } from "@testing-library/react"
import Page from "@/app/(admin)/dashboard/orders/page"
import { getOrdersTable } from "@/lib/data"

// ---------- Mocks ----------

jest.mock("@/lib/data", () => ({
  getOrdersTable: jest.fn(),
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

jest.mock("@/components/ui/data-table", () => ({
  DataTable: jest.fn(({ data }) => (
    <div data-testid="data-table">
      <span>Rows: {data.length}</span>
    </div>
  )),
}))

jest.mock("@/app/(admin)/dashboard/orders/columns", () => ({
  odersColumns: [{ accessorKey: "name" }],
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

const mockedGetOrdersTable = getOrdersTable as jest.Mock

describe("Orders Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("rendering", () => {
    it("renders page heading", async () => {
      mockedGetOrdersTable.mockResolvedValue([])

      render(await Page())

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /orders/i,
        })
      ).toBeInTheDocument()
    })

    it("renders populated table", async () => {
      mockedGetOrdersTable.mockResolvedValue([
        { id: "1", name: "Tech" },
        { id: "2", name: "News" },
      ])

      render(await Page())

      expect(screen.getByTestId("data-table")).toBeInTheDocument()
      expect(screen.getByText("Rows: 2")).toBeInTheDocument()
    })
  })

  describe("conditional rendering", () => {
    it("renders empty state when there are no items", async () => {
      mockedGetOrdersTable.mockResolvedValue([])

      render(await Page())

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: /no orders yet/i,
        })
      ).toBeInTheDocument()

      expect(screen.queryByTestId("data-table")).not.toBeInTheDocument()
    })

    it("renders table when orders exist", async () => {
      mockedGetOrdersTable.mockResolvedValue([{ id: "1", name: "A" }])

      render(await Page())

      expect(screen.getByTestId("data-table")).toBeInTheDocument()

      expect(screen.queryByText(/no orders yet/i)).not.toBeInTheDocument()
    })

    it("renders folder icon in empty state", async () => {
      mockedGetOrdersTable.mockResolvedValue([])

      render(await Page())

      expect(screen.getByTestId("folder-icon")).toBeInTheDocument()
    })
  })

  describe("empty state", () => {
    it("shows empty description", async () => {
      mockedGetOrdersTable.mockResolvedValue([])

      render(await Page())

      expect(
        screen.getByText(/you haven't received any order yet/i)
      ).toBeInTheDocument()
    })
  })

  describe("loading state", () => {
    it("does not render the Suspense fallback after async page resolves", async () => {
      mockedGetOrdersTable.mockResolvedValue([{ id: "1" }])

      render(await Page())

      expect(screen.queryByTestId("skeleton-table")).not.toBeInTheDocument()
    })
  })

  describe("error state", () => {
    it("propagates fetch errors", async () => {
      const error = new Error("Database unavailable")

      mockedGetOrdersTable.mockRejectedValue(error)

      await expect(Page()).rejects.toThrow("Database unavailable")
    })
  })
})
