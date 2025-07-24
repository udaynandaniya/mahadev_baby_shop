
// // app/api/admin/orders/pdf/route.ts
// import { NextResponse } from "next/server"
// import { dbConnect } from "@/lib/mongodb"
// import { OrderModel } from "@/lib/models/order"
// import PDFDocument from "pdfkit"

// export async function POST(request: Request) {
//   try {
//     await dbConnect()

//     const { startDate, endDate, status = "accepted" } = await request.json()

//     // Validate dates
//     if (!startDate || !endDate) {
//       return NextResponse.json({ success: false, error: "Start date and end date are required" }, { status: 400 })
//     }

//     // Create date objects and set time to start/end of day
//     const start = new Date(startDate)
//     start.setHours(0, 0, 0, 0)

//     const end = new Date(endDate)
//     end.setHours(23, 59, 59, 999)

//     // Query orders within date range and with specified status
//     const query = {
//       orderDate: { $gte: start, $lte: end },
//       status: status,
//     }

//     const orders = await OrderModel.find(query).sort({ orderDate: 1 }).lean()

//     // Generate PDF buffer
//     const pdfBuffer = await generateOrdersPDF(orders, start, end, status)

//     // Return PDF as attachment
//     return new NextResponse(pdfBuffer, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="orders-${status}-${startDate}-to-${endDate}.pdf"`,
//       },
//     })
//   } catch (error) {
//     console.error("Error generating PDF:", error)
//     return NextResponse.json({ success: false, error: "Failed to generate PDF" }, { status: 500 })
//   }
// }

// async function generateOrdersPDF(orders: any[], startDate: Date, endDate: Date, status: string) {
//   return new Promise<Buffer>((resolve, reject) => {
//     try {
//       // Create a PDF document
//       const doc = new PDFDocument({ margin: 50 })

//       // Collect PDF data in memory
//       const chunks: Buffer[] = []
//       doc.on("data", (chunk) => chunks.push(chunk))
//       doc.on("end", () => resolve(Buffer.concat(chunks)))
//       doc.on("error", reject)

//       // Add header
//       doc
//         .fontSize(20)
//         .font("Times-Bold")
//         .text("Mahadev Baby Shop - Order Report", { align: "center" })
//         .moveDown(0.5)

//       // Add report info
//       doc
//         .fontSize(12)
//         .font("Helvetica")
//         .text(`Status: ${status.charAt(0).toUpperCase() + status.slice(1)} Orders`, { align: "center" })
//         .text(`Period: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`, { align: "center" })
//         .moveDown(0.5)
//         .text(`Generated on: ${new Date().toLocaleString()}`, { align: "center" })
//         .moveDown(1)

//       // Add summary
//       doc.fontSize(14).font("Times-Bold").text("Summary", { underline: true }).moveDown(0.5)

//       doc.fontSize(12).font("Helvetica").text(`Total Orders: ${orders.length}`)

//       // Calculate total amount
//       const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0)
//       doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`)

//       doc.moveDown(1)

//       // Add orders table
//       if (orders.length > 0) {
//         doc.fontSize(14).font("Times-Bold").text("Order Details", { underline: true }).moveDown(0.5)

//         // Table headers
//         const tableTop = doc.y
//         const tableHeaders = ["Order #", "Date", "Customer", "Phone", "Items", "Amount"]
//         const columnWidths = [80, 80, 120, 80, 50, 80]

//         let currentY = tableTop

//         // Draw headers
//         doc.fontSize(10).font("Times-Bold")
//         tableHeaders.forEach((header, i) => {
//           let x = 50
//           for (let j = 0; j < i; j++) {
//             x += columnWidths[j]
//           }
//           doc.text(header, x, currentY)
//         })

//         currentY += 20
//         doc
//           .moveTo(50, currentY)
//           .lineTo(50 + columnWidths.reduce((a, b) => a + b, 0), currentY)
//           .stroke()
//         currentY += 10

//         // Draw rows
//         doc.fontSize(9).font("Helvetica")
//         orders.forEach((order, index) => {
//           // Check if we need a new page
//           if (currentY > doc.page.height - 100) {
//             doc.addPage()
//             currentY = 50
//           }

//           const orderDate = new Date(order.orderDate).toLocaleDateString()

//           let x = 50
//           doc.text(order.orderNumber, x, currentY)

//           x += columnWidths[0]
//           doc.text(orderDate, x, currentY)

//           x += columnWidths[1]
//           doc.text(order.customerName, x, currentY)

//           x += columnWidths[2]
//           doc.text(order.customerPhone, x, currentY)

//           x += columnWidths[3]
//           doc.text(order.items.length.toString(), x, currentY)

//           x += columnWidths[4]
//           doc.text(`₹${order.totalAmount.toFixed(2)}`, x, currentY)

//           currentY += 20

