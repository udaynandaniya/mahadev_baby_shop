// // Utility functions for Cloudinary image deletion

// export async function deleteCloudinaryImage(imageUrl: string): Promise<boolean> {
//   try {
//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//     const apiKey = process.env.CLOUDINARY_API_KEY
//     const apiSecret = process.env.CLOUDINARY_API_SECRET

//     if (!cloudName || !apiKey || !apiSecret) {
//       console.warn("Cloudinary credentials not found")
//       return false
//     }

//     const publicId = extractPublicIdFromUrl(imageUrl)
//     if (!publicId) {
//       console.warn(`Could not extract public_id from URL: ${imageUrl}`)
//       return false
//     }

//     const timestamp = Math.round(new Date().getTime() / 1000)
//     const signature = await createSignature(publicId, timestamp, apiSecret)

//     const formData = new FormData()
//     formData.append("public_id", publicId)
//     formData.append("signature", signature)
//     formData.append("api_key", apiKey)
//     formData.append("timestamp", timestamp.toString())

//     const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
//       method: "POST",
//       body: formData,
//     })

//     const result = await response.json()
//     return result.result === "ok"
//   } catch (error) {
//     console.error("Error deleting Cloudinary image:", error)
//     return false
//   }
// }

// export async function deleteMultipleCloudinaryImages(imageUrls: string[]): Promise<void> {
//   const deletePromises = imageUrls.map(deleteCloudinaryImage)
//   await Promise.allSettled(deletePromises)
// }

// function extractPublicIdFromUrl(url: string): string | null {
//   try {
//     // Handle different Cloudinary URL formats
//     // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
//     // Extract: sample
//     const regex = /\/(?:v\d+\/)?([^/.]+)(?:\.[^.]+)?$/
//     const match = url.match(regex)
//     return match ? match[1] : null
//   } catch (error) {
//     console.error("Error extracting public_id:", error)
//     return null
//   }
// }

// async function createSignature(publicId: string, timestamp: number, apiSecret: string): Promise<string> {
//   const crypto = await import("crypto")
//   const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
//   return crypto.createHash("sha1").update(stringToSign).digest("hex")
// }


// Utility functions for Cloudinary image deletion

export async function deleteCloudinaryImage(imageUrl: string): Promise<boolean> {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      console.warn("Cloudinary credentials not found")
      return false
    }

    const publicId = extractPublicIdFromUrl(imageUrl)
    if (!publicId) {
      console.warn(`Could not extract public_id from URL: ${imageUrl}`)
      return false
    }

    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = await createSignature(publicId, timestamp, apiSecret)

    const formData = new FormData()
    formData.append("public_id", publicId)
    formData.append("signature", signature)
    formData.append("api_key", apiKey)
    formData.append("timestamp", timestamp.toString())

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: "POST",
      body: formData,
    })

    const result = await response.json()
    return result.result === "ok" || result.result === "not found"
  } catch (error) {
    console.error("Error deleting Cloudinary image:", error)
    return false
  }
}

export async function deleteMultipleCloudinaryImages(imageUrls: string[]): Promise<void> {
  const deletePromises = imageUrls.map(deleteCloudinaryImage)
  await Promise.allSettled(deletePromises)
}

function extractPublicIdFromUrl(url: string): string | null {
  try {
    // Handle different Cloudinary URL formats
    const urlParts = url.split("/")
    const uploadIndex = urlParts.findIndex((part) => part === "upload")

    if (uploadIndex === -1) return null

    // Get the part after 'upload' (skip version if present)
    let publicIdPart = urlParts[uploadIndex + 1]
    if (publicIdPart && publicIdPart.startsWith("v")) {
      // Skip version, get next part
      publicIdPart = urlParts[uploadIndex + 2]
    }

    if (!publicIdPart) return null

    // Remove file extension
    return publicIdPart.split(".")[0]
  } catch (error) {
    console.error("Error extracting public_id:", error)
    return null
  }
}

async function createSignature(publicId: string, timestamp: number, apiSecret: string): Promise<string> {
  const crypto = await import("crypto")
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  return crypto.createHash("sha1").update(stringToSign).digest("hex")
}
