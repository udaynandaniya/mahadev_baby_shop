// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\get-session.ts

// // import { cookies } from "next/headers"
// // import { verifyToken } from "./auth"
// // import type { DecodedToken } from "./auth"

// // export async function getSession(req?: Request): Promise<DecodedToken | null> {
// //   try {
// //     let token: string | undefined

// //     if (req) {
// //       // For Edge API route (NextRequest with .cookies)
// //       const cookieHeader = req.headers.get("cookie")
// //       if (cookieHeader) {
// //         const cookies = cookieHeader.split(";").reduce(
// //           (acc, cookie) => {
// //             const [key, value] = cookie.trim().split("=")
// //             acc[key] = value
// //             return acc
// //           },
// //           {} as Record<string, string>,
// //         )
// //         token = cookies["auth-token"]
// //       }
// //     } else {
// //       // For server components and server actions
// //       const cookieStore = await cookies()
// //       token = cookieStore.get("auth-token")?.value
// //     }

// //     if (!token) return null

// //     const decoded = verifyToken(token)
// //     return decoded
// //   } catch (error) {
// //     console.error("❌ Error in getSession:", error)
// //     return null
// //   }
// // }

// // get-session.ts
// import { decrypt } from "./auth"

// export async function getSession(req?: Request) {
//   let token: string | undefined

//   if (req) {
//     const cookieHeader = req.headers.get("cookie")
//     if (cookieHeader) {
//       const cookies = Object.fromEntries(
//         cookieHeader.split(";").map((c) => {
//           const [key, val] = c.trim().split("=")
//           return [key, val]
//         })
//       )
//       token = cookies["jwt-token"]
//     }
//   } else {
//     const cookieStore = cookies()
//     token = cookieStore.get("jwt-token")?.value
//   }

//   if (!token) return null

//   return await decrypt(token)
// }


// lib/get-session.ts

import { decrypt } from "./auth"
import { cookies } from "next/headers"

export async function getSession(req?: Request) {
  let token: string | undefined

  if (req) {
    const cookieHeader = req.headers.get("cookie")
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split(";").map((c) => {
          const [key, val] = c.trim().split("=")
          return [key, val]
        })
      )
      token = cookies["jwt-token"]
    }
  } else {
    const cookieStore = cookies()
    token = cookieStore.get("jwt-token")?.value
  }

  if (!token) return null

  const session = await decrypt(token)
  return session
}
