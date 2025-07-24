// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\api\admin\products\toys\route.ts
// // import { NextResponse } from "next/server"
// // import { dbConnect } from "@/lib/mongodb"
// // import { ToyModel } from "@/lib/models/toy"
// // import { StockManagerModel } from "@/lib/models/stockManager"

// // export async function GET() {
// //   try {
// //     await dbConnect()
// //     const toys = await ToyModel.find({}).sort({ createdAt: -1 })
// //     return NextResponse.json(toys)
// //   } catch (error) {
// //     console.error("Toys GET Error:", error)
// //     return NextResponse.json({ error: "Failed to fetch toys" }, { status: 500 })
// //   }
// // }

// // export async function POST(request: Request) {


// //   try {

// //     console.log("\nWe are going to change in toys.. inn backend")
// //     await dbConnect()
// //     const toyData = await request.json()

// //     console.log("Toy Data:", toyData)

// //     const newToy = new ToyModel(toyData)
// //     await newToy.save()

// //     // Create corresponding stock manager entry
// //     const stockEntry = new StockManagerModel({
// //       productId: newToy._id.toString(),
// //       productCode: toyData.productCode,
// //       productType: "toy",
// //       productName: toyData.name,
// //       currentStock: toyData.inStock,
// //       source: "online",
// //       notes: "Initial stock entry",
// //     })
// //     await stockEntry.save()

// //     return NextResponse.json(newToy, { status: 201 })
// //   } catch (error) {
// //     console.error("Toys POST Error:", error)
// //     return NextResponse.json({ error: "Failed to create toy" }, { status: 500 })
// //   }
// // }


// // import { NextResponse } from "next/server"
// // import { dbConnect } from "@/lib/mongodb"
// // import { ToyModel } from "@/lib/models/toy"
// // import { toySchema } from "@/lib/validations/toy-schema"
// // import { syncStockToManager, checkProductCodeUnique } from "@/lib/utils/stock-sync"

// // export async function GET() {
// //   try {
// //     await dbConnect()
// //     const toys = await ToyModel.find({}).sort({ createdAt: -1 })
// //     return NextResponse.json({
// //       success: true,
// //       data: toys,
// //       total: toys.length,
// //     })
// //   } catch (error) {
// //     console.error("Error fetching toys:", error)
// //     return NextResponse.json({ success: false, error: "Failed to fetch toys" }, { status: 500 })
// //   }
// // }

// // export async function POST(request: Request) {
// //   try {
// //     await dbConnect()
// //     const data = await request.json()

// //     // Validate with Zod schema
// //     const validatedData = toySchema.parse(data)

// //     // Check product code uniqueness
// //     const isUnique = await checkProductCodeUnique(validatedData.productCode)
// //     if (!isUnique) {
// //       return NextResponse.json({ success: false, message: "Product code already exists" }, { status: 400 })
// //     }

// //     // Create new toy
// //     const newToy = new ToyModel(validatedData)
// //     await newToy.save()

// //     // Sync with stock manager
// //     await syncStockToManager(newToy._id.toString(), newToy.productCode, newToy.name, newToy.inStock, "toy")

// //     return NextResponse.json({
// //       success: true,
// //       data: newToy,
// //       message: "Toy added successfully",
// //     })
// //   } catch (error: any) {
// //     console.error("Error adding toy:", error)

// //     if (error.name === "ZodError") {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "Validation error",
// //           errors: error.errors,
// //         },
// //         { status: 400 },
// //       )
// //     }

// //     return NextResponse.json({ success: false, message: error.message || "Failed to add toy" }, { status: 500 })
// //   }
// // }

// import { NextResponse } from "next/server"
// import { dbConnect } from "@/lib/mongodb"
// import { ToyModel } from "@/lib/models/toy"
// import { toySchema } from "@/lib/validations/toy-schema"
// import { syncStockToManager, checkProductCodeUnique } from "@/lib/utils/stock-sync"

// export async function GET() {
//   try {
//     await dbConnect()
//     const toys = await ToyModel.find({}).sort({ createdAt: -1 })
//     return NextResponse.json({
//       success: true,
//       data: toys,
//       total: toys.length,
//     })
//   } catch (error) {
//     console.error("Error fetching toys:", error)
//     return NextResponse.json({ success: false, error: "Failed to fetch toys" }, { status: 500 })
//   }
// }

// export async function POST(request: Request) {
//   try {
//     await dbConnect()
//     const data = await request.json()

//     // Validate with Zod schema
//     const validatedData = toySchema.parse(data)

//     // Check product code uniqueness
//     const isUnique = await checkProductCodeUnique(validatedData.productCode)
//     if (!isUnique) {
//       return NextResponse.json({ success: false, message: "Product code already exists" }, { status: 400 })
//     }

//     // Create new toy
//     const newToy = new ToyModel(validatedData)
//     await newToy.save()

//     // Sync with stock manager
//     await syncStockToManager(newToy._id.toString(), newToy.productCode, newToy.name, newToy.inStock, "toy")

//     return NextResponse.json({
//       success: true,
//       data: newToy,
//       message: "Toy added successfully",
//     })
//   } catch (error: any) {
//     console.error("Error adding toy:", error)

//     if (error.name === "ZodError") {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Validation error",
//           errors: error.errors,
//         },
//         { status: 400 },
//       )
//     }

//     return NextResponse.json({ success: false, message: error.message || "Failed to add toy" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import ToyModel from "@/lib/models/toy"
import { toySchema } from "@/lib/validations/toy-schema"
import { syncStockToManager, checkProductCodeUnique } from "@/lib/utils/stock-sync"

export async function GET() {
  try {
    await dbConnect()
    const toys = await ToyModel.find({}).sort({ createdAt: -1 })
    return NextResponse.json({
      success: true,
      data: toys,
      total: toys.length,
    })
  } catch (error) {
    console.error("Error fetching toys:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch toys" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    // Validate with Zod schema
    const validatedData = toySchema.parse(data)

    // Check product code uniqueness
    const isUnique = await checkProductCodeUnique(validatedData.productCode)
    if (!isUnique) {
      return NextResponse.json({ success: false, message: "Product code already exists" }, { status: 400 })
    }

    // Create new toy
    const newToy = new ToyModel(validatedData)
    await newToy.save()

    // Sync with stock manager
    await syncStockToManager(newToy._id.toString(), newToy.productCode, newToy.name, newToy.inStock, "toy")

    return NextResponse.json({
      success: true,
      data: newToy,
      message: "Toy added successfully",
    })
  } catch (error: any) {
    console.error("Error adding toy:", error)

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

    return NextResponse.json({ success: false, message: error.message || "Failed to add toy" }, { status: 500 })
  }
}
