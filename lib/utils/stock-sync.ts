// import { StockManagerModel, ToyModel } from "../models"
// import { dbConnect } from "../mongodb"



// export async function syncStockToManager(
//   productId: string,
//   productCode: string,
//   productName: string,
//   newStock: number,
//   productType: "toy" | "clothes" | "bath" | "newborn" = "toy",
// ) {
//   try {
//     await dbConnect()

//     // Update or create stock manager record
//     await StockManagerModel.findOneAndUpdate(
//       { productCode },
//       {
//         productId,
//         productCode,
//         productType,
//         productName,
//         currentStock: newStock,
//         lastUpdated: new Date(),
//         source: "online", // default source
//       },
//       { upsert: true, new: true },
//     )

//     console.log(`Stock synced to manager for ${productCode}: ${newStock}`)
//   } catch (error) {
//     console.error("Error syncing stock to manager:", error)
//     throw error
//   }
// }

// export async function syncStockFromManager(productCode: string, newStock: number) {
//   try {
//     await dbConnect()

//     // Find the stock manager record to get product type
//     const stockRecord = await StockManagerModel.findOne({ productCode })
//     if (!stockRecord) {
//       throw new Error("Stock record not found")
//     }

//     // Update the respective product model based on type
//     switch (stockRecord.productType) {
//       case "toy":
//         await ToyModel.findOneAndUpdate({ productCode }, { inStock: newStock }, { new: true })
//         break
//       // Add other cases for clothes, bath, newborn when needed
//       default:
//         console.warn(`Unknown product type: ${stockRecord.productType}`)
//     }

//     console.log(`Stock synced from manager for ${productCode}: ${newStock}`)
//   } catch (error) {
//     console.error("Error syncing stock from manager:", error)
//     throw error
//   }
// }

// export async function deleteFromStockManager(productCode: string) {
//   try {
//     await dbConnect()
//     await StockManagerModel.deleteOne({ productCode })
//     console.log(`Deleted stock record for ${productCode}`)
//   } catch (error) {
//     console.error("Error deleting from stock manager:", error)
//     throw error
//   }
// }

// export async function checkProductCodeUnique(productCode: string, excludeId?: string) {
//   try {
//     await dbConnect()

//     const query: any = { productCode }
//     if (excludeId) {
//       query._id = { $ne: excludeId }
//     }

//     // Check in stock manager for uniqueness across all product types
//     const existingRecord = await StockManagerModel.findOne(query)
//     return !existingRecord
//   } catch (error) {
//     console.error("Error checking product code uniqueness:", error)
//     return false
//   }
// }



//C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\utils\stock-sync.ts
import { dbConnect } from "@/lib/mongodb"
import { StockManagerModel } from "@/lib/models/stockManager"
import ToyModel from "@/lib/models/toy"

export async function syncStockToManager(
  productId: string,
  productCode: string,
  productName: string,
  newStock: number,
  productType: "toy" | "clothes" | "bath" | "newborn" = "toy",
) {
  try {
    await dbConnect()

    // Update or create stock manager record
    await StockManagerModel.findOneAndUpdate(
      { productCode },
      {
        productId,
        productCode,
        productType,
        productName,
        currentStock: newStock,
        lastUpdated: new Date(),
        source: "online", // default source
      },
      { upsert: true, new: true },
    )

  } catch (error) {
    console.error("Error syncing stock to manager:", error)
    throw error
  }
}

export async function syncStockFromManager(productCode: string, newStock: number) {
  try {
    await dbConnect()

    // Find the stock manager record to get product type
    const stockRecord = await StockManagerModel.findOne({ productCode })
    if (!stockRecord) {
      throw new Error("Stock record not found")
    }

    // Update the respective product model based on type
    switch (stockRecord.productType) {
      case "toy":
        await ToyModel.findOneAndUpdate({ productCode }, { inStock: newStock }, { new: true })
        break
      // Add other cases for clothes, bath, newborn when needed
      default:
        console.warn(`Unknown product type: ${stockRecord.productType}`)
    }

  } catch (error) {
    console.error("Error syncing stock from manager:", error)
    throw error
  }
}

export async function deleteFromStockManager(productCode: string) {
  try {
    await dbConnect()
    await StockManagerModel.deleteOne({ productCode })
  } catch (error) {
    console.error("Error deleting from stock manager:", error)
    throw error
  }
}

export async function checkProductCodeUnique(productCode: string, excludeId?: string) {
  try {
    await dbConnect()

    const query: any = { productCode }
    if (excludeId) {
      query._id = { $ne: excludeId }
    }

    // Check in stock manager for uniqueness across all product types
    const existingRecord = await StockManagerModel.findOne(query)
    return !existingRecord
  } catch (error) {
    console.error("Error checking product code uniqueness:", error)
    return false
  }
}
