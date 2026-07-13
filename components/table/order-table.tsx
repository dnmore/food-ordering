"use client"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { OrderDetails } from "@/lib/definitions"

export function OrderTable({ order }: { order: OrderDetails }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 rounded-lg border p-4">
        <h2 className="text-sm md:text-xl font-semibold">Order #{order.id}</h2>

        <div className="container mx-auto grid grid-cols-1  md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Customer</p>
            <p>{order.customer.name}</p>
            <p>{order.customer.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <p>{order.status}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Created At</p>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Completed At</p>
            <p>
              {order.completedAt
                ? new Date(order.completedAt).toLocaleString()
                : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.menuItem.name}
                </TableCell>

                <TableCell className="text-right">{item.quantity}</TableCell>

                <TableCell className="text-right">
                  {new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "EUR",
                  }).format(item.unitPrice)}
                </TableCell>

                <TableCell className="text-right">
                  {new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "EUR",
                  }).format(item.totalPrice)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3} className="text-right font-semibold">
                Total
              </TableCell>

              <TableCell className="text-right font-bold">
                {new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "EUR",
                }).format(order.totalAmount)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-end">
          <Button asChild variant="outline">
            <Link href="/dashboard/orders">Back</Link>
          </Button>
        </div>
    </div>
  )
}
