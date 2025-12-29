"use server";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema, AuthState, otpSchema } from "@/schemas/auth";
import { redirect } from "next/navigation";
import z from "zod";
import { getAuthRedirectPath } from "@/utils/auth-redirect";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000" 

export async function login(prevState: AuthState | null, formData: FormData) {
  const fields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    const flatErrors = z.flattenError(fields.error);
    return { fieldErrors: flatErrors.fieldErrors };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: fields.data.email,
    password: fields.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  const redirectTo = await getAuthRedirectPath(supabase);
  redirect(redirectTo);
}

export async function signup(prevState: AuthState | null, formData: FormData) {
  const fields = signupSchema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    const flatErrors = z.flattenError(fields.error);
    return { fieldErrors: flatErrors.fieldErrors };
  }

  const email = fields.data.email;
  const password = fields.data.password;

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect(`/otp?email=${encodeURIComponent(fields.data.email)}`);
}

export async function verifyOtp(prevState: AuthState | null, formData: FormData) {
  const fields = otpSchema.safeParse(Object.fromEntries(formData));

  if (!fields.success) {
    const flatErrors = z.flattenError(fields.error);
    return { fieldErrors: flatErrors.fieldErrors };
  }

  const email = fields.data.email;
  const token = fields.data.code;

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });

  if (error) {
    return { error: error.message };
  }

  const redirectTo = await getAuthRedirectPath(supabase);
  redirect(redirectTo);
}

export async function resendOTP(prevState: AuthState | null, formData: FormData) {
    const fields = otpSchema.safeParse(Object.fromEntries(formData));

    if (!fields.success) {
        const flatErrors = z.flattenError(fields.error);
        return { fieldErrors: flatErrors.fieldErrors };
    }

    const email = fields.data.email;
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
        email,
        type: "signup",
    });
    if (error) {
        return { error: error.message };
    }
    return { success: "Code sent successfully!" };
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}

export async function loginWithSocial(provider: "google" | "github") {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  })

  if (error) {
    redirect("/login?error=oauth_error")
  }

  if (data.url) {
    redirect(data.url)
  }
}
