"use client"

import Link from "next/link"
import { MenuItemTableRow } from "@/lib/definitions"
import { Button } from "@/components/ui/button"
import { DeleteItemButton } from "@/components/buttons/delete-button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const menuItemsColumns: ColumnDef<MenuItemTableRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
      return <div className="px-3 font-medium">{formatted}</div>
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
          <Button asChild variant="secondary">
            <Link href={`/dashboard/items/${item.id}/edit`}>Edit</Link>
          </Button>

          <DeleteItemButton id={item.id} />
        </div>
      )
    },
  },
]
