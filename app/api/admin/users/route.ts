import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import User from "@/lib/models/User"
export async function GET() {
  try {
    await dbConnect()

    const users = await User.find({}).select("-password").sort({ createdAt: -1 }).lean()

    // Add computed fields for orders and spending
    const usersWithStats = users.map((user) => ({
      ...user,
      totalOrders: 0, // This would be calculated from orders collection
      totalSpent: 0, // This would be calculated from orders collection
    }))

    return NextResponse.json(usersWithStats)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
