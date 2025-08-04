export const dynamic = 'force-dynamic';
// // // // import { type NextRequest, NextResponse } from "next/server"
// // // // import OrderModel from "@/lib/models/order"
// // // // import CartModel from "@/lib/models/cart"
// // // // import ClothesModel from "@/lib/models/clothes"
// // // // import { dbConnect } from "@/lib/mongodb"
// // // // // Import other models as needed

// // // // function generateOrderNumber(): string {
// // // //   const timestamp = Date.now().toString()
// // // //   const random = Math.random().toString(36).substring(2, 8).toUpperCase()
// // // //   return `ORD${timestamp.slice(-6)}${random}`
// // // // }

// // // // export async function POST(request: NextRequest) {
// // // //   try {
// // // //     await dbConnect()

// // // //     const { userEmail, customerInfo, deliveryAddress, selectedItems } = await request.json()

// // // //     if (!userEmail || !customerInfo || !deliveryAddress || !selectedItems?.length) {
// // // //       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
// // // //     }

// // // //     // Fetch cart items for selected products
// // // //     const cartItems = await CartModel.find({
// // // //       userEmail,
// // // //       productCode: { $in: selectedItems },
// // // //     })

// // // //     if (cartItems.length !== selectedItems.length) {
// // // //       return NextResponse.json({ error: "Some cart items not found" }, { status: 404 })
// // // //     }

// // // //     // Fetch product details and validate stock
// // // //     const orderItems = []
// // // //     let itemsTotal = 0
// // // //     let totalWeight = 0

// // // //     for (const cartItem of cartItems) {
// // // //       let product = null

// // // //       switch (cartItem.categoryTypeModel) {
// // // //         case "clothes":
// // // //           product = await ClothesModel.findOne({ productCode: cartItem.productCode })
// // // //           break
// // // //         // Add other cases as needed
// // // //       }

// // // //       if (!product) {
// // // //         return NextResponse.json(
// // // //           {
// // // //             error: `Product ${cartItem.productCode} not found`,
// // // //           },
// // // //           { status: 404 },
// // // //         )
// // // //       }

// // // //       if (product.inStock < cartItem.quantity) {
// // // //         return NextResponse.json(
// // // //           {
// // // //             error: `Insufficient stock for ${product.name}`,
// // // //           },
// // // //           { status: 400 },
// // // //         )
// // // //       }

// // // //       const itemTotal = cartItem.priceAtAdd * cartItem.quantity
// // // //       const itemWeight = cartItem.weightInGrams * cartItem.quantity

// // // //       orderItems.push({
// // // //         productCode: cartItem.productCode,
// // // //         categoryTypeModel: cartItem.categoryTypeModel,
// // // //         name: product.name,
// // // //         quantity: cartItem.quantity,
// // // //         priceAtOrder: cartItem.priceAtAdd,
// // // //         weightInGrams: cartItem.weightInGrams,
// // // //       })

// // // //       itemsTotal += itemTotal
// // // //       totalWeight += itemWeight

// // // //       // Update product stock
// // // //       product.inStock -= cartItem.quantity
// // // //       await product.save()
// // // //     }

// // // //     // Calculate delivery charge
// // // //     const weightInKg = Math.ceil(totalWeight / 1000)
// // // //     const isGujarat = deliveryAddress.state.toLowerCase() === "gujarat"
// // // //     const deliveryCharge = isGujarat ? weightInKg * 30 : weightInKg * 90
// // // //     const finalTotal = itemsTotal + deliveryCharge

// // // //     // Create order
// // // //     const order = await OrderModel.create({
// // // //       orderNumber: generateOrderNumber(),
// // // //       userEmail,
// // // //       customerInfo,
// // // //       deliveryAddress,
// // // //       items: orderItems,
// // // //       pricing: {
// // // //         itemsTotal,
// // // //         deliveryCharge,
// // // //         totalWeight,
// // // //         finalTotal,
// // // //       },
// // // //       status: "pending",
// // // //       statusHistory: [
// // // //         {
// // // //           status: "pending",
// // // //           timestamp: new Date(),
// // // //           note: "Order placed successfully",
// // // //         },
// // // //       ],
// // // //     })

