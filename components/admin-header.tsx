// //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\components\admin-header.tsx

// "use client"

// import {
//   Menu,
//   LayoutDashboard,
//   Package,
//   Users,
//   ShoppingCart,
//   Settings,
//   LogOut,
//   Bell,
//   Search,
//   Baby,
//   Shirt,
//   ToyBrick,
//   Bath,
//   ImageIcon,
//   Video,
//   BarChart3,
//   User,
//   Warehouse,
// } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { cn } from "@/lib/utils"
// import { usePathname, useRouter } from "next/navigation"
// import { useState } from "react"
// import Link from "next/link"
// import { useToast } from "@/components/ui/use-toast"

// interface AdminHeaderProps {
//   unreadOrdersCount: number
// }

// const AdminHeader = ({ unreadOrdersCount }: AdminHeaderProps) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const pathname = usePathname()
//   const router = useRouter()
//   const { toast } = useToast()

//   const isActiveRoute = (route: string) => {
//     return pathname === route
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     router.push("/auth/login")
//     toast({
//       title: "Logged out successfully.",
//     })
//   }

//   const navigationItems = [
//     {
//       name: "Dashboard",
//       href: "/admin/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Products",
//       href: "/admin/products",
//       icon: Package,
//       children: [
//         { name: "All Products", href: "/admin/products", icon: Package },
//         { name: "Clothes", href: "/admin/products/clothes", icon: Shirt },
//         { name: "Toys", href: "/admin/products/toys", icon: ToyBrick },
//         { name: "Newborn", href: "/admin/products/newborn", icon: Baby },
//         { name: "Bath Items", href: "/admin/products/bath", icon: Bath },
//       ],
//     },
//     {
//       name: "Orders",
//       href: "/admin/orders",
//       icon: ShoppingCart,
//       badge: unreadOrdersCount > 0 ? unreadOrdersCount : null,
//     },
//     {
//       name: "Users",
//       href: "/admin/users",
//       icon: Users,
//     },
//     {
//       name: "Stock Manager",
//       href: "/admin/stock-manager",
//       icon: Warehouse,
//     },
//     {
//       name: "Media",
//       href: "/admin/media",
//       icon: ImageIcon,
//       children: [
//         { name: "Slider", href: "/admin/sliders", icon: ImageIcon },
//         { name: "Videos", href: "/admin/videos", icon: Video },
//       ],
//     },
//     {
//       name: "Analytics",
//       href: "/admin/analytics",
//       icon: BarChart3,
//     },
//   ]

//   return (
//     <div className="border-b">
//       <div className="container flex items-center justify-between py-4">
//         <Link href="/admin/dashboard" className="font-bold">
//           Admin Panel
//         </Link>
//         <div className="flex items-center gap-4">
//           <Button variant="outline">
//             <Search className="h-4 w-4 mr-2" />
//             Search
//           </Button>
//           <Bell className="h-5 w-5" />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>
//                 <User className="h-4 w-4 mr-2" />
//                 Profile
//               </DropdownMenuItem>
//               {/* <DropdownMenuItem>
//                 <Settings className="h-4 w-4 mr-2" />
//                 Settings
//               </DropdownMenuItem> */}
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" className="p-2">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80 sm:w-96">
//               <SheetHeader className="border-b">
//                 <SheetTitle>Admin Panel</SheetTitle>
//                 <SheetDescription>Manage your store content and settings here.</SheetDescription>
//               </SheetHeader>
//               {/* Mobile Navigation */}
//               <nav className="flex-1 py-4 overflow-y-auto">
//                 <div className="space-y-1">
//                   {navigationItems.map((item) => (
//                     <div key={item.name}>
//                       <Link
//                         href={item.href}
//                         onClick={() => setIsOpen(false)}
//                         className={cn(
//                           "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors min-h-[44px]", // Increased touch target
//                           isActiveRoute(item.href)
//                             ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
//                             : "hover:bg-gray-100 dark:hover:bg-gray-800",
//                         )}
//                       >
//                         <item.icon className="h-4 w-4 flex-shrink-0" />
//                         <span className="flex-1">{item.name}</span>
//                         {item.badge && (
//                           <Badge className="bg-red-500 text-white animate-pulse h-5 w-5 flex items-center justify-center p-0 text-xs flex-shrink-0">
//                             {item.badge}
//                           </Badge>
//                         )}
//                       </Link>
//                       {/* Mobile Submenu */}
//                       {item.children && (
//                         <div className="ml-8 mt-1 space-y-1">
//                           {item.children.map((child) => (
//                             <Link
//                               key={child.name}
//                               href={child.href}
//                               onClick={() => setIsOpen(false)}
//                               className={cn(
//                                 "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors min-h-[40px]",
//                                 isActiveRoute(child.href)
//                                   ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
//                                   : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
//                               )}
//                             >
//                               <child.icon className="h-3 w-3 flex-shrink-0" />
//                               <span className="flex-1">{child.name}</span>
//                             </Link>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 {/* Mobile Search */}
//                 <div className="mt-6 px-3">
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start bg-transparent min-h-[44px]"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <Search className="h-4 w-4 mr-2 flex-shrink-0" />
//                     <span>Search Admin Panel</span>
//                   </Button>
//                 </div>
//               </nav>
//               {/* Mobile Footer */}
//               <div className="border-t pt-4 pb-2">
//                 <div className="space-y-2">
//                   {/* <Button variant="outline" className="w-full justify-start bg-transparent min-h-[44px]" asChild>
//                     <Link href="/" target="_blank" onClick={() => setIsOpen(false)}>
//                       <Baby className="h-4 w-4 mr-2 flex-shrink-0" />
//                       <span>View Site</span>
//                     </Link>
//                   </Button> */}
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start text-red-600 dark:text-red-400 bg-transparent min-h-[44px]"
//                     onClick={handleLogout}
//                   >
//                     <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
//                     <span>Logout</span>
//                   </Button>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminHeader



