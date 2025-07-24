import { type NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { User } from "@/lib/models"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const { id } = params
    const updateData = await request.json()

    const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
