import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"

export async function POST(request: NextRequest) {
  try {
    const { email, role, currentPassword } = await request.json()

    if (!email || !role || !currentPassword) {
      return NextResponse.json(
        {
          error: "Email, role, and current password are required",
        },
        { status: 400 },
      )
    }

    await dbConnect()

    // Find user based on role
    let user = null
    let UserModel = null

    switch (role) {
      case "user":
        UserModel = User
        break
      case "doctor":
        UserModel = Doctor
        break
      case "hospital":
        UserModel = Hospital
        break
      default:
        return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
    }

    user = await UserModel.findOne({ email })

    if (!user) {
      return NextResponse.json(
        {
          error: "Account not found",
        },
        { status: 404 },
      )
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: "Current password is incorrect",
        },
        { status: 401 },
      )
    }

    return NextResponse.json(
      {
        message: "Current password is valid",
        valid: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Validate current password error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
