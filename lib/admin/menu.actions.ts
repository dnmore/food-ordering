"use server"
import prisma from "../db"
import { revalidateTag, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const MenuCategorySchema = z.object({
  title: z.string().min(1, "Name is required"),
})

const MenuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string(),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than 0." }),
  categoryId: z.string().min(1, "Category is required"),
})

export type MenuCategoryState = {
  errors?: {
    title?: string[]
  }
  message?: string | null
}

export type MenuItemState = {
  errors?: {
    name?: string[],
    imageUrl?: string[],
    price?: string[],
    categoryId?:string[],
  }
  message?: string | null
}




export async function createMenuCategory(
  prevState: MenuCategoryState,
  formData: FormData
) {
  const rawData = {
    title: formData.get("title"),
  }

  const validatedFields = MenuCategorySchema.safeParse(rawData)
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)
    return {
      errors: {
        title: tree.properties?.title?.errors,
      },
      message: "Missing or Invalid Fields. Failed to Create Menu Category.",
    }
  }
  const { title } = validatedFields.data

  await prisma.menuCategory.create({
    data: {
      title: title,
    },
  })

  revalidateTag("menuCategories", "max")
  revalidateTag("dashboard", "max")
  revalidatePath("/dashboard/menu")
  redirect("/dashboard/menu")
}

export async function createMenuItem(
  prevState: MenuItemState,
  formData: FormData
) {
  const rawData = {
    name: formData.get("name"),
    imageUrl: formData.get("imageUrl"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId")
  }

  const validatedFields = MenuItemSchema.safeParse(rawData)
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)
    return {
      errors: {
        name: tree.properties?.name?.errors,
        imageUrl: tree.properties?.imageUrl?.errors,
        price: tree.properties?.price?.errors,
        categoryId: tree.properties?.categoryId?.errors
      },
      message: "Missing or Invalid Fields. Failed to Create Menu Item.",
    }
  }
  const { name, imageUrl, price, categoryId } = validatedFields.data

  await prisma.menuItem.create({
    data: {
      name: name,
      imageUrl: imageUrl,
      price: price,
      category: {
        connect: {id: categoryId}
      }
    },
  })

  revalidateTag("menuItems", "max")
  revalidateTag("dashboard", "max")
  revalidatePath("/dashboard/menu")
  redirect("/dashboard/menu")
}
export async function deleteMenuCategory(id: string) {
  await prisma.menuCategory.delete({
    where: {
      id: id,
    },
  })
  revalidateTag("menuCategories", "max")
  revalidateTag("dashboard", "max")
  revalidatePath("/dashboard/categories")
  redirect("/dashboard/categories")
}

export async function deleteMenuItem(id: string) {
  await prisma.menuItem.delete({
    where: {
      id: id,
    },
  })
  revalidateTag("menuItems", "max")
  revalidateTag("dashboard", "max")
  revalidatePath("/dashboard/items")
  redirect("/dashboard/items")
}

export async function updateMenuCategory(
  id: string,
  prevState: MenuCategoryState,
  formData: FormData
) {
  const rawData = {
    title: formData.get("title"),
  }
  const validatedFields = MenuCategorySchema.safeParse(rawData)
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)
    return {
      errors: {
        title: tree.properties?.title?.errors,
      },
      message: "Missing or Invalid Fields. Failed to Update Menu Category.",
    }
  }
  const { title } = validatedFields.data
  await prisma.menuCategory.update({
    where: { id: id },
    data: {
      title: title,
    },
  })
  revalidateTag("menuCategories", "max")
  revalidateTag("dashboard", "max")
  revalidatePath("/dashboard/menu")
  redirect("/dashboard/menu")
}

export async function updateMenuItem(
  id: string,
  prevState: MenuItemState,
  formData: FormData
) {
  const rawData = {
    name: formData.get("name"),
    imageUrl: formData.get("imageUrl"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId")
  }

  const validatedFields = MenuItemSchema.safeParse(rawData)
  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)
    return {
      errors: {
        name: tree.properties?.name?.errors,
        imageUrl: tree.properties?.imageUrl?.errors,
        price: tree.properties?.price?.errors,
        categoryId: tree.properties?.categoryId?.errors
      },
      message: "Missing or Invalid Fields. Failed to Update Menu Item.",
    }
  }
  const { name, imageUrl, price, categoryId } = validatedFields.data

  await prisma.menuItem.update({
    where: { id: id },
    data: {
      name: name,
      imageUrl: imageUrl,
      price: price,
      category: {
        connect: {id: categoryId}
      }
    },
  })
  revalidateTag("menuItems", "max")
  revalidateTag("dashboard", "max")
  revalidatePath("/dashboard/menu")
  redirect("/dashboard/menu")
}
