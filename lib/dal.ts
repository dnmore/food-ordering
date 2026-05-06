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