"use client";
import { useContext } from "react"
import CartContext from "@/app/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MenuItemTableRow } from "@/lib/definitions"



export function MenuCard({ id, name, price, imageUrl, categoryTitle }: MenuItemTableRow) {
  const { addToCart } = useContext(CartContext)
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={imageUrl}
        alt={name}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{categoryTitle}</Badge>
        </CardAction>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <span className="font-bold text-lg text-foreground"> {price.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</span>
         
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={() => addToCart({ id, name, price, imageUrl, quantity: 1 })}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
