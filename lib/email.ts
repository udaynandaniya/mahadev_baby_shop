// interface EmailOptions {
//   to: string
//   subject: string
//   html: string
//   text?: string
// }

// export async function sendEmail(options: EmailOptions) {
//   try {
//     // Implement email service (e.g., SendGrid, Nodemailer, etc.)
//     console.log("Sending email:", options)

//     // Example with SendGrid
//     // const sgMail = require('@sendgrid/mail')
//     // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     // await sgMail.send({
//     //   from: process.env.FROM_EMAIL,
//     //   ...options
//     // })

//     return { success: true }
//   } catch (error) {
//     console.error("Email sending failed:", error)
//     return { success: false, error }
//   }
// }

// export async function sendOrderConfirmationEmail(order: any) {
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <h2 style="color: #333;">Order Confirmation</h2>
//       <p>Dear ${order.customerInfo.name},</p>
//       <p>Thank you for your order! Your order <strong>#${order.id}</strong> has been confirmed.</p>
      
//       <div style="background: #f9f9f9; padding: 20px; margin: 20px 0;">
//         <h3>Order Details:</h3>
//         <ul>
//           ${order.items
//             .map(
//               (item: any) => `
//             <li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>
//           `,
//             )
//             .join("")}
//         </ul>
//         <p><strong>Total: ₹${order.total}</strong></p>
//       </div>
      
//       <p>We'll send you updates about your order status.</p>
//       <p>Thank you for shopping with Mahadev Baby Shop!</p>
//     </div>
//   `

//   return sendEmail({
//     to: order.customerInfo.email,
//     subject: `Order Confirmation - ${order.id}`,
//     html,
//   })
// }

// export async function sendContactConfirmationEmail(inquiry: any) {
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//       <h2 style="color: #333;">Thank You for Contacting Us</h2>
//       <p>Dear ${inquiry.name},</p>
//       <p>We have received your message and will get back to you within 24 hours.</p>
      
//       <div style="background: #f9f9f9; padding: 20px; margin: 20px 0;">
//         <h3>Your Message:</h3>
//         <p><strong>Subject:</strong> ${inquiry.subject}</p>
//         <p><strong>Message:</strong> ${inquiry.message}</p>
//       </div>
      
//       <p>Best regards,<br>Mahadev Baby Shop Team</p>
//     </div>
//   `

//   return sendEmail({
//     to: inquiry.email,
//     subject: "Thank you for contacting us",
//     html,
//   })
// }
