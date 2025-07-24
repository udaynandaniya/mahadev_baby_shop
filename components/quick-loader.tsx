// "use client"

// import { useEffect, useState } from "react"
// import { Baby, Heart, Star, Gift } from "lucide-react"

// interface QuickLoaderProps {
//   size?: "sm" | "md" | "lg"
//   text?: string
//   showText?: boolean
//   variant?: "default" | "minimal" | "dots" | "pulse"
// }

// export function QuickLoader({
//   size = "md",
//   text = "Loading...",
//   showText = true,
//   variant = "default",
// }: QuickLoaderProps) {
//   const [currentIcon, setCurrentIcon] = useState(0)
//   const icons = [Baby, Heart, Star, Gift]

//   const sizeClasses = {
//     sm: "h-4 w-4",
//     md: "h-6 w-6",
//     lg: "h-8 w-8",
//   }

//   const textSizes = {
//     sm: "text-xs",
//     md: "text-sm",
//     lg: "text-base",
//   }

//   useEffect(() => {
//     if (variant === "default") {
//       const interval = setInterval(() => {
//         setCurrentIcon((prev) => (prev + 1) % icons.length)
//       }, 300)
//       return () => clearInterval(interval)
//     }
//   }, [variant, icons.length])

//   if (variant === "minimal") {
//     return (
//       <div className="flex items-center justify-center">
//         <div className={`${sizeClasses[size]} border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin`} />
//       </div>
//     )
//   }

//   if (variant === "dots") {
//     return (
//       <div className="flex items-center justify-center space-x-1">
//         <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//         <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//         <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//       </div>
//     )
//   }

//   if (variant === "pulse") {
//     return (
//       <div className="flex flex-col items-center justify-center space-y-2">
//         <div
//           className={`${sizeClasses[size]} bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse`}
//         />
//         {showText && <p className={`${textSizes[size]} text-gray-600 dark:text-gray-300 animate-pulse`}>{text}</p>}
//       </div>
//     )
//   }

//   // Default variant with rotating icons
//   const CurrentIcon = icons[currentIcon]

//   return (
//     <div className="flex flex-col items-center justify-center space-y-2">
//       <div className="relative">
//         <div className={`${sizeClasses[size]} text-pink-500 animate-spin`}>
//           <CurrentIcon className="w-full h-full" />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full animate-ping" />
//       </div>
//       {showText && <p className={`${textSizes[size]} text-gray-600 dark:text-gray-300 font-medium`}>{text}</p>}
//     </div>
//   )
// }

// // Page loader for full screen loading
// export function PageLoader({ text = "Loading page..." }: { text?: string }) {
//   return (
//     <div className="fixed inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-50 flex items-center justify-center">
//       <div className="text-center">
//         <QuickLoader size="lg" text={text} variant="default" />
//       </div>
//     </div>
//   )
// }

// // Button loader for loading states
// export function ButtonLoader({ size = "sm" }: { size?: "sm" | "md" }) {
//   return <QuickLoader size={size} showText={false} variant="minimal" />
// }

// // Card loader for content loading
// export function CardLoader() {
//   return (
//     <div className="animate-pulse">
//       <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2" />
//       <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4 mb-2" />
//       <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-1/2" />
//     </div>
//   )
// }


"use client"

import { Baby } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickLoaderProps {
  size?: "sm" | "md" | "lg"
  text?: string
  variant?: "default" | "minimal" | "dots" | "pulse"
  className?: string
}

export function QuickLoader({ size = "md", text, variant = "default", className }: QuickLoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div
          className={cn("animate-spin rounded-full border-2 border-pink-200 border-t-pink-500", sizeClasses[size])}
        />
        {text && <span className={cn("text-gray-600 dark:text-gray-300", textSizeClasses[size])}>{text}</span>}
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
        {text && <span className={cn("text-gray-600 dark:text-gray-300", textSizeClasses[size])}>{text}</span>}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div
          className={cn("rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse", sizeClasses[size])}
        />
        {text && <span className={cn("text-gray-600 dark:text-gray-300", textSizeClasses[size])}>{text}</span>}
      </div>
    )
  }

  // Default variant with rotating baby icons
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <div className={cn("animate-spin", sizeClasses[size])}>
          <Baby className="h-full w-full text-pink-500" />
        </div>
        <div className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full animate-ping"></div>
      </div>
      {text && (
        <span className={cn("text-gray-600 dark:text-gray-300 font-medium", textSizeClasses[size])}>{text}</span>
      )}
    </div>
  )
}

export function PageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-pink-200/50 dark:border-purple-800/50">
        <div className="relative">
          <div className="h-12 w-12 animate-spin">
            <Baby className="h-full w-full text-pink-500" />
          </div>
          <div className="absolute -top-2 -right-2 h-4 w-4 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-purple-400 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{text}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please wait a moment...</p>
        </div>
        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}

export function ButtonLoader({ size = "sm" }: { size?: "sm" | "md" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  }

  return <div className={cn("animate-spin rounded-full border-2 border-white/30 border-t-white", sizeClasses[size])} />
}

export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-8 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="sticky top-0 z-50 w-full h-14 md:h-16 border-b border-pink-200/30 dark:border-purple-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="animate-pulse h-8 w-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  )
}
