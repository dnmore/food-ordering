"use client"

import { useCartStore } from "@/app/store/useCartStore"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CheckoutTable() {
  const { cartItems } = useCartStore()

  const totalPrice = useCartStore((state) =>
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )

  return (
    <Table className="w-full max-w-2xl">
      <TableCaption>Summary of selected products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Product</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-center">{item.quantity}</TableCell>

            <TableCell className="text-right">
              {(item.price * item.quantity).toLocaleString("it-IT", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {totalPrice.toLocaleString("it-IT", {
              style: "currency",
              currency: "EUR",
            })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
