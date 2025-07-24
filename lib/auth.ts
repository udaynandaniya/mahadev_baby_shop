// // // import "server-only";
// // // import jwt from "jsonwebtoken";
// // // import { type NextRequest, NextResponse } from "next/server";

// // // export interface SessionPayload {
// // //   userId: string;
// // //   email?: string;
// // //   phone?: string;
// // //   name: string;
// // //   isAdmin: boolean;
// // //   isVerified: boolean;
// // // }

// // // export interface DecodedToken extends SessionPayload {
// // //   exp: number;
// // //   iat: number;
// // // }

// // // const jwtSecret = process.env.JWT_SECRET;

// // // console.log("\n\n🔐 Using JWT_SECRET:", jwtSecret);

// // // if (!jwtSecret) {
// // //   throw new Error("JWT_SECRET must be defined in environment variables");
// // // }

// // // // Create JWT token
// // // export function createJWTToken(payload: SessionPayload): string {
// // //   return jwt.sign(payload, jwtSecret, { expiresIn: "7d" }); // 7 days
// // // }

// // // // Verify JWT token
// // // export function verifyToken(token: string): DecodedToken | null {
// // //   try {
// // //     return jwt.verify(token, jwtSecret) as DecodedToken;
// // //   } catch (error) {
// // //     console.error("Error verifying token:", error);
// // //     return null;
// // //   }
// // // }

// // // // Decode JWT token without verifying
// // // export function decodeToken(token: string): DecodedToken | null {
// // //   try {
// // //     return jwt.decode(token) as DecodedToken;
// // //   } catch (error) {
// // //     console.error("Error decoding token:", error);
// // //     return null;
// // //   }
// // // }

// // // // Check if token is expired
// // // export function isTokenExpired(token: DecodedToken): boolean {
// // //   return Date.now() >= token.exp * 1000;
// // // }

// // // // Refresh cookie/session
// // // export async function updateSession(request: NextRequest) {
// // //   const session = request.cookies.get("auth-token")?.value;
// // //   if (!session) return;

// // //   const decoded = verifyToken(session);
// // //   if (!decoded) return;

// // //   const res = NextResponse.next();

// // //   res.cookies.set({
// // //     name: "auth-token",
// // //     value: createJWTToken(decoded),
// // //     httpOnly: true,
// // //     secure: process.env.NODE_ENV === "production",
// // //     sameSite: "lax",
// // //     path: "/",
// // //     maxAge: 60 * 60 * 24 * 7, // 7 days
// // //   });

// // //   return res;
// // // }


// // import { SignJWT, jwtVerify, type JWTPayload } from "jose"
// // import { type NextRequest, NextResponse } from "next/server"
// // import jwt from "jsonwebtoken"

// // // Define the structure of your session payload
// // export interface SessionPayload extends JWTPayload {
// //   userId: string
// //   email?: string
// //   phone?: string
// //   name: string
// //   isAdmin: boolean
// //   isVerified: boolean
// // }

// // export interface DecodedToken {
// //   userId: string
// //   email?: string
// //   phone?: string
// //   name: string
// //   isAdmin: boolean
// //   isVerified: boolean
// //   exp: number
// //   iat: number
// // }

// // const jwtSecret = process.env.JWT_SECRET

// // if (!jwtSecret) {
// //   throw new Error("JWT_SECRET must be defined in environment variables")
// // }

// // const encodedKey = new TextEncoder().encode(jwtSecret)

// // export async function encrypt(payload: SessionPayload) {
// //   return new SignJWT(payload)
// //     .setProtectedHeader({ alg: "HS256" })
// //     .setIssuedAt()
// //     .setExpirationTime("7d") // Token expires in 7 days
// //     .sign(encodedKey)
// // }

// // export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
// //   try {
// //     const { payload } = await jwtVerify(session, encodedKey, {
// //       algorithms: ["HS256"],
// //     })
// //     return payload as SessionPayload
// //   } catch (error) {
// //     console.error("Failed to verify session:", error)
// //     return null
// //   }
// // }

// // export function createJWTToken(payload: SessionPayload): string {
// //   return jwt.sign(payload, jwtSecret, { expiresIn: "7d" })
// // }

// // export function verifyToken(token: string): DecodedToken | null {
// //   try {
// //     return jwt.verify(token, jwtSecret) as DecodedToken
// //   } catch (error) {
// //     console.error("Error verifying token:", error)
// //     return null
// //   }
// // }

