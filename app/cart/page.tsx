// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { useRouter } from "next/navigation"
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Checkbox } from "@/components/ui/checkbox"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Separator } from "@/components/ui/separator"
// // // // import { ShoppingCart, Plus, Minus, Trash2, Package, Truck, ArrowRight, RefreshCw } from "lucide-react"
// // // // import Image from "next/image"
// // // // import { toast } from "react-hot-toast"
// // // // import { AnimatedBackground } from "@/components/animated-background"
// // // // import { useAuth } from "@/app/contexts/auth-provider"

// // // // interface CartItem {
// // // //   _id: string
// // // //   userEmail: string
// // // //   productCode: string
// // // //   categoryTypeModel: "toy" | "clothes" | "bath" | "newborn"
// // // //   quantity: number
// // // //   weightInGrams: number
// // // //   priceAtAdd: number
// // // //   product: {
// // // //     _id: string
// // // //     name: string
// // // //     images: string[]
// // // //     inStock: number
// // // //     sellingPrice: number
// // // //     actualPrice?: number
// // // //   }
// // // // }

// // // // export default function CartPage() {
// // // //   const router = useRouter()
// // // //   const { user, isAuthenticated } = useAuth()
// // // //   const [cartItems, setCartItems] = useState<CartItem[]>([])
// // // //   const [selectedItems, setSelectedItems] = useState<string[]>([])
// // // //   const [isLoading, setIsLoading] = useState(true)
// // // //   const [isUpdating, setIsUpdating] = useState<string | null>(null)

// // // //   useEffect(() => {
// // // //     if (!isAuthenticated) {
// // // //       router.push("/auth/login")
// // // //       return
// // // //     }
// // // //     fetchCartItems()
// // // //   }, [isAuthenticated])

// // // //   const fetchCartItems = async () => {
// // // //     if (!user?.email) return

// // // //     try {
// // // //       setIsLoading(true)
// // // //       const response = await fetch(`/api/cart?userEmail=${encodeURIComponent(user.email)}`)
// // // //       if (!response.ok) throw new Error("Failed to fetch cart")