// // // //     // Remove items from cart
// // // //     await CartModel.deleteMany({
// // // //       userEmail,
// // // //       productCode: { $in: selectedItems },
// // // //     })

// // // //     return NextResponse.json({ success: true, data: order })
// // // //   } catch (error) {
// // // //     console.error("Error creating order:", error)
// // // //     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
// // // //   }
// // // // }

// // // // export async function GET(request: NextRequest) {
// // // //   try {
// // // //     await dbConnect()

// // // //     const { searchParams } = new URL(request.url)
// // // //     const userEmail = searchParams.get("userEmail")

// // // //     if (!userEmail) {
// // // //       return NextResponse.json({ error: "User email is required" }, { status: 400 })
// // // //     }

// // // //     const orders = await OrderModel.find({ userEmail }).sort({ createdAt: -1 })

// // // //     return NextResponse.json({ success: true, data: orders })
// // // //   } catch (error) {
// // // //     console.error("Error fetching orders:", error)
// // // //     return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
// // // //   }
// // // // }



// // // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\api\order\route.ts
// // // import { type NextRequest, NextResponse } from "next/server"
// // // import OrderModel from "@/lib/models/order"
// // // import CartModel from "@/lib/models/cart"
// // // import ClothesModel from "@/lib/models/clothes"
// // // import { dbConnect } from "@/lib/mongodb"
// // // import { BathItemModel, NewbornItemModel, ToyModel } from "@/lib/models"
// // // import mongoose from "mongoose"

// // // function generateOrderNumber(): string {
// // //   const timestamp = Date.now().toString()
// // //   const random = Math.random().toString(36).substring(2, 8).toUpperCase()
// // //   return `ORD${timestamp.slice(-6)}${random}`
// // // }

// // // export async function POST(request: NextRequest) {
// // //   try {
// // //     console.log("\n🔄 Connecting to DB..uday uday uday.")
// // //     await dbConnect()

// // //     console.log("📥 Parsing request body...")
// // //     const { userEmail, customerInfo, deliveryAddress, selectedItems } = await request.json()











// // //     console.log("📋 Received data:", {
// // //       userEmail,
// // //       customerInfo,
// // //       deliveryAddress,
// // //       selectedItems
// // //     })
// // //     console.log("\n")













// // //     if (!userEmail || !customerInfo || !deliveryAddress || !selectedItems?.length) {
// // //       console.warn("⚠️ Missing required fields", { userEmail, customerInfo, deliveryAddress, selectedItems })
// // //       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
// // //     }

// // //     console.log(`🛒 Fetching cart items for user: ${userEmail}`)
// // //     const objectIds = selectedItems.map((id: string) => new mongoose.Types.ObjectId(id))
// // //     console.log("📦 Object IDs for cart items:", objectIds)
// // //     const cartItems = await CartModel.find({
// // //       userEmail,
// // //      _id: { $in: objectIds },
// // //     })

// // //     if (cartItems.length !== selectedItems.length) {
// // //       console.warn("⚠️ Some cart items not found", {
// // //         found: cartItems.length,
// // //         expected: selectedItems.length,
// // //       })
// // //       return NextResponse.json({ error: "Some cart items not found" }, { status: 404 })
// // //     }

// // //     const orderItems = []
// // //     let itemsTotal = 0
// // //     let totalWeight = 0

// // //     console.log("🔍 Validating each cart item and fetching product info...")
// // //     for (const cartItem of cartItems) {
// // //       console.log(`➡️ Checking item: ${cartItem.productCode} (${cartItem.categoryTypeModel})`)
// // //       let product = null

// // //       console.log("\n🔄 Fetching product details...")
// // //       console.log("🔄 Fetching product details for:", cartItem.productCode)
// // //       console.log("🔄 Fetching product details for category:", cartItem.categoryTypeModel)

