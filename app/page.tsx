
// // app/page.tsx
// import { Header } from "@/components/header"
// import { Hero } from "@/components/hero"
// import { ImageSlider } from "@/components/image-slider"
// import { FeaturedProducts } from "@/components/featured-products"
// import { ShopInfo } from "@/components/shop-info"
// import { Reviews } from "@/components/reviews"
// import { Footer } from "@/components/footer"
// import { AnimatedBackground } from "@/components/animated-background"

// export default function Home() {
//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
//       <AnimatedBackground />
//       <Header />
//       <main className="relative z-10">
//         <Hero />
//         <ImageSlider />
//         <FeaturedProducts />
//         <ShopInfo />
//         <Reviews />
//       </main>
//       <Footer />
//     </div>
//   )
// }

import { ConditionalHeader } from "@/components/conditional-header"
import { Hero } from "@/components/hero"
import { ImageSlider } from "@/components/image-slider"
import { FeaturedProducts } from "@/components/featured-products"
import { ShopInfo } from "@/components/shop-info"
import { Reviews } from "@/components/reviews"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
      <AnimatedBackground />
      {/* <ConditionalHeader /> */}
      <main className="relative z-10">
        <Hero />
        {/* <ImageSlider /> */}
        {/* <FeaturedProducts /> */}
        <ShopInfo />
        <Reviews />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
