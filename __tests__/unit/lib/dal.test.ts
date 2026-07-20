import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { verifySession, getUserRole, requireAdmin } from "@/lib/dal"

// ----- Mocks -----

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}))

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}))

const mockedAuth = auth as jest.Mock
const mockedRedirect = redirect as jest.MockedFunction<typeof redirect>

describe("auth server helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("verifySession()", () => {
    it("returns the session when authenticated", async () => {
      const mockedSession = {
        user: {
          id: "1",
          role: "ADMIN",
          email: "admin@test.com",
        },
      }

      mockedAuth.mockResolvedValue(mockedSession)
      const result = await verifySession()

      expect(result).toEqual(mockedSession)

      expect(mockedAuth).toHaveBeenCalledTimes(1)
    })

    it("returns null when no session exists", async () => {
      mockedAuth.mockResolvedValue(null)

      const result = await verifySession()
      expect(result).toBeNull()
    })

    it("returns null when session has no user", async () => {
      mockedAuth.mockResolvedValue({})

      const result = await verifySession()
      expect(result).toBeNull()
    })
  })

  describe("getUserRole()", () => {
    it("returns the user role", async () => {
      mockedAuth.mockResolvedValue({
        user: {
          id: "1",
          role: "ADMIN",
        },
      })

      const result = await getUserRole()
      expect(result).toBe("ADMIN")
    })

    it("returns undefined for anonymous users", async () => {
      mockedAuth.mockResolvedValue(null)

      const result = await getUserRole()
      expect(result).toBeUndefined()
    })
  })

  describe("requireAdmin()", () => {
    it("completes successfully for an admin", async () => {
      mockedAuth.mockResolvedValue({
        user: {
          id: "1",
          role: "ADMIN",
        },
      })

      const result = await requireAdmin()
      expect(result).toBeUndefined()

      expect(mockedRedirect).not.toHaveBeenCalled()
    })

    it("redirects when unauthenticated (authentication failure)", async () => {
      mockedAuth.mockResolvedValue(null)

      await requireAdmin()

      expect(mockedRedirect).toHaveBeenCalledWith("/")
    })

    it("redirects when authenticated but not an admin (authorization failure)", async () => {
      mockedAuth.mockResolvedValue({
        user: {
          id: "2",
          role: "CUSTOMER",
        },
      })

      await requireAdmin()

      expect(mockedRedirect).toHaveBeenCalledWith("/")
    })

    it("redirects when session has no user", async () => {
      mockedAuth.mockResolvedValue({})

      await requireAdmin()

      expect(mockedRedirect).toHaveBeenCalledWith("/")
    })
  })
})
