

import mongoose, { Schema, type Document } from "mongoose"

export interface IClothes extends Document {
  name: string
  category: ("boy" | "girl")[]
  ageGroup: ("0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5")[]
  sellingPrice: number
  actualPrice?: number
  size: string
  inStock: number
  weightInGrams: number
  color?: string
  images: string[]
  productCode: string
  description?: string
  categoryTypemodel: string
  createdAt: Date
  updatedAt: Date
}

const ClothesSchema: Schema<IClothes> = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: [String],
      enum: ["boy", "girl"],
      required: true,
    },
    ageGroup: {
      type: [String],
      enum: ["0-1", "1-2", "2-3", "3-4", "4-5", "0-5"],
      required: true,
    },
    sellingPrice: { type: Number, required: true },
    actualPrice: { type: Number },
    size: { type: String, required: true },
    inStock: { type: Number, required: true },
    weightInGrams: { type: Number, required: true },
    color: String,
    productCode: { type: String, required: true, unique: true },
    images: [String],
    description: String,
    categoryTypemodel: { type: String, default: "clothes" },
  },
  { timestamps: true },
)

export const ClothesModel = mongoose.models.Clothes || mongoose.model<IClothes>("Clothes", ClothesSchema)

export default ClothesModel
