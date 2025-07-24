// import { z } from "zod"

// export const toySchema = z
//   .object({
//     productCode: z
//       .string()
//       .min(1, "Product code is required")
//       .max(20, "Product code must be less than 20 characters")
//       .regex(/^[a-zA-Z0-9._-]+$/, "Product code can only contain letters, numbers, dots, hyphens, and underscores"),

//     name: z.string().min(1, "Toy name is required").max(100, "Toy name must be less than 100 characters"),

//     sellingPrice: z.number().min(0, "Selling price cannot be negative").max(100000, "Selling price seems too high"),

//     actualPrice: z.number().min(0, "Actual price cannot be negative").max(100000, "Actual price seems too high"),

//     inStock: z.number().int("Stock must be a whole number").min(0, "Stock cannot be negative"),

//     weightInGrams: z
//       .number()
//       .min(1, "Weight must be at least 1 gram")
//       .max(50000, "Weight seems too high for a baby toy"),

//     images: z
//       .array(z.string().url("Invalid image URL"))
//       .min(1, "At least one image is required")
//       .max(10, "Maximum 10 images allowed"),

//     description: z.string().max(500, "Description must be less than 500 characters").optional(),
//   })
//   .refine((data) => data.actualPrice >= data.sellingPrice, {
//     message: "Actual price should be greater than or equal to selling price",
//     path: ["actualPrice"],
//   })

// export type ToyFormData = z.infer<typeof toySchema>

// export const toySchemaInfo = {
//   title: "Toy Product Schema",
//   description: "Validation rules for toy products",
//   fields: [
//     {
//       name: "productCode",
//       type: "string",
//       rules: "Required, max 20 chars, alphanumeric with dots/hyphens/underscores only",
//       example: "toycar1.1",
//     },
//     {
//       name: "name",
//       type: "string",
//       rules: "Required, max 100 characters",
//       example: "Colorful Building Blocks",
//     },
//     {
//       name: "sellingPrice",
//       type: "number",
//       rules: "Required, min 0, max 100000",
//       example: "299",
//     },
//     {
//       name: "actualPrice",
//       type: "number",
//       rules: "Required, min 0, max 100000, must be >= sellingPrice",
//       example: "399",
//     },
//     {
//       name: "inStock",
//       type: "number",
//       rules: "Required, integer, min 0",
//       example: "25",
//     },
//     {
//       name: "weightInGrams",
//       type: "number",
//       rules: "Required, min 1, max 50000",
//       example: "250",
//     },
//     {
//       name: "images",
//       type: "array",
//       rules: "Required, min 1 image, max 10 images, valid URLs only",
//       example: "['https://cloudinary.com/image1.jpg']",
//     },
//     {
//       name: "description",
//       type: "string",
//       rules: "Optional, max 500 characters",
//       example: "Safe and colorful building blocks for babies",
//     },
//   ],
// }

import { z } from "zod"

export const toySchema = z
  .object({
    productCode: z
      .string()
      .min(1, "Product code is required")
      .max(20, "Product code must be less than 20 characters")
      .regex(/^[a-zA-Z0-9._-]+$/, "Product code can only contain letters, numbers, dots, hyphens, and underscores"),

    name: z.string().min(1, "Toy name is required").max(100, "Toy name must be less than 100 characters"),

    sellingPrice: z.number().min(0, "Selling price cannot be negative").max(100000, "Selling price seems too high"),

    actualPrice: z.number().min(0, "Actual price cannot be negative").max(100000, "Actual price seems too high"),

    inStock: z.number().int("Stock must be a whole number").min(0, "Stock cannot be negative"),

    weightInGrams: z
      .number()
      .min(1, "Weight must be at least 1 gram")
      .max(50000, "Weight seems too high for a baby toy"),

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

export type ToyFormData = z.infer<typeof toySchema>

export const toySchemaInfo = {
  title: "Toy Product Schema",
  description: "Validation rules for toy products",
  fields: [
    {
      name: "productCode",
      type: "string",
      rules: "Required, max 20 chars, alphanumeric with dots/hyphens/underscores only",
      example: "toycar1.1",
    },
    {
      name: "name",
      type: "string",
      rules: "Required, max 100 characters",
      example: "Colorful Building Blocks",
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
      rules: "Required, min 0, max 100000, must be >= sellingPrice",
      example: "399",
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
      example: "250",
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
      example: "Safe and colorful building blocks for babies",
    },
  ],
}
