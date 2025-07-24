import { z } from "zod"

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email").optional(),
    phone: z
      .string()
      .regex(/^\+?\d{10,15}$/, "Invalid phone number")
      .optional(),
    address: z.object({
      street: z.string().min(1),
      area: z.string().min(2),
      state: z.string().min(2),
      district: z.string().min(2),
      subDistrict: z.string().min(2),
      village: z.string().min(2),
      pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
    }),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
    path: ["email"],
  })
