"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OrderTableRow } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown} from "lucide-react"

export const orderColumns: ColumnDef<OrderTableRow>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "totalAmount",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
      return <div className="font-medium px-3">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toLocaleString()

      return <div>{date}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

      return (
        <div className="flex gap-2">
          <Button asChild>
          <Link href={`/dashboard/orders/${order.id}/details`}>
          View
          </Link>
          </Button>
           <Button asChild variant="secondary">
          <Link href={`/dashboard/orders/${order.id}/edit`}>
            Edit
          </Link>
          </Button>
        </div>
      )
    },
  },
]
