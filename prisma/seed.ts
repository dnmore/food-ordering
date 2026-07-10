import prisma from "../lib/db"
import { Role, OrderStatus } from "@prisma/client"
import { faker } from "@faker-js/faker"

function randomDateBetweenJanAndJun2026() {
  return faker.date.between({
    from: new Date("2026-01-01T00:00:00.000Z"),
    to: new Date("2026-06-30T23:59:59.999Z"),
  })
}

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.menuCategory.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // =========================
  //  CUSTOMERS
  // =========================

  const customers = await prisma.user.createManyAndReturn({
    data: [
      {
        name: "Arthur Carter",
        email: `arthur.carter-${Date.now()}@example.com`,
        image: "https://i.pravatar.cc/300?img=11",
        role: Role.CUSTOMER,
      },
      {
        name: "Alice Smith",
        email: `alice.smith-${Date.now()}@example.com`,
        image: "https://i.pravatar.cc/300?img=32",
        role: Role.CUSTOMER,
      },
      {
        name: "Josh Williams",
        email: `josh.williams-${Date.now()}@example.com`,
        image: "https://i.pravatar.cc/300?img=14",
        role: Role.CUSTOMER,
      },
    ],
  })

  // =========================
  // ADMIN
  // =========================

  const admin = await prisma.user.create({
    data: {
      name: "Mariyah Roy",
      email: `mariyah.roy-${Date.now()}@example.com`,
      image: "https://i.pravatar.cc/300?img=16",
      role: Role.ADMIN,
    },
  })

  // =========================
  // CATEGORIES
  // =========================

  const categories = await Promise.all([
    prisma.menuCategory.create({
      data: {
        title: "Appetizers",
      },
    }),

    prisma.menuCategory.create({
      data: {
        title: "Burgers",
      },
    }),

    prisma.menuCategory.create({
      data: {
        title: "Desserts",
      },
    }),

    prisma.menuCategory.create({
      data: {
        title: "Sides",
      },
    }),
    prisma.menuCategory.create({
      data: {
        title: "TexMex",
      },
    }),

    prisma.menuCategory.create({
      data: {
        title: "Drinks",
      },
    }),
  ])

  // =========================
  // MENU ITEMS
  // =========================

  const menuItems = await Promise.all([
    // Appetizers
    prisma.menuItem.create({
      data: {
        name: "Chicken Nuggets",
        imageUrl:
          "https://images.unsplash.com/photo-1582981760753-b52aae38f237?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 5,
        categoryId: categories[0].id,
      },
    }),

    prisma.menuItem.create({
      data: {
        name: "Nachos",
        imageUrl:
          "https://images.unsplash.com/photo-1589656613566-eab25964fb6b?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 5.4,
        categoryId: categories[0].id,
      },
    }),

    prisma.menuItem.create({
      data: {
        name: "Appetizers Mix",
        imageUrl:
          "https://images.unsplash.com/photo-1762631934944-1607dfccfe6b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 11.2,
        categoryId: categories[0].id,
      },
    }),

    // Burgers
    prisma.menuItem.create({
      data: {
        name: "American Burger",
        imageUrl:
          "https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
        price: 10.5,
        categoryId: categories[1].id,
      },
    }),

    prisma.menuItem.create({
      data: {
        name: "Chicken Burger",
        imageUrl:
          "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoaWNrZW4lMjBidXJnZXJ8ZW58MHx8MHx8fDI%3D",
        price: 9.8,
        categoryId: categories[1].id,
      },
    }),

    prisma.menuItem.create({
      data: {
        name: "Double Burger",
        imageUrl:
          "https://images.unsplash.com/photo-1599155253646-7989e08c05c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG91YmxlJTIwYnVyZ2VyfGVufDB8fDB8fHwy",
        price: 14.9,
        categoryId: categories[1].id,
      },
    }),

    // Desserts
    prisma.menuItem.create({
      data: {
        name: "Oreo Cup",
        imageUrl:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzc2VydHxlbnwwfHwwfHx8Mg%3D%3D",
        price: 6,
        categoryId: categories[2].id,
      },
    }),

    prisma.menuItem.create({
      data: {
        name: "Choco Donuts",
        imageUrl:
          "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzc2VydHxlbnwwfHwwfHx8Mg%3D%3D",
        price: 4,
        categoryId: categories[2].id,
      },
    }),

    // Sides
    prisma.menuItem.create({
      data: {
        name: "French Fries",
        imageUrl:
          "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJpZXN8ZW58MHx8MHx8fDA%3D",
        price: 4.5,
        categoryId: categories[3].id,
      },
    }),

    prisma.menuItem.create({
      data: {
        name: "Salad",
        imageUrl:
          "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FsYWR8ZW58MHx8MHx8fDI%3D",
        price: 3.5,
        categoryId: categories[3].id,
      },
    }),
    // TexMex
    prisma.menuItem.create({
      data: {
        name: "Burritos",
        imageUrl:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVycml0b3N8ZW58MHx8MHx8fDI%3D",
        price: 10,
        categoryId: categories[4].id,
      },
    }),

    prisma.menuItem.create({
      data: {
        name: "Tacos",
        imageUrl:
          "https://images.unsplash.com/photo-1648437595587-e6a8b0cdf1f9?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 12.8,
        categoryId: categories[4].id,
      },
    }),

    // Drinks
    prisma.menuItem.create({
      data: {
        name: "Coca-Cola",
        imageUrl:
          "https://images.unsplash.com/photo-1648569883125-d01072540b4c?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 3.5,
        categoryId: categories[5].id,
      },
    }),

    prisma.menuItem.create({
      data: {
        name: "Sparkling Water",
        imageUrl:
          "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDI%3D",
        price: 2.8,
        categoryId: categories[5].id,
      },
    }),
  ])

  // =========================
  // ORDERS
  // =========================

  for (let i = 0; i < 200; i++) {
    const customer = faker.helpers.arrayElement(customers)

    const orderDate = randomDateBetweenJanAndJun2026()

    const status = faker.helpers.arrayElement([
      OrderStatus.PREPARING,
      OrderStatus.COMPLETED,
      OrderStatus.PAID,
      OrderStatus.CANCELLED,
    ])

    const itemsCount = faker.number.int({
      min: 1,
      max: 4,
    })

    const selectedItems = faker.helpers.arrayElements(menuItems, itemsCount)

    const orderItemsData = selectedItems.map((item) => {
      const quantity = faker.number.int({
        min: 1,
        max: 3,
      })

      const unitPrice = Number(item.price)

      return {
        menuItemId: item.id,
        quantity,
        unitPrice,
        totalPrice: unitPrice * quantity,
      }
    })

    const totalAmount = orderItemsData.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    )

    await prisma.order.create({
      data: {
        userId: customer.id,
        status,
        totalAmount,

        createdAt: orderDate,

        completedAt:
          status === OrderStatus.COMPLETED
            ? faker.date.soon({
                days: 2,
                refDate: orderDate,
              })
            : null,

        items: {
          create: orderItemsData,
        },
      },
    })
  }

  console.log("Database seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
