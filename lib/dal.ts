import { auth } from "@/lib/auth";
import { cache } from "react";

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