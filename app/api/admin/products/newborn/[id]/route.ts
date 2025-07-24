import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { NewbornItemModel } from "@/lib/models/newborn"
import { newbornSchema } from "@/lib/validations/newborn-schema"
import { syncStockToManager, deleteFromStockManager } from "@/lib/utils/stock-sync"
import { deleteCloudinaryImage } from "@/lib/utils/cloudinary-delete"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const data = await request.json()

    // Validate with Zod schema
    const validatedData = newbornSchema.parse(data)

    // Find existing newborn item
    const existingNewbornItem = await NewbornItemModel.findById(params.id)
    if (!existingNewbornItem) {
      return NextResponse.json({ success: false, message: "Newborn item not found" }, { status: 404 })
    }

    // Update newborn item
    const updatedNewbornItem = await NewbornItemModel.findByIdAndUpdate(params.id, validatedData, {
      new: true,
      runValidators: true,
    })

    if (!updatedNewbornItem) {
      return NextResponse.json({ success: false, message: "Failed to update newborn item" }, { status: 500 })
    }

    // Sync stock changes with stock manager
    await syncStockToManager(
      updatedNewbornItem._id.toString(),
      updatedNewbornItem.productCode,
      updatedNewbornItem.name,
      updatedNewbornItem.inStock,
      "newborn",
    )

    return NextResponse.json({
      success: true,
      data: updatedNewbornItem,
      message: "Newborn item updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating newborn item:", error)
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
      { success: false, message: error.message || "Failed to update newborn item" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Find the newborn item to get product code and images before deletion
    const newbornItem = await NewbornItemModel.findById(params.id)
    if (!newbornItem) {
      return NextResponse.json({ success: false, message: "Newborn item not found" }, { status: 404 })
    }

    // Delete images from Cloudinary
    if (newbornItem.images && newbornItem.images.length > 0) {
      const deletePromises = newbornItem.images.map(deleteCloudinaryImage)
      await Promise.allSettled(deletePromises)
    }

    // Delete newborn item from database
    await NewbornItemModel.findByIdAndDelete(params.id)

    // Delete from stock manager
    await deleteFromStockManager(newbornItem.productCode)

    return NextResponse.json({
      success: true,
      message: "Newborn item and associated images deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting newborn item:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete newborn item" },
      { status: 500 },
    )
  }
}
