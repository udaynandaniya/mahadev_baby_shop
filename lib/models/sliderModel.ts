
// // // // // // lib/models/sliderModel.ts
// // // // // import mongoose, { Schema, type Document } from "mongoose"

// // // // // export interface ISliderImage extends Document {
// // // // //   imageUrl: string               // URL of the slider image
// // // // //   order?: number                // Optional display order
// // // // //   caption?: string              // Optional text for overlay
// // // // //   altText?: string              // Optional alt text for accessibility
// // // // //   createdAt: Date
// // // // //   updatedAt: Date
// // // // // }

// // // // // const SliderSchema: Schema<ISliderImage> = new Schema(
// // // // //   {
// // // // //     imageUrl: { type: String, required: true },
// // // // //     order: { type: Number, default: 0 },
// // // // //     caption: { type: String, default: "" },
// // // // //     altText: { type: String, default: "" },
// // // // //   },
// // // // //   { timestamps: true }
// // // // // )

// // // // // export const SliderModel =
// // // // //   mongoose.models.Slider || mongoose.model<ISliderImage>("Slider", SliderSchema)


// // // // // lib/models/sliderModel.ts
// // // // import mongoose, { Schema, type Document } from "mongoose"

// // // // export interface ISliderImage extends Document {
// // // //   imageUrl: string               // URL of the slider image
// // // //   order?: number                // Optional display order
// // // //   caption?: string              // Optional text for overlay
// // // //   altText?: string              // Optional alt text for accessibility
// // // //   createdAt: Date
// // // //   updatedAt: Date
// // // // }

// // // // const SliderSchema: Schema<ISliderImage> = new Schema(
// // // //   {
// // // //     imageUrl: { type: String, required: true },
// // // //     order: { type: Number, default: 0 },
// // // //     caption: { type: String, default: "" },
// // // //     altText: { type: String, default: "" },
// // // //   },
// // // //   { timestamps: true }
// // // // )

// // // // // ✅ Named export (used for backend/admin logic)
// // // // export const SliderModel =
// // // //   mongoose.models.Slider || mongoose.model<ISliderImage>("Slider", SliderSchema)

// // // // // ✅ Default export (for flexibility in imports)
// // // // export default SliderModel


// // // // lib/models/sliderModel.ts
// // // import mongoose, { Schema, type Document } from "mongoose"

// // // export interface ISliderImage extends Document {
// // //   imageUrl: string               // URL of the slider image
// // //   order?: number                // Optional display order
// // //   caption?: string              // Optional text for overlay
// // //   altText?: string              // Optional alt text for accessibility
// // //   createdAt: Date
// // //   updatedAt: Date
// // // }

// // // const SliderSchema: Schema<ISliderImage> = new Schema(
// // //   {
// // //     imageUrl: { type: String, required: true },
// // //     order: { type: Number, default: 0 },
// // //     caption: { type: String, default: "" },
// // //     altText: { type: String, default: "" },
// // //   },
// // //   { timestamps: true }
// // // )

// // // // ✅ Named export (used for backend/admin logic)
// // // export const SliderModel =
// // //   mongoose.models.Slider || mongoose.model<ISliderImage>("Slider", SliderSchema)

// // // // ✅ Default export (for flexibility in imports)
// // // export default SliderModel

// // // lib/models/sliderModel.ts
// // import mongoose, { Schema, type Document } from "mongoose"

// // export interface ISliderImage extends Document {
// //   groupName: string              // Group/category like "Toy", "Newborn", "Offers"
// //   imageUrl: string               // Cloudinary URL of the image
// //   caption?: string               // Optional overlay text
// //   altText?: string               // Optional alt text for accessibility
// //   createdAt: Date
// //   updatedAt: Date
// // }

// // const SliderSchema: Schema<ISliderImage> = new Schema(
// //   {
// //     groupName: {
// //       type: String,
// //       required: true,
// //       // 💡 Used to group sliders by type, like "Toy", "Offers"
// //     },
// //     imageUrl: { type: String, required: true },
// //     caption: { type: String, default: "" },
// //     altText: { type: String, default: "" },
// //   },
// //   { timestamps: true }
// // )

// // // ✅ Named export (used in backend)
// // export const SliderModel =
// //   mongoose.models.Slider || mongoose.model<ISliderImage>("Slider", SliderSchema)

// // // ✅ Default export (optional use)
// // export default SliderModel


// import mongoose, { Schema, type Document } from "mongoose"

// export interface ISliderImage extends Document {
//   imageUrl: string // URL of the slider image
//   groupName: string // Group name for logical grouping (e.g., "toys", "clothes")
//   order?: number // Optional display order
//   caption?: string // Optional text for overlay
//   altText?: string // Optional alt text for accessibility
//   createdAt: Date
//   updatedAt: Date
// }

// const SliderSchema: Schema<ISliderImage> = new Schema(
//   {
//     imageUrl: { type: String, required: true },
//     groupName: { type: String, required: true },
//     order: { type: Number, default: 0 },
//     caption: { type: String, default: "" },
//     altText: { type: String, default: "" },
//   },
//   { timestamps: true },
// )

// // ✅ Named export (used for backend/admin logic)
// export const SliderModel = mongoose.models.Slider || mongoose.model<ISliderImage>("Slider", SliderSchema)

// // ✅ Default export (for flexibility in imports)
// export default SliderModel

import mongoose, { Schema, type Document } from "mongoose"

export interface ISliderImage extends Document {
  images: string[] // Array of image URLs
  groupName: string // Group name for logical grouping (e.g., "toys", "clothes")
  order?: number // Optional display order
  caption?: string // Optional text for overlay
  altText?: string // Optional alt text for accessibility
  createdAt: Date
  updatedAt: Date
}

const SliderSchema: Schema<ISliderImage> = new Schema(
  {
    images: { type: [String], required: true, validate: [arrayLimit, "{PATH} exceeds the limit of 10"] },
    groupName: { type: String, required: true },
    order: { type: Number, default: 0 },
    caption: { type: String, default: "" },
    altText: { type: String, default: "" },
  },
  { timestamps: true },
)

function arrayLimit(val: string[]) {
  return val.length <= 10 && val.length >= 1
}

// ✅ Named export (used for backend/admin logic)
export const SliderModel = mongoose.models.Slider || mongoose.model<ISliderImage>("Slider", SliderSchema)

// ✅ Default export (for flexibility in imports)
export default SliderModel
