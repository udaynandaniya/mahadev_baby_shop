// // // // notifyMe.ts
// // // export interface NotifyMe {
// // //   email: string;
// // //   productId: string; // reference to clothes, toy, bath, or newborn item
// // //   productType: 'clothes' | 'toy' | 'bath' | 'newborn';
// // //   requestedAt: Date;
// // //   notified: boolean;
// // // }

// // import mongoose, { Schema, Document } from 'mongoose';

// // export interface INotifyMe extends Document {
// //   email: string;
// //   productId: string;
// //   productType: 'clothes' | 'toy' | 'bath' | 'newborn';
// //   requestedAt: Date;
// //   notified: boolean;
// // }

// // const NotifyMeSchema: Schema<INotifyMe> = new Schema({
// //   email: { type: String, required: true },
// //   productId: { type: String, required: true },
// //   productType: { type: String, enum: ['clothes', 'toy', 'bath', 'newborn'], required: true },
// //   requestedAt: { type: Date, default: Date.now },
// //   notified: { type: Boolean, default: false },
// // });

// // export default mongoose.model<INotifyMe>('NotifyMe', NotifyMeSchema);


// import mongoose, { Schema, Document } from 'mongoose'

// export interface INotifyMe extends Document {
//   email: string
//   productId: string
//   productType: 'clothes' | 'toy' | 'bath' | 'newborn'
//   requestedAt: Date
//   notified: boolean
// }

// const NotifyMeSchema = new Schema<INotifyMe>({
//   email: { type: String, required: true },
//   productId: { type: String, required: true },
//   productType: { type: String, enum: ['clothes', 'toy', 'bath', 'newborn'], required: true },
//   requestedAt: { type: Date, default: Date.now },
//   notified: { type: Boolean, default: false },
// })

// export const NotifyMeModel = mongoose.models.NotifyMe || mongoose.model<INotifyMe>('NotifyMe', NotifyMeSchema)


import mongoose, { Schema, type Document } from "mongoose"

export interface INotifyMe extends Document {
  email: string
  productId: string
  productType: "clothes" | "toy" | "bath" | "newborn"
  requestedAt: Date
  notified: boolean
}

const NotifyMeSchema: Schema<INotifyMe> = new Schema({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  productType: { type: String, enum: ["clothes", "toy", "bath", "newborn"], required: true },
  requestedAt: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false },
})

export const NotifyMeModel = mongoose.models.NotifyMe || mongoose.model<INotifyMe>("NotifyMe", NotifyMeSchema)
