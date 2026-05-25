import { deleteMenuCategory, deleteMenuItem } from "@/lib/admin/menu.actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteCategoryButton({ id }: { id: string }) {
  const deleteCategoryWithId = deleteMenuCategory.bind(null, id)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" aria-label="Delete Category">
          <span>Delete </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Delete Category?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this category. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div>
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          </div>
          
          <form action={deleteCategoryWithId}>
            <AlertDialogAction type="submit" className="w-full">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function DeleteItemButton({ id }: { id: string }) {
  const deleteItemWithId = deleteMenuItem.bind(null, id)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" aria-label="Delete Item">
          <span>Delete </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Delete Item?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this item. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div>
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          </div>
          
          <form action={deleteItemWithId}>
            <AlertDialogAction type="submit" className="w-full">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
