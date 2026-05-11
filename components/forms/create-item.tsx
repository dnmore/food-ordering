"use client"
import { createMenuItem, MenuItemState } from "@/lib/admin/menu.actions"
import { useActionState, useState } from "react"
import { CategorySelectOption } from "@/lib/definitions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function CreateMenuItemForm({categoryOptions}: {categoryOptions: CategorySelectOption[]}){
    const initialState: MenuItemState = {
        message: null,
        errors: {}
    }

    const [state, formAction] = useActionState(createMenuItem, initialState)
    const [categoryId, setCategoryId] = useState<string | undefined>()

    return(
        <Card>
      <CardContent>
        <form action={formAction}>
          <FieldGroup className="my-4">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Chicken Burger"
              />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            <Field>
              <Label htmlFor="imageUrl">Image</Label>
              <Input id="imageUrl" name="imageUrl" type="text" placeholder="https://.." />
              <div id="imageUrl-error" aria-live="polite" aria-atomic="true">
                {state.errors?.imageUrl &&
                  state.errors.imageUrl.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            
              <Field>
              <Label htmlFor="price">Price (€)</Label>
              <Input
                id="price"
                name="price"
                type="text"
                placeholder="10"
              />
              <div id="price-error" aria-live="polite" aria-atomic="true">
                {state.errors?.price &&
                  state.errors.price.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
            <Field>
              <Label htmlFor="category">Category</Label>
              <input type="hidden" name="categoryId" value={categoryId ?? ""} />
              <Select onValueChange={setCategoryId}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categoryOptions.map((category) => (<SelectItem key={category.id} value={category.id}>{category.title}</SelectItem>))}
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div id="category-error" aria-live="polite" aria-atomic="true">
                {state.errors?.categoryId &&
                  state.errors.categoryId.map((error: string) => (
                    <p className="text-xs text-red-600" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </Field>
          </FieldGroup>
          <div id="form-error" aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="text-xs text-red-600" key={state.message}>
                {state.message}
              </p>
            )}
          </div>
          <CardFooter className="mt-6 flex justify-end gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/menu">Cancel</Link>
            </Button>

           <Button >
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
    )
}