// // // //       const data = await response.json()
// // // //       setCartItems(data.data || [])
// // // //     } catch (error) {
// // // //       console.error("Error fetching cart:", error)
// // // //       toast.error("Failed to load cart items")
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   const updateQuantity = async (productCode: string, newQuantity: number) => {
// // // //     if (!user?.email || newQuantity < 1) return

// // // //     try {
// // // //       setIsUpdating(productCode)
// // // //       const response = await fetch("/api/cart", {
// // // //         method: "PUT",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           userEmail: user.email,
// // // //           productCode,
// // // //           quantity: newQuantity,
// // // //         }),
// // // //       })

// // // //       if (!response.ok) {
// // // //         const error = await response.json()
// // // //         throw new Error(error.error || "Failed to update quantity")
// // // //       }

// // // //       await fetchCartItems()
// // // //       toast.success("Quantity updated")
// // // //     } catch (error: any) {
// // // //       console.error("Error updating quantity:", error)
// // // //       toast.error(error.message || "Failed to update quantity")
// // // //     } finally {
// // // //       setIsUpdating(null)
// // // //     }
// // // //   }

// // // //   const removeItem = async (productCode: string) => {
// // // //     if (!user?.email) return

// // // //     try {
// // // //       const response = await fetch(`/api/cart?userEmail=${encodeURIComponent(user.email)}&productCode=${productCode}`, {
// // // //         method: "DELETE",
// // // //       })

// // // //       if (!response.ok) throw new Error("Failed to remove item")

// // // //       await fetchCartItems()
// // // //       setSelectedItems(selectedItems.filter((item) => item !== productCode))
// // // //       toast.success("Item removed from cart")
// // // //     } catch (error) {
// // // //       console.error("Error removing item:", error)
// // // //       toast.error("Failed to remove item")
// // // //     }
// // // //   }

// // // //   const toggleSelectItem = (productCode: string) => {
// // // //     setSelectedItems((prev) =>
// // // //       prev.includes(productCode) ? prev.filter((item) => item !== productCode) : [...prev, productCode],
// // // //     )
// // // //   }

// // // //   const toggleSelectAll = () => {
// // // //     if (selectedItems.length === cartItems.length) {
// // // //       setSelectedItems([])
// // // //     } else {
// // // //       setSelectedItems(cartItems.map((item) => item.productCode))
// // // //     }
// // // //   }

// // // //   const calculateTotals = () => {
// // // //     const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.productCode))

// // // //     const itemsTotal = selectedCartItems.reduce((sum, item) => sum + item.priceAtAdd * item.quantity, 0)
// // // //     const totalWeight = selectedCartItems.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)

// // // //     return {
// // // //       itemsTotal,
// // // //       totalWeight,
// // // //       itemCount: selectedCartItems.reduce((sum, item) => sum + item.quantity, 0),
// // // //     }
// // // //   }

// // // //   const proceedToCheckout = () => {
// // // //     if (selectedItems.length === 0) {
// // // //       toast.error("Please select items to checkout")
// // // //       return
// // // //     }

// // // //     // Store selected items in localStorage for checkout
// // // //     localStorage.setItem("checkoutItems", JSON.stringify(selectedItems))
// // // //     router.push("/checkout")
// // // //   }

// // // //   if (!isAuthenticated) {
// // // //     return null
// // // //   }

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="min-h-screen relative">
// // // //         <AnimatedBackground />
// // // //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// // // //           <div className="flex items-center gap-3 text-lg font-medium">
// // // //             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
// // // //             Loading Cart...
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   const { itemsTotal, totalWeight, itemCount } = calculateTotals()

// // // //   return (
// // // //     <div className="min-h-screen relative">
// // // //       <AnimatedBackground />
// // // //       <div className="relative z-10">
// // // //         <div className="container mx-auto px-4 py-6">
// // // //           {/* Header */}
// // // //           <div className="flex items-center gap-3 mb-6">
// // // //             <ShoppingCart className="h-8 w-8 text-pink-500" />
// // // //             <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
// // // //               Shopping Cart
// // // //             </h1>
// // // //             <Badge variant="secondary" className="text-lg px-3 py-1">
// // // //               {cartItems.length} items
// // // //             </Badge>
// // // //           </div>

// // // //           {cartItems.length === 0 ? (
// // // //             <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
// // // //               <CardContent className="text-center py-12">
// // // //                 <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
// // // //                 <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
// // // //                 <p className="text-muted-foreground mb-6">Add some items to get started!</p>
// // // //                 <Button
// // // //                   onClick={() => router.push("/products/clothes")}
// // // //                   className="bg-gradient-to-r from-pink-500 to-purple-500"
// // // //                 >
// // // //                   Start Shopping
// // // //                 </Button>
// // // //               </CardContent>
// // // //             </Card>
// // // //           ) : (
// // // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // //               {/* Cart Items */}
// // // //               <div className="lg:col-span-2 space-y-4">
// // // //                 {/* Select All */}
// // // //                 <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
// // // //                   <CardContent className="p-4">
// // // //                     <div className="flex items-center justify-between">
// // // //                       <div className="flex items-center space-x-2">
// // // //                         <Checkbox
// // // //                           id="select-all"
// // // //                           checked={selectedItems.length === cartItems.length}
// // // //                           onCheckedChange={toggleSelectAll}
// // // //                         />
// // // //                         <label htmlFor="select-all" className="font-medium cursor-pointer">
// // // //                           Select All ({cartItems.length} items)
// // // //                         </label>
// // // //                       </div>
// // // //                       <span className="text-sm text-muted-foreground">
// // // //                         {selectedItems.length} of {cartItems.length} selected
// // // //                       </span>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 {/* Cart Items List */}
// // // //                 {cartItems.map((item) => (
// // // //                   <Card
// // // //                     key={item.productCode}
// // // //                     className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
// // // //                   >
// // // //                     <CardContent className="p-4">
// // // //                       <div className="flex items-start gap-4">
// // // //                         {/* Checkbox */}
// // // //                         <Checkbox
// // // //                           checked={selectedItems.includes(item.productCode)}
// // // //                           onCheckedChange={() => toggleSelectItem(item.productCode)}
// // // //                           className="mt-2"
// // // //                         />

// // // //                         {/* Product Image */}
// // // //                         <div className="flex-shrink-0">
// // // //                           <Image
// // // //                             src={item.product.images[0] || "/placeholder.svg"}
// // // //                             alt={item.product.name}
// // // //                             width={100}
// // // //                             height={100}
// // // //                             className="rounded-lg object-cover"
// // // //                           />
// // // //                         </div>

// // // //                         {/* Product Details */}
// // // //                         <div className="flex-1 min-w-0">
// // // //                           <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
// // // //                           <div className="flex items-center gap-4 mb-3">
// // // //                             <span className="text-2xl font-bold text-green-600">₹{item.priceAtAdd}</span>
// // // //                             {item.product.actualPrice && item.product.actualPrice > item.priceAtAdd && (
// // // //                               <span className="text-lg text-muted-foreground line-through">
// // // //                                 ₹{item.product.actualPrice}
// // // //                               </span>
// // // //                             )}
// // // //                           </div>

// // // //                           <div className="flex items-center justify-between">
// // // //                             {/* Quantity Controls */}
// // // //                             <div className="flex items-center border rounded-lg">
// // // //                               <Button
// // // //                                 variant="ghost"
// // // //                                 size="sm"
// // // //                                 onClick={() => updateQuantity(item.productCode, item.quantity - 1)}
// // // //                                 disabled={item.quantity <= 1 || isUpdating === item.productCode}
// // // //                               >
// // // //                                 <Minus className="h-4 w-4" />
// // // //                               </Button>
// // // //                               <span className="px-4 py-2 font-semibold">
// // // //                                 {isUpdating === item.productCode ? "..." : item.quantity}
// // // //                               </span>
// // // //                               <Button
// // // //                                 variant="ghost"
// // // //                                 size="sm"
// // // //                                 onClick={() => updateQuantity(item.productCode, item.quantity + 1)}
// // // //                                 disabled={item.quantity >= item.product.inStock || isUpdating === item.productCode}
// // // //                               >
// // // //                                 <Plus className="h-4 w-4" />
// // // //                               </Button>
// // // //                             </div>

// // // //                             {/* Remove Button */}
// // // //                             <Button
// // // //                               variant="ghost"
// // // //                               size="sm"
// // // //                               onClick={() => removeItem(item.productCode)}
// // // //                               className="text-red-600 hover:text-red-700 hover:bg-red-50"
// // // //                             >
// // // //                               <Trash2 className="h-4 w-4" />
// // // //                             </Button>
// // // //                           </div>

// // // //                           <div className="mt-2 text-sm text-muted-foreground">
// // // //                             <span>Stock: {item.product.inStock} available</span>
// // // //                             <span className="mx-2">•</span>
// // // //                             <span>Weight: {item.weightInGrams}g each</span>
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </CardContent>
// // // //                   </Card>
// // // //                 ))}
// // // //               </div>

// // // //               {/* Order Summary */}
// // // //               <div className="space-y-4">
// // // //                 <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg sticky top-4">
// // // //                   <CardHeader>
// // // //                     <CardTitle className="flex items-center gap-2">
// // // //                       <Package className="h-5 w-5" />
// // // //                       Order Summary
// // // //                     </CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent className="space-y-4">
// // // //                     <div className="flex justify-between">
// // // //                       <span>Items ({itemCount})</span>
// // // //                       <span className="font-semibold">₹{itemsTotal}</span>
// // // //                     </div>

// // // //                     <div className="flex justify-between text-sm text-muted-foreground">
// // // //                       <span>Total Weight</span>
// // // //                       <span>
// // // //                         {totalWeight}g ({Math.ceil(totalWeight / 1000)}kg)
// // // //                       </span>
// // // //                     </div>

// // // //                     <Separator />

// // // //                     <div className="flex justify-between text-lg font-bold">
// // // //                       <span>Subtotal</span>
// // // //                       <span className="text-green-600">₹{itemsTotal}</span>
// // // //                     </div>

// // // //                     <div className="text-xs text-muted-foreground">
// // // //                       <div className="flex items-center gap-1 mb-1">
// // // //                         <Truck className="h-3 w-3" />
// // // //                         <span>Delivery charges will be calculated at checkout</span>
// // // //                       </div>
// // // //                       <p>• Gujarat: ₹30 per kg</p>
// // // //                       <p>• Other states: ₹90 per kg</p>
// // // //                     </div>

// // // //                     <Button
// // // //                       onClick={proceedToCheckout}
// // // //                       disabled={selectedItems.length === 0}
// // // //                       className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// // // //                       size="lg"
// // // //                     >
// // // //                       Proceed to Checkout
// // // //                       <ArrowRight className="h-4 w-4 ml-2" />
// // // //                     </Button>

// // // //                     <Button
// // // //                       variant="outline"
// // // //                       onClick={() => router.push("/products/clothes")}
// // // //                       className="w-full bg-transparent"
// // // //                     >
// // // //                       Continue Shopping
// // // //                     </Button>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }


// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { useRouter } from "next/navigation"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Checkbox } from "@/components/ui/checkbox"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Separator } from "@/components/ui/separator"
// // // import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, RefreshCw, Package } from "lucide-react"
// // // import Image from "next/image"
// // // import { toast } from "react-hot-toast"
// // // import { AnimatedBackground } from "@/components/animated-background"
// // // import { useAuth } from "@/app/contexts/auth-provider"

// // // interface CartItem {
// // //   _id: string
// // //   productCode: string
// // //   categoryTypeModel: string
// // //   quantity: number
// // //   weightInGrams: number
// // //   priceAtAdd: number
// // //   product: {
// // //     name: string
// // //     images: string[]
// // //     sellingPrice: number
// // //     actualPrice?: number
// // //     inStock: number
// // //   }
// // // }

// // // export default function CartPage() {
// // //   const router = useRouter()
// // //   const { user, isAuthenticated } = useAuth()
// // //   const [cartItems, setCartItems] = useState<CartItem[]>([])
// // //   const [selectedItems, setSelectedItems] = useState<string[]>([])
// // //   const [isLoading, setIsLoading] = useState(true)
// // //   const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

// // //   useEffect(() => {
// // //     if (!isAuthenticated) {
// // //       router.push("/auth/login")
// // //       return
// // //     }
// // //     fetchCartItems()
// // //   }, [isAuthenticated])

// // //   const fetchCartItems = async () => {
// // //     if (!user?.email) return

// // //     try {
// // //       setIsLoading(true)
// // //       const response = await fetch(`/api/cart?userEmail=${encodeURIComponent(user.email)}`)
// // //       if (!response.ok) throw new Error("Failed to fetch cart")

// // //       const data = await response.json()
// // //       setCartItems(data.data || [])
// // //     } catch (error) {
// // //       console.error("Error fetching cart:", error)
// // //       toast.error("Failed to load cart")
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const updateQuantity = async (productCode: string, newQuantity: number) => {
// // //     if (!user?.email) return

// // //     setUpdatingItems((prev) => new Set(prev).add(productCode))

// // //     try {
// // //       const response = await fetch("/api/cart", {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           userEmail: user.email,
// // //           productCode,
// // //           quantity: newQuantity,
// // //         }),
// // //       })

// // //       if (!response.ok) {
// // //         const error = await response.json()
// // //         throw new Error(error.error || "Failed to update quantity")
// // //       }

// // //       await fetchCartItems()

// // //       if (newQuantity === 0) {
// // //         setSelectedItems((prev) => prev.filter((code) => code !== productCode))
// // //         toast.success("Item removed from cart")
// // //       }
// // //     } catch (error: any) {
// // //       console.error("Error updating quantity:", error)
// // //       toast.error(error.message || "Failed to update quantity")
// // //     } finally {
// // //       setUpdatingItems((prev) => {
// // //         const newSet = new Set(prev)
// // //         newSet.delete(productCode)
// // //         return newSet
// // //       })
// // //     }
// // //   }

// // //   const removeItem = async (productCode: string) => {
// // //     if (!user?.email) return

// // //     try {
// // //       const response = await fetch(`/api/cart?userEmail=${encodeURIComponent(user.email)}&productCode=${productCode}`, {
// // //         method: "DELETE",
// // //       })

// // //       if (!response.ok) throw new Error("Failed to remove item")

// // //       await fetchCartItems()
// // //       setSelectedItems((prev) => prev.filter((code) => code !== productCode))
// // //       toast.success("Item removed from cart")
// // //     } catch (error) {
// // //       console.error("Error removing item:", error)
// // //       toast.error("Failed to remove item")
// // //     }
// // //   }

// // //   const handleSelectItem = (productCode: string, checked: boolean) => {
// // //     if (checked) {
// // //       setSelectedItems((prev) => [...prev, productCode])
// // //     } else {
// // //       setSelectedItems((prev) => prev.filter((code) => code !== productCode))
// // //     }
// // //   }

// // //   const handleSelectAll = (checked: boolean) => {
// // //     if (checked) {
// // //       setSelectedItems(cartItems.map((item) => item.productCode))
// // //     } else {
// // //       setSelectedItems([])
// // //     }
// // //   }

// // //   const proceedToCheckout = () => {
// // //     if (selectedItems.length === 0) {
// // //       toast.error("Please select items to checkout")
// // //       return
// // //     }

// // //     localStorage.setItem("checkoutItems", JSON.stringify(selectedItems))
// // //     router.push("/checkout")
// // //   }

// // //   const calculateSelectedTotals = () => {
// // //     const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.productCode))
// // //     const itemsTotal = selectedCartItems.reduce((sum, item) => sum + item.priceAtAdd * item.quantity, 0)
// // //     const totalWeight = selectedCartItems.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)
// // //     const itemCount = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0)

// // //     return { itemsTotal, totalWeight, itemCount }
// // //   }

// // //   if (!isAuthenticated) {
// // //     return null
// // //   }

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen relative">
// // //         <AnimatedBackground />
// // //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// // //           <div className="flex items-center gap-3 text-lg font-medium">
// // //             <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
// // //             Loading Cart...
// // //           </div>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   const { itemsTotal, totalWeight, itemCount } = calculateSelectedTotals()

// // //   return (
// // //     <div className="min-h-screen relative">
// // //       <AnimatedBackground />
// // //       <div className="relative z-10">
// // //         <div className="container mx-auto px-4 py-6">
// // //           {/* Header */}
// // //           <div className="flex items-center gap-3 mb-6">
// // //             <ShoppingCart className="h-8 w-8 text-pink-500" />
// // //             <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
// // //               Shopping Cart
// // //             </h1>
// // //             <Badge variant="secondary" className="ml-2">
// // //               {cartItems.length} items
// // //             </Badge>
// // //           </div>

// // //           {cartItems.length === 0 ? (
// // //             <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
// // //               <CardContent className="flex flex-col items-center justify-center py-12">
// // //                 <Package className="h-16 w-16 text-gray-400 mb-4" />
// // //                 <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
// // //                 <p className="text-muted-foreground mb-6">Add some items to get started</p>
// // //                 <Button
// // //                   onClick={() => router.push("/products/clothes")}
// // //                   className="bg-gradient-to-r from-pink-500 to-purple-500"
// // //                 >
// // //                   Continue Shopping
// // //                 </Button>
// // //               </CardContent>
// // //             </Card>
// // //           ) : (
// // //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //               {/* Cart Items */}
// // //               <div className="lg:col-span-2 space-y-4">
// // //                 {/* Select All */}
// // //                 <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
// // //                   <CardContent className="p-4">
// // //                     <div className="flex items-center space-x-2">
// // //                       <Checkbox
// // //                         id="select-all"
// // //                         checked={selectedItems.length === cartItems.length}
// // //                         onCheckedChange={handleSelectAll}
// // //                       />
// // //                       <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
// // //                         Select All ({cartItems.length} items)
// // //                       </label>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 {/* Cart Items List */}
// // //                 {cartItems.map((item) => (
// // //                   <Card
// // //                     key={item.productCode}
// // //                     className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
// // //                   >
// // //                     <CardContent className="p-4">
// // //                       <div className="flex items-start gap-4">
// // //                         {/* Checkbox */}
// // //                         <Checkbox
// // //                           checked={selectedItems.includes(item.productCode)}
// // //                           onCheckedChange={(checked) => handleSelectItem(item.productCode, checked as boolean)}
// // //                           className="mt-2"
// // //                         />

// // //                         {/* Product Image */}
// // //                         <div className="flex-shrink-0">
// // //                           <Image
// // //                             src={item.product.images[0] || "/placeholder.svg"}
// // //                             alt={item.product.name}
// // //                             width={100}
// // //                             height={100}
// // //                             className="rounded-lg object-cover"
// // //                           />
// // //                         </div>

// // //                         {/* Product Details */}
// // //                         <div className="flex-1 min-w-0">
// // //                           <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
// // //                           <p className="text-sm text-muted-foreground mb-2">Code: {item.productCode}</p>

// // //                           <div className="flex items-center gap-2 mb-3">
// // //                             <span className="text-lg font-bold text-green-600">₹{item.priceAtAdd}</span>
// // //                             {item.product.actualPrice && item.product.actualPrice > item.priceAtAdd && (
// // //                               <span className="text-sm text-muted-foreground line-through">
// // //                                 ₹{item.product.actualPrice}
// // //                               </span>
// // //                             )}
// // //                           </div>

// // //                           <div className="flex items-center justify-between">
// // //                             {/* Quantity Controls */}
// // //                             <div className="flex items-center gap-2">
// // //                               <Button
// // //                                 variant="outline"
// // //                                 size="sm"
// // //                                 onClick={() => updateQuantity(item.productCode, item.quantity - 1)}
// // //                                 disabled={updatingItems.has(item.productCode) || item.quantity <= 1}
// // //                                 className="h-8 w-8 p-0"
// // //                               >
// // //                                 <Minus className="h-3 w-3" />
// // //                               </Button>

// // //                               <span className="mx-3 font-semibold min-w-[2rem] text-center">
// // //                                 {updatingItems.has(item.productCode) ? "..." : item.quantity}
// // //                               </span>

// // //                               <Button
// // //                                 variant="outline"
// // //                                 size="sm"
// // //                                 onClick={() => updateQuantity(item.productCode, item.quantity + 1)}
// // //                                 disabled={updatingItems.has(item.productCode) || item.quantity >= item.product.inStock}
// // //                                 className="h-8 w-8 p-0"
// // //                               >
// // //                                 <Plus className="h-3 w-3" />
// // //                               </Button>
// // //                             </div>

// // //                             {/* Remove Button */}
// // //                             <Button
// // //                               variant="ghost"
// // //                               size="sm"
// // //                               onClick={() => removeItem(item.productCode)}
// // //                               className="text-red-600 hover:text-red-700 hover:bg-red-50"
// // //                             >
// // //                               <Trash2 className="h-4 w-4" />
// // //                             </Button>
// // //                           </div>

// // //                           {/* Stock Warning */}
// // //                           {item.product.inStock <= 5 && (
// // //                             <p className="text-sm text-orange-600 mt-2">Only {item.product.inStock} left in stock</p>
// // //                           )}
// // //                         </div>

// // //                         {/* Item Total */}
// // //                         <div className="text-right">
// // //                           <p className="text-lg font-bold">₹{item.priceAtAdd * item.quantity}</p>
// // //                           <p className="text-xs text-muted-foreground">{item.weightInGrams * item.quantity}g</p>
// // //                         </div>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))}
// // //               </div>

// // //               {/* Order Summary */}
// // //               <div className="space-y-4">
// // //                 <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg sticky top-4">
// // //                   <CardHeader>
// // //                     <CardTitle>Order Summary</CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent className="space-y-4">
// // //                     <div className="flex justify-between">
// // //                       <span>Selected Items</span>
// // //                       <span>{itemCount}</span>
// // //                     </div>

// // //                     <div className="flex justify-between">
// // //                       <span>Subtotal</span>
// // //                       <span className="font-semibold">₹{itemsTotal}</span>
// // //                     </div>

// // //                     <div className="flex justify-between text-sm text-muted-foreground">
// // //                       <span>Total Weight</span>
// // //                       <span>{totalWeight}g</span>
// // //                     </div>

// // //                     <Separator />

// // //                     <div className="text-sm text-muted-foreground">
// // //                       Delivery charges will be calculated at checkout based on your location
// // //                     </div>

// // //                     <Button
// // //                       onClick={proceedToCheckout}
// // //                       disabled={selectedItems.length === 0}
// // //                       className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// // //                       size="lg"
// // //                     >
// // //                       Proceed to Checkout
// // //                       <ArrowRight className="h-4 w-4 ml-2" />
// // //                     </Button>

// // //                     <Button variant="outline" onClick={() => router.push("/products/clothes")} className="w-full">
// // //                       Continue Shopping
// // //                     </Button>
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }


// // "use client"

// // import { useState, useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import { Separator } from "@/components/ui/separator"
// // import { Badge } from "@/components/ui/badge"
// // import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package, Truck, Heart, ShoppingBag } from "lucide-react"
// // import Image from "next/image"
// // import Link from "next/link"
// // import { toast } from "react-hot-toast"
// // import { AnimatedBackground } from "@/components/animated-background"

// // interface CartItem {
// //   _id: string
// //   name: string
// //   sellingPrice: number
// //   actualPrice?: number
// //   images: string[]
// //   inStock: number
// //   weightInGrams: number
// //   quantity: number
// //   // Additional fields based on product type
// //   category?: ("boy" | "girl")[]
// //   ageGroup?: ("0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5")[]
// //   size?: string
// //   color?: string
// //   type?: string
// //   sizeInMl?: number
// // }

// // export default function CartPage() {
// //   const router = useRouter()
// //   const [cartItems, setCartItems] = useState<CartItem[]>([])
// //   const [selectedItems, setSelectedItems] = useState<string[]>([])
// //   const [isLoading, setIsLoading] = useState(true)

// //   useEffect(() => {
// //     loadCartItems()
// //   }, [])

// //   const loadCartItems = () => {
// //     try {
// //       setIsLoading(true)
// //       const savedCart = localStorage.getItem("cart")
// //       if (savedCart) {
// //         const cartData = JSON.parse(savedCart)
// //         setCartItems(Array.isArray(cartData) ? cartData : [])
// //         // Select all items by default
// //         setSelectedItems(Array.isArray(cartData) ? cartData.map((item: CartItem) => item._id) : [])
// //       }
// //     } catch (error) {
// //       console.error("Error loading cart:", error)
// //       toast.error("Failed to load cart items")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const updateCartInStorage = (updatedCart: CartItem[]) => {
// //     localStorage.setItem("cart", JSON.stringify(updatedCart))
// //     window.dispatchEvent(new Event("cartUpdated"))
// //   }

// //   const updateQuantity = (itemId: string, newQuantity: number) => {
// //     const updatedCart = cartItems
// //       .map((item) => {
// //         if (item._id === itemId) {
// //           if (newQuantity <= 0) {
// //             return null // Will be filtered out
// //           }
// //           if (newQuantity > item.inStock) {
// //             toast.error("Cannot add more items than available stock")
// //             return item
// //           }
// //           return { ...item, quantity: newQuantity }
// //         }
// //         return item
// //       })
// //       .filter(Boolean) as CartItem[]

// //     setCartItems(updatedCart)
// //     updateCartInStorage(updatedCart)

// //     if (newQuantity <= 0) {
// //       setSelectedItems((prev) => prev.filter((id) => id !== itemId))
// //     }
// //   }

// //   const removeItem = (itemId: string) => {
// //     const updatedCart = cartItems.filter((item) => item._id !== itemId)
// //     setCartItems(updatedCart)
// //     updateCartInStorage(updatedCart)
// //     setSelectedItems((prev) => prev.filter((id) => id !== itemId))
// //     toast.success("Item removed from cart")
// //   }

// //   const toggleItemSelection = (itemId: string) => {
// //     setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
// //   }

// //   const toggleSelectAll = () => {
// //     if (selectedItems.length === cartItems.length) {
// //       setSelectedItems([])
// //     } else {
// //       setSelectedItems(cartItems.map((item) => item._id))
// //     }
// //   }

// //   const moveToWishlist = (item: CartItem) => {
// //     try {
// //       // Add to wishlist
// //       const savedWishlist = localStorage.getItem("wishlist")
// //       const wishlistData = savedWishlist ? JSON.parse(savedWishlist) : []
// //       const existingIndex = wishlistData.findIndex((w: any) => w._id === item._id)

// //       if (existingIndex === -1) {
// //         wishlistData.push(item)
// //         localStorage.setItem("wishlist", JSON.stringify(wishlistData))
// //         window.dispatchEvent(new Event("wishlistUpdated"))
// //       }

// //       // Remove from cart
// //       removeItem(item._id)
// //       toast.success("Item moved to wishlist")
// //     } catch (error) {
// //       console.error("Error moving to wishlist:", error)
// //       toast.error("Failed to move item to wishlist")
// //     }
// //   }

// //   const getSelectedItems = () => {
// //     return cartItems.filter((item) => selectedItems.includes(item._id))
// //   }

// //   const calculateTotals = () => {
// //     const selected = getSelectedItems()
// //     const subtotal = selected.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0)
// //     const totalWeight = selected.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)
// //     const totalItems = selected.reduce((sum, item) => sum + item.quantity, 0)

// //     return {
// //       subtotal,
// //       totalWeight,
// //       totalItems,
// //       itemCount: selected.length,
// //     }
// //   }

// //   const proceedToCheckout = () => {
// //     if (selectedItems.length === 0) {
// //       toast.error("Please select items to checkout")
// //       return
// //     }

// //     // Store selected items for checkout
// //     const selectedCartItems = getSelectedItems()
// //     localStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems))
// //     router.push("/checkout")
// //   }

// //   const getDiscountPercentage = (selling: number, actual?: number) => {
// //     if (!actual || actual <= selling) return 0
// //     return Math.round(((actual - selling) / actual) * 100)
// //   }

// //   const totals = calculateTotals()

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (cartItems.length === 0) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10">
// //           <div className="container mx-auto px-4 py-12">
// //             <div className="text-center">
// //               <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
// //               <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
// //               <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
// //               <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //                 <Button
// //                   asChild
// //                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //                 >
// //                   <Link href="/products/clothes">
// //                     <ShoppingBag className="h-4 w-4 mr-2" />
// //                     Shop Clothes
// //                   </Link>
// //                 </Button>
// //                 <Button asChild variant="outline">
// //                   <Link href="/products/bath">
// //                     <Package className="h-4 w-4 mr-2" />
// //                     Shop Bath Items
// //                   </Link>
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen relative">
// //       <AnimatedBackground />
// //       <div className="relative z-10">
// //         <div className="container mx-auto px-4 py-6">
// //           {/* Header */}
// //           <div className="mb-8">
// //             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
// //               <ShoppingCart className="h-8 w-8 text-pink-500" />
// //               Shopping Cart
// //             </h1>
// //             <p className="text-muted-foreground mt-2">
// //               {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //             {/* Cart Items */}
// //             <div className="lg:col-span-2 space-y-4">
// //               {/* Select All */}
// //               <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //                 <CardContent className="p-4">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-2">
// //                       <Checkbox
// //                         id="select-all"
// //                         checked={selectedItems.length === cartItems.length}
// //                         onCheckedChange={toggleSelectAll}
// //                       />
// //                       <label htmlFor="select-all" className="font-medium">
// //                         Select All ({cartItems.length} items)
// //                       </label>
// //                     </div>
// //                     <div className="text-sm text-muted-foreground">{selectedItems.length} selected</div>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Cart Items List */}
// //               {cartItems.map((item) => {
// //                 const discount = getDiscountPercentage(item.sellingPrice, item.actualPrice)
// //                 const isSelected = selectedItems.includes(item._id)

// //                 return (
// //                   <Card
// //                     key={item._id}
// //                     className={`border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg transition-all ${
// //                       isSelected ? "ring-2 ring-pink-500" : ""
// //                     }`}
// //                   >
// //                     <CardContent className="p-4">
// //                       <div className="flex items-start gap-4">
// //                         {/* Checkbox */}
// //                         <Checkbox
// //                           checked={isSelected}
// //                           onCheckedChange={() => toggleItemSelection(item._id)}
// //                           className="mt-2"
// //                         />

// //                         {/* Product Image */}
// //                         <div className="flex-shrink-0">
// //                           <Link href={`/products/${item.category ? "clothes" : "bath"}/${item._id}`}>
// //                             <Image
// //                               src={item.images[0] || "/placeholder.svg"}
// //                               alt={item.name}
// //                               width={100}
// //                               height={100}
// //                               className="rounded-lg object-cover hover:scale-105 transition-transform"
// //                             />
// //                           </Link>
// //                         </div>

// //                         {/* Product Details */}
// //                         <div className="flex-1 min-w-0">
// //                           <Link
// //                             href={`/products/${item.category ? "clothes" : "bath"}/${item._id}`}
// //                             className="hover:text-pink-600 transition-colors"
// //                           >
// //                             <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
// //                           </Link>

// //                           {/* Product Attributes */}
// //                           <div className="flex flex-wrap gap-2 mb-3">
// //                             {item.category &&
// //                               item.category.map((cat) => (
// //                                 <Badge key={cat} variant="outline" className="text-xs capitalize">
// //                                   {cat}
// //                                 </Badge>
// //                               ))}
// //                             {item.size && (
// //                               <Badge variant="secondary" className="text-xs">
// //                                 Size: {item.size}
// //                               </Badge>
// //                             )}
// //                             {item.color && (
// //                               <Badge variant="secondary" className="text-xs">
// //                                 {item.color}
// //                               </Badge>
// //                             )}
// //                             {item.type && (
// //                               <Badge variant="outline" className="text-xs capitalize">
// //                                 {item.type}
// //                               </Badge>
// //                             )}
// //                             {item.sizeInMl && (
// //                               <Badge variant="secondary" className="text-xs">
// //                                 {item.sizeInMl}ml
// //                               </Badge>
// //                             )}
// //                           </div>

// //                           {/* Price */}
// //                           <div className="flex items-center gap-2 mb-3">
// //                             <span className="text-xl font-bold text-green-600">₹{item.sellingPrice}</span>
// //                             {item.actualPrice && item.actualPrice > item.sellingPrice && (
// //                               <span className="text-sm text-muted-foreground line-through">₹{item.actualPrice}</span>
// //                             )}
// //                             {discount > 0 && <Badge className="bg-red-500 text-white text-xs">-{discount}%</Badge>}
// //                           </div>

// //                           {/* Stock Status */}
// //                           <div className="mb-3">
// //                             <Badge
// //                               variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}
// //                             >
// //                               {item.inStock > 10
// //                                 ? "In Stock"
// //                                 : item.inStock > 0
// //                                   ? `Only ${item.inStock} left`
// //                                   : "Out of Stock"}
// //                             </Badge>
// //                           </div>

// //                           {/* Quantity Controls */}
// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center gap-3">
// //                               <div className="flex items-center border rounded-lg">
// //                                 <Button
// //                                   variant="ghost"
// //                                   size="sm"
// //                                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
// //                                   disabled={item.quantity <= 1}
// //                                 >
// //                                   <Minus className="h-4 w-4" />
// //                                 </Button>
// //                                 <span className="px-3 py-1 font-semibold">{item.quantity}</span>
// //                                 <Button
// //                                   variant="ghost"
// //                                   size="sm"
// //                                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
// //                                   disabled={item.quantity >= item.inStock}
// //                                 >
// //                                   <Plus className="h-4 w-4" />
// //                                 </Button>
// //                               </div>
// //                               <span className="text-sm text-muted-foreground">
// //                                 ₹{item.sellingPrice * item.quantity}
// //                               </span>
// //                             </div>

// //                             {/* Action Buttons */}
// //                             <div className="flex items-center gap-2">
// //                               <Button
// //                                 variant="ghost"
// //                                 size="sm"
// //                                 onClick={() => moveToWishlist(item)}
// //                                 className="text-pink-600 hover:text-pink-700"
// //                               >
// //                                 <Heart className="h-4 w-4" />
// //                               </Button>
// //                               <Button
// //                                 variant="ghost"
// //                                 size="sm"
// //                                 onClick={() => removeItem(item._id)}
// //                                 className="text-red-600 hover:text-red-700"
// //                               >
// //                                 <Trash2 className="h-4 w-4" />
// //                               </Button>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 )
// //               })}
// //             </div>

// //             {/* Order Summary */}
// //             <div className="lg:col-span-1">
// //               <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg sticky top-6">
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2">
// //                     <Package className="h-5 w-5" />
// //                     Order Summary
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <div className="space-y-2">
// //                     <div className="flex justify-between text-sm">
// //                       <span>Selected Items ({totals.itemCount})</span>
// //                       <span>{totals.totalItems} pieces</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm">
// //                       <span>Total Weight</span>
// //                       <span>{Math.ceil(totals.totalWeight / 1000)}kg</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span>Subtotal</span>
// //                       <span className="font-semibold">₹{totals.subtotal}</span>
// //                     </div>
// //                   </div>

// //                   <Separator />

// //                   <div className="space-y-2">
// //                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                       <Truck className="h-4 w-4" />
// //                       <span>Delivery charges calculated at checkout</span>
// //                     </div>
// //                     <p className="text-xs text-muted-foreground">₹30/kg within Gujarat • ₹90/kg outside Gujarat</p>
// //                   </div>

// //                   <Separator />

// //                   <div className="flex justify-between text-lg font-bold">
// //                     <span>Total</span>
// //                     <span className="text-green-600">₹{totals.subtotal}</span>
// //                   </div>

// //                   <Button
// //                     onClick={proceedToCheckout}
// //                     disabled={selectedItems.length === 0}
// //                     className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //                     size="lg"
// //                   >
// //                     Proceed to Checkout
// //                     <ArrowRight className="h-4 w-4 ml-2" />
// //                   </Button>

// //                   {selectedItems.length === 0 && (
// //                     <p className="text-sm text-muted-foreground text-center">Select items to proceed to checkout</p>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }


// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\cart\page.tsx
// // "use client"

// // import { useState, useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import { Separator } from "@/components/ui/separator"
// // import { Badge } from "@/components/ui/badge"
// // import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package, Truck, Heart, ShoppingBag } from "lucide-react"
// // import Image from "next/image"
// // import Link from "next/link"
// // import { toast } from "react-hot-toast"
// // import { AnimatedBackground } from "@/components/animated-background"

// // interface CartItem {
// //   _id: string
// //   name: string
// //   sellingPrice: number
// //   actualPrice?: number
// //   images: string[]
// //   inStock: number
// //   weightInGrams: number
// //   quantity: number
// //   // Additional fields based on product type
// //   category?: ("boy" | "girl")[]
// //   ageGroup?: ("0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5")[]
// //   size?: string
// //   color?: string
// //   type?: string
// //   sizeInMl?: number
// // }

// // export default function CartPage() {
// //   const router = useRouter()
// //   const [cartItems, setCartItems] = useState<CartItem[]>([])
// //   const [selectedItems, setSelectedItems] = useState<string[]>([])
// //   const [isLoading, setIsLoading] = useState(true)

// //   useEffect(() => {
// //     loadCartItems()
// //   }, [])

// //   const loadCartItems = () => {
// //     try {
// //       setIsLoading(true)
// //       const savedCart = localStorage.getItem("cart")
// //       if (savedCart) {
// //         const cartData = JSON.parse(savedCart)
// //         setCartItems(Array.isArray(cartData) ? cartData : [])
// //         // Select all items by default
// //         setSelectedItems(Array.isArray(cartData) ? cartData.map((item: CartItem) => item._id) : [])
// //       }
// //     } catch (error) {
// //       console.error("Error loading cart:", error)
// //       toast.error("Failed to load cart items")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const updateCartInStorage = (updatedCart: CartItem[]) => {
// //     localStorage.setItem("cart", JSON.stringify(updatedCart))
// //     window.dispatchEvent(new Event("cartUpdated"))
// //   }

// //   const updateQuantity = (itemId: string, newQuantity: number) => {
// //     const updatedCart = cartItems
// //       .map((item) => {
// //         if (item._id === itemId) {
// //           if (newQuantity <= 0) {
// //             return null // Will be filtered out
// //           }
// //           if (newQuantity > item.inStock) {
// //             toast.error("Cannot add more items than available stock")
// //             return item
// //           }
// //           return { ...item, quantity: newQuantity }
// //         }
// //         return item
// //       })
// //       .filter(Boolean) as CartItem[]

// //     setCartItems(updatedCart)
// //     updateCartInStorage(updatedCart)

// //     if (newQuantity <= 0) {
// //       setSelectedItems((prev) => prev.filter((id) => id !== itemId))
// //     }
// //   }

// //   const removeItem = (itemId: string) => {
// //     const updatedCart = cartItems.filter((item) => item._id !== itemId)
// //     setCartItems(updatedCart)
// //     updateCartInStorage(updatedCart)
// //     setSelectedItems((prev) => prev.filter((id) => id !== itemId))
// //     toast.success("Item removed from cart")
// //   }

// //   const toggleItemSelection = (itemId: string) => {
// //     setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
// //   }

// //   const toggleSelectAll = () => {
// //     if (selectedItems.length === cartItems.length) {
// //       setSelectedItems([])
// //     } else {
// //       setSelectedItems(cartItems.map((item) => item._id))
// //     }
// //   }

// //   const moveToWishlist = (item: CartItem) => {
// //     try {
// //       // Add to wishlist
// //       const savedWishlist = localStorage.getItem("wishlist")
// //       const wishlistData = savedWishlist ? JSON.parse(savedWishlist) : []
// //       const existingIndex = wishlistData.findIndex((w: any) => w._id === item._id)

// //       if (existingIndex === -1) {
// //         wishlistData.push(item)
// //         localStorage.setItem("wishlist", JSON.stringify(wishlistData))
// //         window.dispatchEvent(new Event("wishlistUpdated"))
// //       }

// //       // Remove from cart
// //       removeItem(item._id)
// //       toast.success("Item moved to wishlist")
// //     } catch (error) {
// //       console.error("Error moving to wishlist:", error)
// //       toast.error("Failed to move item to wishlist")
// //     }
// //   }

// //   const getSelectedItems = () => {
// //     return cartItems.filter((item) => selectedItems.includes(item._id))
// //   }

// //   const calculateTotals = () => {
// //     const selected = getSelectedItems()
// //     const subtotal = selected.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0)
// //     const totalWeight = selected.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)
// //     const totalItems = selected.reduce((sum, item) => sum + item.quantity, 0)

// //     return {
// //       subtotal,
// //       totalWeight,
// //       totalItems,
// //       itemCount: selected.length,
// //     }
// //   }

// //   const proceedToCheckout = () => {
// //     if (selectedItems.length === 0) {
// //       toast.error("Please select items to checkout")
// //       return
// //     }

// //     // Store selected items for checkout
// //     const selectedCartItems = getSelectedItems()
// //     localStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems))
// //     router.push("/checkout")
// //   }

// //   const getDiscountPercentage = (selling: number, actual?: number) => {
// //     if (!actual || actual <= selling) return 0
// //     return Math.round(((actual - selling) / actual) * 100)
// //   }

// //   const totals = calculateTotals()

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10 flex items-center justify-center min-h-screen">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (cartItems.length === 0) {
// //     return (
// //       <div className="min-h-screen relative">
// //         <AnimatedBackground />
// //         <div className="relative z-10">
// //           <div className="container mx-auto px-4 py-12">
// //             <div className="text-center">
// //               <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
// //               <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
// //               <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
// //               <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //                 <Button
// //                   asChild
// //                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //                 >
// //                   <Link href="/products/clothes">
// //                     <ShoppingBag className="h-4 w-4 mr-2" />
// //                     Shop Clothes
// //                   </Link>
// //                 </Button>
// //                 <Button asChild variant="outline">
// //                   <Link href="/products/bath">
// //                     <Package className="h-4 w-4 mr-2" />
// //                     Shop Bath Items
// //                   </Link>
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen relative">
// //       <AnimatedBackground />
// //       <div className="relative z-10">
// //         <div className="container mx-auto px-4 py-6">
// //           {/* Header */}
// //           <div className="mb-8">
// //             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
// //               <ShoppingCart className="h-8 w-8 text-pink-500" />
// //               Shopping Cart
// //             </h1>
// //             <p className="text-muted-foreground mt-2">
// //               {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //             {/* Cart Items */}
// //             <div className="lg:col-span-2 space-y-4">
// //               {/* Select All */}
// //               <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
// //                 <CardContent className="p-4">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-2">
// //                       <Checkbox
// //                         id="select-all"
// //                         checked={selectedItems.length === cartItems.length}
// //                         onCheckedChange={toggleSelectAll}
// //                       />
// //                       <label htmlFor="select-all" className="font-medium">
// //                         Select All ({cartItems.length} items)
// //                       </label>
// //                     </div>
// //                     <div className="text-sm text-muted-foreground">{selectedItems.length} selected</div>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Cart Items List */}
// //               {cartItems.map((item) => {
// //                 const discount = getDiscountPercentage(item.sellingPrice, item.actualPrice)
// //                 const isSelected = selectedItems.includes(item._id)

// //                 return (
// //                   <Card
// //                     key={item._id}
// //                     className={`border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg transition-all ${
// //                       isSelected ? "ring-2 ring-pink-500" : ""
// //                     }`}
// //                   >
// //                     <CardContent className="p-4">
// //                       <div className="flex items-start gap-4">
// //                         {/* Checkbox */}
// //                         <Checkbox
// //                           checked={isSelected}
// //                           onCheckedChange={() => toggleItemSelection(item._id)}
// //                           className="mt-2"
// //                         />

// //                         {/* Product Image */}
// //                         <div className="flex-shrink-0">
// //                           <Link href={`/products/${item.category ? "clothes" : "bath"}/${item._id}`}>
// //                             <Image
// //                               src={item.images[0] || "/placeholder.svg"}
// //                               alt={item.name}
// //                               width={100}
// //                               height={100}
// //                               className="rounded-lg object-cover hover:scale-105 transition-transform"
// //                             />
// //                           </Link>
// //                         </div>

// //                         {/* Product Details */}
// //                         <div className="flex-1 min-w-0">
// //                           <Link
// //                             href={`/products/${item.category ? "clothes" : "bath"}/${item._id}`}
// //                             className="hover:text-pink-600 transition-colors"
// //                           >
// //                             <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
// //                           </Link>

// //                           {/* Product Attributes */}
// //                           <div className="flex flex-wrap gap-2 mb-3">
// //                             {item.category &&
// //                               item.category.map((cat) => (
// //                                 <Badge key={cat} variant="outline" className="text-xs capitalize">
// //                                   {cat}
// //                                 </Badge>
// //                               ))}
// //                             {item.size && (
// //                               <Badge variant="secondary" className="text-xs">
// //                                 Size: {item.size}
// //                               </Badge>
// //                             )}
// //                             {item.color && (
// //                               <Badge variant="secondary" className="text-xs">
// //                                 {item.color}
// //                               </Badge>
// //                             )}
// //                             {item.type && (
// //                               <Badge variant="outline" className="text-xs capitalize">
// //                                 {item.type}
// //                               </Badge>
// //                             )}
// //                             {item.sizeInMl && (
// //                               <Badge variant="secondary" className="text-xs">
// //                                 {item.sizeInMl}ml
// //                               </Badge>
// //                             )}
// //                           </div>

// //                           {/* Price */}
// //                           <div className="flex items-center gap-2 mb-3">
// //                             <span className="text-xl font-bold text-green-600">₹{item.sellingPrice}</span>
// //                             {item.actualPrice && item.actualPrice > item.sellingPrice && (
// //                               <span className="text-sm text-muted-foreground line-through">₹{item.actualPrice}</span>
// //                             )}
// //                             {discount > 0 && <Badge className="bg-red-500 text-white text-xs">-{discount}%</Badge>}
// //                           </div>

// //                           {/* Stock Status */}
// //                           <div className="mb-3">
// //                             <Badge
// //                               variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}
// //                             >
// //                               {item.inStock > 10
// //                                 ? "In Stock"
// //                                 : item.inStock > 0
// //                                   ? `Only ${item.inStock} left`
// //                                   : "Out of Stock"}
// //                             </Badge>
// //                           </div>

// //                           {/* Quantity Controls */}
// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center gap-3">
// //                               <div className="flex items-center border rounded-lg">
// //                                 <Button
// //                                   variant="ghost"
// //                                   size="sm"
// //                                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
// //                                   disabled={item.quantity <= 1}
// //                                 >
// //                                   <Minus className="h-4 w-4" />
// //                                 </Button>
// //                                 <span className="px-3 py-1 font-semibold">{item.quantity}</span>
// //                                 <Button
// //                                   variant="ghost"
// //                                   size="sm"
// //                                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
// //                                   disabled={item.quantity >= item.inStock}
// //                                 >
// //                                   <Plus className="h-4 w-4" />
// //                                 </Button>
// //                               </div>
// //                               <span className="text-sm text-muted-foreground">
// //                                 ₹{item.sellingPrice * item.quantity}
// //                               </span>
// //                             </div>

// //                             {/* Action Buttons */}
// //                             <div className="flex items-center gap-2">
// //                               <Button
// //                                 variant="ghost"
// //                                 size="sm"
// //                                 onClick={() => moveToWishlist(item)}
// //                                 className="text-pink-600 hover:text-pink-700"
// //                               >
// //                                 <Heart className="h-4 w-4" />
// //                               </Button>
// //                               <Button
// //                                 variant="ghost"
// //                                 size="sm"
// //                                 onClick={() => removeItem(item._id)}
// //                                 className="text-red-600 hover:text-red-700"
// //                               >
// //                                 <Trash2 className="h-4 w-4" />
// //                               </Button>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 )
// //               })}
// //             </div>

// //             {/* Order Summary */}
// //             <div className="lg:col-span-1">
// //               <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg sticky top-6">
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2">
// //                     <Package className="h-5 w-5" />
// //                     Order Summary
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <div className="space-y-2">
// //                     <div className="flex justify-between text-sm">
// //                       <span>Selected Items ({totals.itemCount})</span>
// //                       <span>{totals.totalItems} pieces</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm">
// //                       <span>Total Weight</span>
// //                       <span>{Math.ceil(totals.totalWeight / 1000)}kg</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span>Subtotal</span>
// //                       <span className="font-semibold">₹{totals.subtotal}</span>
// //                     </div>
// //                   </div>

// //                   <Separator />

// //                   <div className="space-y-2">
// //                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                       <Truck className="h-4 w-4" />
// //                       <span>Delivery charges calculated at checkout</span>
// //                     </div>
// //                     <p className="text-xs text-muted-foreground">₹30/kg within Gujarat • ₹90/kg outside Gujarat</p>
// //                   </div>

// //                   <Separator />

// //                   <div className="flex justify-between text-lg font-bold">
// //                     <span>Total</span>
// //                     <span className="text-green-600">₹{totals.subtotal}</span>
// //                   </div>

// //                   <Button
// //                     onClick={proceedToCheckout}
// //                     disabled={selectedItems.length === 0}
// //                     className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
// //                     size="lg"
// //                   >
// //                     Proceed to Checkout
// //                     <ArrowRight className="h-4 w-4 ml-2" />
// //                   </Button>

// //                   {selectedItems.length === 0 && (
// //                     <p className="text-sm text-muted-foreground text-center">Select items to proceed to checkout</p>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
















// //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\app\cart\page.tsx
// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package, Truck, Heart, ShoppingBag } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { toast } from "react-hot-toast"
// import { AnimatedBackground } from "@/components/animated-background"

// interface CartItem {
//   _id: string
//   name: string
//   sellingPrice: number
//   actualPrice?: number
//   images: string[]
//   inStock: number
//   weightInGrams: number
//   quantity: number
//   // Additional fields based on product type
//   category?: ("boy" | "girl")[]
//   ageGroup?: ("0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5")[]
//   categoryTypemodel?: string
//   size?: string
//   color?: string
//   type?: string
//   sizeInMl?: number
// }

// export default function CartPage() {
//   const router = useRouter()
//   const [cartItems, setCartItems] = useState<CartItem[]>([])
//   const [selectedItems, setSelectedItems] = useState<string[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     loadCartItems()
//   }, [])

//   const loadCartItems = () => {
//     try {
//       setIsLoading(true)
//       const savedCart = localStorage.getItem("cart")
//       if (savedCart) {
//         const cartData = JSON.parse(savedCart)
//         setCartItems(Array.isArray(cartData) ? cartData : [])
//         // Select all items by default
//         setSelectedItems(Array.isArray(cartData) ? cartData.map((item: CartItem) => item._id) : [])
//       }
//     } catch (error) {
//       console.error("Error loading cart:", error)
//       toast.error("Failed to load cart items")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   console.log("cartItems:", cartItems)


//   const updateCartInStorage = (updatedCart: CartItem[]) => {
//     localStorage.setItem("cart", JSON.stringify(updatedCart))
//     window.dispatchEvent(new Event("cartUpdated"))
//   }

//   const updateQuantity = (itemId: string, newQuantity: number) => {
//     const updatedCart = cartItems
//       .map((item) => {
//         if (item._id === itemId) {
//           if (newQuantity <= 0) {
//             return null // Will be filtered out
//           }
//           if (newQuantity > item.inStock) {
//             toast.error("Cannot add more items than available stock")
//             return item
//           }
//           return { ...item, quantity: newQuantity }
//         }
//         return item
//       })
//       .filter(Boolean) as CartItem[]

//     setCartItems(updatedCart)
//     updateCartInStorage(updatedCart)

//     if (newQuantity <= 0) {
//       setSelectedItems((prev) => prev.filter((id) => id !== itemId))
//     }
//   }

//   const removeItem = (itemId: string) => {
//     const updatedCart = cartItems.filter((item) => item._id !== itemId)
//     setCartItems(updatedCart)
//     updateCartInStorage(updatedCart)
//     setSelectedItems((prev) => prev.filter((id) => id !== itemId))
//     toast.success("Item removed from cart")
//   }

//   const toggleItemSelection = (itemId: string) => {
//     setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
//   }

//   const toggleSelectAll = () => {
//     if (selectedItems.length === cartItems.length) {
//       setSelectedItems([])
//     } else {
//       setSelectedItems(cartItems.map((item) => item._id))
//     }
//   }

//   const moveToWishlist = (item: CartItem) => {
//     try {
//       // Add to wishlist
//       const savedWishlist = localStorage.getItem("wishlist")
//       const wishlistData = savedWishlist ? JSON.parse(savedWishlist) : []
//       const existingIndex = wishlistData.findIndex((w: any) => w._id === item._id)

//       if (existingIndex === -1) {
//         wishlistData.push(item)
//         localStorage.setItem("wishlist", JSON.stringify(wishlistData))
//         window.dispatchEvent(new Event("wishlistUpdated"))
//       }

//       // Remove from cart
//       removeItem(item._id)
//       toast.success("Item moved to wishlist")
//     } catch (error) {
//       console.error("Error moving to wishlist:", error)
//       toast.error("Failed to move item to wishlist")
//     }
//   }

//   const getSelectedItems = () => {
//     return cartItems.filter((item) => selectedItems.includes(item._id))
//   }

//   const calculateTotals = () => {
//     const selected = getSelectedItems()
//     const subtotal = selected.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0)
//     const totalWeight = selected.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)
//     const totalItems = selected.reduce((sum, item) => sum + item.quantity, 0)

//     return {
//       subtotal,
//       totalWeight,
//       totalItems,
//       itemCount: selected.length,
//     }
//   }

//   const proceedToCheckout = () => {
//     if (selectedItems.length === 0) {
//       toast.error("Please select items to checkout")
//       return
//     }

//     // Store selected items for checkout
//     const selectedCartItems = getSelectedItems()
//     localStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems))
//     router.push("/checkout")
//   }

//   const getDiscountPercentage = (selling: number, actual?: number) => {
//     if (!actual || actual <= selling) return 0
//     return Math.round(((actual - selling) / actual) * 100)
//   }

//   const totals = calculateTotals()

//   if (isLoading) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10 flex items-center justify-center min-h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//         </div>
//       </div>
//     )
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen relative">
//         <AnimatedBackground />
//         <div className="relative z-10">
//           <div className="container mx-auto px-4 py-12">
//             <div className="text-center">
//               <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
//               <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button
//                   asChild
//                   className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
//                 >
//                   <Link href="/products/clothes">
//                     <ShoppingBag className="h-4 w-4 mr-2" />
//                     Shop Clothes
//                   </Link>
//                 </Button>
//                 <Button asChild variant="outline">
//                   <Link href="/products/bath">
//                     <Package className="h-4 w-4 mr-2" />
//                     Shop Bath Items
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen relative">
//       <AnimatedBackground />
//       <div className="relative z-10">
//         <div className="container mx-auto px-4 py-6">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
//               <ShoppingCart className="h-8 w-8 text-pink-500" />
//               Shopping Cart
//             </h1>
//             <p className="text-muted-foreground mt-2">
//               {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-4">
//               {/* Select All */}
//               <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
//                 <CardContent className="p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id="select-all"
//                         checked={selectedItems.length === cartItems.length}
//                         onCheckedChange={toggleSelectAll}
//                       />
//                       <label htmlFor="select-all" className="font-medium">
//                         Select All ({cartItems.length} items)
//                       </label>
//                     </div>
//                     <div className="text-sm text-muted-foreground">{selectedItems.length} selected</div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Cart Items List */}
//               {cartItems.map((item) => {
//                 const discount = getDiscountPercentage(item.sellingPrice, item.actualPrice)
//                 const isSelected = selectedItems.includes(item._id)

//                 console.log("in cart  item:", item)

//                 return (
//                   <Card
//                     key={item._id}
//                     className={`border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg transition-all ${
//                       isSelected ? "ring-2 ring-pink-500" : ""
//                     }`}
//                   >
//                     <CardContent className="p-4">
//                       <div className="flex items-start gap-4">
//                         {/* Checkbox */}
//                         <Checkbox
//                           checked={isSelected}
//                           onCheckedChange={() => toggleItemSelection(item._id)}
//                           className="mt-2"
//                         />

//                         {/* Product Image */}
//                         <div className="flex-shrink-0">
//                           <Link href={`/products/${item.categoryTypemodel}/${item._id}`}>
//                             <Image
//                               src={item.images[0] || "/placeholder.svg"}
//                               alt={item.name}
//                               width={100}
//                               height={100}
//                               className="rounded-lg object-cover hover:scale-105 transition-transform"
//                             />
//                           </Link>
//                         </div>

//                         {/* Product Details */}
//                         <div className="flex-1 min-w-0">
//                           <Link
//                             href={`/products/${item.category ? "clothes" : "bath"}/${item._id}`}
//                             className="hover:text-pink-600 transition-colors"
//                           >
//                             <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
//                           </Link>

//                           {/* Product Attributes */}
//                           {/* Product Attributes */}
// <div className="flex flex-wrap gap-2 mb-3">
//   {Array.isArray(item.category) &&
//     item.category.map((cat) => (
//       <Badge key={cat} variant="outline" className="text-xs capitalize">
//         {cat}
//       </Badge>
//     ))}
//   {item.size && (
//     <Badge variant="secondary" className="text-xs">
//       Size: {item.size}
//     </Badge>
//   )}
//   {item.color && (
//     <Badge variant="secondary" className="text-xs">
//       {item.color}
//     </Badge>
//   )}
//   {item.type && (
//     <Badge variant="outline" className="text-xs capitalize">
//       {item.type}
//     </Badge>
//   )}
//   {item.sizeInMl && (
//     <Badge variant="secondary" className="text-xs">
//       {item.sizeInMl}ml
//     </Badge>
//   )}
// </div>


//                           {/* Price */}
//                           <div className="flex items-center gap-2 mb-3">
//                             <span className="text-xl font-bold text-green-600">₹{item.sellingPrice}</span>
//                             {item.actualPrice && item.actualPrice > item.sellingPrice && (
//                               <span className="text-sm text-muted-foreground line-through">₹{item.actualPrice}</span>
//                             )}
//                             {discount > 0 && <Badge className="bg-red-500 text-white text-xs">-{discount}%</Badge>}
//                           </div>

//                           {/* Stock Status */}
//                           <div className="mb-3">
//                             <Badge
//                               variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}
//                             >
//                               {item.inStock > 10
//                                 ? "In Stock"
//                                 : item.inStock > 0
//                                   ? `Only ${item.inStock} left`
//                                   : "Out of Stock"}
//                             </Badge>
//                           </div>

//                           {/* Quantity Controls */}
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                               <div className="flex items-center border rounded-lg">
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                                   disabled={item.quantity <= 1}
//                                 >
//                                   <Minus className="h-4 w-4" />
//                                 </Button>
//                                 <span className="px-3 py-1 font-semibold">{item.quantity}</span>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                                   disabled={item.quantity >= item.inStock}
//                                 >
//                                   <Plus className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                               <span className="text-sm text-muted-foreground">
//                                 ₹{item.sellingPrice * item.quantity}
//                               </span>
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => moveToWishlist(item)}
//                                 className="text-pink-600 hover:text-pink-700"
//                               >
//                                 <Heart className="h-4 w-4" />
//                               </Button>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => removeItem(item._id)}
//                                 className="text-red-600 hover:text-red-700"
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )
//               })}
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg sticky top-6">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Package className="h-5 w-5" />
//                     Order Summary
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span>Selected Items ({totals.itemCount})</span>
//                       <span>{totals.totalItems} pieces</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Total Weight</span>
//                       <span>{Math.ceil(totals.totalWeight / 1000)}kg</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span className="font-semibold">₹{totals.subtotal}</span>
//                     </div>
//                   </div>