// // //C:\Users\UDAYN\Downloads\Projects\mahadev-baby - Copy\components\admin-header.tsx

// // "use client"

// // import { useState, useCallback, useEffect } from "react"
// // import Link from "next/link"
// // import { usePathname } from "next/navigation"
// // import { Button } from "@/components/ui/button"
// // import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import { Badge } from "@/components/ui/badge"
// // import {
// //   Menu,
// //   LayoutDashboard,
// //   Package,
// //   Users,
// //   ShoppingCart,
// //   Settings,
// //   LogOut,
// //   Bell,
// //   Search,
// //   Baby,
// //   Shirt,
// //   ToyBrick,
// //   Bath,
// //   ImageIcon,
// //   Video,
// //   BarChart3,
// //   User,
// // } from "lucide-react"
// // import { useAuth } from "@/app/contexts/auth-provider"
// // import { ThemeToggle } from "@/components/theme-toggle"
// // import { cn } from "@/lib/utils"

// // export function AdminHeader() {
// //   const { user, logout } = useAuth()
// //   const pathname = usePathname()
// //   const [isOpen, setIsOpen] = useState(false)
// //   const [unreadOrdersCount, setUnreadOrdersCount] = useState(0)

// //   const navigationItems = [
// //     {
// //       name: "Dashboard",
// //       href: "/admin/dashboard",
// //       icon: LayoutDashboard,
// //     },
// //     {
// //       name: "Products",
// //       href: "/admin/products",
// //       icon: Package,
// //       children: [
// //         { name: "All Products", href: "/admin/products", icon: Package },
// //         { name: "Clothes", href: "/admin/products/clothes", icon: Shirt },
// //         { name: "Toys", href: "/admin/products/toys", icon: ToyBrick },
// //         { name: "Newborn", href: "/admin/products/newborn", icon: Baby },
// //         { name: "Bath Items", href: "/admin/products/bath", icon: Bath },
// //       ],
// //     },
// //     {
// //       name: "Orders",
// //       href: "/admin/orders",
// //       icon: ShoppingCart,
// //       badge: unreadOrdersCount > 0 ? unreadOrdersCount : null,
// //     },
// //     {
// //       name: "Users",
// //       href: "/admin/users",
// //       icon: Users,
// //     },
// //     {
// //       name: "Media",
// //       href: "/admin/media",
// //       icon: ImageIcon,
// //       children: [
// //         { name: "Slider", href: "/admin/sliders", icon: ImageIcon },
// //         { name: "Videos", href: "/admin/videos", icon: Video },
// //       ],
// //     },
// //     {
// //       name: "Analytics",
// //       href: "/admin/analytics",
// //       icon: BarChart3,
// //     },
// //   ]

// //   // Fetch unread orders count
// //   const fetchUnreadOrdersCount = useCallback(async () => {
// //     try {
// //       const response = await fetch("/api/admin/orders/unread-count", {
// //         credentials: "include",
// //       })
// //       if (response.ok) {
// //         const data = await response.json()
// //         setUnreadOrdersCount(data.count || 0)
// //       }
// //     } catch (error) {
// //       console.error("Error fetching unread orders count:", error)
// //     }
// //   }, [])

