import { z } from "zod"

export const bathSchema = z
  .object({
    productCode: z
      .string()
      .min(1, "Product code is required")
      .max(20, "Product code must be less than 20 characters")
      .regex(/^[a-zA-Z0-9._-]+$/, "Product code can only contain letters, numbers, dots, hyphens, and underscores"),
    name: z.string().min(1, "Bath item name is required").max(100, "Bath item name must be less than 100 characters"),
    type: z.string().max(50, "Type must be less than 50 characters").optional(),
    sellingPrice: z.number().min(0, "Selling price cannot be negative").max(100000, "Selling price seems too high"),
    actualPrice: z.number().min(0, "Actual price cannot be negative").max(100000, "Actual price seems too high"),
    sizeInMl: z.number().min(1, "Size must be at least 1ml").max(10000, "Size seems too large").optional(),
    inStock: z.number().int("Stock must be a whole number").min(0, "Stock cannot be negative"),
    weightInGrams: z
      .number()
      .min(1, "Weight must be at least 1 gram")
      .max(50000, "Weight seems too high for bath items"),
    widthInCm: z.number().min(0.1, "Width must be at least 0.1 cm").max(1000, "Width seems too large").optional(),
    lengthInCm: z.number().min(0.1, "Length must be at least 0.1 cm").max(1000, "Length seems too large").optional(),
    images: z
      .array(z.string().url("Invalid image URL"))
      .min(1, "At least one image is required")
      .max(10, "Maximum 10 images allowed"),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
  })
  .refine((data) => data.actualPrice >= data.sellingPrice, {
    message: "Actual price should be greater than or equal to selling price",
    path: ["actualPrice"],
  })

export type BathFormData = z.infer<typeof bathSchema>

export const bathSchemaInfo = {
  title: "Bath Product Schema",
  description: "Validation rules for bath products",
  fields: [
    {
      name: "productCode",
      type: "string",
      rules: "Required, max 20 chars, alphanumeric with dots/hyphens/underscores only",
      example: "soap_baby_1.1",
    },
    {
      name: "name",
      type: "string",
      rules: "Required, max 100 characters",
      example: "Baby Gentle Soap",
    },
    {
      name: "type",
      type: "string",
      rules: "Optional, max 50 characters",
      example: "soap, shampoo, towel, diaper",
    },
    {
      name: "sellingPrice",
      type: "number",
      rules: "Required, min 0, max 100000",
      example: "199",
    },
    {
      name: "actualPrice",
      type: "number",
      rules: "Required, min 0, max 100000, must be >= sellingPrice",
      example: "299",
    },
    {
      name: "sizeInMl",
      type: "number",
      rules: "Optional, min 1, max 10000 (for liquid items)",
      example: "250",
    },
    {
      name: "inStock",
      type: "number",
      rules: "Required, integer, min 0",
      example: "50",
    },
    {
      name: "weightInGrams",
      type: "number",
      rules: "Required, min 1, max 50000",
      example: "300",
    },
    {
      name: "widthInCm",
      type: "number",
      rules: "Optional, min 0.1, max 1000 (for towels/diapers)",
      example: "30",
    },
    {
      name: "lengthInCm",
      type: "number",
      rules: "Optional, min 0.1, max 1000 (for towels/diapers)",
      example: "40",
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
      example: "Gentle soap for baby's delicate skin",
    },
  ],
}
