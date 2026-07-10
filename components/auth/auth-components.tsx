import { signIn, signOut } from "@/lib/auth"
import { LoginButton, DemoLoginButton } from "../buttons/login-button"
import { LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { demoAdminLogin, demoCustomerLogin } from "@/lib/demo-login"
import { redirect } from "next/navigation";

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <LoginButton/>
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


export function SignInAsAdmin() {
  return (
    <form
      action={async () => {
        "use server";
        await demoAdminLogin();
        redirect("/dashboard");
        
      }}
    >
      <DemoLoginButton text="Take a Tour as Admin" />
    </form>
  );
}

export function SignInAsCustomer() {
  return (
    <form
      action={async () => {
        "use server";
        await demoCustomerLogin();
        redirect("/menu");
       
      }}
    >
      <DemoLoginButton text="Take a Tour as Customer"/>
    </form>
  );
}
