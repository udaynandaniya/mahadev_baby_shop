// // // // // // newborn.ts
// // // // // export interface NewbornItem {
// // // // //   name: string;
// // // // //   price: number;
// // // // //   inStock: number;
// // // // //   images: string[];
// // // // //   description: string;
// // // // //   category?: string; // e.g. "Whisper", "6th Day Ceremony", "Balloon Set"
// // // // //   createdAt: Date;
// // // // //   updatedAt: Date;
// // // // // }


// // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // export interface INewbornItem extends Document {
// // // //   name: string;
// // // //   price: number;
// // // //   inStock: number;
// // // //   images: string[];
// // // //   description: string;
// // // //   category?: string;
// // // //   createdAt: Date;
// // // //   updatedAt: Date;
// // // // }

// // // // const NewbornItemSchema: Schema<INewbornItem> = new Schema({
// // // //   name: String,
// // // //   price: Number,
// // // //   inStock: Number,
// // // //   images: [String],
// // // //   description: String,
// // // //   category: String,
// // // // }, { timestamps: true });

// // // // export default mongoose.model<INewbornItem>('NewbornItem', NewbornItemSchema);


// // // import mongoose, { Schema, Document } from 'mongoose'

// // // export interface INewbornItem extends Document {
// // //   name: string
// // //   price: number
// // //   inStock: number
// // //   images: string[]
// // //   description: string
// // //   category?: string
// // //   createdAt: Date
// // //   updatedAt: Date
// // // }

// // // const NewbornItemSchema = new Schema<INewbornItem>({
// // //   name: String,
// // //   price: Number,
// // //   inStock: Number,
// // //   images: [String],
// // //   description: String,
// // //   category: String,
// // // }, { timestamps: true })

// // // export const NewbornItemModel = mongoose.models.NewbornItem || mongoose.model<INewbornItem>('NewbornItem', NewbornItemSchema)


// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\newborn.ts
// // import mongoose, { Schema, type Document } from "mongoose"

// // export interface INewbornItem extends Document {
// //   productCode: string                  // Unique internal code for admin use
// //   name: string                         // Item name
// //   sellingPrice: number                // Main price shown to users
// //   actualPrice: number                 // Strike-through price for discounts
// //   inStock: number                     // Stock available
// //   weightInGrams: number              // Required for delivery calculation
// //   images: string[]                    // Cloudinary URLs
// //   description?: string                // Optional product description
// //   category?: string                   // Optional (e.g., "chhathi", "welcome", etc.)
// //   createdAt: Date
// //   updatedAt: Date
// // }

// // const NewbornItemSchema: Schema<INewbornItem> = new Schema(
// //   {
// //     productCode: { type: String, required: true, unique: true },
// //     name: { type: String, required: true },
// //     sellingPrice: { type: Number, required: true },
// //     actualPrice: { type: Number, required: true },
// //     inStock: { type: Number, required: true },
// //     weightInGrams: { type: Number, required: true },
// //     images: [String],
// //     description: String, // ✅ optional
// //     category: String,    // e.g., "gifting", "chhathi"
// //   },
// //   { timestamps: true }
// // )

// // export const NewbornItemModel =
// //   mongoose.models.NewbornItem || mongoose.model<INewbornItem>("NewbornItem", NewbornItemSchema)



// // C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\newborn.ts

// import mongoose, { Schema, type Document } from "mongoose"

// export interface INewbornItem extends Document {
//   productCode: string                  // Unique internal code for admin use
//   name: string                         // Item name
//   sellingPrice: number                // Main price shown to users
//   actualPrice: number                 // Strike-through price for discounts
//   inStock: number                     // Stock available
//   weightInGrams: number              // Required for delivery calculation
//   images: string[]                    // Cloudinary URLs
//   description?: string                // Optional product description
//   category?: string                   // Optional (e.g., "chhathi", "welcome", etc.)
//   createdAt: Date
//   updatedAt: Date
// }

// const NewbornItemSchema: Schema<INewbornItem> = new Schema(
//   {
//     productCode: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     sellingPrice: { type: Number, required: true },
//     actualPrice: { type: Number, required: true },
//     inStock: { type: Number, required: true },
//     weightInGrams: { type: Number, required: true },
//     images: [String],
//     description: String, // ✅ optional
//     category: String,    // e.g., "gifting", "chhathi"
//   },
//   { timestamps: true }
// )

// // ✅ Named export (used for admin/product sync)
// export const NewbornItemModel =
//   mongoose.models.NewbornItem || mongoose.model<INewbornItem>("NewbornItem", NewbornItemSchema)

// // ✅ Default export (for simpler imports if needed)
// export default NewbornItemModel



// C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\newborn.ts

import mongoose, { Schema, type Document } from "mongoose"

export interface INewbornItem extends Document {
  productCode: string                  // Unique internal code for admin use
  name: string                         // Item name
  sellingPrice: number                // Main price shown to users
  actualPrice: number                 // Strike-through price for discounts
  inStock: number                     // Stock available
  weightInGrams: number              // Required for delivery calculation
  images: string[]                    // Cloudinary URLs
  description?: string                // Optional product description
  category?: string                   // Optional (e.g., "chhathi", "welcome", etc.)
  categoryTypemodel: string                // Auto-filled as "newborn"
  createdAt: Date
  updatedAt: Date
}

const NewbornItemSchema: Schema<INewbornItem> = new Schema(
  {
    productCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    actualPrice: { type: Number, required: true },
    inStock: { type: Number, required: true },
    weightInGrams: { type: Number, required: true },
    images: [String],
    description: String, // ✅ optional
    category: String,    // e.g., "gifting", "chhathi"
    categoryTypemodel: {
      type: String,
      default: "newborn",   // 👶 Always set to "newborn"
    },
  },
  { timestamps: true }
)

// ✅ Named export (used for admin/product sync)
export const NewbornItemModel =
  mongoose.models.NewbornItem || mongoose.model<INewbornItem>("NewbornItem", NewbornItemSchema)

// ✅ Default export (for simpler imports if needed)
export default NewbornItemModel