// //   // Real-time updates for unread orders
// //   useEffect(() => {
// //     fetchUnreadOrdersCount()
// //     const interval = setInterval(fetchUnreadOrdersCount, 30000) // Check every 30 seconds
// //     return () => clearInterval(interval)
// //   }, [fetchUnreadOrdersCount])

// //   // Reset count when visiting orders page
// //   useEffect(() => {
// //     if (pathname === "/admin/orders") {
// //       setUnreadOrdersCount(0)
// //     }
// //   }, [pathname])

// //   const handleLogout = useCallback(async () => {
// //     await logout()
// //     setIsOpen(false)
// //   }, [logout])

// //   const isActiveRoute = useCallback(
// //     (href: string) => {
// //       if (href === "/admin/products") {
// //         return pathname === href
// //       }
// //       return pathname.startsWith(href)
// //     },
// //     [pathname],
// //   )

// //   return (
// //     <header className="sticky top-0 z-50 w-full border-b border-orange-200/30 dark:border-orange-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
// //       {/* Main Admin Header */}
// //       <div className="container mx-auto px-4">
// //         <div className="flex items-center justify-between h-14 md:h-16">
// //           {/* Logo */}
// //           <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl md:text-2xl">
// //             <div className="relative">
// //               <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
// //                 <Baby className="h-4 w-4 md:h-5 md:w-5 text-white" />
// //               </div>
// //               <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
// //             </div>
// //             <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
// //               Admin Panel
// //             </span>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <nav className="hidden lg:flex items-center gap-6">
// //             {navigationItems.map((item) => {
// //               const isActive = isActiveRoute(item.href)
// //               return (
// //                 <div key={item.name} className="relative group">
// //                   <Link
// //                     href={item.href}
// //                     className={cn(
// //                       "flex items-center gap-2 text-sm font-medium transition-colors relative group px-3 py-2 rounded-lg",
// //                       isActive
// //                         ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
// //                         : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50",
// //                     )}
// //                   >
// //                     <item.icon className="h-4 w-4" />
// //                     {item.name}
// //                     {item.badge && (
// //                       <Badge className="bg-red-500 text-white animate-pulse ml-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
// //                         {item.badge}
// //                       </Badge>
// //                     )}
// //                   </Link>
// //                   {/* Dropdown for items with children */}
// //                   {item.children && (
// //                     <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
// //                       {item.children.map((child) => (
// //                         <Link
// //                           key={child.name}
// //                           href={child.href}
// //                           className={cn(
// //                             "flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg transition-colors",
// //                             isActiveRoute(child.href)
// //                               ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
// //                               : "text-gray-700 dark:text-gray-300",
// //                           )}
// //                         >
// //                           <child.icon className="h-4 w-4" />
// //                           {child.name}
// //                         </Link>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               )
// //             })}
// //           </nav>

// //           {/* Right Side Actions */}
// //           <div className="flex items-center gap-2 md:gap-4">
// //             {/* Search */}
// //             <Button variant="ghost" size="icon" className="hidden md:flex">
// //               <Search className="h-4 w-4" />
// //             </Button>

// //             {/* Notifications */}
// //             <Button variant="ghost" size="icon" className="relative" asChild>
// //               <Link href="/admin/orders">
// //                 <Bell className="h-4 w-4" />
// //                 {unreadOrdersCount > 0 && (
// //                   <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600 animate-pulse">
// //                     {unreadOrdersCount}
// //                   </Badge>
// //                 )}
// //               </Link>
// //             </Button>

// //             {/* Theme Toggle */}
// //             <ThemeToggle />

