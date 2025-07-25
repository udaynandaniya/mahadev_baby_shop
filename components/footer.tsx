// // // import Link from "next/link"
// // // import { Instagram, MapPin, Phone, Mail, Heart } from "lucide-react"

// // // export function Footer() {
// // //   return (
// // //     <footer className="bg-gray-900 text-white">
// // //       <div className="container py-12">
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// // //           {/* Brand */}
// // //           <div>
// // //             <div className="flex items-center space-x-2 mb-4">
// // //               <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
// // //                 <span className="text-white font-bold text-sm">M</span>
// // //               </div>
// // //               <span className="font-bold text-xl">Mahadev Baby Shop</span>
// // //             </div>
// // //             <p className="text-gray-300 mb-4">
// // //               Premium baby clothes and accessories in Mangrol. Quality products for your little ones.
// // //             </p>
// // //             <div className="flex space-x-4">
// // //               <Link
// // //                 href="https://www.instagram.com/mahadev_baby_shop?igsh=eDlna2prOTVkNW5z"
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 className="text-gray-300 hover:text-pink-400 transition-colors"
// // //               >
// // //                 <Instagram className="h-5 w-5" />
// // //               </Link>
// // //             </div>
// // //           </div>

// // //           {/* Quick Links */}
// // //           <div>
// // //             <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            
// // //               </li>
// // //             </ul>
// // //           </div>

         
// // //               <div className="flex items-center space-x-2">
// // //                 <Phone className="h-4 w-4 text-pink-400" />
// // //                 <span className="text-gray-300">Divyesh Nanadaniya</span>
// // //               </div>
// // //               <div className="flex items-center space-x-2">
// // //                 <MapPin className="h-4 w-4 text-pink-400" />
// // //                 <span className="text-gray-300">Mangrol, Gujarat</span>
// // //               </div>
// // //               <div className="flex items-center space-x-2">
// // //                 <Mail className="h-4 w-4 text-pink-400" />
// // //                 <span className="text-gray-300">info@mahadevbabyshop.com</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="border-t border-gray-800 mt-8 pt-8">
// // //           <div className="flex flex-col md:flex-row justify-between items-center">
// // //             <p className="text-gray-300 text-sm">© 2024 Mahadev Baby Shop. All rights reserved.</p>
// // //             <p className="text-gray-300 text-sm flex items-center">
// // //               Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for babies in Mangrol
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </footer>
// // //   )
// // // }

// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\components\footer.tsx
// // import Link from "next/link"
// // import { Instagram, MapPin, Phone, Mail, Heart, ExternalLink, FileText, HelpCircle, Store } from 'lucide-react'

// // export function Footer() {
// //   return (
// //     <footer className="bg-gray-900 text-white">
// //       <div className="container mx-auto px-4 py-12">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {/* Brand */}
// //           <div className="space-y-4">
// //             <div className="flex items-center space-x-2 mb-4">
// //               <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
// //                 <span className="text-white font-bold text-sm">M</span>
// //               </div>
// //               <span className="font-bold text-xl">Mahadev Baby Shop</span>
// //             </div>
// //             <p className="text-gray-300 text-sm leading-relaxed">
// //               Premium baby clothes and accessories in Mangrol. Quality products for your little ones.
// //             </p>
// //             <div className="flex space-x-4">
// //               <Link
// //                 href="https://www.instagram.com/mahadev_baby_shop?igsh=eDlna2prOTVkNW5z"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="text-gray-300 hover:text-pink-400 transition-colors"
// //               >
// //                 <Instagram className="h-5 w-5" />
// //               </Link>
// //             </div>
// //           </div>

// //           {/* Quick Links */}
// //           <div className="space-y-4">
// //             <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
// //             <ul className="space-y-2">
// //               <li>
// //                 <Link href="/products/clothes" className="text-gray-300 hover:text-white transition-colors text-sm">
// //                   Baby Clothes
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/products/bath" className="text-gray-300 hover:text-white transition-colors text-sm">
// //                   Bath Products
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/products/newborn" className="text-gray-300 hover:text-white transition-colors text-sm">
// //                   Newborn Items
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/products/toy" className="text-gray-300 hover:text-white transition-colors text-sm">
// //                   Toys
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/orders" className="text-gray-300 hover:text-white transition-colors text-sm">
// //                   My Orders
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/cart" className="text-gray-300 hover:text-white transition-colors text-sm">
// //                   Shopping Cart
// //                 </Link>
// //               </li>
// //             </ul>
// //           </div>

// //           {/* Policies & Support */}
// //           <div className="space-y-4">
// //             <h3 className="font-semibold text-lg mb-4">Support & Policies</h3>
// //             <ul className="space-y-2">
// //               <li>
// //                 <Link href="/delivery-info" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
// //                   <FileText className="h-3 w-3" />
// //                   Delivery Information
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/return-policy" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
// //                   <FileText className="h-3 w-3" />
// //                   Return Policy
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/query" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
// //                   <HelpCircle className="h-3 w-3" />
// //                   Ask Query
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link 
// //                   href="https://docs.google.com/forms/d/e/1FAIpQLSdx1jWPNK_oailmgV_iV1jSUrsQ_lp-E_8ABsxK8pubHomWyA/viewform?usp=dialog"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1"
// //                 >
// //                   <ExternalLink className="h-3 w-3" />
// //                   Report Issue
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link href="/other-branch" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
// //                   <Store className="h-3 w-3" />
// //                   Our Other Branch
// //                 </Link>
// //               </li>
// //             </ul>
// //           </div>

