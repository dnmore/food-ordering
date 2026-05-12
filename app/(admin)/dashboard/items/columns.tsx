"use client"

import Link from "next/link"
import { MenuItemTableRow } from "@/lib/definitions"
import { DeleteItemButton } from "@/components/ui/delete-button"
import { ColumnDef } from "@tanstack/react-table"


export const menuItemsColumns: ColumnDef<MenuItemTableRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "categoryTitle",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <div className="flex gap-2">
           <Link href={`/dashboard/items/${item.id}/edit`}>
            Edit
          </Link>

          <DeleteItemButton id={item.id} />
        </div>
      )
    },
  },
]