// // //       switch (cartItem.categoryTypeModel) {
// // //         case "clothes":
// // //           product = await ClothesModel.findOne({ productCode: cartItem.productCode })
// // //           break
// // //         case "toy":
// // //           product = await ToyModel.findOne({ productCode: cartItem.productCode })
// // //           break
// // //         case "bath":
// // //           product = await BathItemModel.findOne({ productCode: cartItem.productCode })
// // //           break
// // //         case "newborn":
// // //           product = await NewbornItemModel.findOne({ productCode: cartItem.productCode })
// // //           break
// // //       }

// // //       console.log("🔄 Fetched product:", product ? product.name : "Not found")

// // //       if (!product) {
// // //         console.error("❌ Product not found", cartItem.productCode)
// // //         return NextResponse.json(
// // //           { error: `Product ${cartItem.productCode} not found` },
// // //           { status: 404 }
// // //         )
// // //       }
// // //       console.log("🔄 Checking stock for:", product.name)

// // //       if (product.inStock < cartItem.quantity) {
// // //         console.warn("⚠️ Insufficient stock", {
// // //           productCode: product.productCode,
// // //           available: product.inStock,
// // //           requested: cartItem.quantity,
// // //         })
// // //         return NextResponse.json(
// // //           { error: `Insufficient stock for ${product.name}` },
// // //           { status: 400 }
// // //         )
// // //       }

// // //       console.log("✅ Stock available for:", product.name)
// // //       console.log("📦 Calculating item total and weight...")
// // //       console.log("📦 Calculating item total and weight for:", product.name, "Quantity:", cartItem.quantity)
// // //       const itemTotal = cartItem.priceAtAdd * cartItem.quantity
// // //       const itemWeight = cartItem.weightInGrams * cartItem.quantity

// // //       console.log("📦 Item total:", itemTotal, "Weight:", itemWeight)
// // //       console.log("\n")

// // //       orderItems.push({
// // //         productCode: cartItem.productCode,
// // //         categoryTypeModel: cartItem.categoryTypeModel,
// // //         name: product.name,
// // //         quantity: cartItem.quantity,
// // //         priceAtOrder: cartItem.priceAtAdd,
// // //         weightInGrams: cartItem.weightInGrams,
// // //       })
// // //       console.log("📦 Added item to order:", product.name)

// // //       itemsTotal += itemTotal
// // //       totalWeight += itemWeight

// // //       console.log("💰 Updated items total:", itemsTotal)

// // //       // Update product stock
// // //       product.inStock -= cartItem.quantity
// // //       await product.save()
// // //       console.log(`✅ Updated stock for ${product.name}: now ${product.inStock}`)
// // //     }
// // //     console.log("\n")
// // //     console.log("📦 Calculating delivery charge...")

// // //     const weightInKg = Math.ceil(totalWeight / 1000)
// // //     const isGujarat = deliveryAddress.state.toLowerCase() === "gujarat"
// // //     const deliveryCharge = isGujarat ? weightInKg * 30 : weightInKg * 90
// // //     const finalTotal = itemsTotal + deliveryCharge

// // //     console.log("📦 Delivery charge calculated:", deliveryCharge)
// // //     console.log("\n")
// // //     console.log("\n")

// // //     console.log("\n\n\n📦 Creating order document...")
// // //     console.log("\n")
// // //     console.log("\n")

// // //     console.log("📦 Creating order document...")
// // //     console.log("📦 Creating order document with user email:", userEmail)
// // //     console.log("📦 Creating order document with customer info:", customerInfo)
// // //     console.log("📦 Creating order document with delivery address:", deliveryAddress)
// // //     console.log("📦 Creating order document with items:", orderItems)
// // //     console.log("📦 Creating order document with pricing:", 
// // // {
// // //       itemsTotal,
// // //       deliveryCharge,
// // //       totalWeight,
// // //       finalTotal,
// // //     })





