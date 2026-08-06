"use client"

import { LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/app/store/useCartStore"


type Props = {
    action: () => Promise<void>
}

export function SignOutForm({action}: Props){
const clearCart = useCartStore((state) => state.clearCart)

return(
    
        <form
          action={action}
          onSubmit={() => {clearCart()}}
        >
          <Button variant="ghost" className="flex items-center gap-1">
            <LogOutIcon /> Log out
          </Button>
        </form>
      )

}