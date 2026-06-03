"use client"
import { useCartStore } from "@/app/store/useCartStore"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MenuItemCard } from "@/lib/definitions"
import Image from "next/image"

export function MenuCard({
  id,
  name,
  price,
  imageUrl,
  categoryTitle,
}: MenuItemCard) {
  const { addToCart } = useCartStore()
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      <Image
        src={imageUrl}
        alt={name}
        className="relative z-20 aspect-video w-full object-cover"
        width={200}
        height={200}
        priority={false}
      />
      
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{categoryTitle}</Badge>
          </CardAction>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            <p className="text-base font-semibold">
              {price.toLocaleString("it-IT", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <Button
            variant="accent"
            size="sm"
            className="w-full"
            onClick={() =>
              addToCart({ id, name, price, imageUrl, quantity: 1 })
            }
          >
            Add to Cart
          </Button>
        </CardFooter>
      
    </Card>
  )
}
