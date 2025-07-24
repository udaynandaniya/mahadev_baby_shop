// import Link from "next/link"
// import { Instagram, MapPin, Phone, Mail, Heart } from "lucide-react"

// export function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="container py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">M</span>
//               </div>
//               <span className="font-bold text-xl">Mahadev Baby Shop</span>
//             </div>
//             <p className="text-gray-300 mb-4">
//               Premium baby clothes and accessories in Mangrol. Quality products for your little ones.
//             </p>
//             <div className="flex space-x-4">
//               <Link
//                 href="https://www.instagram.com/mahadev_baby_shop?igsh=eDlna2prOTVkNW5z"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-300 hover:text-pink-400 transition-colors"
//               >
//                 <Instagram className="h-5 w-5" />
//               </Link>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            
//               </li>
//             </ul>
//           </div>

         
//               <div className="flex items-center space-x-2">
//                 <Phone className="h-4 w-4 text-pink-400" />
//                 <span className="text-gray-300">Divyesh Nanadaniya</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <MapPin className="h-4 w-4 text-pink-400" />
//                 <span className="text-gray-300">Mangrol, Gujarat</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Mail className="h-4 w-4 text-pink-400" />
//                 <span className="text-gray-300">info@mahadevbabyshop.com</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-300 text-sm">© 2024 Mahadev Baby Shop. All rights reserved.</p>
//             <p className="text-gray-300 text-sm flex items-center">
//               Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for babies in Mangrol
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }


import Link from "next/link"
import { Instagram, MapPin, Phone, Mail, Heart, ExternalLink, FileText, HelpCircle, Store } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl">Mahadev Baby Shop</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium baby clothes and accessories in Mangrol. Quality products for your little ones.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/mahadev_baby_shop?igsh=eDlna2prOTVkNW5z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/clothes" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Baby Clothes
                </Link>
              </li>
              <li>
                <Link href="/products/bath" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Bath Products
                </Link>
              </li>
              <li>
                <Link href="/products/newborn" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Newborn Items
                </Link>
              </li>
              <li>
                <Link href="/products/toy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Toys
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-300 hover:text-white transition-colors text-sm">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Support & Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/delivery-info" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/query" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  Ask Query
                </Link>
              </li>
              <li>
                <Link 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdx1jWPNK_oailmgV_iV1jSUrsQ_lp-E_8ABsxK8pubHomWyA/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Report Issue
                </Link>
              </li>
              <li>
                <Link href="/other-branch" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
                  <Store className="h-3 w-3" />
                  Our Other Branch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm font-medium">Divyesh Nanadaniya</p>
                  <div className="space-y-1">
                    <a 
                      href="tel:9913737023" 
                      className="text-gray-300 hover:text-white transition-colors text-sm block"
                    >
                      +91 99137 37023
                    </a>
                    <a 
                      href="tel:9898893380" 
                      className="text-gray-300 hover:text-white transition-colors text-sm block"
                    >
                      +91 98988 93380
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Vithalani Complex</p>
                  <p className="text-gray-300 text-sm">Mangrol, Gujarat</p>
                  <a 
                    href="https://maps.app.goo.gl/HfPkkBRqkwAh1JVR9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 transition-colors text-sm inline-flex items-center gap-1 mt-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View on Map
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:mahadevbabyshop5@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  mahadevbabyshop5@gmail.com
                </a>
              </div>

              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="https://wa.me/919913737023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  WhatsApp: +91 99137 37023
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © 2024 Mahadev Baby Shop. All rights reserved.
            </p>
            <p className="text-gray-300 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for babies in Mangrol
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
