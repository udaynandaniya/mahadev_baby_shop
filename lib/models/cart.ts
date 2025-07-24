// import mongoose, { Schema, type Document } from "mongoose"

// export interface ICartItem extends Document {
//   userEmail: string
//   productCode: string
//   categoryTypeModel: "toy" | "clothes" | "bath" | "newborn"
//   quantity: number
//   weightInGrams: number
//   priceAtAdd: number
//   addedAt: Date
// }

// const CartSchema: Schema<ICartItem> = new Schema(
//   {
//     userEmail: { type: String, required: true },
//     productCode: { type: String, required: true },
//     categoryTypeModel: {
//       type: String,
//       enum: ["toy", "clothes", "bath", "newborn"],
//       required: true,
//     },
//     quantity: { type: Number, required: true, default: 1 },
//     weightInGrams: { type: Number, required: true },
//     priceAtAdd: { type: Number, required: true },
//     addedAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true },
// )

// // Prevent duplicates per user/product
// CartSchema.index({ userEmail: 1, productCode: 1 }, { unique: true })

// export const CartModel = mongoose.models.Cart || mongoose.model<ICartItem>("Cart", CartSchema)

// export default CartModel

import mongoose, { Schema, type Document } from "mongoose"

export interface ICartItem extends Document {
  userEmail: string // Unique to logged-in user
  productCode: string // Common key across models
  categoryTypeModel: "toy" | "clothes" | "bath" | "newborn" // Needed to fetch correct model
  quantity: number
  weightInGrams: number // Used in delivery charge logic
  priceAtAdd: number // Snapshot of sellingPrice
  addedAt: Date
}

const CartSchema: Schema<ICartItem> = new Schema(
  {
    userEmail: { type: String, required: true },
    productCode: { type: String, required: true },
    categoryTypeModel: {
      type: String,
      enum: ["toy", "clothes", "bath", "newborn"],
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    weightInGrams: { type: Number, required: true },
    priceAtAdd: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

// Optional: Add a unique index to prevent duplicates per user/product
CartSchema.index({ userEmail: 1, productCode: 1 }, { unique: true })

export const CartModel = mongoose.models.Cart || mongoose.model<ICartItem>("Cart", CartSchema)

export default CartModel
