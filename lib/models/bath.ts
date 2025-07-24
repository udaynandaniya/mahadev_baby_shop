


// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\bath.ts
// // import mongoose, { Schema, type Document } from "mongoose"

// // export interface IBathItem extends Document {
// //   name: string
// //   type?: string                     // Optional: e.g., "soap", "diaper", "towel" (for admin use)
// //   sellingPrice: number             // Required selling price
// //   actualPrice: number              // ✅ Required: show discount/strikethrough price for users
// //   sizeInMl?: number                // Optional: used only for liquid items like shampoo
// //   inStock: number                  // Required stock count
// //   weightInGrams: number            // Required: used for shipping calculation
// //   widthInCm?: number               // Optional: used for towel dimensions (if applicable)
// //   lengthInCm?: number              // Optional: used for towel dimensions (if applicable)
// //   images: string[]                 // Required: array of image URLs (Cloudinary)
// //   description?: string             // Optional: for product details
// //   productCode: string              // Required: internal unique ID for admin reference
// //   createdAt: Date
// //   updatedAt: Date
// // }

// // const BathItemSchema: Schema<IBathItem> = new Schema(
// //   {
// //     name: { type: String, required: true },
// //     type: String, // Optional classification, e.g., soap, diaper
// //     sellingPrice: { type: Number, required: true },
// //     actualPrice: { type: Number, required: true }, // ✅ Now required
// //     sizeInMl: Number,
// //     inStock: { type: Number, required: true },
// //     weightInGrams: { type: Number, required: true },
// //     widthInCm: Number,
// //     lengthInCm: Number,
// //     images: [String],
// //     productCode: { type: String, required: true, unique: true },
// //     description: String,
// //   },
// //   { timestamps: true }
// // )

// // export const BathItemModel =
// //   mongoose.models.BathItem || mongoose.model<IBathItem>("BathItem", BathItemSchema)


// // C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\bath.ts

// import mongoose, { Schema, type Document } from "mongoose"

// // Interface for bath item products in the store
// export interface IBathItem extends Document {
//   name: string
//   type?: string                     // Optional: e.g., "soap", "diaper", "towel" (for admin use)
//   sellingPrice: number             // Required selling price
//   actualPrice: number              // ✅ Required: show discount/strikethrough price for users
//   sizeInMl?: number                // Optional: used only for liquid items like shampoo
//   inStock: number                  // Required stock count
//   weightInGrams: number            // Required: used for shipping calculation
//   widthInCm?: number               // Optional: used for towel dimensions (if applicable)
//   lengthInCm?: number              // Optional: used for towel dimensions (if applicable)
//   images: string[]                 // Required: array of image URLs (Cloudinary)
//   description?: string             // Optional: for product details
//   productCode: string              // Required: internal unique ID for admin reference
//   createdAt: Date
//   updatedAt: Date
// }

// const BathItemSchema: Schema<IBathItem> = new Schema(
//   {
//     name: { type: String, required: true },
//     type: String, // Optional classification, e.g., soap, diaper
//     sellingPrice: { type: Number, required: true },
//     actualPrice: { type: Number, required: true }, // ✅ Now required
//     sizeInMl: Number,
//     inStock: { type: Number, required: true },
//     weightInGrams: { type: Number, required: true },
//     widthInCm: Number,
//     lengthInCm: Number,
//     images: [String],
//     productCode: { type: String, required: true, unique: true },
//     description: String,
//   },
//   { timestamps: true }
// )

// // ✅ Named export (used in other models or functions)
// export const BathItemModel =
//   mongoose.models.BathItem || mongoose.model<IBathItem>("BathItem", BathItemSchema)

// // ✅ Default export for easier imports elsewhere
// export default BathItemModel




// C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\bath.ts

import mongoose, { Schema, type Document } from "mongoose"

// Interface for bath item products in the store
export interface IBathItem extends Document {
  name: string
  type?: string                     // Optional: e.g., "soap", "diaper", "towel" (for admin use)
  sellingPrice: number             // Required selling price
  actualPrice: number              // ✅ Required: show discount/strikethrough price for users
  sizeInMl?: number                // Optional: used only for liquid items like shampoo
  inStock: number                  // Required stock count
  weightInGrams: number            // Required: used for shipping calculation
  widthInCm?: number               // Optional: used for towel dimensions (if applicable)
  lengthInCm?: number              // Optional: used for towel dimensions (if applicable)
  images: string[]                 // Required: array of image URLs (Cloudinary)
  description?: string             // Optional: for product details
  productCode: string              // Required: internal unique ID for admin reference
  categoryTypemodel: string              // Auto-set internally as "bath", not editable
  createdAt: Date
  updatedAt: Date
}

const BathItemSchema: Schema<IBathItem> = new Schema(
  {
    name: { type: String, required: true },
    type: String, // Optional classification, e.g., soap, diaper
    sellingPrice: { type: Number, required: true },
    actualPrice: { type: Number, required: true }, // ✅ Now required
    sizeInMl: Number,
    inStock: { type: Number, required: true },
    weightInGrams: { type: Number, required: true },
    widthInCm: Number,
    lengthInCm: Number,
    images: [String],
    productCode: { type: String, required: true, unique: true },
    description: String,
    categoryTypemodel: {
      type: String,
      default: "bath",              // 👈 Always auto-set to "bath"
                 // 👈 Cannot be changed after creation
    },
  },
  { timestamps: true }
)

// ✅ Named export (used in other models or functions)
export const BathItemModel =
  mongoose.models.BathItem || mongoose.model<IBathItem>("BathItem", BathItemSchema)

// ✅ Default export for easier imports elsewhere
export default BathItemModel
