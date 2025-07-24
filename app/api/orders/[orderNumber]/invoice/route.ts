import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { OrderModel } from "@/lib/models/order"
import PDFDocument from "pdfkit"

export async function GET(request: Request, { params }: { params: { orderNumber: string } }) {
  try {
    await dbConnect()

    const order = await OrderModel.findOne({ orderNumber: params.orderNumber }).lean()

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    // Only allow invoice download for completed orders
    if (order.status !== "completed") {
      return NextResponse.json(
        { success: false, error: "Invoice only available for completed orders" },
        { status: 400 },
      )
    }

    // Create PDF document
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    })

    // Set up response headers
    const chunks: Buffer[] = []
    doc.on("data", (chunk) => chunks.push(chunk))

    return new Promise((resolve) => {
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks)
        resolve(
          new NextResponse(pdfBuffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename="invoice-${order.orderNumber}.pdf"`,
              "Content-Length": pdfBuffer.length.toString(),
            },
          }),
        )
      })

      // Company Header
      doc
        .fontSize(24)
        .font("Times-Bold")
        .fillColor("#2563eb")
        .text("MAHADEV BABY SHOP", 50, 50, { align: "center" })
        .fontSize(16)
        .fillColor("#64748b")
        .text("MANGROL", { align: "center" })
        .moveDown(0.5)

      // Contact Information
      doc
        .fontSize(10)
        .fillColor("#64748b")
        .text("Phone: +91 9876543210 | Email: info@mahadevbabyshop.com", { align: "center" })
        .text("Address: Main Market, Mangrol, Gujarat - 362225", { align: "center" })
        .moveDown(1)

      // Invoice Title and Line
      doc.strokeColor("#e5e7eb").lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke().moveDown(1)

      doc
        .fontSize(20)
        .font("Times-Bold")
        .fillColor("#1f2937")
        .text("INVOICE", 50, doc.y, { align: "center" })
        .moveDown(1)

      // Invoice Details Box
      const invoiceBoxY = doc.y
      doc.rect(50, invoiceBoxY, 495, 80).fillAndStroke("#f8fafc", "#e5e7eb")

      doc
        .fontSize(12)
        .font("Times-Bold")
        .fillColor("#1f2937")
        .text("Invoice Details:", 60, invoiceBoxY + 15)
        .font("Helvetica")
        .text(`Invoice Number: ${order.orderNumber}`, 60, invoiceBoxY + 35)
        .text(
          `Order Date: ${new Date(order.orderDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}`,
          60,
          invoiceBoxY + 50,
        )
        .text(
          `Invoice Date: ${new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}`,
          300,
          invoiceBoxY + 35,
        )
        .text(`Status: COMPLETED`, 300, invoiceBoxY + 50)

      doc.y = invoiceBoxY + 100

      // Customer Information
      doc.fontSize(14).font("Times-Bold").fillColor("#1f2937").text("Bill To:", 50, doc.y).moveDown(0.5)

      const customerBoxY = doc.y
      doc.rect(50, customerBoxY, 240, 120).fillAndStroke("#f8fafc", "#e5e7eb")

      doc
        .fontSize(11)
        .font("Times-Bold")
        .fillColor("#1f2937")
        .text(order.customerInfo.name, 60, customerBoxY + 15)
        .font("Helvetica")
        .fillColor("#4b5563")
        .text(`Phone: ${order.customerInfo.phone}`, 60, customerBoxY + 35)
        .text(`Email: ${order.userEmail}`, 60, customerBoxY + 50)

      // Delivery Address
      doc
        .fontSize(14)
        .font("Times-Bold")
        .fillColor("#1f2937")
        .text("Ship To:", 305, customerBoxY - 20)

      doc.rect(305, customerBoxY, 240, 120).fillAndStroke("#f8fafc", "#e5e7eb")

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4b5563")
        .text(order.deliveryAddress.street, 315, customerBoxY + 15, { width: 220 })
        .text(order.deliveryAddress.area, 315, customerBoxY + 30, { width: 220 })
        .text(`${order.deliveryAddress.village}, ${order.deliveryAddress.subDistrict}`, 315, customerBoxY + 45, {
          width: 220,
        })
        .text(`${order.deliveryAddress.district}, ${order.deliveryAddress.state}`, 315, customerBoxY + 60, {
          width: 220,
        })
        .text(`PIN: ${order.deliveryAddress.pincode}`, 315, customerBoxY + 75, { width: 220 })

      doc.y = customerBoxY + 140

      // Items Table Header
      const tableTop = doc.y
      doc.fontSize(12).font("Times-Bold").fillColor("#ffffff")

      // Table header background
      doc.rect(50, tableTop, 495, 25).fill("#2563eb")

      // Table headers
      doc
        .text("S.No", 60, tableTop + 8, { width: 40 })
        .text("Product Code", 100, tableTop + 8, { width: 80 })
        .text("Item Description", 180, tableTop + 8, { width: 180 })
        .text("Qty", 360, tableTop + 8, { width: 40 })
        .text("Rate", 400, tableTop + 8, { width: 60 })
        .text("Amount", 460, tableTop + 8, { width: 80 })

      let currentY = tableTop + 25

      // Items
      order.items.forEach((item: any, index: number) => {
        const rowHeight = 30

        // Alternate row colors
        if (index % 2 === 0) {
          doc.rect(50, currentY, 495, rowHeight).fill("#f8fafc")
        }

        doc
          .fontSize(10)
          .font("Helvetica")
          .fillColor("#1f2937")
          .text((index + 1).toString(), 60, currentY + 10, { width: 40 })
          .text(item.productCode, 100, currentY + 10, { width: 80 })
          .text(item.name, 180, currentY + 10, { width: 180 })
          .text(item.quantity.toString(), 360, currentY + 10, { width: 40, align: "center" })
          .text(`₹${item.priceAtOrder.toFixed(2)}`, 400, currentY + 10, { width: 60, align: "right" })
          .text(`₹${(item.quantity * item.priceAtOrder).toFixed(2)}`, 460, currentY + 10, { width: 80, align: "right" })

        currentY += rowHeight
      })

      // Table border
      doc.rect(50, tableTop, 495, currentY - tableTop).stroke("#e5e7eb")

      // Vertical lines for table
      const columnPositions = [100, 180, 360, 400, 460]
      columnPositions.forEach((x) => {
        doc.moveTo(x, tableTop).lineTo(x, currentY).stroke("#e5e7eb")
      })

      currentY += 20

      // Totals Section
      const totalsX = 350
      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#4b5563")
        .text("Subtotal:", totalsX, currentY, { width: 100, align: "left" })
        .text(`₹${order.pricing.itemsTotal.toFixed(2)}`, totalsX + 100, currentY, { width: 80, align: "right" })

      currentY += 20
      doc
        .text("Delivery Charges:", totalsX, currentY, { width: 100, align: "left" })
        .text(`₹${order.pricing.deliveryCharge.toFixed(2)}`, totalsX + 100, currentY, { width: 80, align: "right" })

      currentY += 20
      // Total line
      doc
        .strokeColor("#e5e7eb")
        .lineWidth(1)
        .moveTo(totalsX, currentY)
        .lineTo(totalsX + 180, currentY)
        .stroke()

      currentY += 10
      doc
        .fontSize(14)
        .font("Times-Bold")
        .fillColor("#059669")
        .text("Total Amount:", totalsX, currentY, { width: 100, align: "left" })
        .text(`₹${order.pricing.finalTotal.toFixed(2)}`, totalsX + 100, currentY, { width: 80, align: "right" })

      currentY += 40

      // Payment Information
      doc
        .fontSize(12)
        .font("Times-Bold")
        .fillColor("#1f2937")
        .text("Payment Information:", 50, currentY)
        .moveDown(0.5)

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#4b5563")
        .text("Payment Method: Cash on Delivery (COD)", 50, doc.y)
        .text("Payment Status: Completed", 50, doc.y + 15)

      if (order.consignmentNumber) {
        doc.text(`Tracking Number: ${order.consignmentNumber}`, 50, doc.y + 30)
      }

      // Terms and Conditions
      currentY = doc.y + 60
      doc
        .fontSize(12)
        .font("Times-Bold")
        .fillColor("#1f2937")
        .text("Terms & Conditions:", 50, currentY)
        .moveDown(0.5)

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("#6b7280")
        .text("1. All sales are final. Returns accepted within 7 days of delivery.", 50, doc.y)
        .text("2. Damaged items must be reported within 24 hours of delivery.", 50, doc.y + 12)
        .text("3. For any queries, contact us at info@mahadevbabyshop.com", 50, doc.y + 24)

      // Footer
      const footerY = 750
      doc
        .fontSize(10)
        .font("Times-Bold")
        .fillColor("#2563eb")
        .text("Thank you for shopping with Mahadev Baby Shop!", 50, footerY, { align: "center" })
        .fontSize(8)
        .fillColor("#9ca3af")
        .text("This is a computer generated invoice and does not require signature.", 50, footerY + 20, {
          align: "center",
        })

      doc.end()
    })
  } catch (error) {
    console.error("Error generating invoice:", error)
    return NextResponse.json({ success: false, error: "Failed to generate invoice" }, { status: 500 })
  }
}
