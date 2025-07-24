import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { BathItemModel } from "@/lib/models/bath"
import { bathSchema } from "@/lib/validations/bath-schema"
import { syncStockToManager, deleteFromStockManager } from "@/lib/utils/stock-sync"
import { deleteCloudinaryImage } from "@/lib/utils/cloudinary-delete"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const data = await request.json()

    // Validate with Zod schema
    const validatedData = bathSchema.parse(data)

    // Find existing bath item
    const existingBathItem = await BathItemModel.findById(params.id)
    if (!existingBathItem) {
      return NextResponse.json({ success: false, message: "Bath item not found" }, { status: 404 })
    }

    // Update bath item
    const updatedBathItem = await BathItemModel.findByIdAndUpdate(params.id, validatedData, {
      new: true,
      runValidators: true,
    })

    if (!updatedBathItem) {
      return NextResponse.json({ success: false, message: "Failed to update bath item" }, { status: 500 })
    }

    // Sync stock changes with stock manager
    await syncStockToManager(
      updatedBathItem._id.toString(),
      updatedBathItem.productCode,
      updatedBathItem.name,
      updatedBathItem.inStock,
      "bath",
    )

    return NextResponse.json({
      success: true,
      data: updatedBathItem,
      message: "Bath item updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating bath item:", error)
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update bath item" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Find the bath item to get product code and images before deletion
    const bathItem = await BathItemModel.findById(params.id)
    if (!bathItem) {
      return NextResponse.json({ success: false, message: "Bath item not found" }, { status: 404 })
    }

    // Delete images from Cloudinary
    if (bathItem.images && bathItem.images.length > 0) {
      const deletePromises = bathItem.images.map(deleteCloudinaryImage)
      await Promise.allSettled(deletePromises)
    }

    // Delete bath item from database
    await BathItemModel.findByIdAndDelete(params.id)

    // Delete from stock manager
    await deleteFromStockManager(bathItem.productCode)

    return NextResponse.json({
      success: true,
      message: "Bath item and associated images deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting bath item:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete bath item" },
      { status: 500 },
    )
  }
}
