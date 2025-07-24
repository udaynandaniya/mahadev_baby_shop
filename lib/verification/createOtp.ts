// //C:\Users\UDAYN\Downloads\healthcare-platform\lib\verification\createOtp.ts
// import dbConnect from "../mongodb"
// import OTP from "../models/OTP"

// export async function createOtp(email: string, role: string) {
//   await dbConnect()

//   // Generate 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString()

//   // Delete any existing OTP for this email
//   await OTP.deleteMany({ email })

//   // Create new OTP
//   await OTP.create({ email, otp, role })

//   return otp
// }



////C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\verification\createOtp.ts
import OTP from "@/lib/models/OTP"
import { dbConnect } from "../mongodb"

export async function createOtp(email: string) {
  await dbConnect

  //console.log("🔄 Creating OTP for:", { email, role })

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  //console.log("🔢 Generated OTP:", otp)

  // Delete any existing OTP for this email
  const deleteResult = await OTP.deleteMany({ email })
  //console.log("🗑️ Deleted existing OTPs:", deleteResult.deletedCount)

  // Create new OTP with expiration (5 minutes from now)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

  const newOtpRecord = await OTP.create({
    email,
    otp,
    expiresAt,
  })

  // //console.log("✅ Created new OTP record:", {
  //   id: newOtpRecord._id,
  //   email: newOtpRecord.email,
  //   otp: newOtpRecord.otp,
  //   role: newOtpRecord.role,
  //   expiresAt: newOtpRecord.expiresAt,
  // })

  return otp
}
