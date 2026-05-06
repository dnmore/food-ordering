import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import Google from "next-auth/providers/google";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
}
})