// // //     const order = await OrderModel.create({
// // //     orderNumber: generateOrderNumber(),
// // //     userEmail,
// // //     customerName: customerInfo.fullName,
// // //     customerPhone: customerInfo.mobile,
// // //     deliveryAddress,
// // //     items: orderItems,
// // //     subtotal: itemsTotal,
// // //     deliveryCharge,
// // //     totalAmount: finalTotal,
// // //     status: "pending",
// // //     orderDate: new Date(),
// // //   })


// // //     console.log("🧹 Removing items from cart...")
// // //     await CartModel.deleteMany({
// // //       userEmail,
// // //       productCode: { $in: selectedItems },
// // //     })

// // //     console.log("✅ Order created successfully:", order.orderNumber)
// // //     return NextResponse.json({ success: true, data: order })
// // //   } catch (error) {
// // //     console.error("❌ Error creating order:", error)
// // //     return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
// // //   }
// // // }

// // // export async function GET(request: NextRequest) {
// // //   try {
// // //     console.log("🔄 Connecting to DB for GET...")
// // //     await dbConnect()

// // //     const { searchParams } = new URL(request.url)
// // //     const userEmail = searchParams.get("userEmail")

// // //     if (!userEmail) {
// // //       console.warn("⚠️ userEmail is missing in query params")
// // //       return NextResponse.json({ error: "User email is required" }, { status: 400 })
// // //     }

// // //     console.log(`📤 Fetching orders for ${userEmail}`)
// // //     const orders = await OrderModel.find({ userEmail }).sort({ createdAt: -1 })

// // //     console.log(`✅ Found ${orders.length} orders`)
// // //     return NextResponse.json({ success: true, data: orders })
// // //   } catch (error) {
// // //     console.error("❌ Error fetching orders:", error)
// // //     return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
// // //   }
// // // }


// // import { type NextRequest, NextResponse } from "next/server"
// // import OrderModel from "@/lib/models/order"
// // import ClothesModel from "@/lib/models/clothes"
// // import { dbConnect } from "@/lib/mongodb"
// // import { BathItemModel, NewbornItemModel, ToyModel } from "@/lib/models"
// // import mongoose from "mongoose"

// // function generateOrderNumber(): string {
// //   const timestamp = Date.now().toString()
// //   const random = Math.random().toString(36).substring(2, 8).toUpperCase()
// //   return `ORD${timestamp.slice(-6)}${random}`
// // }

// // export async function POST(request: NextRequest) {
// //   const session = await mongoose.startSession()

// //   try {
// //     await dbConnect()
// //     await session.startTransaction()

// //     const { userEmail, customerInfo, deliveryAddress, selectedItems } = await request.json()

// //     // Validate required fields
// //     if (!userEmail || !customerInfo || !deliveryAddress || !selectedItems || !Array.isArray(selectedItems)) {
// //       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
// //     }

// //     // Fetch current product details and validate stock
// //     const orderItems = []
// //     let subtotal = 0

// //     for (const item of selectedItems) {
// //       const { _id, categoryTypemodel, quantity } = item
// //       let product = null

// //       switch (categoryTypemodel) {
// //         case "clothes":
// //           product = await ClothesModel.findById(_id).session(session)
// //           break
// //         case "toy":
// //           product = await ToyModel.findById(_id).session(session)
// //           break
// //         case "bath":
// //           product = await BathItemModel.findById(_id).session(session)
// //           break
// //         case "newborn":
// //           product = await NewbornItemModel.findById(_id).session(session)
// //           break
// //       }

// //       if (!product) {
// //         throw new Error(`Product not found: ${_id}`)
// //       }

// //       if (product.inStock < quantity) {
// //         throw new Error(`Insufficient stock for ${product.name}. Available: ${product.inStock}, Requested: ${quantity}`)
// //       }

// //       // Update stock
// //       product.inStock -= quantity
// //       await product.save({ session })

