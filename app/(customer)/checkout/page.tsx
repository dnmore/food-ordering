"use client"
import { useContext } from "react"
import CartContext from "../../context/cart-context"
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

export default function Page() {
  const { cartItems, totalPrice } = useContext(CartContext)

  return (
    <div className="container mx-auto px-4">
      <div className="flex-col items-center gap-4 py-10 px-2">
        <h1 className="mb-6 text-3xl font-extrabold md:text-5xl">
          Checkout
        </h1>
        
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
            
            <TableCell className="text-right">{(item.price * item.quantity).toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{totalPrice.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  
          
           
          
        </div>

       
      </div>
    
  )
}
