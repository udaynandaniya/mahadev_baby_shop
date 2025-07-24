import mongoose, { Schema, type Document } from "mongoose"

export interface IOrderItem {
  productCode: string
  categoryTypeModel: "toy" | "clothes" | "bath" | "newborn"
  name: string
  quantity: number
  priceAtOrder: number
  weightInGrams: number
}

export interface IDeliveryAddress {
  street: string
  area: string
  state: string
  district: string
  subDistrict: string
  village: string
  pincode: string
}

export interface IOrder extends Document {
  orderNumber: string // Unique order identifier
  userEmail: string // Customer email
  customerName: string // Customer name
  customerPhone: string // Customer phone
  deliveryAddress: IDeliveryAddress // Full delivery address
  items: IOrderItem[] // Array of ordered items
  subtotal: number // Items total
  deliveryCharge: number // Calculated delivery charge
  totalAmount: number // Final amount
  status: "pending" | "accepted" | "dispatched" | "completed" | "rejected"
  consignmentNumber?: string // Added by admin when dispatched
  orderDate: Date
  updatedAt: Date
  isReadByAdmin: boolean // New field for notification tracking
}

const OrderItemSchema = new Schema({
  productCode: { type: String, required: true },
  categoryTypeModel: {
    type: String,
    enum: ["toy", "clothes", "bath", "newborn"],
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  priceAtOrder: { type: Number, required: true },
  weightInGrams: { type: Number, required: true },
})

const DeliveryAddressSchema = new Schema({
  street: { type: String, required: true },
  area: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  subDistrict: { type: String, required: true },
  village: { type: String, required: true },
  pincode: { type: String, required: true },
})

const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    deliveryAddress: { type: DeliveryAddressSchema, required: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "dispatched", "completed", "rejected"],
      default: "pending",
    },
    consignmentNumber: String,
    orderDate: { type: Date, default: Date.now },
    isReadByAdmin: { type: Boolean, default: false }, // New field
  },
  { timestamps: true },
)

export const OrderModel = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
export default OrderModel