// //       // Add to order items
// //       const itemTotal = product.sellingPrice * quantity
// //       subtotal += itemTotal

// //       orderItems.push({
// //         productCode: product.productCode,
// //         categoryTypeModel: categoryTypemodel,
// //         name: product.name,
// //         quantity: quantity,
// //         priceAtOrder: product.sellingPrice,
// //         weightInGrams: product.weightInGrams,
// //       })
// //     }

// //     // Calculate delivery charges
// //     const totalWeight = orderItems.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)
// //     const weightInKg = Math.ceil(totalWeight / 1000)
// //     const isGujarat = deliveryAddress.state.toLowerCase() === "gujarat"
// //     const deliveryCharge = isGujarat ? weightInKg * 30 : weightInKg * 90
// //     const totalAmount = subtotal + deliveryCharge

// //     // Create order
// //     const orderNumber = generateOrderNumber()
// //     const newOrder = new OrderModel({
// //       orderNumber,
// //       userEmail,
// //       customerName: customerInfo.fullName,
// //       customerPhone: customerInfo.mobile,
// //       deliveryAddress,
// //       items: orderItems,
// //       subtotal,
// //       deliveryCharge,
// //       totalAmount,
// //       status: "pending",
// //       orderDate: new Date(),
// //     })

// //     await newOrder.save({ session })
// //     await session.commitTransaction()

// //     return NextResponse.json({
// //       success: true,
// //       orderNumber,
// //       message: "Order placed successfully",
// //     })
// //   } catch (error) {
// //     await session.abortTransaction()
// //     console.error("Error creating order:", error)
// //     return NextResponse.json(
// //       { error: error instanceof Error ? error.message : "Failed to create order" },
// //       { status: 500 },
// //     )
// //   } finally {
// //     session.endSession()
// //   }
// // }

// //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\api\order\route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import OrderModel from "@/lib/models/order"
// import ClothesModel from "@/lib/models/clothes"
// import { dbConnect } from "@/lib/mongodb"
// import { BathItemModel, NewbornItemModel, ToyModel } from "@/lib/models"
// import mongoose from "mongoose"

// function generateOrderNumber(): string {
//   const timestamp = Date.now().toString()
//   const random = Math.random().toString(36).substring(2, 8).toUpperCase()
//   return `ORD${timestamp.slice(-6)}${random}`
// }

// export async function POST(request: NextRequest) {
//   let session: mongoose.ClientSession | null = null

//   try {
//     // Ensure database connection with timeout
//     await dbConnect()

//     // Check if mongoose is connected
//     if (mongoose.connection.readyState !== 1) {
//       console.error("MongoDB not connected, readyState:", mongoose.connection.readyState)
//       return NextResponse.json({ error: "Database connection failed. Please try again." }, { status: 503 })
//     }

//     const { userEmail, customerInfo, deliveryAddress, selectedItems } = await request.json()

//     // Validate required fields
//     if (!userEmail || !customerInfo || !deliveryAddress || !selectedItems || !Array.isArray(selectedItems)) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     if (selectedItems.length === 0) {
//       return NextResponse.json({ error: "No items selected for order" }, { status: 400 })
//     }

//     // Start session with timeout
//     session = await mongoose.startSession()
//     await session.startTransaction()

//     // Fetch current product details and validate stock
//     const orderItems = []
//     let subtotal = 0

//     for (const item of selectedItems) {
//       const { _id, categoryTypemodel, quantity } = item

//       if (!_id || !categoryTypemodel || !quantity || quantity <= 0) {
//         throw new Error(`Invalid item data: ${JSON.stringify(item)}`)
//       }

//       let product = null

