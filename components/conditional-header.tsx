// // // "use client"

// // // import { useAuth } from "@/app/contexts/auth-provider"
// // // import { Header } from "@/components/header"
// // // import { AdminHeader } from "@/components/admin-header"

// // // export function ConditionalHeader() {
// // //   const { user, isLoading } = useAuth()

// // //   // Show loading state or default header while checking auth
// // //   if (isLoading) {
// // //     return <Header />
// // //   }

// // //   // Render admin header for admin users, regular header for others
// // //   return user?.isAdmin ? <AdminHeader /> : <Header />
// // // }


// // "use client"

// // import { useAuth } from "@/app/contexts/auth-provider"
// // import { Header } from "@/components/header"
// // import { AdminHeader } from "@/components/admin-header"
// // import { useEffect, useState } from "react"

// // export function ConditionalHeader() {
// //   const { user, isLoading } = useAuth()
// //   const [mounted, setMounted] = useState(false)

// //   useEffect(() => {
// //     setMounted(true)
// //   }, [])

// //   // Prevent hydration mismatch and flickering
// //   if (!mounted || isLoading) {
// //     return (
// //       <div className="sticky top-0 z-50 w-full h-14 md:h-16 border-b border-pink-200/30 dark:border-purple-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
// //         <div className="container flex h-full items-center justify-center">
// //           <div className="animate-pulse h-8 w-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl"></div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   // Render admin header for admin users, regular header for others
// //   return user?.isAdmin ? <AdminHeader /> : <Header />
// // }


// "use client"

// import { useAuth } from "@/app/contexts/auth-provider"
// import { Header } from "@/components/header"
// import { AdminHeader } from "@/components/admin-header"
// import { useMemo } from "react"

// export function ConditionalHeader() {
//   const { user, isLoading, isAuthenticated } = useAuth()

//   // Memoize the header component to prevent unnecessary re-renders
//   const headerComponent = useMemo(() => {
//     if (isLoading) {
//       return (
//         <div className="sticky top-0 z-50 w-full h-14 md:h-16 border-b border-pink-200/30 dark:border-purple-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
//           <div className="container flex h-full items-center justify-center">
//             <div className="animate-pulse h-8 w-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl"></div>
//           </div>
//         </div>
//       )
//     }

//     // Render admin header for admin users, regular header for others
//     return isAuthenticated && user?.isAdmin ? <AdminHeader /> : <Header />
//   }, [user, isLoading, isAuthenticated])

//   return headerComponent
// }


"use client"

import { useAuth } from "@/app/contexts/auth-provider"
import { Header } from "@/components/header"
import { useMemo } from "react"
import AdminHeader from "./admin-header"

export function ConditionalHeader() {
  const { user, isLoading, isAuthenticated } = useAuth()

  // Memoize the header component to prevent unnecessary re-renders
  const headerComponent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="sticky top-0 z-50 w-full h-14 md:h-16 border-b border-pink-200/30 dark:border-purple-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
          <div className="container flex h-full items-center justify-between px-4">
            {/* Logo skeleton */}
            <div className="flex items-center gap-2">
              <div className="animate-pulse h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl"></div>
              <div className="animate-pulse h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            {/* Actions skeleton */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="animate-pulse h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="animate-pulse h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="animate-pulse h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      )
    }

    // Simple conditional rendering: admin header for admin users, regular header for others
    return isAuthenticated && user?.isAdmin ? <AdminHeader /> : <Header />
  }, [user, isLoading, isAuthenticated])

  return headerComponent
}
