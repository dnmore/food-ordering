"use client"
import { useCartStore } from "@/app/store/useCartStore"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MenuItemTableRow } from "@/lib/definitions"

export function MenuCard({
  id,
  name,
  price,
  imageUrl,
  categoryTitle,
}: MenuItemTableRow) {
  const { addToCart } = useCartStore()
  return (
    <Card size="sm" className="mx-auto w-full max-w-sm px-4">
      <CardHeader>
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <Badge variant="outline" className="mb-2">
              {categoryTitle}
            </Badge>
            <CardTitle className="text-lg font-semibold">
              {name}
            </CardTitle>
          </div>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base font-semibold">
          {price.toLocaleString("it-IT", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          className="w-full"
          onClick={() => addToCart({ id, name, price, imageUrl, quantity: 1 })}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
