// //C:\Users\UDAYN\Downloads\healthcare-platform\lib\verification\sendEmailToStakeholder.ts

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   // Configure your email service here
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// })

// export async function sendEmailToStakeholder(email: string, otp: string) {

//  const mailOptions = {
//   from: process.env.EMAIL_USER,
//   to: email,
//   subject: `Mahadev Baby Shop - Email Verification`,
//   html: `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fffafc; padding: 24px; border-radius: 8px; border: 1px solid #f3e8ff;">
//       <h2 style="color: #db2777; text-align: center;">Welcome to Mahadev Baby Shop 👶🛍️</h2>
//       <p style="font-size: 16px; color: #444; text-align: center;">
//         Your verification code for registration is:
//       </p>
//       <div style="background: #fdf2f8; padding: 20px; margin: 20px 0; text-align: center; font-size: 28px; font-weight: bold; color: #db2777; letter-spacing: 2px; border-radius: 6px;">
//         ${otp}
//       </div>
//       <p style="font-size: 14px; color: #555; text-align: center;">
//         This code will expire in 5 minutes. Please do not share it with anyone.
//       </p>
//       <p style="font-size: 14px; color: #999; text-align: center; margin-top: 24px;">
//         If you didn’t request this, you can safely ignore this email.
//       </p>
//       <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #aaa;">
//         © ${new Date().getFullYear()} Mahadev Baby Shop, Mangrol
//       </div>
//     </div>
//   `,
// }


//   try {
//     await transporter.sendMail(mailOptions)
//     return { success: true }
//   } catch (error) {
//     console.error("Email sending failed:", error)
//     return { success: false, error }
//   }
// }

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmailToStakeholder(email: string, otp: string, type = "verification") {
  const isPasswordReset = type === "password-reset"

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Mahadev Baby Shop - ${isPasswordReset ? "Password Reset" : "Email Verification"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fffafc; padding: 24px; border-radius: 8px; border: 1px solid #f3e8ff;">
        <h2 style="color: #db2777; text-align: center;">
          ${isPasswordReset ? "🔐 Password Reset" : "👶🛍️ Welcome to Mahadev Baby Shop"}
        </h2>
        <p style="font-size: 16px; color: #444; text-align: center;">
          Your ${isPasswordReset ? "password reset" : "verification"} code is:
        </p>
        <div style="background: #fdf2f8; padding: 20px; margin: 20px 0; text-align: center; font-size: 28px; font-weight: bold; color: #db2777; letter-spacing: 2px; border-radius: 6px;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #555; text-align: center;">
          This code will expire in 5 minutes. Please do not share it with anyone.
        </p>
        <p style="font-size: 14px; color: #999; text-align: center; margin-top: 24px;">
          If you didn't request this, you can safely ignore this email.
        </p>
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #aaa;">
          © ${new Date().getFullYear()} Mahadev Baby Shop, Mangrol
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}
