import { z } from "zod"

export const clothesSchema = z
  .object({
    productCode: z
      .string()
      .min(1, "Product code is required")
      .max(20, "Product code must be less than 20 characters")
      .regex(/^[a-zA-Z0-9._-]+$/, "Product code can only contain letters, numbers, dots, hyphens, and underscores"),

    name: z.string().min(1, "Clothes name is required").max(100, "Clothes name must be less than 100 characters"),

    category: z
      .array(z.enum(["boy", "girl"]))
      .min(1, "At least one category is required")
      .max(2, "Maximum 2 categories allowed"),

    ageGroup: z
      .array(z.enum(["0-1", "1-2", "2-3", "3-4", "4-5", "0-5"]))
      .min(1, "At least one age group is required")
      .max(6, "Maximum 6 age groups allowed"),

    sellingPrice: z.number().min(0, "Selling price cannot be negative").max(100000, "Selling price seems too high"),

    actualPrice: z
      .number()
      .min(0, "Actual price cannot be negative")
      .max(100000, "Actual price seems too high")
      .optional(),

    size: z.string().min(1, "Size is required").max(20, "Size must be less than 20 characters"),

    inStock: z.number().int("Stock must be a whole number").min(0, "Stock cannot be negative"),

    weightInGrams: z
      .number()
      .min(1, "Weight must be at least 1 gram")
      .max(50000, "Weight seems too high for baby clothes"),

    color: z.string().max(50, "Color must be less than 50 characters").optional(),

    images: z
      .array(z.string().url("Invalid image URL"))
      .min(1, "At least one image is required")
      .max(10, "Maximum 10 images allowed"),

    description: z.string().max(500, "Description must be less than 500 characters").optional(),
  })
  .refine((data) => !data.actualPrice || data.actualPrice >= data.sellingPrice, {
    message: "Actual price should be greater than or equal to selling price",
    path: ["actualPrice"],
  })

export type ClothesFormData = z.infer<typeof clothesSchema>

export const clothesSchemaInfo = {
  title: "Clothes Product Schema",
  description: "Validation rules for clothes products",
  fields: [
    {
      name: "productCode",
      type: "string",
      rules: "Required, max 20 chars, alphanumeric with dots/hyphens/underscores only",
      example: "shirt_boy_1.1",
    },
    {
      name: "name",
      type: "string",
      rules: "Required, max 100 characters",
      example: "Cotton Baby T-Shirt",
    },
    {
      name: "category",
      type: "array",
      rules: "Required, min 1, max 2, values: boy, girl",
      example: "['boy', 'girl']",
    },
    {
      name: "ageGroup",
      type: "array",
      rules: "Required, min 1, max 6, values: 0-1, 1-2, 2-3, 3-4, 4-5, 0-5",
      example: "['0-1', '1-2']",
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
      name: "size",
      type: "string",
      rules: "Required, max 20 characters",
      example: "6-12 months",
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
      example: "150",
    },
    {
      name: "color",
      type: "string",
      rules: "Optional, max 50 characters",
      example: "Blue",
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
      example: "Soft cotton t-shirt for babies",
    },
  ],
}
