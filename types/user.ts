export type User = {
  _id: string
  name: string
  email?: string
  phone?: string
  role: "user" | "admin"
  isVerified: boolean
  isAdmin: boolean
  isActive: boolean
  address?: {
    street?: string
    area?: string
    state?: string
    district?: string
    subDistrict?: string
    village?: string
    pincode?: string
  }
  totalOrders: number
  totalSpent: number
  lastLogin?: string
  createdAt: string
  updatedAt: string
}
