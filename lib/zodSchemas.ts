// lib/zodSchemas.ts
import { z } from "zod"

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone must be digits only")
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password too long"),
  method: z.enum(["email", "phone"]), // user chooses one
})
