import {
  createMenuCategory,
  createMenuItem,
  deleteMenuCategory,
  deleteMenuItem,
  updateMenuCategory,
  updateMenuItem,
} from "@/lib/admin/menu.actions"

import prisma from "@/lib/db"
import { requireAdmin } from "@/lib/dal"
import { revalidateTag, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    menuCategory: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    menuItem: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
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
const mockedRedirect = redirect as jest.MockedFunction<typeof redirect>
const mockedRevalidateTag = revalidateTag as jest.Mock
const mockedRevalidatePath = revalidatePath as jest.Mock

function categoryForm(title = "Pizza") {
  const fd = new FormData()
  fd.set("title", title)
  return fd
}

function itemForm() {
  const fd = new FormData()
  fd.set("name", "Pepperoni")
  fd.set("imageUrl", "/pizza.jpg")
  fd.set("price", "19.99")
  fd.set("categoryId", "cat-1")
  return fd
}

describe("Menu Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockedRequireAdmin.mockResolvedValue(undefined)
  })

  describe("createMenuCategory", () => {
    it("creates category successfully", async () => {
      await createMenuCategory({}, categoryForm())

      expect(requireAdmin).toHaveBeenCalled()

      expect(mockedPrisma.menuCategory.create).toHaveBeenCalledWith({
        data: {
          title: "Pizza",
        },
      })

      expect(mockedRevalidateTag).toHaveBeenCalledWith("menuCategories", "max")
      expect(mockedRevalidateTag).toHaveBeenCalledWith("dashboard", "max")

      expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/categories")

      expect(mockedRedirect).toHaveBeenCalledWith("/dashboard/categories")
    })

    it("throws authentication failures", async () => {
      mockedRequireAdmin.mockRejectedValueOnce(new Error("Unauthenticated"))

      await expect(createMenuCategory({}, categoryForm())).rejects.toThrow(
        "Unauthenticated"
      )
    })

    it("throws authorization failures", async () => {
      mockedRequireAdmin.mockRejectedValueOnce(new Error("Forbidden"))

      await expect(createMenuCategory({}, categoryForm())).rejects.toThrow(
        "Forbidden"
      )
    })

    it("redirects after success", async () => {
      await createMenuCategory({}, categoryForm())

      expect(mockedRedirect).toHaveBeenCalledWith("/dashboard/categories")
    })
  })

  describe("createMenuItem", () => {
    it("creates item successfully", async () => {
      await createMenuItem({}, itemForm())

      expect(mockedPrisma.menuItem.create).toHaveBeenCalledWith({
        data: {
          name: "Pepperoni",
          imageUrl: "/pizza.jpg",
          price: 19.99,
          category: {
            connect: {
              id: "cat-1",
            },
          },
        },
      })

      expect(mockedRevalidateTag).toHaveBeenCalledWith("menuItems", "max")

      expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/items")

      expect(mockedRedirect).toHaveBeenCalledWith("/dashboard/items")
    })
  })

  describe("updateMenuCategory", () => {
    it("updates category successfully", async () => {
      await updateMenuCategory("cat1", categoryForm("Desserts"), {})

      expect(mockedPrisma.menuCategory.update).toHaveBeenCalledWith({
        where: { id: "cat1" },
        data: {
          title: "Desserts",
        },
      })

      expect(mockedRevalidateTag).toHaveBeenCalledWith("menuCategories", "max")
      expect(mockedRevalidateTag).toHaveBeenCalledWith("menuItems", "max")
      expect(mockedRevalidateTag).toHaveBeenCalledWith("dashboard", "max")

      expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/categories")
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/items")

      expect(mockedRedirect).toHaveBeenCalledWith("/dashboard/categories")
    })
  })

  describe("updateMenuItem", () => {
    it("updates item successfully", async () => {
      await updateMenuItem("item1", {}, itemForm())

      expect(mockedPrisma.menuItem.update).toHaveBeenCalledWith({
        where: {
          id: "item1",
        },
        data: {
          name: "Pepperoni",
          imageUrl: "/pizza.jpg",
          price: 19.99,
          category: {
            connect: {
              id: "cat-1",
            },
          },
        },
      })

      expect(mockedRedirect).toHaveBeenCalledWith("/dashboard/items")
    })
  })

  describe("deleteMenuCategory", () => {
    it("deletes category successfully", async () => {
      await deleteMenuCategory("cat1")

      expect(mockedPrisma.menuCategory.delete).toHaveBeenCalledWith({
        where: {
          id: "cat1",
        },
      })

      expect(mockedRevalidateTag).toHaveBeenCalledWith("menuCategories", "max")

      expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/categories")

      expect(mockedRedirect).toHaveBeenCalledWith("/dashboard/categories")
    })
  })

  describe("deleteMenuItem", () => {
    it("deletes item successfully", async () => {
      await deleteMenuItem("item1")

      expect(mockedPrisma.menuItem.delete).toHaveBeenCalledWith({
        where: {
          id: "item1",
        },
      })

      expect(mockedRevalidateTag).toHaveBeenCalledWith("menuItems", "max")

      expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/items")

      expect(mockedRedirect).toHaveBeenCalledWith("/dashboard/items")
    })
  })
})
