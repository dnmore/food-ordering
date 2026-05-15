import 'server-only'
import { auth } from "@/lib/auth";
import { cache } from "react";
import { redirect} from "next/navigation"

export const verifySession = cache(async () =>
{
    const session = await auth();
     if (!session?.user) {
        return null
      }

      return session;
})

export const getUserRole = cache(async () => {
    const session = await verifySession()
    return session?.user?.role
})

export const requireAdmin = cache(async () => {
    const session = await verifySession()
    if(!session || session.user.role !== 'ADMIN'){
        redirect("/")
    }
})
