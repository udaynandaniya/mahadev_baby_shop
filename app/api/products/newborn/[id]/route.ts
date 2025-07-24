import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { NewbornItemModel } from "@/lib/models/newborn"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const newbornItem = await NewbornItemModel.findById(params.id).select("-productCode")

    if (!newbornItem) {
      return NextResponse.json({ success: false, error: "Newborn item not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: newbornItem,
    })
  } catch (error) {
    console.error("Error fetching newborn item:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch newborn item" }, { status: 500 })
  }
}
