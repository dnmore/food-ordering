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

export type CategorySelectOption = Omit<MenuCategory, "createdAt">

export type MenuCategoryTableRow = Omit <MenuCategory, "createdAt">

export type MenuItemTableRow = Omit<MenuItem, "categoryId" | "createdAt"> & {
  categoryTitle: string
}
export type CartItem = Omit<MenuItem, "categoryId" | "createdAt"> & {
  quantity: number
}

