import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { ClothesModel } from "@/lib/models/clothes"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const clothesItem = await ClothesModel.findById(params.id).select("-productCode")

    if (!clothesItem) {
      return NextResponse.json({ success: false, error: "Clothes item not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: clothesItem,
    })
  } catch (error) {
    console.error("Error fetching clothes item:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch clothes item" }, { status: 500 })
  }
}