// //             {/* Admin User Menu */}
// //             <DropdownMenu>
// //               <DropdownMenuTrigger asChild>
// //                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
// //                   <Avatar className="h-8 w-8">
// //                     <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Admin"} />
// //                     <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
// //                       {user?.name?.charAt(0)?.toUpperCase() || "A"}
// //                     </AvatarFallback>
// //                   </Avatar>
// //                 </Button>
// //               </DropdownMenuTrigger>
// //               <DropdownMenuContent className="w-56" align="end" forceMount>
// //                 <div className="flex items-center justify-start gap-2 p-2">
// //                   <div className="flex flex-col space-y-1 leading-none">
// //                     <p className="font-medium">{user?.name || "Admin"}</p>
// //                     <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
// //                     <Badge variant="secondary" className="w-fit text-xs">
// //                       Administrator
// //                     </Badge>
// //                   </div>
// //                 </div>
// //                 <DropdownMenuItem asChild>
// //                   <Link href="/admin/profile" className="cursor-pointer">
// //                     <User className="mr-2 h-4 w-4" />
// //                     Admin Profile
// //                   </Link>
// //                 </DropdownMenuItem>
// //                 {/* <DropdownMenuItem asChild>
// //                   <Link href="/admin/settings" className="cursor-pointer">
// //                     <Settings className="mr-2 h-4 w-4" />
// //                     Settings
// //                   </Link>
// //                 </DropdownMenuItem> */}
// //                 <DropdownMenuItem asChild>
// //                   <Link href="/" target="_blank" className="cursor-pointer">
// //                     <Baby className="mr-2 h-4 w-4" />
// //                     View Site
// //                   </Link>
// //                 </DropdownMenuItem>
// //                 <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
// //                   <LogOut className="mr-2 h-4 w-4" />
// //                   Logout
// //                 </DropdownMenuItem>
// //               </DropdownMenuContent>
// //             </DropdownMenu>

// //             {/* Mobile Menu */}
// //             <Sheet open={isOpen} onOpenChange={setIsOpen}>
// //               <SheetTrigger asChild>
// //                 <Button variant="ghost" size="icon" className="lg:hidden">
// //                   <Menu className="h-5 w-5" />
// //                 </Button>
// //               </SheetTrigger>
// //               <SheetContent side="right" className="w-80">
// //                 <div className="flex flex-col h-full">
// //                   {/* Mobile Header */}
// //                   <div className="flex items-center gap-2 pb-4 border-b">
// //                     <div className="h-8 w-8 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center">
// //                       <Baby className="h-4 w-4 text-white" />
// //                     </div>
// //                     <span className="font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
// //                       Admin Panel
// //                     </span>
// //                   </div>

// //                   {/* Admin Info */}
// //                   <div className="flex items-center gap-3 py-4 border-b">
// //                     <Avatar className="h-10 w-10">
// //                       <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Admin"} />
// //                       <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
// //                         {user?.name?.charAt(0)?.toUpperCase() || "A"}
// //                       </AvatarFallback>
// //                     </Avatar>
// //                     <div>
// //                       <p className="font-medium">{user?.name || "Admin"}</p>
// //                       <p className="text-sm text-muted-foreground">{user?.email}</p>
// //                       <Badge variant="secondary" className="text-xs mt-1">
// //                         Administrator
// //                       </Badge>
// //                     </div>
// //                   </div>

// //                   {/* Mobile Navigation */}
// //                   <nav className="flex-1 py-4">
// //                     <div className="space-y-2">
// //                       {navigationItems.map((item) => (
// //                         <div key={item.name}>
// //                           <Link
// //                             href={item.href}
// //                             onClick={() => setIsOpen(false)}
// //                             className={cn(
// //                               "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
// //                               isActiveRoute(item.href)
// //                                 ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
// //                                 : "hover:bg-gray-100 dark:hover:bg-gray-800",
// //                             )}
// //                           >
// //                             <item.icon className="h-4 w-4" />
// //                             {item.name}
// //                             {item.badge && (
// //                               <Badge className="bg-red-500 text-white animate-pulse ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
// //                                 {item.badge}
// //                               </Badge>
// //                             )}
// //                           </Link>
// //                           {/* Mobile Submenu */}
// //                           {item.children && (
// //                             <div className="ml-6 mt-1 space-y-1">
// //                               {item.children.map((child) => (
// //                                 <Link
// //                                   key={child.name}
// //                                   href={child.href}
// //                                   onClick={() => setIsOpen(false)}
// //                                   className={cn(
// //                                     "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors",
// //                                     isActiveRoute(child.href)
// //                                       ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
// //                                       : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
// //                                   )}
// //                                 >
// //                                   <child.icon className="h-3 w-3" />
// //                                   {child.name}
// //                                 </Link>
// //                               ))}
// //                             </div>
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>

// //                     {/* Mobile Search */}
// //                     <div className="mt-6 px-3">
// //                       <Button
// //                         variant="outline"
// //                         className="w-full justify-start bg-transparent"
// //                         onClick={() => setIsOpen(false)}
// //                       >
// //                         <Search className="h-4 w-4 mr-2" />
// //                         Search Admin Panel
// //                       </Button>
// //                     </div>
// //                   </nav>

