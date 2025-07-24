//C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\api\auth\reset-by-otp\send-otp\route.tsimport { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"
import { createOtp } from "@/lib/verification/createOtp"
import { sendEmailToStakeholder } from "@/lib/verification/sendEmailToStakeholder"

export async function POST(request: NextRequest) {
  try {
    const { email, role } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    await dbConnect()

    // Find user across all collections
    let userExists = false
    let userRole = ""

    if (role) {
      // If role is specified, search in specific collection
      let UserModel = null
      switch (role) {
        case "user":
          UserModel = User
          userRole = "user"
          break
        case "doctor":
          UserModel = Doctor
          userRole = "doctor"
          break
        case "hospital":
          UserModel = Hospital
          userRole = "hospital"
          break
        default:
          return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
      }
      const user = await UserModel.findOne({ email })
      if (user) {
        userExists = true
      }
    } else {
      // Search across all collections
      const user = await User.findOne({ email })
      const doctor = await Doctor.findOne({ email })
      const hospital = await Hospital.findOne({ email })

      if (user) {
        userExists = true
        userRole = "user"
      } else if (doctor) {
        userExists = true
        userRole = "doctor"
      } else if (hospital) {
        userExists = true
        userRole = "hospital"
      }
    }

    if (!userExists) {
      return NextResponse.json({ error: "No account found with this email address" }, { status: 404 })
    }

    // Generate and save OTP
    const otp = await createOtp(email, userRole)

    // Send OTP via email
    const emailResult = await sendEmailToStakeholder(email, otp, userRole)

    if (!emailResult.success) {
      return NextResponse.json({ error: "Failed to send OTP email" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "OTP sent successfully to your email",
        role: userRole,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
