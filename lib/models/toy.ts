


// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\toy.ts

// // import mongoose, { Schema, type Document } from "mongoose"

// // export interface IToy extends Document {
// //   productCode: string              // Unique internal code for admin (e.g., "toycar1.1")
// //   name: string                     // Toy name (e.g., "Dagli Car", "Stuffed Panda")
// //   sellingPrice: number            // Price shown to customers
// //   actualPrice: number             // MRP or original price (for discount logic)
// //   inStock: number                 // How many available
// //   weightInGrams: number           // For delivery cost calculation
// //   images: string[]                // Image URLs (Cloudinary)
// //   description?: string            // Optional description
// //   createdAt: Date
// //   updatedAt: Date
// // }

// // const ToySchema: Schema<IToy> = new Schema(
// //   {
// //     productCode: { type: String, required: true, unique: true }, // admin use only
// //     name: { type: String, required: true },
// //     sellingPrice: { type: Number, required: true },
// //     actualPrice: { type: Number, required: true }, // helps show discount
// //     inStock: { type: Number, required: true },
// //     weightInGrams: { type: Number, required: true },
// //     images: [String],
// //     description: String, // optional
// //   },
// //   { timestamps: true }
// // )

// // export const ToyModel = mongoose.models.Toy || mongoose.model<IToy>("Toy", ToySchema)


// // lib/models/toy.ts

// import mongoose, { Schema, type Document } from "mongoose"

// /**
//  * IToy interface describes the structure of a toy product document.
//  * Used in inventory, admin dashboard, and customer display.
//  */
// export interface IToy extends Document {
//   productCode: string              // Unique internal code for admin (e.g., "toycar1.1")
//   name: string                     // Toy name (e.g., "Dagli Car", "Stuffed Panda")
//   sellingPrice: number            // Price shown to customers
//   actualPrice: number             // MRP or original price (for discount logic)
//   inStock: number                 // How many available
//   weightInGrams: number           // For delivery cost calculation
//   images: string[]                // Image URLs (Cloudinary)
//   description?: string            // Optional description
//   createdAt: Date
//   updatedAt: Date
// }

// const ToySchema: Schema<IToy> = new Schema(
//   {
//     productCode: { type: String, required: true, unique: true }, // admin use only
//     name: { type: String, required: true },
//     sellingPrice: { type: Number, required: true },
//     actualPrice: { type: Number, required: true }, // helps show discount
//     inStock: { type: Number, required: true },
//     weightInGrams: { type: Number, required: true },
//     images: [String],
//     description: String, // optional
//   },
//   { timestamps: true }
// )

// // ✅ Default export here (as requested)
// // Allows usage like: `import ToyModel from "@/lib/models/toy"`
// const ToyModel = mongoose.models.Toy || mongoose.model<IToy>("Toy", ToySchema)
// export default ToyModel


// lib/models/toy.ts

import mongoose, { Schema, type Document } from "mongoose"

/**
 * IToy interface describes the structure of a toy product document.
 * Used in inventory, admin dashboard, and customer display.
 */
export interface IToy extends Document {
  productCode: string              // Unique internal code for admin (e.g., "toycar1.1")
  name: string                     // Toy name (e.g., "Dagli Car", "Stuffed Panda")
  sellingPrice: number            // Price shown to customers
  actualPrice: number             // MRP or original price (for discount logic)
  inStock: number                 // How many available
  weightInGrams: number           // For delivery cost calculation
  images: string[]                // Image URLs (Cloudinary)
  description?: string            // Optional description
  categoryTypemodel: string            // Auto-filled as "toy"
  createdAt: Date
  updatedAt: Date
}

const ToySchema: Schema<IToy> = new Schema(
  {
    productCode: { type: String, required: true, unique: true }, // admin use only
    name: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    actualPrice: { type: Number, required: true }, // helps show discount
    inStock: { type: Number, required: true },
    weightInGrams: { type: Number, required: true },
    images: [String],
    description: String, // optional
    categoryTypemodel: {
      type: String,
      default: "toy",      // 🎲 Always set to "toy"
    },
  },
  { timestamps: true }
)

// ✅ Default export here (as requested)
// Allows usage like: `import ToyModel from "@/lib/models/toy"`
const ToyModel = mongoose.models.Toy || mongoose.model<IToy>("Toy", ToySchema)
export default ToyModel
