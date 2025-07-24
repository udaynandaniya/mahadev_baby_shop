import { z } from "zod"

export const sliderSchema = z.object({
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
  groupName: z.string().min(1, "Group name is required").max(50, "Group name must be less than 50 characters"),
  order: z.number().int("Order must be a whole number").min(0, "Order cannot be negative").optional(),
  caption: z.string().max(200, "Caption must be less than 200 characters").optional(),
  altText: z.string().max(100, "Alt text must be less than 100 characters").optional(),
})

export type SliderFormData = z.infer<typeof sliderSchema>

export const sliderSchemaInfo = {
  title: "Slider Image Schema",
  description: "Validation rules for slider images",
  fields: [
    {
      name: "images",
      type: "array",
      rules: "Required, min 1 image, max 10 images, must be valid URLs",
      example: "['https://cloudinary.com/slider-image1.jpg', 'https://cloudinary.com/slider-image2.jpg']",
    },
    {
      name: "groupName",
      type: "string",
      rules: "Required, max 50 characters",
      example: "toys, clothes, bath, newborn, home",
    },
    {
      name: "order",
      type: "number",
      rules: "Optional, integer, min 0 (for display order)",
      example: "1, 2, 3",
    },
    {
      name: "caption",
      type: "string",
      rules: "Optional, max 200 characters",
      example: "Welcome to our amazing toy collection!",
    },
    {
      name: "altText",
      type: "string",
      rules: "Optional, max 100 characters (for accessibility)",
      example: "Colorful toys for babies",
    },
  ],
}
