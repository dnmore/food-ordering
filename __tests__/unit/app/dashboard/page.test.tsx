import { render, screen } from "@testing-library/react"
import Page from "@/app/(admin)/dashboard/page"

// ---------- Mocks ----------

const DashboardCardsMock = jest.fn(() => (
  <section data-testid="dashboard-cards">Dashboard Cards</section>
))

const RevenueCardMock = jest.fn(() => (
  <section data-testid="revenue-card">Revenue Card</section>
))

const TopSellingCardMock = jest.fn(() => (
  <section data-testid="top-selling-card">Top Selling Card</section>
))

jest.mock("@/components/cards/dashboard-cards", () => ({
  __esModule: true,
  default: () => DashboardCardsMock(),
}))

jest.mock("@/components/cards/revenue-card", () => ({
  RevenueCard: () => RevenueCardMock(),
}))

jest.mock("@/components/cards/top-selling-card", () => ({
  TopSellingCard: () => TopSellingCardMock(),
}))

describe("Analytics Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("rendering", () => {
    it("renders the page heading", () => {
      render(<Page />)

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /analytics/i,
        })
      ).toBeInTheDocument()
    })

    it("renders all child components", () => {
      render(<Page />)

      expect(screen.getByTestId("dashboard-cards")).toBeInTheDocument()
      expect(screen.getByTestId("revenue-card")).toBeInTheDocument()
      expect(screen.getByTestId("top-selling-card")).toBeInTheDocument()

      expect(DashboardCardsMock).toHaveBeenCalledTimes(1)
      expect(RevenueCardMock).toHaveBeenCalledTimes(1)
      expect(TopSellingCardMock).toHaveBeenCalledTimes(1)
    })

    it("renders the expected page layout", () => {
      const { container } = render(<Page />)

      const root = container.firstChild

      expect(root).toHaveClass("flex")
      expect(root).toHaveClass("flex-col")
      expect(root).toHaveClass("gap-4")
    })
  })
})
