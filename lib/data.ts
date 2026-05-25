import prisma from "./db"
import { unstable_cache } from "next/cache"
import {
  CategorySelectOption,
  MenuItemTableRow,
  OrderTableRow,
  OrderDetails,
} from "./definitions"

export const getCategoriesSelectOptions = unstable_cache(
  async (): Promise<CategorySelectOption[]> => {
    return prisma.menuCategory.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: { title: "asc" },
    })
  },
  ["categories-select"],
  { tags: ["menuCategories"] }
)

export const getCategoriesTable = unstable_cache(
  async (): Promise<CategorySelectOption[]> => {
    return prisma.menuCategory.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: { title: "asc" },
    })
  },
  ["categories-table"],
  { tags: ["menuCategories"] }
)

export const getMenuItemsTable = unstable_cache(
  async (): Promise<MenuItemTableRow[]> => {
    const menuData = await prisma.menuItem.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,

        category: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    })

    return menuData.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      price: Number(item.price),
      categoryTitle: item.category.title,
    }))
  },

  ["menu-items-table"],
  { tags: ["menuItems"] }
)

export const getMenuItemsPerCategory = unstable_cache(
  async (category: string): Promise<MenuItemTableRow[]> => {
    const menuData = await prisma.menuItem.findMany({
      where: {
        category: {
          title: category,
        },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,

        category: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    })

    return menuData.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      price: Number(item.price),
      categoryTitle: item.category.title,
    }))
  },

  ["menu-items-category"],
  { tags: ["menuItems"] }
)

export const getOrdersTable = unstable_cache(
  async (): Promise<OrderTableRow[]> => {
    const orderData = await prisma.order.findMany({
      select: {
        id: true,
        status: true,
        totalAmount: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    })
    return orderData.map((item) => ({
      id: item.id,
      status: item.status,
      totalAmount: Number(item.totalAmount),
      createdAt: item.createdAt,
    }))
  },
  ["orders-table"],
  { tags: ["orders"] }
)

export const getOrderDetails = unstable_cache(
  async (orderId: string): Promise<OrderDetails | null> => {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        items: {
          include: {
            menuItem: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    })

    if (!order) {
      return null
    }

    return {
      id: order.id,
      userId: order.userId,

      status: order.status,

      totalAmount: Number(order.totalAmount),

      completedAt: order.completedAt,
      createdAt: order.createdAt,

      customer: {
        id: order.customer.id,
        name: order.customer.name ?? "",
        email: order.customer.email ?? "",
      },

      items: order.items.map((item) => ({
        id: item.id,

        orderId: item.orderId,
        menuItemId: item.menuItemId,

        quantity: item.quantity,

        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),

        createdAt: item.createdAt,

        menuItem: {
          id: item.menuItem.id,
          name: item.menuItem.name,
          price: Number(item.menuItem.price),
        },
      })),
    }
  },
  ["order-details"],
  {
    tags: ["orders"],
  }
)

export const getDashboardStats = unstable_cache(
  async () => {
    const [totalOrders, revenueResult, aovResult] = await Promise.all([
      prisma.order.count(),

      prisma.order.aggregate({
        where: {
          status: "COMPLETED",
        },
        _sum: {
          totalAmount: true,
        },
      }),

      prisma.order.aggregate({
        where: {
          status: "COMPLETED",
        },
        _avg: {
          totalAmount: true,
        },
      }),
    ])

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    })

    return {
      totalOrders,

      totalRevenue: formatter.format(
        revenueResult._sum.totalAmount?.toNumber() ?? 0
      ),
      averageOrderValue: formatter.format(
        aovResult._avg.totalAmount?.toNumber() ?? 0
      ),
    }
  },
  ["dashboard-stats"],
  { tags: ["dashboard", "orders"] }
)
