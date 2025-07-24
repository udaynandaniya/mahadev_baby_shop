import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { BathItemModel } from "@/lib/models/bath"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const bathItem = await BathItemModel.findById(params.id)

    if (!bathItem) {
      return NextResponse.json({ success: false, error: "Bath item not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: bathItem,
    })
  } catch (error) {
    console.error("Error fetching bath item:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch bath item" }, { status: 500 })
  }
}
