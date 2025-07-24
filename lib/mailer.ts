// // import { Resend } from 'resend';

// // const resend = new Resend(process.env.RESEND_API_KEY);
// // console.log("\nLoaded Resend API Key:", process.env.RESEND_API_KEY);


// // export async function sendVerificationEmail(email: string, code: string) {
// //   try {
// //     const { data, error } = await resend.emails.send({
// //       from: 'Mahadev Shop <noreply@mahadevshop.com>',
// //       to: [email],
// //       subject: 'Verify your email',
// //       html: `<h2>Your verification code is <strong>${code}</strong></h2>`,
// //     });

// //     if (error) {
// //       console.error("Email send failed:", error);
// //       throw new Error("Failed to send verification email.");
// //     }

// //     console.log("Verification email sent to:", email, "Code:", code);
// //     return data;
// //   } catch (err) {
// //     console.error("Resend error:", err);
// //     throw err;
// //   }
// // }
// import nodemailer from 'nodemailer';
// import User from "@/models/userModel";
// import bcryptjs from 'bcryptjs';

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//     try {
//         const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//         if (emailType === "VERIFY") {
//             await User.findByIdAndUpdate(userId, {
//                 verifyToken: hashedToken,
//                 verifyTokenExpiry: Date.now() + 3600000, // 1 hour
//             });
//         } else if (emailType === "RESET") {
//             await User.findByIdAndUpdate(userId, {
//                 forgotPasswordToken: hashedToken,
//                 forgotPasswordTokenExpiry: Date.now() + 3600000,
//             });
//         }

//         const transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//             html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.<br>
//             Or copy and paste the link in your browser:<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
//             </p>`,
//         };

//         const mailResponse = await transport.sendMail(mailOptions);
//         return mailResponse;
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// };
import nodemailer from 'nodemailer';
import User from "@/lib/models/User";

export const sendEmail = async ({ email, emailType, userId, otp }: any) => {
  try {
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: otp,
        verifyTokenExpiry: Date.now() + 10 * 60 * 1000, // 10 minutes
      });
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailType === "VERIFY" ? "Your verification code" : "Reset your password",
      html: emailType === "VERIFY"
        ? `<p>Your verification code is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`
        : `<p>Click <a href="${process.env.DOMAIN}/reset?token=${otp}">here</a> to reset your password.</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
