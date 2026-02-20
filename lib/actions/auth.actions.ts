"use server";

import { auth } from "@/lib/betterauth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({
  email,
  password,
  name,
  country,
  investmentGoals,
  riskTolerance,
}: SignUpFormData) => {
  try {
    const res = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    if (res) {
      await inngest.send({
        name: "app/user.created",
        data: { email, name, country, investmentGoals, riskTolerance },
      });
    }

    return { success: true, data: res };
  } catch (err) {
    return { success: false, error: `Sign up failed` };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const res = await auth.api.signInEmail({ body: { email, password } });

    return { success: true, data: res };
  } catch (err) {
    console.log(`Sign in failed ${err}`);
    return { success: false, error: `Sign in failed ${err}` };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    return { success: false, error: "Sign out failed" };
  }
};
