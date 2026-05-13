import { getMenuItemsTable } from "@/lib/data"
import { MenuCard } from "@/components/cards/menu-card"

export default async function Page() {
  const menuItemsData = await getMenuItemsTable()

  return (
    <div className="container mx-auto flex items-center">
      <div className="flex-col items-center gap-4 py-10">
        <h1 className="mb-6 text-center text-3xl font-extrabold md:text-5xl">
          Menu
        </h1>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
          {menuItemsData.map((item) => (
            <MenuCard
              key={item.id}
              {...item}
              categoryTitle={item.categoryTitle}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
