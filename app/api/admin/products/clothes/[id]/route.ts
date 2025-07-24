// import { NextResponse } from "next/server"
// import { dbConnect } from "@/lib/mongodb"
// import { ClothesModel } from "@/lib/models/clothes"
// import { StockManagerModel } from "@/lib/models/stockManager"

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect()
//     const clothesData = await request.json()

//     const updatedClothes = await ClothesModel.findByIdAndUpdate(params.id, clothesData, { new: true })

//     if (!updatedClothes) {
//       return NextResponse.json({ error: "Clothes item not found" }, { status: 404 })
//     }

//     // Update stock manager entry
//     await StockManagerModel.findOneAndUpdate(
//       { productId: params.id },
//       {
//         productName: clothesData.name,
//         currentStock: clothesData.inStock,
//         lastUpdated: new Date(),
//       },
//     )

//     return NextResponse.json(updatedClothes)
//   } catch (error) {
//     console.error("Clothes PUT Error:", error)
//     return NextResponse.json({ error: "Failed to update clothes item" }, { status: 500 })
//   }
// }

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect()

//     const deletedClothes = await ClothesModel.findByIdAndDelete(params.id)

//     if (!deletedClothes) {
//       return NextResponse.json({ error: "Clothes item not found" }, { status: 404 })
//     }

//     // Delete corresponding stock manager entry
//     await StockManagerModel.findOneAndDelete({ productId: params.id })

//     return NextResponse.json({ message: "Clothes item deleted successfully" })
//   } catch (error) {
//     console.error("Clothes DELETE Error:", error)
//     return NextResponse.json({ error: "Failed to delete clothes item" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { ClothesModel } from "@/lib/models/clothes"
import { clothesSchema } from "@/lib/validations/clothes-schema"
import { syncStockToManager, deleteFromStockManager } from "@/lib/utils/stock-sync"
import { deleteCloudinaryImage } from "@/lib/utils/cloudinary-delete"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const data = await request.json()

    // Validate with Zod schema
    const validatedData = clothesSchema.parse(data)

    // Find existing clothes item
    const existingClothes = await ClothesModel.findById(params.id)
    if (!existingClothes) {
      return NextResponse.json({ success: false, message: "Clothes item not found" }, { status: 404 })
    }

    // Update clothes item
    const updatedClothes = await ClothesModel.findByIdAndUpdate(params.id, validatedData, {
      new: true,
      runValidators: true,
    })

    if (!updatedClothes) {
      return NextResponse.json({ success: false, message: "Failed to update clothes item" }, { status: 500 })
    }

    // Sync stock changes with stock manager
    await syncStockToManager(
      updatedClothes._id.toString(),
      updatedClothes.productCode,
      updatedClothes.name,
      updatedClothes.inStock,
      "clothes",
    )

    return NextResponse.json({
      success: true,
      data: updatedClothes,
      message: "Clothes item updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating clothes:", error)

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

    return NextResponse.json({ success: false, message: error.message || "Failed to update clothes" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Find the clothes item to get product code and images before deletion
    const clothes = await ClothesModel.findById(params.id)
    if (!clothes) {
      return NextResponse.json({ success: false, message: "Clothes item not found" }, { status: 404 })
    }

    // Delete images from Cloudinary
    if (clothes.images && clothes.images.length > 0) {
      const deletePromises = clothes.images.map(deleteCloudinaryImage)
      await Promise.allSettled(deletePromises)
    }

    // Delete clothes item from database
    await ClothesModel.findByIdAndDelete(params.id)

    // Delete from stock manager
    await deleteFromStockManager(clothes.productCode)

    return NextResponse.json({
      success: true,
      message: "Clothes item and associated images deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting clothes:", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to delete clothes" }, { status: 500 })
  }
}
