// // // // import User from "./User"

// // // // export { ToyModel } from "./toy"
// // // // export { ClothesModel } from "./clothes"
// // // // export { BathItemModel } from "./bath"
// // // // export { NewbornItemModel } from "./newborn"
// // // // export { NotifyMeModel } from "./notifyMe"
// // // // export { StockManagerModel } from "./stockManager"

// // // export { default as ToyModel } from "./toy"
// // // export { default as ClothesModel } from "./clothes"
// // // export { default as BathItemModel } from "./bath"
// // // export { default as NewbornItemModel } from "./newborn"
// // // export { default as NotifyMeModel } from "./notifyMe"
// // // export { default as StockManagerModel } from "./stockManager"


// // import User from "./User"
// // import ToyModel from "./toy"
// // import ClothesModel from "./clothes"
// // import BathItemModel from "./bath"
// // import NewbornItemModel from "./newborn"
// // import NotifyMeModel from "./notifyMe"
// // import StockManagerModel from "./stockManager"
// // import SliderModel from "./sliderModel"
// // import VideoModel from "./videoModel"

// // export {
// //   User,
// //   ToyModel,
// //   ClothesModel,
// //   BathItemModel,
// //   NewbornItemModel,
// //   NotifyMeModel,
// //   StockManagerModel,
// //   SliderModel,
// //   VideoModel,
// // }


// import User from "./User"
// import ToyModel from "./toy"
// import ClothesModel from "./clothes"
// import BathItemModel from "./bath"
// import NewbornItemModel from "./newborn"
// import { NotifyMeModel } from "./notifyMe"        // ✅ named import
// import { StockManagerModel } from "./stockManager"
// import { SliderModel } from "./sliderModel"       // ✅ named import
// import { VideoModel } from "./videoModel"         // ✅ named import

// export {
//   User,
//   ToyModel,
//   ClothesModel,
//   BathItemModel,
//   NewbornItemModel,
//   NotifyMeModel,
//   StockManagerModel,
//   SliderModel,
//   VideoModel,
// }


// lib/models/index.ts
import User from "./User"
import ToyModel from "./toy"
import ClothesModel from "./clothes"
import BathItemModel from "./bath"
import NewbornItemModel from "./newborn"
import { NotifyMeModel } from "./notifyMe"
import { StockManagerModel } from "./stockManager"
import { SliderModel } from "./sliderModel"
import { VideoModel } from "./videoModel"

export {
  User,
  ToyModel,
  ClothesModel,
  BathItemModel,
  NewbornItemModel,
  NotifyMeModel,
  StockManagerModel,
  SliderModel,
  VideoModel,
}