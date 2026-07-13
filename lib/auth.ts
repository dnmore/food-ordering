import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import Google from "next-auth/providers/google";
import { DEMO_MODE} from "@/lib/config";
import { SESSION_MAX_AGE } from "@/lib/config";


const providers = []

if (!DEMO_MODE){
  providers.push(Google)
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: SESSION_MAX_AGE,
  },
  providers,
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
}
})