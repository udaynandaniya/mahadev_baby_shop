import { z } from "zod"

// Base product schema
const baseProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Product name must be less than 100 characters"),
  productCode: z.string().min(1, "Product code is required").max(20, "Product code must be less than 20 characters"),
  sellingPrice: z.number().min(0, "Selling price must be positive"),
  inStock: z.number().min(0, "Stock quantity must be positive"),
  weightInGrams: z.number().min(0, "Weight must be positive"),
  images: z.array(z.string().url("Invalid image URL")).optional().default([]),
  description: z.string().optional(),
})

// Clothes schema
export const clothesSchema = baseProductSchema.extend({
  category: z.array(z.enum(["boy", "girl"])).min(1, "At least one category is required"),
  ageGroup: z.array(z.enum(["0-1", "1-2", "2-3", "3-4", "4-5", "0-5"])).min(1, "At least one age group is required"),
  size: z.string().min(1, "Size is required"),
  actualPrice: z.number().min(0, "Actual price must be positive").optional(),
  color: z.string().optional(),
})

// Toys schema
export const toySchema = baseProductSchema.extend({
  actualPrice: z.number().min(0, "Actual price must be positive"),
})

// Bath items schema
export const bathSchema = baseProductSchema.extend({
  type: z.string().optional(),
  actualPrice: z.number().min(0, "Actual price must be positive"),
  sizeInMl: z.number().min(0, "Size must be positive").optional(),
  widthInCm: z.number().min(0, "Width must be positive").optional(),
  lengthInCm: z.number().min(0, "Length must be positive").optional(),
})

// Newborn schema
export const newbornSchema = baseProductSchema.extend({
  category: z.array(z.enum(["boy", "girl"])).min(1, "At least one category is required"),
  ageGroup: z.array(z.enum(["0-1", "1-2", "2-3", "3-4", "4-5", "0-5"])).min(1, "At least one age group is required"),
  size: z.string().optional(),
  actualPrice: z.number().min(0, "Actual price must be positive").optional(),
  color: z.string().optional(),
})

// Slider schema
export const sliderSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  imageUrl: z.string().url("Valid image URL is required"),
  linkUrl: z.string().url("Valid URL required").optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  order: z.number().min(0, "Order must be positive"),
})

// Video schema
export const videoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  videoUrl: z.string().url("Valid video URL is required"),
  thumbnailUrl: z.string().url("Valid thumbnail URL required").optional().or(z.literal("")),
  productId: z.string().optional(),
  productName: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().min(0, "Order must be positive"),
})

// Export types
export type ClothesFormData = z.infer<typeof clothesSchema>
export type ToyFormData = z.infer<typeof toySchema>
export type BathFormData = z.infer<typeof bathSchema>
export type NewbornFormData = z.infer<typeof newbornSchema>
export type SliderFormData = z.infer<typeof sliderSchema>
export type VideoFormData = z.infer<typeof videoSchema>
