import { render, screen } from "@testing-library/react"
import CreateMenuCategoryForm from "@/components/forms/create-category"

// ---------- Mocks ----------



jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

const mockUseActionState = require("react").useActionState;

jest.mock("@/lib/admin/menu.actions", () => ({
  createMenuCategory: jest.fn(),
}))

jest.mock("@/lib/config", () => ({
  DEMO_MODE: true,
}))

jest.mock("next/link", () => {
  return function Link({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }) {
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

jest.mock("@/components/ui/input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}))

jest.mock("@/components/ui/label", () => ({
  Label: (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props} />
  ),
}))

jest.mock("@/components/ui/field", () => ({
  Field: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}))

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: React.PropsWithChildren) => (
    <div data-testid="card">{children}</div>
  ),
  CardContent: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  CardFooter: ({
    children,
    className,
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={className}>{children}</div>
  ),
}))

describe("CreateMenuCategoryForm", () => {
  const formAction = jest.fn()

  const renderWithState = (
    state: {
      message: string | null
      errors: Record<string, string[]>
    } = {
      message: null,
      errors: {},
    }
  ) => {
    mockUseActionState.mockReturnValue([state, formAction])

    return render(<CreateMenuCategoryForm />)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("rendering", () => {
    it("renders the form", () => {
      renderWithState()

      expect(screen.getByTestId("card")).toBeInTheDocument()
      expect(
        screen.getByRole("textbox", { name: /title/i })
      ).toBeInTheDocument()
      
    })

    it("renders input attributes correctly", () => {
      renderWithState()

      const input = screen.getByRole("textbox", { name: /title/i })

      expect(input).toHaveAttribute("id", "title")
      expect(input).toHaveAttribute("name", "title")
      expect(input).toHaveAttribute("placeholder", "Appetizers")
      expect(input).toHaveAttribute("type", "text")
    })
  })

  describe("conditional rendering", () => {
    it("does not render validation errors when none exist", () => {
      renderWithState()

      expect(screen.queryByText("Title is required")).not.toBeInTheDocument()
    })

    it("renders all title validation errors", () => {
      renderWithState({
        message: null,
        errors: {
          title: ["Title is required", "Minimum length is 3"],
        },
      })

      expect(screen.getByText("Title is required")).toBeInTheDocument()
      expect(screen.getByText("Minimum length is 3")).toBeInTheDocument()
    })

    it("renders form level error message", () => {
      renderWithState({
        message: "Unable to create category",
        errors: {},
      })

      expect(screen.getByText("Unable to create category")).toBeInTheDocument()
    })
  })
})