// //           {/* Contact Info */}
// //           <div className="space-y-4">
// //             <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
// //             <div className="space-y-3">
// //               <div className="flex items-start space-x-2">
// //                 <Phone className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
// //                 <div className="space-y-1">
// //                   <p className="text-gray-300 text-sm font-medium">Divyesh Nanadaniya</p>
// //                   <div className="space-y-1">
// //                     <a 
// //                       href="tel:9913737023" 
// //                       className="text-gray-300 hover:text-white transition-colors text-sm block"
// //                     >
// //                       +91 99137 37023
// //                     </a>
// //                     <a 
// //                       href="tel:9898893380" 
// //                       className="text-gray-300 hover:text-white transition-colors text-sm block"
// //                     >
// //                       +91 98988 93380
// //                     </a>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-start space-x-2">
// //                 <MapPin className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
// //                 <div>
// //                   <p className="text-gray-300 text-sm">Vithalani Complex</p>
// //                   <p className="text-gray-300 text-sm">Mangrol, Gujarat</p>
// //                   <a 
// //                     href="https://maps.app.goo.gl/HfPkkBRqkwAh1JVR9"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="text-pink-400 hover:text-pink-300 transition-colors text-sm inline-flex items-center gap-1 mt-1"
// //                   >
// //                     <ExternalLink className="h-3 w-3" />
// //                     View on Map
// //                   </a>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-start space-x-2">
// //                 <Mail className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
// //                 <a 
// //                   href="mailto:mahadevbabyshop5@gmail.com"
// //                   className="text-gray-300 hover:text-white transition-colors text-sm"
// //                 >
// //                   mahadevbabyshop5@gmail.com
// //                 </a>
// //               </div>

// //               <div className="flex items-start space-x-2">
// //                 <Phone className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
// //                 <a 
// //                   href="https://wa.me/919913737023"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-gray-300 hover:text-green-400 transition-colors text-sm"
// //                 >
// //                   WhatsApp: +91 99137 37023
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="border-t border-gray-800 mt-8 pt-8">
// //           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
// //             <p className="text-gray-300 text-sm text-center md:text-left">
// //               © 2024 Mahadev Baby Shop. All rights reserved.
// //             </p>
// //             <p className="text-gray-300 text-sm flex items-center">
// //               Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for babies in Mangrol
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   )
// // }


// import Link from "next/link"
// import { Instagram, MapPin, Phone, Mail, Heart, ExternalLink, FileText, HelpCircle, Store } from "lucide-react"

// export function Footer() {
//   return (
//     <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Brand */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2 mb-4">
//               <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-sm">M</span>
//               </div>
//               <span className="font-bold text-xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
//                 Mahadev Baby Shop
//               </span>
//             </div>
//             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//               Premium baby clothes and accessories in Mangrol. Quality products for your little ones.
//             </p>
//             <div className="flex space-x-4">
//               <Link
//                 href="https://www.instagram.com/mahadev_baby_shop?igsh=eDlna2prOTVkNW5z"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//               >
//                 <Instagram className="h-5 w-5" />
//               </Link>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="/products/clothes"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm hover:underline"
//                 >
//                   Baby Clothes
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/products/bath"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm hover:underline"
//                 >
//                   Bath Products
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/products/newborn"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm hover:underline"
//                 >
//                   Newborn Items
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/products/toy"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm hover:underline"
//                 >
//                   Toys
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/orders"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm hover:underline"
//                 >
//                   My Orders
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/cart"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm hover:underline"
//                 >
//                   Shopping Cart
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Policies & Support */}
//           <div className="space-y-4">
//             <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Support & Policies</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="/delivery-info"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm flex items-center gap-2 hover:underline"
//                 >
//                   <FileText className="h-3 w-3 flex-shrink-0" />
//                   Delivery Information
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/return-policy"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm flex items-center gap-2 hover:underline"
//                 >
//                   <FileText className="h-3 w-3 flex-shrink-0" />
//                   Return Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/query"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm flex items-center gap-2 hover:underline"
//                 >
//                   <HelpCircle className="h-3 w-3 flex-shrink-0" />
//                   Ask Query
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://docs.google.com/forms/d/e/1FAIpQLSdx1jWPNK_oailmgV_iV1jSUrsQ_lp-E_8ABsxK8pubHomWyA/viewform?usp=dialog"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm flex items-center gap-2 hover:underline"
//                 >
//                   <ExternalLink className="h-3 w-3 flex-shrink-0" />
//                   Report Issue
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/other-branch"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm flex items-center gap-2 hover:underline"
//                 >
//                   <Store className="h-3 w-3 flex-shrink-0" />
//                   Our Other Branch
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Contact Info</h3>
//             <div className="space-y-4">
//               <div className="flex items-start space-x-3">
//                 <Phone className="h-4 w-4 text-pink-500 dark:text-pink-400 mt-0.5 flex-shrink-0" />
//                 <div className="space-y-1">
//                   <p className="text-gray-900 dark:text-gray-100 text-sm font-medium">Divyesh Nanadaniya</p>
//                   <div className="space-y-1">
//                     <a
//                       href="tel:9913737023"
//                       className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm block hover:underline"
//                     >
//                       +91 99137 37023
//                     </a>
//                     <a
//                       href="tel:9898893380"
//                       className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm block hover:underline"
//                     >
//                       +91 98988 93380
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <MapPin className="h-4 w-4 text-pink-500 dark:text-pink-400 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm">Vithalani Complex</p>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm">Mangrol, Gujarat</p>
//                   <a
//                     href="https://maps.app.goo.gl/HfPkkBRqkwAh1JVR9"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors text-sm inline-flex items-center gap-1 mt-1 hover:underline"
//                   >
//                     <ExternalLink className="h-3 w-3" />
//                     View on Map
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <Mail className="h-4 w-4 text-pink-500 dark:text-pink-400 mt-0.5 flex-shrink-0" />
//                 <a
//                   href="mailto:mahadevbabyshop5@gmail.com"
//                   className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm hover:underline"
//                 >
//                   mahadevbabyshop5@gmail.com
//                 </a>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <Phone className="h-4 w-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
//                 <a
//                   href="https://wa.me/919913737023"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm hover:underline"
//                 >
//                   WhatsApp: +91 99137 37023
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-gray-600 dark:text-gray-300 text-sm text-center md:text-left">
//               © 2025 Mahadev Baby Shop. All rights reserved.
//             </p>
//             <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
//               Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for babies in Mangrol
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }


