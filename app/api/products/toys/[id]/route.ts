import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import ToyModel from "@/lib/models/toy"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const toy = await ToyModel.findById(params.id).select("-productCode")

    if (!toy) {
      return NextResponse.json({ success: false, error: "Toy not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: toy,
    })
  } catch (error) {
    console.error("Error fetching toy:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch toy" }, { status: 500 })
  }
}
