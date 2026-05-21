"use client"

import Link from "next/link"
import { CategorySelectOption } from "@/lib/definitions"
import { DeleteCategoryButton } from "@/components/ui/delete-button"
import { ColumnDef } from "@tanstack/react-table"

export const categoriesColumns: ColumnDef<CategorySelectOption>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