//                   <Separator />

//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                       <Truck className="h-4 w-4" />
//                       <span>Delivery charges calculated at checkout</span>
//                     </div>
//                     <p className="text-xs text-muted-foreground">₹30/kg within Gujarat • ₹90/kg outside Gujarat</p>
//                   </div>

//                   <Separator />

//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span className="text-green-600">₹{totals.subtotal}</span>
//                   </div>

//                   <Button
//                     onClick={proceedToCheckout}
//                     disabled={selectedItems.length === 0}
//                     className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
//                     size="lg"
//                   >
//                     Proceed to Checkout
//                     <ArrowRight className="h-4 w-4 ml-2" />
//                   </Button>

//                   {selectedItems.length === 0 && (
//                     <p className="text-sm text-muted-foreground text-center">Select items to proceed to checkout</p>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




















"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package, Truck, Heart, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { AnimatedBackground } from "@/components/animated-background"

interface CartItem {
  _id: string
  name: string
  sellingPrice: number
  actualPrice?: number
  images: string[]
  inStock: number
  weightInGrams: number
  quantity: number
  category?: ("boy" | "girl")[]
  ageGroup?: ("0-1" | "1-2" | "2-3" | "3-4" | "4-5" | "0-5")[]
  categoryTypemodel?: string
  size?: string
  color?: string
  type?: string
  sizeInMl?: number
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = () => {
    try {
      setIsLoading(true)
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        const cartData = JSON.parse(savedCart)
        setCartItems(Array.isArray(cartData) ? cartData : [])
        setSelectedItems(Array.isArray(cartData) ? cartData.map((item: CartItem) => item._id) : [])
      }
    } catch (error) {
      console.error("Error loading cart:", error)
      toast.error("Failed to load cart items")
    } finally {
      setIsLoading(false)
    }
  }

  const updateCartInStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item._id === itemId) {
          if (newQuantity <= 0) {
            return null
          }
          if (newQuantity > item.inStock) {
            toast.error("Cannot add more items than available stock")
            return item
          }
          return { ...item, quantity: newQuantity }
        }
        return item
      })
      .filter(Boolean) as CartItem[]

    setCartItems(updatedCart)
    updateCartInStorage(updatedCart)

    if (newQuantity <= 0) {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId))
    }
  }

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId)
    setCartItems(updatedCart)
    updateCartInStorage(updatedCart)
    setSelectedItems((prev) => prev.filter((id) => id !== itemId))
    toast.success("Item removed from cart")
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item._id))
    }
  }

  const moveToWishlist = (item: CartItem) => {
    try {
      const savedWishlist = localStorage.getItem("wishlist")
      const wishlistData = savedWishlist ? JSON.parse(savedWishlist) : []
      const existingIndex = wishlistData.findIndex((w: any) => w._id === item._id)

      if (existingIndex === -1) {
        wishlistData.push(item)
        localStorage.setItem("wishlist", JSON.stringify(wishlistData))
        window.dispatchEvent(new Event("wishlistUpdated"))
      }

      removeItem(item._id)
      toast.success("Item moved to wishlist")
    } catch (error) {
      console.error("Error moving to wishlist:", error)
      toast.error("Failed to move item to wishlist")
    }
  }

  const getSelectedItems = () => {
    return cartItems.filter((item) => selectedItems.includes(item._id))
  }

  const calculateTotals = () => {
    const selected = getSelectedItems()
    const subtotal = selected.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0)
    const totalWeight = selected.reduce((sum, item) => sum + item.weightInGrams * item.quantity, 0)
    const totalItems = selected.reduce((sum, item) => sum + item.quantity, 0)

    return {
      subtotal,
      totalWeight,
      totalItems,
      itemCount: selected.length,
    }
  }

  const proceedToCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select items to checkout")
      return
    }

    const selectedCartItems = getSelectedItems()
    localStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems))
    router.push("/checkout")
  }

  const getDiscountPercentage = (selling: number, actual?: number) => {
    if (!actual || actual <= selling) return 0
    return Math.round(((actual - selling) / actual) * 100)
  }

  const totals = calculateTotals()

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl md:text-4xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <Link href="/products/clothes">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Shop Clothes
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/products/bath">
                    <Package className="h-4 w-4 mr-2" />
                    Shop Bath Items
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
              <ShoppingCart className="h-6 w-6 md:h-8 md:w-8 text-pink-500" />
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select All */}
              <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={selectedItems.length === cartItems.length}
                        onCheckedChange={toggleSelectAll}
                      />
                      <label htmlFor="select-all" className="font-medium text-sm md:text-base">
                        Select All ({cartItems.length} items)
                      </label>
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">{selectedItems.length} selected</div>
                  </div>
                </CardContent>
              </Card>

              {/* Cart Items List */}
              {cartItems.map((item) => {
                const discount = getDiscountPercentage(item.sellingPrice, item.actualPrice)
                const isSelected = selectedItems.includes(item._id)

                return (
                  <Card
                    key={item._id}
                    className={`border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg transition-all ${
                      isSelected ? "ring-2 ring-pink-500" : ""
                    }`}
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        {/* Checkbox */}
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleItemSelection(item._id)}
                          className="mt-2"
                        />

                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Link href={`/products/${item.categoryTypemodel}/${item._id}`}>
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="md:w-[100px] md:h-[100px] rounded-lg object-cover hover:scale-105 transition-transform"
                            />
                          </Link>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.categoryTypemodel}/${item._id}`}
                            className="hover:text-pink-600 transition-colors"
                          >
                            <h3 className="font-semibold text-sm md:text-lg mb-2 line-clamp-2">{item.name}</h3>
                          </Link>

                          {/* Product Attributes */}
                          <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                            {Array.isArray(item.category) &&
                              item.category.map((cat) => (
                                <Badge key={cat} variant="outline" className="text-xs capitalize">
                                  {cat}
                                </Badge>
                              ))}
                            {item.size && (
                              <Badge variant="secondary" className="text-xs">
                                Size: {item.size}
                              </Badge>
                            )}
                            {item.color && (
                              <Badge variant="secondary" className="text-xs">
                                {item.color}
                              </Badge>
                            )}
                            {item.type && (
                              <Badge variant="outline" className="text-xs capitalize">
                                {item.type}
                              </Badge>
                            )}
                            {item.sizeInMl && (
                              <Badge variant="secondary" className="text-xs">
                                {item.sizeInMl}ml
                              </Badge>
                            )}
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-2 md:mb-3">
                            <span className="text-lg md:text-xl font-bold text-green-600">₹{item.sellingPrice}</span>
                            {item.actualPrice && item.actualPrice > item.sellingPrice && (
                              <span className="text-xs md:text-sm text-muted-foreground line-through">
                                ₹{item.actualPrice}
                              </span>
                            )}
                            {discount > 0 && <Badge className="bg-red-500 text-white text-xs">-{discount}%</Badge>}
                          </div>

                          {/* Stock Status */}
                          <div className="mb-2 md:mb-3">
                            <Badge
                              variant={item.inStock > 10 ? "default" : item.inStock > 0 ? "secondary" : "destructive"}
                              className="text-xs"
                            >
                              {item.inStock > 10
                                ? "In Stock"
                                : item.inStock > 0
                                  ? `Only ${item.inStock} left`
                                  : "Out of Stock"}
                            </Badge>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                                <span className="px-2 md:px-3 py-1 font-semibold text-sm md:text-base">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                  disabled={item.quantity >= item.inStock}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                              </div>
                              <span className="text-xs md:text-sm text-muted-foreground">
                                ₹{item.sellingPrice * item.quantity}
                              </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1 md:gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveToWishlist(item)}
                                className="text-pink-600 hover:text-pink-700 h-8 w-8 p-0"
                              >
                                <Heart className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item._id)}
                                className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                              >
                                <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg sticky top-6">
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Package className="h-4 w-4 md:h-5 md:w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Selected Items ({totals.itemCount})</span>
                      <span>{totals.totalItems} pieces</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Weight</span>
                      <span>{Math.ceil(totals.totalWeight / 1000)}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{totals.subtotal}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span>Delivery charges calculated at checkout</span>
                    </div>
                    <p className="text-xs text-muted-foreground">₹30/kg within Gujarat • ₹90/kg outside Gujarat</p>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{totals.subtotal}</span>
                  </div>

                  <Button
                    onClick={proceedToCheckout}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    size="lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  {selectedItems.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">Select items to proceed to checkout</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
