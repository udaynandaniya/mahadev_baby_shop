import mongoose, { Schema, type Document } from "mongoose"

export interface IReview extends Document {
  name: string
  email: string
  userId: string
  rating: number
  comment: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema: Schema<IReview> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, minlength: 10, maxlength: 500 },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
)

// Index for better performance
ReviewSchema.index({ createdAt: -1 })
ReviewSchema.index({ userId: 1 })

export const ReviewModel = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema)
export default ReviewModel
