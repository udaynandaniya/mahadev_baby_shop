import { type NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
import User from "@/lib/models/User"
// import OrderModel from "@/lib/models/Order" // Declare OrderModel
import { decrypt } from "@/lib/auth"
import { dbConnect } from "@/lib/mongodb"
import OrderModel from "@/lib/models/order"


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Check admin authentication
    const token = request.cookies.get("jwt-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const payload = await decrypt(token)
    if (!payload || !payload.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { id } = params
    const updateData = await request.json()

    // Find the user to update
    const userToUpdate = await User.findById(id)
    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Prevent admin from demoting themselves (safety check)
    if (id === payload.userId && updateData.role === "user") {
      return NextResponse.json(
        { error: "You cannot demote yourself from admin. Ask another admin to do this." },
        { status: 400 },
      )
    }

    // Handle role changes
    if (updateData.role) {
      if (updateData.role === "admin") {
        updateData.isAdmin = true
      } else if (updateData.role === "user") {
        updateData.isAdmin = false
      }
      delete updateData.role // Remove role from updateData as we use isAdmin in the model
    }

    // Handle active status changes
    if (typeof updateData.isActive === "boolean") {
      updateData.isVerified = updateData.isActive
      delete updateData.isActive // Remove isActive as we use isVerified in the model
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password")

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }

    // Return user with mapped fields
    const responseUser = {
      ...updatedUser.toObject(),
      _id: updatedUser._id.toString(),
      role: updatedUser.isAdmin ? "admin" : "user",
      isActive: updatedUser.isVerified,
    }

    return NextResponse.json(responseUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Check admin authentication
    const token = request.cookies.get("jwt-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const payload = await decrypt(token)
    if (!payload || !payload.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { id } = params
    const user = await User.findById(id).select("-password").lean()

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get order statistics
    const orders = await OrderModel.find({ userEmail: user.email }).lean()
    const totalOrders = orders.length
    const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    const responseUser = {
      ...user,
      _id: user._id.toString(),
      role: user.isAdmin ? "admin" : "user",
      isActive: user.isVerified,
      totalOrders,
      totalSpent,
    }

    return NextResponse.json(responseUser)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
