import { signIn, signOut } from "@/lib/auth"
import { LoginButton } from "./login-button"
import { Button } from "../ui/button"

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
        await signOut({ redirectTo: "/" })
      }}
    >
      <Button variant="ghost">Sign Out</Button>
    </form>
  )
}
