import { signIn, signOut } from "@/lib/auth"
import { LoginButton, DemoLoginButton } from "../buttons/login-button"
import { SignOutForm } from "./sign-out-form"
import { demoAdminLogin, demoCustomerLogin } from "@/lib/demo-login"
import { redirect } from "next/navigation"

export function SignIn({ provider }: { provider?: string }) {
  async function handleSignIn() {
    "use server"
    await signIn(provider)
  }

  return (
    <form action={handleSignIn}>
      <LoginButton />
    </form>
  )
}

export function SignOut() {
  async function handleSignOut() {
    "use server"
    await signOut({ redirectTo: "/" })
  }
  return <SignOutForm action={handleSignOut} />
}

export function SignInAsAdmin() {
  async function handleDemoAdminLogin() {
    "use server"
    await demoAdminLogin()
    redirect("/dashboard")
  }
  return (
    <form action={handleDemoAdminLogin}>
      <DemoLoginButton text="Take a Tour as Admin" />
    </form>
  )
}

export function SignInAsCustomer() {
  async function handleDemoCustomerLogin() {
    "use server"
    await demoCustomerLogin()
    redirect("/menu")
  }
  return (
    <form
      action={handleDemoCustomerLogin}
    >
      <DemoLoginButton text="Take a Tour as Customer" />
    </form>
  )
}