//       try {
//         switch (categoryTypemodel) {
//           case "clothes":
//             product = await ClothesModel.findById(_id).session(session)
//             break
//           case "toy":
//             product = await ToyModel.findById(_id).session(session)
//             break
//           case "bath":
//             product = await BathItemModel.findById(_id).session(session)
//             break
//           case "newborn":
//             product = await NewbornItemModel.findById(_id).session(session)
//             break
//           default:
//             throw new Error(`Invalid category type: ${categoryTypemodel}`)
//         }
//       } catch (error) {
//         console.error(`Error fetching product ${_id}:`, error)
//         throw new Error(`Failed to fetch product details for ${_id}`)
//       }

//       if (!product) {
//         throw new Error(`Product not found: ${_id}`)
//       }

//       if (product.inStock < quantity) {
//         throw new Error(`Insufficient stock for ${product.name}. Available: ${product.inStock}, Requested: ${quantity}`)
//       }

//       // Update stock
//       product.inStock -= quantity
//       await product.save({ session })

//       // Add to order items
//       const itemTotal = product.sellingPrice * quantity
//       subtotal += itemTotal

//       orderItems.push({
//         productCode: product.productCode || `${categoryTypemodel.toUpperCase()}-${product._id.toString().slice(-6)}`,
//         categoryTypeModel: categoryTypemodel,
//         name: product.name,
//         quantity: quantity,
//         priceAtOrder: product.sellingPrice,
//         weightInGrams: product.weightInGrams || 100, // Default weight if not specified
//       })
//     }

//     // Calculate delivery charges
//     const totalWeight = orderItems.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)
//     const weightInKg = Math.ceil(totalWeight / 1000)
//     const isGujarat = deliveryAddress.state.toLowerCase() === "gujarat"
//     const deliveryCharge = isGujarat ? weightInKg * 30 : weightInKg * 90
//     const totalAmount = subtotal + deliveryCharge

//     // Create order
//     const orderNumber = generateOrderNumber()
//     const newOrder = new OrderModel({
//       orderNumber,
//       userEmail,
//       customerName: customerInfo.fullName,
//       customerPhone: customerInfo.mobile,
//       deliveryAddress,
//       items: orderItems,
//       subtotal,
//       deliveryCharge,
//       totalAmount,
//       status: "pending",
//       orderDate: new Date(),
//     })

//     await newOrder.save({ session })
//     await session.commitTransaction()

//     console.log(`Order created successfully: ${orderNumber}`)

//     return NextResponse.json({
//       success: true,
//       orderNumber,
//       totalAmount,
//       message: "Order placed successfully! Admin will contact you soon.",
//     })
//   } catch (error) {
//     console.error("Error creating order:", error)

//     if (session) {
//       try {
//         await session.abortTransaction()
//       } catch (abortError) {
//         console.error("Error aborting transaction:", abortError)
//       }
//     }

//     // Return appropriate error message
//     const errorMessage = error instanceof Error ? error.message : "Failed to create order"

//     return NextResponse.json(
//       {
//         error: errorMessage,
//         details: "Please check your internet connection and try again.",
//       },
//       { status: 500 },
//     )
//   } finally {
//     if (session) {
//       try {
//         await session.endSession()
//       } catch (endError) {
//         console.error("Error ending session:", endError)
//       }
//     }
//   }
// }





import { type NextRequest, NextResponse } from "next/server"
import OrderModel from "@/lib/models/order"
import ClothesModel from "@/lib/models/clothes"
import { dbConnect } from "@/lib/mongodb"
import { BathItemModel, NewbornItemModel, ToyModel } from "@/lib/models"
import StockManagerModel from "@/lib/models/stockManager"
import mongoose from "mongoose"

function generateOrderNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD${timestamp.slice(-6)}${random}`
}

export async function POST(request: NextRequest) {
  let session: mongoose.ClientSession | null = null

  try {
    await dbConnect()

    if (mongoose.connection.readyState !== 1) {
      console.error("MongoDB not connected, readyState:", mongoose.connection.readyState)
      return NextResponse.json({ error: "Database connection failed. Please try again." }, { status: 503 })
    }

    const { userEmail, customerInfo, deliveryAddress, selectedItems } = await request.json()

    if (!userEmail || !customerInfo || !deliveryAddress || !selectedItems || !Array.isArray(selectedItems)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (selectedItems.length === 0) {
      return NextResponse.json({ error: "No items selected for order" }, { status: 400 })
    }

    session = await mongoose.startSession()
    await session.startTransaction()

    const orderItems = []
    let subtotal = 0

    for (const item of selectedItems) {
      const { _id, categoryTypemodel, quantity } = item

      if (!_id || !categoryTypemodel || !quantity || quantity <= 0) {
        throw new Error(`Invalid item data: ${JSON.stringify(item)}`)
      }

      let product = null

      switch (categoryTypemodel) {
        case "clothes":
          product = await ClothesModel.findById(_id).session(session)
          break
        case "toy":
          product = await ToyModel.findById(_id).session(session)
          break
        case "bath":
          product = await BathItemModel.findById(_id).session(session)
          break
        case "newborn":
          product = await NewbornItemModel.findById(_id).session(session)
          break
        default:
          throw new Error(`Invalid category type: ${categoryTypemodel}`)
      }

      if (!product) {
        throw new Error(`Product not found: ${_id}`)
      }

      if (product.inStock < quantity) {
        throw new Error(`Insufficient stock for ${product.name}. Available: ${product.inStock}, Requested: ${quantity}`)
      }

      // Decrease stock
      product.inStock -= quantity
      await product.save({ session })

      // ✅ Update Stock Manager
      await StockManagerModel.updateOne(
        { productId: _id, productType: categoryTypemodel },
        {
          $set: {
            currentStock: product.inStock,
            lastUpdated: new Date(),
          },
          $setOnInsert: {
            productCode: product.productCode || `${categoryTypemodel.toUpperCase()}-${product._id.toString().slice(-6)}`,
            productName: product.name,
            source: "online",
          },
        },
        { upsert: true, session }
      )

      // Add item to order
      const itemTotal = product.sellingPrice * quantity
      subtotal += itemTotal

      orderItems.push({
        productCode: product.productCode || `${categoryTypemodel.toUpperCase()}-${product._id.toString().slice(-6)}`,
        categoryTypeModel: categoryTypemodel,
        name: product.name,
        quantity: quantity,
        priceAtOrder: product.sellingPrice,
        weightInGrams: product.weightInGrams || 100,
      })
    }

    // Delivery charge calculation
    const totalWeight = orderItems.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)
    const weightInKg = Math.ceil(totalWeight / 1000)
    const isGujarat = deliveryAddress.state.toLowerCase() === "gujarat"
    const deliveryCharge = isGujarat ? weightInKg * 30 : weightInKg * 90
    const totalAmount = subtotal + deliveryCharge

    // Save Order
    const orderNumber = generateOrderNumber()
    const newOrder = new OrderModel({
      orderNumber,
      userEmail,
      customerName: customerInfo.fullName,
      customerPhone: customerInfo.mobile,
      deliveryAddress,
      items: orderItems,
      subtotal,
      deliveryCharge,
      totalAmount,
      status: "pending",
      orderDate: new Date(),
    })

    await newOrder.save({ session })
    await session.commitTransaction()

    // console.log(`Order created successfully: ${orderNumber}`)

    return NextResponse.json({
      success: true,
      orderNumber,
      totalAmount,
      message: "Order placed successfully! Admin will contact you soon.",
    })

  } catch (error) {
    console.error("Error creating order:", error)

    if (session) {
      try {
        await session.abortTransaction()
      } catch (abortError) {
        console.error("Error aborting transaction:", abortError)
      }
    }

    const errorMessage = error instanceof Error ? error.message : "Failed to create order"

    return NextResponse.json(
      {
        error: errorMessage,
        details: "Please check your internet connection and try again.",
      },
      { status: 500 }
    )
  } finally {
    if (session) {
      try {
        await session.endSession()
      } catch (endError) {
        console.error("Error ending session:", endError)
      }
    }
  }
}





