// // import nodemailer from "nodemailer"

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // })

// // export async function sendPasswordChangeConfirmation(email: string, role: string) {
// //   const roleNames = {
// //     user: "User",
// //     doctor: "Doctor",
// //     hospital: "Hospital",
// //   }

// //   const currentDate = new Date().toLocaleString("en-US", {
// //     weekday: "long",
// //     year: "numeric",
// //     month: "long",
// //     day: "numeric",
// //     hour: "2-digit",
// //     minute: "2-digit",
// //     timeZoneName: "short",
// //   })

// //   const mailOptions = {
// //     from: process.env.EMAIL_USER,
// //     to: email,
// //     subject: `RuralReach Password Changed - ${roleNames[role as keyof typeof roleNames]}`,
// //     html: `
// //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
// //         <div style="text-align: center; margin-bottom: 30px;">
// //           <h1 style="color: #2563eb; margin-bottom: 10px;">🏥 RuralReach</h1>
// //           <h2 style="color: #374151; margin-bottom: 20px;">Password Successfully Changed</h2>
// //         </div>
        
// //         <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin-bottom: 25px;">
// //           <div style="display: flex; align-items: center; margin-bottom: 15px;">
// //             <span style="font-size: 24px; margin-right: 10px;">✅</span>
// //             <h3 style="color: #0c4a6e; margin: 0;">Password Change Confirmed</h3>
// //           </div>
// //           <p style="color: #374151; font-size: 16px; margin: 0;">
// //             Your ${roleNames[role as keyof typeof roleNames]} account password has been successfully updated.
// //           </p>
// //         </div>
        
// //         <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
// //           <h3 style="color: #374151; margin-bottom: 15px;">Change Details:</h3>
// //           <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
// //             <p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Account:</strong> ${email}</p>
// //             <p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Role:</strong> ${roleNames[role as keyof typeof roleNames]}</p>
// //             <p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Changed on:</strong> ${currentDate}</p>
// //           </div>
// //         </div>
        
// //         <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 25px;">
// //           <div style="display: flex; align-items: center; margin-bottom: 10px;">
// //             <span style="font-size: 20px; margin-right: 8px;">⚠️</span>
// //             <h3 style="color: #dc2626; margin: 0;">Didn't make this change?</h3>
// //           </div>
// //           <p style="color: #7f1d1d; font-size: 14px; margin: 0;">
// //             If you didn't change your password, please contact our support team immediately and secure your account.
// //           </p>
// //         </div>
        
// //         <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
// //           <h3 style="color: #374151; margin-bottom: 15px;">Security Reminders:</h3>
// //           <ul style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
// //             <li>Use a strong, unique password for your RuralReach account</li>
// //             <li>Never share your password with anyone</li>
// //             <li>Log out from shared or public devices</li>
// //             <li>Enable two-factor authentication if available</li>
// //           </ul>
// //         </div>
        
// //         <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb;">
// //           <p style="color: #9ca3af; font-size: 12px; margin: 0;">
// //             This is an automated security notification from RuralReach Healthcare Platform
// //           </p>
// //           <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
// //             © 2024 RuralReach. All rights reserved.
// //           </p>
// //         </div>
// //       </div>
// //     `,
// //   }

// //   try {
// //     await transporter.sendMail(mailOptions)
// //     return { success: true }
// //   } catch (error) {
// //     console.error("Password change confirmation email failed:", error)
// //     return { success: false, error }
// //   }
// // }

// import nodemailer from "nodemailer"

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// })

// export async function sendPasswordChangeConfirmation(email: string, role: string) {
//   const roleNames = {
//     user: "User",
//     doctor: "Doctor",
//     hospital: "Hospital",
//   }

//   const currentDate = new Date().toLocaleString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZoneName: "short",
//   })

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: `RuralReach Password Changed - ${roleNames[role as keyof typeof roleNames]}`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1 style="color: #2563eb; margin-bottom: 10px;">🏥 RuralReach</h1>
//           <h2 style="color: #374151; margin-bottom: 20px;">Password Successfully Changed</h2>
//         </div>
        
//         <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin-bottom: 25px;">
//           <div style="display: flex; align-items: center; margin-bottom: 15px;">
//             <span style="font-size: 24px; margin-right: 10px;">✅</span>
//             <h3 style="color: #0c4a6e; margin: 0;">Password Change Confirmed</h3>
//           </div>
//           <p style="color: #374151; font-size: 16px; margin: 0;">
//             Your ${roleNames[role as keyof typeof roleNames]} account password has been successfully updated.
//           </p>
//         </div>
        
//         <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
//           <h3 style="color: #374151; margin-bottom: 15px;">Change Details:</h3>
//           <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
//             <p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Account:</strong> ${email}</p>
//             <p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Role:</strong> ${roleNames[role as keyof typeof roleNames]}</p>
//             <p style="color: #64748b; font-size: 14px; margin: 5px 0;"><strong>Changed on:</strong> ${currentDate}</p>
//           </div>
//         </div>
        
//         <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 25px;">
//           <div style="display: flex; align-items: center; margin-bottom: 10px;">
//             <span style="font-size: 20px; margin-right: 8px;">⚠️</span>
//             <h3 style="color: #dc2626; margin: 0;">Didn't make this change?</h3>
//           </div>
//           <p style="color: #7f1d1d; font-size: 14px; margin: 0;">
//             If you didn't change your password, please contact our support team immediately and secure your account.
//           </p>
//         </div>
        
//         <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb;">
//           <p style="color: #9ca3af; font-size: 12px; margin: 0;">
//             This is an automated security notification from RuralReach Healthcare Platform
//           </p>
//           <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
//             © 2024 RuralReach. All rights reserved.
//           </p>
//         </div>
//       </div>
//     `,
//   }

//   try {
//     await transporter.sendMail(mailOptions)
//     return { success: true }
//   } catch (error) {
//     console.error("Password change confirmation email failed:", error)
//     return { success: false, error }
//   }
// }
