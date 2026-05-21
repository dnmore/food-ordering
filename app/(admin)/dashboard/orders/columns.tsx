"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OrderTableRow } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"

export const orderColumns: ColumnDef<OrderTableRow>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toLocaleString()

      return <div>{date}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <div className="flex gap-2">
          <Button asChild variant="link" size="lg">
          <Link href={`/dashboard/orders/${item.id}/details`}>view</Link>
          </Button>
           <Button asChild variant="link" size="lg">
          <Link href={`/dashboard/orders/${item.id}/edit`}>edit</Link>
          </Button>
        </div>
      )
    },
  },
]
