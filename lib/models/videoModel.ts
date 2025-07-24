// lib/models/videoModel.ts
import mongoose, { Schema, type Document } from "mongoose"

export interface IVideo extends Document {
  name: string                           // Display name of the video/product
  productCode: string                    // Unique internal code for reference
  videoUrl: string                       // Cloudinary or other video link
  sellingPrice: number                   // Main price to show
  actualPrice?: number                   // Optional: strike-through discount price
  description?: string                   // Optional product description
  createdAt: Date
  updatedAt: Date
}

const VideoSchema: Schema<IVideo> = new Schema(
  {
    name: { type: String, required: true },
    productCode: { type: String, required: true, unique: true },
    videoUrl: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    actualPrice: { type: Number },
    description: { type: String },
  },
  { timestamps: true }
)

// ✅ Named export (used in backend/admin logic)
export const VideoModel =
  mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema)

// ✅ Default export (optional/flexible use)
export default VideoModel
