"use client"

import { OrderStatusState, updateOrderStatus } from "@/lib/admin/order.actions"
import { useActionState } from "react"
import { ORDER_STATUS_OPTIONS } from "@/lib/constants"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DEMO_MODE } from "@/lib/config"

export default function EditOrderStatusForm({
  id,
  status,
}: {
  id: string
  status: (typeof ORDER_STATUS_OPTIONS)[number]
}) {
  const initialState: OrderStatusState = {
    message: null,
    errors: {},
  }

  const [state, formAction] = useActionState(
    (prevState: OrderStatusState, formData: FormData) =>
      updateOrderStatus(id, formData, prevState),
    initialState
  )

  return (
    <Card>
      <CardContent>
        <form action={formAction}>
          <Field>
            <Label htmlFor="status">Status</Label>

            <Select name="status" defaultValue={status}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {ORDER_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div id="category-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className="text-xs text-red-600" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </Field>
          <div id="form-error" aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="text-xs text-red-600" key={state.message}>
                {state.message}
              </p>
            )}
          </div>
          <CardFooter className="mt-6 flex justify-end gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/orders">Cancel</Link>
            </Button>
            <Button size="lg" disabled={DEMO_MODE}>
           
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
