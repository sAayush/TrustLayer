"use client";

import { GalleryVerticalEnd } from "lucide-react"
import { useActionState } from "react";
import { verifyOtp, resendOTP } from "@/actions/auth";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


interface ActionState {
    error?: string;
    success?: string;
}

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const [verifyState, verifyAction, isVerifyPending] = useActionState<ActionState | null, FormData>(verifyOtp, null);
  const [resendState, resendAction, isResendPending] = useActionState<ActionState | null, FormData>(resendOTP, null);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={verifyAction}>
        <input type="hidden" name="email" value={email} />
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Enter verification code</h1>
            <FieldDescription>
              We sent a 6-digit code to {email}
            </FieldDescription>
          </div>

          {verifyState?.error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {verifyState.error}
            </div>
          )}

          <Field className="flex justify-center">
            <FieldLabel htmlFor="otp" className="sr-only">
              Verification code
            </FieldLabel>
            <InputOTP
              maxLength={6}
              name="token"
              id="otp"
              required
              containerClassName="gap-4"
            >
              <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
          <Field>
            <Button type="submit" disabled={isVerifyPending}>
                {isVerifyPending ? "Verifying..." : "Verify"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <div className="text-center text-sm text-balance text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <form action={resendAction} className="inline-flex">
          <input type="hidden" name="email" value={email} />
          <button type="submit" className="underline underline-offset-4 hover:text-primary" disabled={isResendPending}>
            {isResendPending ? "Sending..." : "Resend"}
          </button>
        </form>
        {resendState?.success && (
            <p className="mt-2 text-sm text-green-600">{resendState.success}</p>
        )}
        {resendState?.error && (
            <p className="mt-2 text-sm text-destructive">{resendState.error}</p>
        )}
      </div>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/terms-and-services">Terms of Service</a>{" "}
        and <a href="/privacy-policy">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
