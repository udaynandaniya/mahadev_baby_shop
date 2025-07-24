// // // // stockManager.ts
// // // export interface StockManager {
// // //   productId: string;
// // //   productType: 'clothes' | 'toy' | 'bath' | 'newborn';
// // //   productName: string;
// // //   currentStock: number;
// // //   lastUpdated: Date;
// // //   source: 'offline' | 'instagram' | 'online'; // helps track source of sale
// // //   notes?: string;
// // // }


// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface IStockManager extends Document {
// //   productId: string;
// //   productType: 'clothes' | 'toy' | 'bath' | 'newborn';
// //   productName: string;
// //   currentStock: number;
// //   lastUpdated: Date;
// //   source: 'offline' | 'instagram' | 'online';
// //   notes?: string;
// // }

// // const StockManagerSchema: Schema<IStockManager> = new Schema({
// //   productId: { type: String, required: true },
// //   productType: { type: String, enum: ['clothes', 'toy', 'bath', 'newborn'], required: true },
// //   productName: { type: String, required: true },
// //   currentStock: { type: Number, required: true },
// //   lastUpdated: { type: Date, default: Date.now },
// //   source: { type: String, enum: ['offline', 'instagram', 'online'], required: true },
// //   notes: String,
// // });

// // export default mongoose.model<IStockManager>('StockManager', StockManagerSchema);



// //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\stockManager.ts
// import mongoose, { Schema, Document } from 'mongoose'

// export interface IStockManager extends Document {
//   productId: string           // MongoDB _id of the original product document (reference)
//   productCode: string         // Internal short code (e.g., "clothboy1.1") for easier admin management
//   productType: 'clothes' | 'toy' | 'bath' | 'newborn' // Product category
//   productName: string         // Display name for admin reference
//   currentStock: number        // Current number of items available in stock
//   lastUpdated: Date           // Last time stock was updated
//   source: 'offline' | 'instagram' | 'online' // Source of the stock (useful for insights)
//   notes?: string              // Optional field to store manual notes (e.g., "restock expected")
// }

// const StockManagerSchema = new Schema<IStockManager>(
//   {
//     productId: {
//       type: String,
//       required: true,
//       // 💡 Should match the _id of the corresponding product in its collection
//     },
//     productCode: {
//       type: String,
//       required: true,
//       // 💡 Short human-friendly unique code (e.g., "toycar1.1") for internal use
//     },
//     productType: {
//       type: String,
//       enum: ['clothes', 'toy', 'bath', 'newborn'],
//       required: true,
//       // 💡 Used to know which collection this product belongs to
//     },
//     productName: {
//       type: String,
//       required: true,
//       // 💡 Display name used in admin stock UI
//     },
//     currentStock: {
//       type: Number,
//       required: true,
//       // 💡 Represents how many items are available currently
//     },
//     lastUpdated: {
//       type: Date,
//       default: Date.now,
//       // 💡 Automatically sets the update date for record-keeping
//     },
//     source: {
//       type: String,
//       enum: ['offline', 'instagram', 'online'],
//       required: true,
//       // 💡 Helps track inventory inflow source (Instagram DMs, physical shop, online orders)
//     },
//     notes: {
//       type: String,
//       // 💡 Optional field for any extra information by admin
//     },
//   },
//   { timestamps: true } // Automatically handles createdAt and updatedAt fields
// )

// export const StockManagerModel =
//   mongoose.models.StockManager ||
//   mongoose.model<IStockManager>('StockManager', StockManagerSchema)


//C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\lib\models\stockManager.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IStockManager extends Document {
  productId: string           // MongoDB _id of the original product document (reference)
  productCode: string         // Internal short code (e.g., "clothboy1.1") for easier admin management
  productType: 'clothes' | 'toy' | 'bath' | 'newborn' // Product category
  productName: string         // Display name for admin reference
  currentStock: number        // Current number of items available in stock
  lastUpdated: Date           // Last time stock was updated
  source: 'offline' | 'instagram' | 'online' // Source of the stock (useful for insights)
  notes?: string              // Optional field to store manual notes (e.g., "restock expected")
}

const StockManagerSchema = new Schema<IStockManager>(
  {
    productId: {
      type: String,
      required: true,
      // 💡 Should match the _id of the corresponding product in its collection
    },
    productCode: {
      type: String,
      required: true,
      // 💡 Short human-friendly unique code (e.g., "toycar1.1") for internal use
    },
    productType: {
      type: String,
      enum: ['clothes', 'toy', 'bath', 'newborn'],
      required: true,
      // 💡 Used to know which collection this product belongs to
    },
    productName: {
      type: String,
      required: true,
      // 💡 Display name used in admin stock UI
    },
    currentStock: {
      type: Number,
      required: true,
      // 💡 Represents how many items are available currently
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
      // 💡 Automatically sets the update date for record-keeping
    },
    source: {
      type: String,
      enum: ['offline', 'instagram', 'online'],
      required: true,
      // 💡 Helps track inventory inflow source (Instagram DMs, physical shop, online orders)
    },
    notes: {
      type: String,
      // 💡 Optional field for any extra information by admin
    },
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt fields
)

// ✅ Named export
export const StockManagerModel =
  mongoose.models.StockManager ||
  mongoose.model<IStockManager>('StockManager', StockManagerSchema)

// ✅ Default export
export default StockManagerModel
