import { z } from "zod"

export const videoSchema = z
  .object({
    name: z.string().min(1, "Video name is required").max(100, "Video name must be less than 100 characters"),
    productCode: z
      .string()
      .min(1, "Product code is required")
      .max(20, "Product code must be less than 20 characters")
      .regex(/^[a-zA-Z0-9._-]+$/, "Product code can only contain letters, numbers, dots, hyphens, and underscores"),
    videoUrl: z.string().url("Invalid video URL").min(1, "Video URL is required"),
    sellingPrice: z.number().min(0, "Selling price cannot be negative").max(100000, "Selling price seems too high"),
    actualPrice: z
      .number()
      .min(0, "Actual price cannot be negative")
      .max(100000, "Actual price seems too high")
      .optional(),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
  })
  .refine((data) => !data.actualPrice || data.actualPrice >= data.sellingPrice, {
    message: "Actual price should be greater than or equal to selling price",
    path: ["actualPrice"],
  })

export type VideoFormData = z.infer<typeof videoSchema>

export const videoSchemaInfo = {
  title: "Video Product Schema",
  description: "Validation rules for video products",
  fields: [
    {
      name: "name",
      type: "string",
      rules: "Required, max 100 characters",
      example: "Baby Toy Demo Video",
    },
    {
      name: "productCode",
      type: "string",
      rules: "Required, max 20 chars, alphanumeric with dots/hyphens/underscores only",
      example: "video_toy_demo_1.1",
    },
    {
      name: "videoUrl",
      type: "string",
      rules: "Required, must be a valid URL",
      example: "https://cloudinary.com/video/demo.mp4",
    },
    {
      name: "sellingPrice",
      type: "number",
      rules: "Required, min 0, max 100000",
      example: "299",
    },
    {
      name: "actualPrice",
      type: "number",
      rules: "Optional, min 0, max 100000, must be >= sellingPrice",
      example: "399",
    },
    {
      name: "description",
      type: "string",
      rules: "Optional, max 500 characters",
      example: "Watch our amazing baby toy in action!",
    },
  ],
}
