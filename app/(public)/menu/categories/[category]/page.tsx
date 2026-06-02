import type { Metadata} from "next"
import { getMenuItemsPerCategory } from "@/lib/data"
import { MenuCard } from "@/components/cards/menu-card"

export const metadata: Metadata = {
  title: 'Menu',
};
export default async function Page(props: {
  params: Promise<{ category: string }>
}) {
  const { category } = await props.params

  const menuItems = await getMenuItemsPerCategory(category)

  return (
    <div className="py-2">
      <h1 className="mb-6 text-xl font-semibold md:text-2xl">{category}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <MenuCard
              key={item.id}
              {...item}
              categoryTitle={item.categoryTitle}
            />
        ))}
      </div>
    </div>
  )
}
