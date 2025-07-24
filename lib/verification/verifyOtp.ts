// // // //C:\Users\UDAYN\Downloads\healthcare-platform\lib\verification\verifyOtp.ts
// // // import dbConnect from "../mongodb"
// // // import OTP from "../models/OTP"


// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\verification\verifyOtp.ts
// // import OTP from "@/lib/models/OTP"
// // import { dbConnect } from "../mongodb"

// // export async function verifyOtp(email: string, otp: string) {
// //   await dbConnect()

// //   //console.log("🔄 Verifying OTP:", { email, otp })

// //   // Check if OTP exists and is not expired
// //   const otpRecord = await OTP.findOne({
// //     email,
// //     otp,
// //     expiresAt: { $gt: new Date() }, // Check if not expired
// //   })

// //   //console.log("🔍 OTP verification result:", otpRecord ? "Valid" : "Invalid/Expired")

// //   if (!otpRecord) {
// //     // Check if OTP exists but is expired
// //     const expiredOtp = await OTP.findOne({ email, otp })
// //     if (expiredOtp) {
// //       //console.log("⏰ OTP found but expired")
// //       return { success: false, message: "OTP has expired. Please request a new one." }
// //     }

// //     return { success: false, message: "Invalid OTP" }
// //   }

// //   // Don't delete the OTP here - let the reset password function handle it
// //   //console.log("✅ OTP verified successfully")
// //   return { success: true }
// // }


// import OTP from "@/lib/models/OTP"
// import { dbConnect } from "../mongodb"

// export async function verifyOtp(email: string, otp: string) {
//   await dbConnect()

//   console.log("🔗 DB connected. Verifying OTP for:", email)
//   console.log("🔢 OTP to verify:", otp)

//   // Check if OTP exists and is not expired
//   const otpRecord = await OTP.findOne({
//     email,
//     otp,
//     expiresAt: { $gt: new Date() },
//   })

//   if (!otpRecord) {
//     const expiredOtp = await OTP.findOne({ email, otp })
//     if (expiredOtp) {
//       return {
//         success: false,
//         message: "OTP has expired. Please request a new one.",
//       }
//     }

//     return {
//       success: false,
//       message: "Invalid OTP",
//     }
//   }

//   // ✅ Delete the entire OTP record
//   await OTP.deleteOne({ email, otp })

//   return { success: true }
// }

// lib/verification/verifyOtp.ts
import OTP from "@/lib/models/OTP"
import { dbConnect } from "../mongodb"

export async function verifyOtp(email: string, otp: string) {
  await dbConnect()

  const normalizedEmail = email.trim().toLowerCase()
  const trimmedOtp = otp.trim()

  const otpRecord = await OTP.findOne({
    email: normalizedEmail,
    otp: trimmedOtp,
    expiresAt: { $gt: new Date() },
  })

  if (!otpRecord) {

    const expiredOtp = await OTP.findOne({
      email: normalizedEmail,
      otp: trimmedOtp,
    })

    if (expiredOtp) {
      return {
        success: false,
        message: "OTP has expired. Please request a new one.",
      }
    }

    return {
      success: false,
      message: "Invalid OTP",
    }
  }

  await OTP.deleteOne({ email: normalizedEmail, otp: trimmedOtp })

  return { success: true }
}
