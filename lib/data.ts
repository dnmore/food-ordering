import prisma from "./db";
import { unstable_cache } from "next/cache";
import { CategorySelectOption } from "./definitions";

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
