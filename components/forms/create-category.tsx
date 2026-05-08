"use client"
import { createMenuCategory, MenuCategoryState } from "@/lib/admin/menu.actions"
import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function CreateMenuCategoryForm() {
  const initialState: MenuCategoryState = {
    message: null,
    errors: {},
  }

  const [state, formAction] = useActionState(createMenuCategory, initialState)

  return (
    <Card>
      <CardContent>
        <form action={formAction}>
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Appetizers"
            />
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
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
              <Link href="/dashboard/menu">Cancel</Link>
            </Button>
            <Button size="lg"> Save</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
