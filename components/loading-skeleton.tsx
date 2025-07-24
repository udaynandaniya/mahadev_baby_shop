"use client"

import { QuickLoader } from "@/components/quick-loader"

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="sticky top-0 z-50 w-full h-14 md:h-16 border-b border-pink-200/30 dark:border-purple-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
      <div className="container flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl animate-pulse" />
          <div className="h-6 w-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded animate-pulse" />
        </div>

        <div className="flex items-center">
          <QuickLoader size="sm" text="Loading..." variant="dots" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-blue-950/30">
      <HeaderSkeleton />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <QuickLoader size="lg" text="Loading page..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
