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
