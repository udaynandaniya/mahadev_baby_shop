//C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\OTP.ts

import mongoose from "mongoose"

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    }
   ,
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from creation
      expires: 0, // MongoDB will automatically delete expired documents
    },
  },
  {
    timestamps: true,
  },
)

// Create index for faster queries
OTPSchema.index({ email: 1, otp: 1 })
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema)
