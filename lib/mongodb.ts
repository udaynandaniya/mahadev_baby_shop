// // // // Database connection and utility functions
// // // export class Database {
// // //   private static instance: Database
// // //   private connection: any

// // //   private constructor() {
// // //     // Initialize database connection
// // //     this.connect()
// // //   }

// // //   public static getInstance(): Database {
// // //     if (!Database.instance) {
// // //       Database.instance = new Database()
// // //     }
// // //     return Database.instance
// // //   }

// // //   private async connect() {
// // //     try {
// // //       // MongoDB connection example
// // //       // const { MongoClient } = require('mongodb')
// // //       // this.connection = await MongoClient.connect(process.env.MONGODB_URI)
// // //       console.log("Database connected")
// // //     } catch (error) {
// // //       console.error("Database connection failed:", error)
// // //     }
// // //   }

// // //   async findOne(collection: string, query: any) {
// // //     // Implement database query
// // //     return null
// // //   }

// // //   async find(collection: string, query: any = {}, options: any = {}) {
// // //     // Implement database query
// // //     return []
// // //   }

// // //   async insertOne(collection: string, document: any) {
// // //     // Implement database insert
// // //     return { ...document, id: Date.now().toString() }
// // //   }

// // //   async updateOne(collection: string, query: any, update: any) {
// // //     // Implement database update
// // //     return null
// // //   }

// // //   async deleteOne(collection: string, query: any) {
// // //     // Implement database delete
// // //     return null
// // //   }
// // // }

// // // export const db = Database.getInstance()

// // // // lib/db.ts
// // // import mongoose from 'mongoose'

// // // const MONGODB_URI = process.env.MONGODB_URI!

// // // if (!MONGODB_URI) throw new Error("⚠️ MONGODB_URI not found in env")

// // // let isConnected = false

// // // export async function connectToDatabase() {
// // //   if (isConnected) return

// // //   try {
// // //     await mongoose.connect(MONGODB_URI)
// // //     isConnected = true
// // //     console.log("✅ MongoDB connected")
// // //   } catch (err) {
// // //     console.error("❌ MongoDB connection failed", err)
// // //     throw err
// // //   }
// // // }


// // // lib/mongodb.ts
// // // lib/mongodb.ts
// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI!;

// // if (!MONGODB_URI) {
// //   throw new Error("Please add MONGODB_URI to .env.local");
// // }

// // let cached = (global as any).mongoose || { conn: null, promise: null };

// // export async function dbConnect() {
// //   if (cached.conn) return cached.conn;

// //   if (!cached.promise) {
// //     cached.promise = mongoose.connect(MONGODB_URI, {
// //       bufferCommands: false,
// //     }).then((mongoose) => mongoose);
// //   }

// //   cached.conn = await cached.promise;
// //   (global as any).mongoose = cached;
// //   return cached.conn;
// // }


// import mongoose from "mongoose"

// const MONGODB_URI = process.env.MONGODB_URI!

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
// }

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose
//     })
//   }

//   try {
//     cached.conn = await cached.promise
//   } catch (e) {
//     cached.promise = null
//     throw e
//   }

//   return cached.conn
// }

// export { dbConnect }



// lib/mongodb.ts
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

// Use global object to persist the connection cache across hot reloads in dev
let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "mahadevbabyshop", // ✅ Make sure dbName is set if you have multiple DBs
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose)
  }

  try {
    cached.conn = await cached.promise
    console.log("✅ MongoDB connected")
  } catch (e) {
    cached.promise = null
    console.error("❌ MongoDB connection error:", e)
    throw e
  }

  return cached.conn
}