// // export function decodeToken(token: string): DecodedToken | null {
// //   try {
// //     return jwt.decode(token) as DecodedToken
// //   } catch (error) {
// //     console.error("Error decoding token:", error)
// //     return null
// //   }
// // }

// // export function isTokenExpired(token: DecodedToken): boolean {
// //   return Date.now() >= token.exp * 1000
// // }

// // export async function updateSession(request: NextRequest) {
// //   const session = request.cookies.get("auth-token")?.value
// //   if (!session) return

// //   const parsed = await decrypt(session)
// //   if (!parsed) return

// //   // Refresh the session cookie
// //   const res = NextResponse.next()
// //   res.cookies.set({
// //     name: "auth-token",
// //     value: await encrypt(parsed),
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === "production",
// //     sameSite: "lax",
// //     path: "/",
// //     maxAge: 60 * 60 * 24 * 7, // 7 days
// //   })
// //   return res
// // }


// // C:\Users\UDAYN\Downloads\Projects\mahadev-baby\lib\auth.ts
// import { SignJWT, jwtVerify, type JWTPayload } from "jose"
// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"

// // Define the structure of your session payload
// export interface SessionPayload extends JWTPayload {
//   userId: string
//   email?: string
//   phone?: string
//   name: string
//   isAdmin: boolean
//   isVerified: boolean
// }

// export interface DecodedToken {
//   userId: string
//   email?: string
//   phone?: string
//   name: string
//   isAdmin: boolean
//   isVerified: boolean
//   exp: number
//   iat: number
// }

// const jwtSecret = process.env.JWT_SECRET as string

// if (!jwtSecret) {
//   throw new Error("JWT_SECRET must be defined in environment variables")
// }

// const encodedKey = new TextEncoder().encode(jwtSecret)

// export async function encrypt(payload: SessionPayload) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d") // Token expires in 7 days
//     .sign(encodedKey)
// }

// export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     })
//     return payload as SessionPayload
//   } catch (error) {
//     console.error("Failed to verify session:", error)
//     return null
//   }
// }

// export function createJWTToken(payload: SessionPayload): string {
//   return jwt.sign(payload, jwtSecret, { expiresIn: "7d" })
// }

// export function verifyToken(token: string): DecodedToken | null {
//   try {
//     const decoded = jwt.verify(token, jwtSecret) as unknown as DecodedToken

//     // Optional: add type guard here for extra safety
//     if (!decoded.userId || !decoded.name || typeof decoded.isAdmin !== "boolean" || typeof decoded.isVerified !== "boolean") {
//       console.warn("Token structure mismatch")
//       return null
//     }

//     return decoded
//   } catch (error) {
//     console.error("Error verifying token:", error)
//     return null
//   }
// }

// export function decodeToken(token: string): DecodedToken | null {
//   try {
//     const decoded = jwt.decode(token)

//     if (!decoded || typeof decoded !== "object") return null

//     const { userId, name, isAdmin, isVerified, exp, iat } = decoded as Partial<DecodedToken>

//     if (!userId || !name || typeof isAdmin !== "boolean" || typeof isVerified !== "boolean") {
//       return null
//     }

//     return decoded as DecodedToken
//   } catch (error) {
//     console.error("Error decoding token:", error)
//     return null
//   }
// }

// export function isTokenExpired(token: DecodedToken): boolean {
//   return Date.now() >= token.exp * 1000
// }

// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get("auth-token")?.value
//   if (!session) return

//   const parsed = await decrypt(session)
//   if (!parsed) return

//   // Refresh the session cookie
//   const res = NextResponse.next()
//   res.cookies.set({
//     name: "auth-token",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 days
//   })
//   return res
// }



// REMOVE usage of `jsonwebtoken`
import { SignJWT, jwtVerify, JWTPayload } from "jose"

export interface SessionPayload extends JWTPayload {
  userId: string
  email?: string
  phone?: string
  name: string
  isAdmin: boolean
  isVerified: boolean
}

export interface DecodedToken extends SessionPayload {
  exp: number
  iat: number
}

const jwtSecret = process.env.JWT_SECRET!

if (!jwtSecret) {
  throw new Error("JWT_SECRET must be defined in environment variables")
}

const encodedKey = new TextEncoder().encode(jwtSecret)

export async function encrypt(payload: SessionPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(token: string): Promise<DecodedToken | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    })

    const requiredFields = ["userId", "name", "isAdmin", "isVerified", "exp", "iat"]
    for (const field of requiredFields) {
      if (!(field in payload)) return null
    }

    return payload as DecodedToken
  } catch (err) {
    console.error("❌ Failed to verify token:", err)
    return null
  }
}
