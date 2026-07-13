"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/db";
import { randomUUID } from "crypto";
import { SESSION_MAX_AGE, AUTH_COOKIE_NAME } from "./config";

export async function demoAdminLogin() {
  const demoAdminUser = await prisma.user.findUnique({
    where: { email: process.env.DEMO_ADMIN_EMAIL },
  });

  if (!demoAdminUser) {
    throw new Error("Demo admin user not found");
  }

  const sessionToken = randomUUID();

  const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000); 

  await prisma.session.create({
    data: {
      sessionToken,
      userId: demoAdminUser.id,
      expires,
    },
  });

  const cookieStore = await cookies();

  

  cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}


export async function demoCustomerLogin() {
  const demoCustomerUser = await prisma.user.findUnique({
    where: { email: process.env.DEMO_CUSTOMER_EMAIL },
  });

  if (!demoCustomerUser) {
    throw new Error("Demo customer user not found");
  }

  const sessionToken = randomUUID();

  const expires = new Date(Date.now() + 6 * 60 * 60 * 1000); 

  await prisma.session.create({
    data: {
      sessionToken,
      userId: demoCustomerUser.id,
      expires,
    },
  });

  const cookieStore = await cookies();

  
  cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