// //                   {/* Mobile Footer */}
// //                   <div className="border-t pt-4">
// //                     <div className="space-y-2">
// //                       {/* <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
// //                         <Link href="/admin/settings" onClick={() => setIsOpen(false)}>
// //                           <Settings className="h-4 w-4 mr-2" />
// //                           Settings
// //                         </Link>
// //                       </Button> */}
// //                       <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
// //                         <Link href="/" target="_blank" onClick={() => setIsOpen(false)}>
// //                           <Baby className="h-4 w-4 mr-2" />
// //                           View Site
// //                         </Link>
// //                       </Button>
// //                       <Button
// //                         variant="outline"
// //                         className="w-full justify-start text-red-600 dark:text-red-400 bg-transparent"
// //                         onClick={handleLogout}
// //                       >
// //                         <LogOut className="h-4 w-4 mr-2" />
// //                         Logout
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </SheetContent>
// //             </Sheet>
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   )
// // }

"use client"

import {
  Menu,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
  Bell,
  Search,
  Baby,
  Shirt,
  ToyBrick,
  Bath,
  ImageIcon,
  Video,
  BarChart3,
  User,
  Warehouse,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/app/contexts/auth-provider"

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadOrdersCount, setUnreadOrdersCount] = useState(0)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { user, logout } = useAuth()

  // Fetch unread orders count
  useEffect(() => {
    const fetchUnreadOrdersCount = async () => {
      try {
        const response = await fetch("/api/admin/orders/unread-count", {
          method: "GET",
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          setUnreadOrdersCount(data.count || 0)
        }
      } catch (error) {
        console.error("Error fetching unread orders count:", error)
        setUnreadOrdersCount(0)
      }
    }

    fetchUnreadOrdersCount()

    // Set up polling for real-time updates
    const interval = setInterval(fetchUnreadOrdersCount, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const isActiveRoute = (route: string) => {
    return pathname === route
  }

  const handleLogout = async () => {
    try {
      await logout()
      setIsOpen(false)
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      })
    }
  }

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
      children: [
        { name: "All Products", href: "/admin/products", icon: Package },
        { name: "Clothes", href: "/admin/products/clothes", icon: Shirt },
        { name: "Toys", href: "/admin/products/toys", icon: ToyBrick },
        { name: "Newborn", href: "/admin/products/newborn", icon: Baby },
        { name: "Bath Items", href: "/admin/products/bath", icon: Bath },
      ],
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      badge: unreadOrdersCount > 0 ? unreadOrdersCount : null,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Stock Manager",
      href: "/admin/stock-manager",
      icon: Warehouse,
    },
    {
      name: "Media",
      href: "/admin/media",
      icon: ImageIcon,
      children: [
        { name: "Slider", href: "/admin/sliders", icon: ImageIcon },
        { name: "Videos", href: "/admin/videos", icon: Video },
      ],
    },
    // {
    //   name: "Analytics",
    //   href: "/admin/analytics",
    //   icon: BarChart3,
    // },
  ]

  return (
    <div className="sticky top-0 z-50 w-full border-b border-pink-200/30 dark:border-purple-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
      <div className="container flex items-center justify-between py-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Baby className="h-4 w-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadOrdersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600">
                {unreadOrdersCount}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Admin"} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name || "Admin"}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/profile" className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 sm:w-96">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Baby className="h-3 w-3 text-white" />
                  </div>
                  Admin Panel
                </SheetTitle>
                <SheetDescription>Manage your store content and settings here.</SheetDescription>
              </SheetHeader>

              {/* User Info */}
              {user && (
                <div className="flex items-center gap-3 py-4 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || "Admin"} />
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                      {user.name?.charAt(0)?.toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name || "Admin"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Mobile Navigation */}
              <nav className="flex-1 py-4 overflow-y-auto">
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors min-h-[44px]",
                          isActiveRoute(item.href)
                            ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/50"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800",
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <Badge className="bg-red-500 text-white animate-pulse h-5 w-5 flex items-center justify-center p-0 text-xs flex-shrink-0">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                      {/* Mobile Submenu */}
                      {item.children && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors min-h-[40px]",
                                isActiveRoute(child.href)
                                  ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/50"
                                  : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
                              )}
                            >
                              <child.icon className="h-3 w-3 flex-shrink-0" />
                              <span className="flex-1">{child.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Search */}
                <div className="mt-6 px-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Search Admin Panel</span>
                  </Button>
                </div>
              </nav>

              {/* Mobile Footer */}
              <div className="border-t pt-4 pb-2">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 dark:text-red-400 bg-transparent min-h-[44px]"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