import Link from "next/link"
import { Instagram, MapPin, Phone, Mail, Heart, ExternalLink, FileText, HelpCircle, Store, Baby } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 relative z-10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Baby className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent block">
                  Mahadev Baby Shop
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Premium Baby Products</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-sm">
              Premium baby clothes and accessories in Mangrol. Quality products for your little ones with love and care.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://www.instagram.com/mahadev_baby_shop?igsh=eDlna2prOTVkNW5z"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Instagram className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <div className="h-1 w-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Baby Clothes", href: "/products/clothes" },
                { name: "Bath Products", href: "/products/bath" },
                { name: "Newborn Items", href: "/products/newborn" },
                { name: "Toys", href: "/products/toy" },
                { name: "My Orders", href: "/orders" },
                { name: "Shopping Cart", href: "/cart" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm hover:translate-x-1 transform duration-200 block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Policies */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <div className="h-1 w-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              Support
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Delivery Info", href: "/delivery-info", icon: FileText },
                { name: "Return Policy", href: "/return-policy", icon: FileText },
                { name: "Ask Query", href: "/query", icon: HelpCircle },
                {
                  name: "Report Issue",
                  href: "https://docs.google.com/forms/d/e/1FAIpQLSdx1jWPNK_oailmgV_iV1jSUrsQ_lp-E_8ABsxK8pubHomWyA/viewform?usp=dialog",
                  icon: ExternalLink,
                  external: true,
                },
                { name: "Other Branch", href: "/other-branch", icon: Store },
              ].map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm flex items-center gap-2 hover:translate-x-1 transform duration-200 py-1"
                    >
                      <IconComponent className="h-3 w-3 flex-shrink-0" />
                      {link.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <div className="h-1 w-6 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"></div>
              Contact
            </h3>
            <div className="space-y-4">
              {/* Phone */}
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded-md bg-pink-100 dark:bg-pink-900/30">
                    <Phone className="h-3 w-3 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-gray-100 text-sm font-medium mb-1">Divyesh Nanadaniya</p>
                    <div className="space-y-1">
                      <a
                        href="tel:9913737023"
                        className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm block hover:underline"
                      >
                        +91 99137 37023
                      </a>
                      <a
                        href="tel:9898893380"
                        className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm block hover:underline"
                      >
                        +91 98988 93380
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/30">
                    <MapPin className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Vithalani Complex</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Mangrol, Gujarat</p>
                    <a
                      href="https://maps.app.goo.gl/HfPkkBRqkwAh1JVR9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm inline-flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View on Map
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & WhatsApp */}
              <div className="space-y-2">
                <a
                  href="mailto:mahadevbabyshop5@gmail.com"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="p-1 rounded-md bg-purple-100 dark:bg-purple-900/30">
                    <Mail className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
                    mahadevbabyshop5@gmail.com
                  </span>
                </a>

                <a
                  href="https://wa.me/919913737023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="p-1 rounded-md bg-green-100 dark:bg-green-900/30">
                    <Phone className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-sm">
                    WhatsApp: +91 99137 37023
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center sm:text-left">
              © 2025 Mahadev Baby Shop. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> for babies in Mangrol
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
