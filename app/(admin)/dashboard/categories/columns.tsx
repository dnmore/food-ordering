"use client"

import Link from "next/link"
import { CategorySelectOption } from "@/lib/definitions"
import { DeleteCategoryButton } from "@/components/buttons/delete-button"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const categoriesColumns: ColumnDef<CategorySelectOption>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original

      return (
        <div className="flex gap-2">
          <Link href={`/dashboard/categories/${category.id}/edit`}>
            Edit
          </Link>
          <DeleteCategoryButton id={category.id} />
        </div>
      )
    },
  },
]
