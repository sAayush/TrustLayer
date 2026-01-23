import { z } from 'zod'

const passwordRules = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, {
    message: 'Password must contain uppercase, lowercase, number, and special character',
  })

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const signupSchema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    password: passwordRules,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type AuthState = {
  error?: string
  success?: string
  fieldErrors?: {
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    code?: string[]
  }
}

export const otpSchema = z.object({
  email: z.email(),
  code: z.string().length(6, { message: 'Code must be 6 digits' }),
})
