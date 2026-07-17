import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import Page from "@/app/(customer)/checkout/page"

import { verifySession } from "@/lib/dal"
import { redirect } from "next/navigation"

// ---------- Mocks ----------

jest.mock("@/lib/dal", () => ({
  verifySession: jest.fn(),
}))

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}))

jest.mock("@/components/table/checkout-table", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="checkout-table" tabIndex={0}>
      Checkout Table
    </div>
  ),
}))

jest.mock("@/components/forms/checkout-form", () => ({
  CheckoutForm: () => (
    <form aria-label="checkout form">
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Submit</button>
    </form>
  ),
}))

const mockedVerifySession = verifySession as jest.MockedFunction<
  typeof verifySession
>
const mockedRedirect = redirect as jest.MockedFunction<typeof redirect>

describe("Checkout Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  async function renderPage() {
    const ui = await Page()
    return render(ui)
  }

  describe("rendering", () => {
    it("renders the page when a valid session exists", async () => {
      mockedVerifySession.mockResolvedValue({ userId: "123" } as any)

      await renderPage()

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /checkout/i,
        })
      ).toBeInTheDocument()

      expect(screen.getByTestId("checkout-table")).toBeInTheDocument()
      expect(
        screen.getByRole("form", { name: /checkout form/i })
      ).toBeInTheDocument()
    })

    it("renders the main layout containers", async () => {
      mockedVerifySession.mockResolvedValue({ userId: "123" } as any)

      const { container } = await renderPage()

      expect(container.querySelector(".container")).toBeInTheDocument()
      expect(container.querySelector(".mx-auto")).toBeInTheDocument()
    })
  })

  describe("authentication / conditional rendering", () => {
    it("verifies the session exactly once", async () => {
      mockedVerifySession.mockResolvedValue({ userId: "123" } as any)

      await renderPage()

      expect(mockedVerifySession).toHaveBeenCalledTimes(1)
    })

    it("redirects to home when no session exists", async () => {
      mockedVerifySession.mockResolvedValue(null)

      await Page()

      expect(mockedRedirect).toHaveBeenCalledTimes(1)
      expect(mockedRedirect).toHaveBeenCalledWith("/")
    })

    it("does not redirect when a session exists", async () => {
      mockedVerifySession.mockResolvedValue({ userId: "123" } as any)

      await renderPage()

      expect(mockedRedirect).not.toHaveBeenCalled()
    })
  })

  describe("error state", () => {
    it("propagates verifySession errors", async () => {
      const error = new Error("session failure")

      mockedVerifySession.mockRejectedValue(error)

      await expect(Page()).rejects.toThrow("session failure")
    })
  })
})
