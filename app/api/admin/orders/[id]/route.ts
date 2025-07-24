import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { OrderModel } from "@/lib/models/order"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const order = await OrderModel.findById(params.id).lean()

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const body = await request.json()
    const { status, consignmentNumber, note } = body

    const updateData: any = {}

    if (status) {
      updateData.status = status
    }

    if (consignmentNumber) {
      updateData.consignmentNumber = consignmentNumber
    }

    const order = await OrderModel.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true })

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
      message: "Order updated successfully",
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 })
  }
}
