import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { useActionState } from "react"
import CreateMenuCategoryForm from "@/components/forms/create-category"


jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}))

jest.mock("@/lib/admin/menu.actions", () => ({
  createMenuCategory: jest.fn(),
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

jest.mock("@/components/ui/field", () => ({
  Field: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="field">{children}</div>
  ),
}))

jest.mock("@/components/ui/input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} />
  ),
}))

jest.mock("@/components/ui/label", () => ({
  Label: ({
    children,
    ...props
  }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props}>{children}</label>
  ),
}))

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardFooter: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => <div {...props}>{children}</div>,
}))

jest.mock("@/components/buttons/demo-button", () => ({
  DemoButton: ({ text }: { text: string }) => (
    <button type="button" data-testid="demo-button">
      {text}
    </button>
  ),
}))

jest.mock("@/lib/config", () => ({
  DEMO_MODE: false,
}))

const mockedUseActionState = jest.mocked(useActionState)

describe("CreateMenuCategoryForm", () => {
  const formAction = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseActionState.mockReturnValue([
      {
        message: null,
        errors: {},
      },
      formAction,
      false,
    ])
  })

  describe("rendering", () => {
    it("renders the form", () => {
      render(<CreateMenuCategoryForm />)

      expect(screen.getByTestId("card")).toBeInTheDocument()
      
    })

    it("renders the title label and input", () => {
      render(<CreateMenuCategoryForm />)

      expect(screen.getByLabelText("Title")).toBeInTheDocument()

      const input = screen.getByRole("textbox", { name: "Title" })

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute("id", "title")
      expect(input).toHaveAttribute("name", "title")
      expect(input).toHaveAttribute("type", "text")
      expect(input).toHaveAttribute("placeholder", "Appetizers")
    })

    it("renders the cancel link", () => {
      render(<CreateMenuCategoryForm />)

      const cancelLink = screen.getByRole("link", { name: "Cancel" })

      expect(cancelLink).toBeInTheDocument()
      expect(cancelLink).toHaveAttribute("href", "/dashboard/categories")
    })

    

   
  })

 

 

  describe("error state", () => {
    it("renders a server action error message", () => {
      mockedUseActionState.mockReturnValue([
        {
          message: "Failed to create menu category",
          errors: {},
        },
        formAction,
        false,
      ] )

      render(<CreateMenuCategoryForm />)

      expect(
        screen.getByText("Failed to create menu category")
      ).toBeInTheDocument()
    })

    

    

    
  })

   
})