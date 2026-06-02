"use client"
import {Button} from "@/components/ui/button"
import { useFormStatus } from "react-dom"

type Props = {
  disabled?: boolean
}

export function CheckoutButton({ disabled }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
    variant="accent"
      type="submit"
      size="lg"
      disabled={pending || disabled}
      className="mt-4"
    >
      {pending ? "Processing..." : "Place Order"}
    </Button>
  )
}