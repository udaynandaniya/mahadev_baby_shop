// hooks/use-form.ts or schema/auth.ts
import * as z from "zod"

export const SignupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone"),
  password: z.string().min(6, "Password must be 6+ characters"),
})
