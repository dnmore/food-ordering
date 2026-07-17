import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Page from "@/app/(public)/menu/page"

// ---------- Mocks ----------

jest.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement> & { variant?: string }) => (
    <span data-testid="badge" {...props}>
      {children}
    </span>
  ),
}))

jest.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <section data-testid="card" {...props}>
      {children}
    </section>
  ),
  CardHeader: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <header data-testid="card-header" {...props}>
      {children}
    </header>
  ),
  CardContent: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <main data-testid="card-content" {...props}>
      {children}
    </main>
  ),
}))

describe("Menu Page", () => {
  describe("rendering", () => {
    beforeEach(() => {
      render(<Page />)
    })

    it("renders the page container", () => {
      expect(screen.getByTestId("card")).toBeInTheDocument()
    })

    it("renders the card header", () => {
      expect(screen.getByTestId("card-header")).toBeInTheDocument()
    })

    it("renders the card content", () => {
      expect(screen.getByTestId("card-content")).toBeInTheDocument()
    })

    it("renders the badge", () => {
      expect(screen.getByTestId("badge")).toHaveTextContent("Fresh & Delicious")
    })

    it("renders the page heading", () => {
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /the perfect meal for your craving in few clicks away/i,
        })
      ).toBeInTheDocument()
    })

    it("renders the feature list", () => {
      const list = screen.getByRole("list")
      expect(list).toBeInTheDocument()

      const items = screen.getAllByRole("listitem")

      expect(items).toHaveLength(3)

      expect(items[0]).toHaveTextContent(
        /explore our categories and discover what's cooking today/i
      )
      expect(items[1]).toHaveTextContent(
        /find the dishes that match your craving/i
      )
      expect(items[2]).toHaveTextContent(
        /order in seconds and get ready to enjoy/i
      )
    })
  })

  describe("accessibility", () => {
    beforeEach(() => {
      render(<Page />)
    })

    it("has exactly one h1", () => {
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    })

    it("uses semantic list markup", () => {
      const list = screen.getByRole("list")
      expect(list.tagName).toBe("UL")

      expect(screen.getAllByRole("listitem")).toHaveLength(3)
    })

    it("contains readable text content", () => {
      expect(screen.getByText(/fresh & delicious/i)).toBeVisible()

      expect(
        screen.getByText(/find the dishes that match your craving/i)
      ).toBeVisible()
    })
  })
})
