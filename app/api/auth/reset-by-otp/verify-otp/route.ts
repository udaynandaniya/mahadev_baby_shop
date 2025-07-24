// import { type NextRequest, NextResponse } from "next/server"
// import { verifyOtp } from "@/lib/verification/verifyOtp"

// export async function POST(request: NextRequest) {
//   try {
//     const { email, otp } = await request.json()

//     if (!email || !otp) {
//       return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
//     }

//     // Verify the OTP
//     const verificationResult = await verifyOtp(email, otp)

//     if (!verificationResult.success) {
//       return NextResponse.json({ error: verificationResult.message }, { status: 400 })
//     }

//     return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 })
//   } catch (error) {
//     console.error("Verify OTP error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }


//C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\api\auth\reset-by-otp\verify-otp\route.ts
import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import OTP from "@/lib/models/OTP"

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    ////console.log("\n🔄 Verify OTP Request:", { email, otp })

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    await dbConnect()
    //console.log("✅ Database connected")

    // Debug: Check all OTP records for this email
    const allOtpRecords = await OTP.find({ email })
    //console.log("🔍 All OTP records for email:", allOtpRecords)

    // Verify the OTP
    const otpRecord = await OTP.findOne({ email, otp })
    //console.log("🔍 OTP Record found:", otpRecord ? "Yes" : "No")

    if (otpRecord) {
      //console.log("✅ OTP Record details:", {
      //   id: otpRecord._id,
      //   email: otpRecord.email,
      //   otp: otpRecord.otp,
      //   role: otpRecord.role,
      //   createdAt: otpRecord.createdAt,
      //   expiresAt: otpRecord.expiresAt,
      // })
    }

    if (!otpRecord) {
      //console.log("❌ Invalid or expired OTP")
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    //console.log("✅ OTP verified successfully")
    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
