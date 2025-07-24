// // // // import type React from "react"
// // // // import type { Metadata } from "next"
// // // // import { Inter } from "next/font/google"
// // // // import "./globals.css"
// // // // import { ThemeProvider } from "@/components/theme-provider"
// // // // import { AuthProvider } from "@/components/auth-provider"
// // // // import { CartProvider } from "@/components/cart-provider"

// // // // // ✅ NEW: import Toaster from react-hot-toast
// // // // import { Toaster } from "react-hot-toast"

// // // // const inter = Inter({ subsets: ["latin"] })

// // // // export const metadata: Metadata = {
// // // //   title: "Mahadev Baby Shop Mangrol - Premium Baby Clothes",
// // // //   description: "Premium baby clothes and accessories in Mangrol. Quality products for your little ones.",
// // // // }

// // // // export default function RootLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode
// // // // }) {
// // // //   return (
// // // //     <html lang="en" suppressHydrationWarning>
// // // //       <body className={inter.className}>
// // // //         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
// // // //           <AuthProvider>
// // // //             <CartProvider>
// // // //               {children}

// // // //               {/* ✅ Updated Toaster */}
// // // //               <Toaster
// // // //                 position="top-center"
// // // //                 toastOptions={{
// // // //                   duration: 3000,
// // // //                   style: {
// // // //                     background: "#fff",
// // // //                     color: "#000",
// // // //                     fontSize: "1rem",
// // // //                     padding: "16px",
// // // //                     textAlign: "center",
// // // //                     borderRadius: "8px",
// // // //                     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
// // // //                   },
// // // //                 }}
// // // //               />
// // // //             </CartProvider>
// // // //           </AuthProvider>
// // // //         </ThemeProvider>
// // // //       </body>
// // // //     </html>
// // // //   )
// // // // }


// // // import type React from "react"
// // // import type { Metadata } from "next"
// // // import { Inter } from "next/font/google"
// // // import "./globals.css"
// // // import { ThemeProvider } from "@/components/theme-provider"
// // // import { Toaster } from "react-hot-toast"
// // // import { AuthProvider } from "./contexts/auth-provider"

// // // const inter = Inter({ subsets: ["latin"] })

// // // export const metadata: Metadata = {
// // //   title: "Mahadev Baby Shop - Premium Baby Products",
// // //   description: "Premium quality baby clothes, toys, and accessories in Mangrol",
// // // }

// // // export default function RootLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode
// // // }) {
// // //   return (
// // //     <html lang="en" suppressHydrationWarning>
// // //       <body className={inter.className}>
// // //         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
// // //           <AuthProvider>
// // //             {children}
// // //             <Toaster
// // //               position="top-right"
// // //               toastOptions={{
// // //                 duration: 2000,
// // //                 style: {
// // //                   background: "var(--background)",
// // //                   color: "var(--foreground)",
// // //                   border: "1px solid var(--border)",
// // //                 },
// // //               }}
// // //             />
// // //           </AuthProvider>
// // //         </ThemeProvider>
// // //       </body>
// // //     </html>
// // //   )
// // // }


// // import type React from "react"
// // import type { Metadata } from "next"
// // import { Inter } from "next/font/google"
// // import "./globals.css"
// // import { ThemeProvider } from "@/components/theme-provider"
// // import { Toaster } from "react-hot-toast"
// // import { AuthProvider } from "./contexts/auth-provider"
// // import { CartProvider } from "@/components/cart-provider" // ✅ Make sure this path is correct
// // import { ConditionalHeader } from "@/components/conditional-header"


// // const inter = Inter({ subsets: ["latin"] })

// // export const metadata: Metadata = {
// //   title: "Mahadev Baby Shop - Premium Baby Products",
// //   description: "Premium quality baby clothes, toys, and accessories in Mangrol",
// // }

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode
// // }) {
// //   return (
// //     <html lang="en" suppressHydrationWarning>
// //       <body className={inter.className}>
// //         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
// //           <AuthProvider>
// //             <CartProvider> {/* ✅ Added */}
// //               {children}
// //               <Toaster
// //                 position="top-right"
// //                 toastOptions={{
// //                   duration: 2000,
// //                   style: {
// //                     background: "var(--background)",
// //                     color: "var(--foreground)",
// //                     border: "1px solid var(--border)",
// //                   },
// //                 }}
// //               />
// //             </CartProvider>
// //           </AuthProvider>
// //         </ThemeProvider>
// //       </body>
// //     </html>
// //   )
// // }


// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"

// import { ThemeProvider } from "@/components/theme-provider"
// import { Toaster } from "react-hot-toast"
// import { AuthProvider } from "./contexts/auth-provider"
// import { CartProvider } from "@/components/cart-provider"
// import { ConditionalHeader } from "@/components/conditional-header"
// // import Footer from "@/components/Footer"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Mahadev Baby Shop - Premium Baby Products",
//   description: "Premium quality baby clothes, toys, and accessories in Mangrol",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//           <AuthProvider>
//             <CartProvider>
//               <ConditionalHeader /> {/* 👈 Shows header based on route */}
//               <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
//                 {children}
//               </main>
//               {/* <Footer /> */}
//               <Toaster
//                 position="top-right"
//                 toastOptions={{
//                   duration: 2000,
//                   style: {
//                     background: "var(--background)",
//                     color: "var(--foreground)",
//                     border: "1px solid var(--border)",
//                   },
//                 }}
//               />
//             </CartProvider>
//           </AuthProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }




import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/app/contexts/auth-provider"
import { Toaster } from "react-hot-toast"
import { ConditionalHeader } from "@/components/conditional-header"
import { Footer } from "@/components/footer"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mahadev Baby Shop",
  description: "Premium quality baby products for your little ones",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
              <ConditionalHeader />
              <main>{children}</main>
            </div>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
