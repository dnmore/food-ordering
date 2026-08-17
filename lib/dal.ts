import "server-only"
import { auth } from "@/lib/auth"
import { cache } from "react"
import { redirect } from "next/navigation"
import { DEMO_MODE } from "@/lib/config"

export const verifySession = cache(async () => {
  const session = await auth()
  if (!session?.user) {
    return null
  }

  return session
})

export const getUserRole = cache(async () => {
  const session = await verifySession()
  return session?.user?.role
})

export const getCurrentUser = cache(async () => {
  const session = await auth()

  if(!session?.user?.id) return null

  return {
    id: session.user.id,
    role: session.user.role,
    isDemo: DEMO_MODE && (session.user.email === process.env.DEMO_ADMIN_EMAIL || session.user.email === process.env.DEMO_CUSTOMER_EMAIL)
  }
})


export async function requireAdminRouteAccess(){
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    redirect("/")
  }

  return user
}

export async function requireAdminMutation(){
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN" || user.isDemo) {
    throw new Error("Unauthorized")
  }
  return user
}