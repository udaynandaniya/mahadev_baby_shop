"use client"

import { useState, useCallback } from "react"

interface ValidationCache {
  [key: string]: boolean
}

export function useProductValidation() {
  const [cache, setCache] = useState<ValidationCache>({})

  const checkProductCodeUnique = useCallback(
    async (productCode: string, productType: string, excludeId?: string): Promise<boolean> => {
      if (!productCode) return true

      const cacheKey = `${productType}-${productCode}-${excludeId || ""}`

      // Return cached result if available
      if (cache[cacheKey] !== undefined) {
        return cache[cacheKey]
      }

      try {
        const response = await fetch("/api/admin/validate/product-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productCode, productType, excludeId }),
        })

        const data = await response.json()
        const isUnique = data.isUnique

        // Cache the result
        setCache((prev) => ({ ...prev, [cacheKey]: isUnique }))

        return isUnique
      } catch (error) {
        console.error("Error checking product code uniqueness:", error)
        return true // Assume unique on error to avoid blocking
      }
    },
    [cache],
  )

  const clearValidationCache = useCallback(() => {
    setCache({})
  }, [])

  return { checkProductCodeUnique, clearValidationCache }
}
