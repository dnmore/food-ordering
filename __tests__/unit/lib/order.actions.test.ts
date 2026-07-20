import { updateOrderStatus } from "@/lib/admin/order.actions"
import prisma from "@/lib/db"
import { requireAdmin } from "@/lib/dal"
import { revalidateTag, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    order: {
      update: jest.fn(),
    },
  },
}))

jest.mock("@/lib/dal", () => ({
  requireAdmin: jest.fn(),
}))

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
  revalidatePath: jest.fn(),
}))

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}))

const mockedPrisma = prisma as jest.Mocked<typeof prisma>
const mockedRequireAdmin = requireAdmin as jest.Mock
const mockedRevalidateTag = revalidateTag as jest.Mock
const mockedRevalidatePath = revalidatePath as jest.Mock
const mockedRedirect = redirect as jest.MockedFunction<typeof redirect>

function createFormData(status?: string) {
  const formData = new FormData()

  if (status !== undefined) {
    formData.set("status", status)
  }

  return formData
}

describe("updateOrderStatus", () => {
  const orderId = "order-123"

  beforeEach(() => {
    jest.clearAllMocks()

    mockedRequireAdmin.mockResolvedValue(undefined)
  })

  describe("successful execution", () => {
    it("updates the order, invalidates caches, revalidates paths, and redirects", async () => {
      await updateOrderStatus(orderId, createFormData("PREPARING"), {})

      expect(mockedRequireAdmin).toHaveBeenCalledTimes(1)

      expect(mockedPrisma.order.update).toHaveBeenCalledWith({
        where: { id: orderId },
        data: {
          status: "PREPARING",
          completedAt: null,
        },
      })

      expect(mockedRevalidateTag).toHaveBeenCalledWith("orders", "max")
      expect(mockedRevalidateTag).toHaveBeenCalledWith("dashboard", "max")

      expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard")
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/orders")
      expect(mockedRevalidatePath).toHaveBeenCalledWith(
        `/dashboard/orders/${orderId}/details`
      )

      expect(mockedRedirect).toHaveBeenCalledWith("/dashboard/orders")
    })

    it("sets completedAt when status is COMPLETED", async () => {
      await updateOrderStatus(orderId, createFormData("COMPLETED"), {})

      expect(mockedPrisma.order.update).toHaveBeenCalledWith({
        where: { id: orderId },
        data: expect.objectContaining({
          status: "COMPLETED",
          completedAt: expect.any(Date),
        }),
      })
    })
  })

  describe("authentication failures", () => {
    it("propagates authentication errors", async () => {
      const authError = new Error("Unauthenticated")

      mockedRequireAdmin.mockRejectedValueOnce(authError)

      await expect(
        updateOrderStatus(orderId, createFormData("PROCESSING"), {})
      ).rejects.toThrow(authError)

      expect(mockedPrisma.order.update).not.toHaveBeenCalled()
      expect(mockedRevalidateTag).not.toHaveBeenCalled()
      expect(mockedRedirect).not.toHaveBeenCalled()
    })
  })

  describe("authorization failures", () => {
    it("propagates authorization errors", async () => {
      const authorizationError = new Error("Forbidden")

      mockedRequireAdmin.mockRejectedValueOnce(authorizationError)

      await expect(
        updateOrderStatus(orderId, createFormData("PROCESSING"), {})
      ).rejects.toThrow(authorizationError)

      expect(mockedPrisma.order.update).not.toHaveBeenCalled()
      expect(mockedRedirect).not.toHaveBeenCalled()
    })
  })
})
