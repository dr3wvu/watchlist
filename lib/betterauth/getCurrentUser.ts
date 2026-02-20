"use server";

import { auth } from "@/lib/betterauth/auth";
import { headers } from "next/headers";

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });

  return session?.user ?? null;
}
