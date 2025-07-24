import { z } from "zod"

export const newbornSchema = z
  .object({
    productCode: z
      .string()
      .min(1, "Product code is required")
      .max(20, "Product code must be less than 20 characters")
      .regex(/^[a-zA-Z0-9._-]+$/, "Product code can only contain letters, numbers, dots, hyphens, and underscores"),
    name: z
      .string()
      .min(1, "Newborn item name is required")
      .max(100, "Newborn item name must be less than 100 characters"),
    sellingPrice: z.number().min(0, "Selling price cannot be negative").max(100000, "Selling price seems too high"),
    actualPrice: z.number().min(0, "Actual price cannot be negative").max(100000, "Actual price seems too high"),
    inStock: z.number().int("Stock must be a whole number").min(0, "Stock cannot be negative"),
    weightInGrams: z
      .number()
      .min(1, "Weight must be at least 1 gram")
      .max(50000, "Weight seems too high for newborn items"),
    images: z
      .array(z.string().url("Invalid image URL"))
      .min(1, "At least one image is required")
      .max(10, "Maximum 10 images allowed"),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
    category: z.string().max(50, "Category must be less than 50 characters").optional(),
  })
  .refine((data) => data.actualPrice >= data.sellingPrice, {
    message: "Actual price should be greater than or equal to selling price",
    path: ["actualPrice"],
  })

export type NewbornFormData = z.infer<typeof newbornSchema>

export const newbornSchemaInfo = {
  title: "Newborn Product Schema",
  description: "Validation rules for newborn products",
  fields: [
    {
      name: "productCode",
      type: "string",
      rules: "Required, max 20 chars, alphanumeric with dots/hyphens/underscores only",
      example: "newborn_gift_1.1",
    },
    {
      name: "name",
      type: "string",
      rules: "Required, max 100 characters",
      example: "Newborn Welcome Gift Set",
    },
    {
      name: "sellingPrice",
      type: "number",
      rules: "Required, min 0, max 100000",
      example: "499",
    },
    {
      name: "actualPrice",
      type: "number",
      rules: "Required, min 0, max 100000, must be >= sellingPrice",
      example: "699",
    },
    {
      name: "inStock",
      type: "number",
      rules: "Required, integer, min 0",
      example: "25",
    },
    {
      name: "weightInGrams",
      type: "number",
      rules: "Required, min 1, max 50000",
      example: "500",
    },
    {
      name: "images",
      type: "array",
      rules: "Required, min 1 image, max 10 images, valid URLs only",
      example: "['https://cloudinary.com/image1.jpg']",
    },
    {
      name: "description",
      type: "string",
      rules: "Optional, max 500 characters",
      example: "Perfect gift set for welcoming a newborn",
    },
    {
      name: "category",
      type: "string",
      rules: "Optional, max 50 characters",
      example: "chhathi, welcome, gifting, ceremony",
    },
  ],
}
