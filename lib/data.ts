import prisma from "./db";
import { unstable_cache } from "next/cache";
import { CategorySelectOption, MenuCategoryTableRow, MenuItemTableRow } from "./definitions";

export const getCategoriesSelectOptions = unstable_cache(
  async (): Promise<CategorySelectOption[]> => {
    
    return prisma.menuCategory.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: { title: "asc" },
    });
  },
  ["categories-select"],
  { tags: ["menuCategories"] },
);


export const getCategoriesTable = unstable_cache(
  async (): Promise<MenuCategoryTableRow[]> => {
    return prisma.menuCategory.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: { title: "asc" },
    });
  },
  ["categories-table"],
  { tags: ["menuCategories"] },
);

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
    
    return menuData.map(item => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: Number(item.price),
        categoryTitle: item.category.title
      }))
  },

  ["menu-items-table"],
  { tags: ["menuItems"] },
);

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
    
    return menuData.map(item => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: Number(item.price),
        categoryTitle: item.category.title
      }))
  },

  ["menu-items-category"],
  { tags: ["menuItems"] },
);