//           // Add a separator line except after the last row
//           if (index < orders.length - 1) {
//             doc
//               .moveTo(50, currentY - 10)
//               .lineTo(50 + columnWidths.reduce((a, b) => a + b, 0), currentY - 10)
//               .stroke({ opacity: 0.2 })
//           }
//         })
//       } else {
//         doc
//           .fontSize(12)
//           .font("Helvetica-Oblique")
//           .text("No orders found for the selected criteria.", { align: "center" })
//       }

//       // Add footer
//       const pageCount = doc.bufferedPageRange().count
//       for (let i = 0; i < pageCount; i++) {
//         doc.switchToPage(i)

//         // Footer with page number
//         doc
//           .fontSize(8)
//           .font("Helvetica")
//           .text(`Page ${i + 1} of ${pageCount}`, 50, doc.page.height - 50, { align: "center" })
//       }

//       // Finalize the PDF
//       doc.end()
//     } catch (error) {
//       reject(error)
//     }
//   })
// }


import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { OrderModel } from "@/lib/models/order"
import PDFDocument from "pdfkit"

export async function POST(request: Request) {
  try {
    await dbConnect()

    const { startDate, endDate, status = "accepted" } = await request.json()

    if (!startDate || !endDate) {
      return NextResponse.json({ success: false, error: "Start date and end date are required" }, { status: 400 })
    }

    const start = new Date(startDate)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    const query = {
      orderDate: { $gte: start, $lte: end },
      status: status,
    }

    const orders = await OrderModel.find(query).sort({ orderDate: 1 }).lean()
    const pdfBuffer = await generateOrdersPDF(orders, start, end, status)

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="orders-${status}-${startDate}-to-${endDate}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ success: false, error: "Failed to generate PDF" }, { status: 500 })
  }
}

async function generateOrdersPDF(orders: any[], startDate: Date, endDate: Date, status: string) {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 })
      const chunks: Buffer[] = []
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Header
      doc
        .fontSize(20)
        .font("Times-Bold")
        .text("Mahadev Baby Shop - Order Report", { align: "center" })
        .moveDown(0.5)

      // Report Info
      doc
        .fontSize(12)
        .font("Times-Roman")
        .text(`Status: ${status.charAt(0).toUpperCase() + status.slice(1)} Orders`, { align: "center" })
        .text(`Period: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`, { align: "center" })
        .moveDown(0.5)
        .text(`Generated on: ${new Date().toLocaleString()}`, { align: "center" })
        .moveDown(1)

      // Summary
      doc.fontSize(14).font("Times-Bold").text("Summary", { underline: true }).moveDown(0.5)
      doc.fontSize(12).font("Times-Roman").text(`Total Orders: ${orders.length}`)

      const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0)
      doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`)
      doc.moveDown(1)

      // Table
      if (orders.length > 0) {
        doc.fontSize(14).font("Times-Bold").text("Order Details", { underline: true }).moveDown(0.5)

        const tableTop = doc.y
        const headers = ["Order #", "Date", "Customer", "Phone", "Items", "Amount"]
        const colWidths = [80, 80, 120, 80, 50, 80]
        let y = tableTop

        doc.fontSize(10).font("Times-Bold")
        headers.forEach((h, i) => {
          let x = 50
          for (let j = 0; j < i; j++) x += colWidths[j]
          doc.text(h, x, y)
        })

        y += 20
        doc.moveTo(50, y).lineTo(50 + colWidths.reduce((a, b) => a + b, 0), y).stroke()
        y += 10

        doc.fontSize(9).font("Times-Roman")
        orders.forEach((order, index) => {
          if (y > doc.page.height - 100) {
            doc.addPage()
            y = 50
          }

          const orderDate = new Date(order.orderDate).toLocaleDateString()
          let x = 50

          doc.text(order.orderNumber, x, y)
          x += colWidths[0]
          doc.text(orderDate, x, y)
          x += colWidths[1]
          doc.text(order.customerName, x, y)
          x += colWidths[2]
          doc.text(order.customerPhone, x, y)
          x += colWidths[3]
          doc.text(order.items.length.toString(), x, y)
          x += colWidths[4]
          doc.text(`₹${order.totalAmount.toFixed(2)}`, x, y)

          y += 20
          if (index < orders.length - 1) {
            doc.moveTo(50, y - 10).lineTo(50 + colWidths.reduce((a, b) => a + b, 0), y - 10).stroke({ opacity: 0.2 })
          }
        })
      } else {
        doc
          .fontSize(12)
          .font("Times-Italic")
          .text("No orders found for the selected criteria.", { align: "center" })
      }

      // Footer
      const pageCount = doc.bufferedPageRange().count
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i)
        doc.fontSize(8).font("Times-Roman").text(`Page ${i + 1} of ${pageCount}`, 50, doc.page.height - 50, {
          align: "center",
        })
      }

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}
