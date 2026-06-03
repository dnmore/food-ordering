export type MenuCategory = {
  id: string
  title: string
  createdAt: Date
}

export type MenuItem = {
  id: string
  name: string
  imageUrl: string
  price: number
  categoryId: string
  createdAt: Date
}

export type Order = {
  id: string
  userId: string
  status: "PENDING" | "PREPARING" | "COMPLETED"
  totalAmount: number
  completedAt: Date | null
  items: OrderItem[]
  createdAt: Date
}

export type OrderDetails = {
  id: string
  userId: string

  status: "PENDING" | "PREPARING" | "COMPLETED"

  totalAmount: number

  completedAt: Date | null
  createdAt: Date

  customer: {
    id: string
    name: string 
    email: string 
  }

  items: {
    id: string

    orderId: string
    menuItemId: string

    quantity: number

    unitPrice: number
    totalPrice: number

    createdAt: Date

    menuItem: {
      id: string
      name: string
      price: number
    }
  }[]
}
export type CategorySelectOption = Omit<MenuCategory, "createdAt">

export type MenuItemTableRow = Omit<MenuItem, "categoryId" | "createdAt" | "imageUrl"> & {
  categoryTitle: string
}

export type OrderTableRow = Omit<Order, "userId" | "completedAt" | "items" | "createdAt">

export type MenuItemCard = Omit<MenuItem, "categoryId" | "createdAt"> & {
  categoryTitle: string
}
export type CartItem = Omit<MenuItem, "categoryId" | "createdAt"> & {
  quantity: number
}

export type OrderItem = Omit<CartItem, "imageUrl"> & {
  menuItemId: string
}

export type CreateOrderItemPayload = {
  menuItemId: string
  quantity: number
}




