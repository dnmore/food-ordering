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
      type="submit"
      disabled={pending || disabled}
    >
      {pending ? "Processing..." : "Place Order"}
    </Button>
  )
}