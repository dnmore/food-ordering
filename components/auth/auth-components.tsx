import { signIn, signOut } from "@/lib/auth"
import { LoginButton } from "../buttons/login-button"
import { LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <LoginButton />
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button variant="ghost" className="flex items-center gap-1">
        <LogOutIcon /> Log out
      </Button>
    </form>
  )
}
