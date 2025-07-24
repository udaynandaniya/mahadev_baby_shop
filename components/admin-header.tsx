// // // components/admin-header.tsx

// // "use client"

// // import { useState } from "react"
// // import Link from "next/link"
// // import { usePathname } from "next/navigation"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// // import { ThemeToggle } from "@/components/theme-toggle"
// // import {
// //   LayoutDashboard,
// //   Package,
// //   ShoppingCart,
// //   User,
// //   Menu,
// //   Settings,
// //   Star,
// //   Crown,
// //   Baby,
// //   Home,
// //   Images,
// //   Video,
// //   BarChart3,
// //   Users,
// //   Bell,
// //   LogOut,
// //   Shirt,
// //   ToyBrick,
// //   Bath,
// // } from "lucide-react"
// // import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// // import clsx from "clsx"
// // import { useAuth } from "@/app/contexts/auth-provider"

// // export function AdminHeader() {
// //   const { user, logout } = useAuth()
// //   const pathname = usePathname()
// //   const [isNotificationOpen, setIsNotificationOpen] = useState(false)

// //   const adminNavLinks = [
// //     { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
// //     {
// //       href: "/admin/products",
// //       label: "Products",
// //       icon: Package,
// //       subItems: [
// //         { href: "/admin/products/clothes", label: "Clothes", icon: Shirt },
// //         { href: "/admin/products/toys", label: "Toys", icon: ToyBrick },
// //         { href: "/admin/products/bath", label: "Bath Items", icon: Bath },
// //         { href: "/admin/products/newborn", label: "Newborn", icon: Baby },
// //       ],
// //     },
// //     { href: "/admin/stock-manager", label: "Stock Manager", icon: BarChart3 },
// //     { href: "/admin/slider", label: "Slider Images", icon: Images },
// //     { href: "/admin/videos", label: "Product Videos", icon: Video },
// //     { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
// //     { href: "/admin/users", label: "Users", icon: Users },
// //   ]

// //   // Mock notification count - replace with real data
// //   const notificationCount = 5

// //   return (
// //     <>
// //       {/* Header Background Icons - Responsive */}
// //       <div className="absolute top-0 left-0 right-0 h-16 md:h-20 pointer-events-none overflow-hidden z-0">
// //         <div className="absolute top-1 md:top-2 left-4 md:left-10 text-pink-200/20 dark:text-pink-300/25 animate-bounce">
// //           <Crown className="h-3 w-3 md:h-4 md:w-4" />
// //         </div>
// //         <div className="absolute top-2 md:top-4 left-16 md:left-32 text-purple-200/20 dark:text-purple-300/25 animate-pulse">
// //           <Star className="h-2 w-2 md:h-3 md:w-3" />
// //         </div>
// //         <div
// //           className="absolute top-0.5 md:top-1 right-8 md:right-20 text-blue-200/20 dark:text-blue-300/25 animate-bounce"
// //           style={{ animationDelay: "1s" }}
// //         >
// //           <Settings className="h-3 w-3 md:h-5 md:w-5" />
// //         </div>
// //         <div
// //           className="absolute top-3 md:top-5 right-20 md:right-40 text-yellow-200/20 dark:text-yellow-300/25 animate-pulse"
// //           style={{ animationDelay: "2s" }}
// //         >
// //           <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
// //         </div>
// //         <div
// //           className="absolute top-1 md:top-2 left-1/2 text-green-200/20 dark:text-green-300/25 animate-bounce"
// //           style={{ animationDelay: "0.5s" }}
// //         >
// //           <Package className="h-2 w-2 md:h-3 md:w-3" />
// //         </div>
// //       </div>

// //       <header className="sticky top-0 z-50 w-full border-b border-pink-200/30 dark:border-purple-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 shadow-lg shadow-pink-500/5 dark:shadow-purple-500/10">
// //         {/* Premium Gradient Border */}
// //         <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-pink-500/60 dark:via-purple-500/60 to-transparent" />

// //         <div className="container flex h-14 md:h-16 items-center justify-between relative z-10 px-4 md:px-6">
// //           {/* Logo - Mobile Optimized */}
// //           <div className="flex items-center gap-3 md:gap-6">
// //             <Link href="/admin/dashboard" className="flex items-center space-x-2 md:space-x-3 group">
// //               <div className="relative">
// //                 <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-pink-500/25 dark:shadow-pink-500/40 group-hover:shadow-xl group-hover:shadow-pink-500/40 dark:group-hover:shadow-pink-500/60 transition-all duration-300 group-hover:scale-105">
// //                   <Crown className="text-white h-4 w-4 md:h-5 md:w-5" />
// //                 </div>
// //                 <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
// //               </div>
// //               <div className="hidden sm:block">
// //                 <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
// //                   Admin Panel
// //                 </span>
// //                 <div className="text-xs text-muted-foreground flex items-center gap-1">
// //                   <Crown className="h-2 w-2 md:h-3 md:w-3 fill-yellow-400 text-yellow-400" />
// //                   <span className="hidden md:inline">Mahadev Baby Shop</span>
// //                   <span className="md:hidden">Admin</span>
// //                 </div>
// //               </div>
// //             </Link>

// //             {/* Desktop Nav */}
// //             <nav className="hidden lg:flex items-center space-x-1 md:space-x-2">
// //               {adminNavLinks.map(({ href, label, icon: Icon, subItems }) => (
// //                 <div key={href} className="relative group">
// //                   <Link
// //                     href={href}
// //                     className={clsx(
// //                       "relative text-sm font-medium rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 transition-all duration-300 flex items-center gap-2 group",
// //                       "hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-950/50 dark:hover:to-purple-950/50",
// //                       "hover:shadow-lg hover:shadow-pink-500/10 dark:hover:shadow-purple-500/20 hover:scale-105",
// //                       pathname.startsWith(href) &&
// //                         "bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/40 dark:to-purple-900/40 text-pink-700 dark:text-pink-300 font-semibold shadow-md dark:shadow-purple-500/20",
// //                     )}
// //                   >
// //                     <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
// //                     {label}
// //                     {pathname.startsWith(href) && (
// //                       <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
// //                     )}
// //                   </Link>

// //                   {/* Dropdown for Products */}
// //                   {subItems && (
// //                     <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border border-pink-200/30 dark:border-purple-800/30 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
// //                       {subItems.map((subItem) => (
// //                         <Link
// //                           key={subItem.href}
// //                           href={subItem.href}
// //                           className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-950/50 dark:hover:to-purple-950/50 first:rounded-t-xl last:rounded-b-xl transition-all duration-200"
// //                         >
// //                           <subItem.icon className="h-4 w-4" />
// //                           {subItem.label}
// //                         </Link>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </nav>
// //           </div>

// //           {/* Right section - Mobile Optimized */}
// //           <div className="flex items-center gap-2 md:gap-3">
// //             <ThemeToggle />

// //             {/* Notifications */}
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl hover:bg-pink-50 dark:hover:bg-pink-950/50 hover:scale-105 transition-all duration-300 relative group"
// //               onClick={() => setIsNotificationOpen(!isNotificationOpen)}
// //             >
// //               <Bell className="h-3 w-3 md:h-4 md:w-4 group-hover:text-pink-500 transition-colors" />
// //               {notificationCount > 0 && (
// //                 <Badge className="absolute -top-1 -right-1 md:-top-2 md:-right-2 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-lg animate-bounce">
// //                   {notificationCount}
// //                 </Badge>
// //               )}
// //             </Button>

// //             {/* User Menu */}
// //             <DropdownMenu>
// //               <DropdownMenuTrigger asChild>
// //                 <Button
// //                   variant="ghost"
// //                   className="h-8 md:h-10 px-2 md:px-3 rounded-lg md:rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:scale-105 transition-all duration-300 flex items-center gap-1 md:gap-2 group"
// //                 >
// //                   <div className="h-6 w-6 md:h-7 md:w-7 rounded-md md:rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
// //                     <User className="h-3 w-3 md:h-4 md:w-4 text-white" />
// //                   </div>
// //                   <div className="hidden sm:flex items-center gap-1">
// //                     <Crown className="h-2 w-2 md:h-3 md:w-3 text-yellow-500" />
// //                     <span className="text-xs text-muted-foreground hidden md:inline">{user?.name || "Admin"}</span>
// //                   </div>
// //                 </Button>
// //               </DropdownMenuTrigger>
// //               <DropdownMenuContent
// //                 align="end"
// //                 className="w-48 md:w-56 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-pink-200/30 dark:border-purple-800/30 shadow-xl"
// //               >
// //                 <DropdownMenuItem asChild>
// //                   <Link href="/admin/dashboard" className="flex items-center gap-2">
// //                     <LayoutDashboard className="h-4 w-4" />
// //                     Dashboard
// //                   </Link>
// //                 </DropdownMenuItem>
// //                 <DropdownMenuItem asChild>
// //                   <Link href="/admin/settings" className="flex items-center gap-2">
// //                     <Settings className="h-4 w-4" />
// //                     Settings
// //                   </Link>
// //                 </DropdownMenuItem>
// //                 <DropdownMenuItem asChild>
// //                   <Link href="/" className="flex items-center gap-2">
// //                     <Home className="h-4 w-4" />
// //                     View Site
// //                   </Link>
// //                 </DropdownMenuItem>
// //                 <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
// //                   <LogOut className="h-4 w-4 mr-2" />
// //                   Logout
// //                 </DropdownMenuItem>
// //               </DropdownMenuContent>
// //             </DropdownMenu>

// //             {/* Mobile Menu */}
// //             <Sheet>
// //               <SheetTrigger asChild>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   className="lg:hidden h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50"
// //                 >
// //                   <Menu className="h-4 w-4" />
// //                 </Button>
// //               </SheetTrigger>
// //               <SheetContent
// //                 side="right"
// //                 className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-pink-200/30 dark:border-purple-800/30 w-80"
// //               >
// //                 <div className="flex flex-col gap-4 mt-8">
// //                   {adminNavLinks.map(({ href, label, icon: Icon, subItems }) => (
// //                     <div key={href}>
// //                       <Link
// //                         href={href}
// //                         className={clsx(
// //                           "text-base font-medium rounded-xl px-4 py-3 transition-all duration-300 flex items-center gap-3",
// //                           "hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-950/50 dark:hover:to-purple-950/50",
// //                           pathname.startsWith(href) &&
// //                             "bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/40 dark:to-purple-900/40 text-pink-700 dark:text-pink-300 font-semibold",
// //                         )}
// //                       >
// //                         <Icon className="h-5 w-5" />
// //                         {label}
// //                       </Link>

// //                       {/* Mobile Sub Items */}
// //                       {subItems && pathname.startsWith(href) && (
// //                         <div className="ml-8 mt-2 space-y-1">
// //                           {subItems.map((subItem) => (
// //                             <Link
// //                               key={subItem.href}
// //                               href={subItem.href}
// //                               className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-colors"
// //                             >
// //                               <subItem.icon className="h-4 w-4" />
// //                               {subItem.label}
// //                             </Link>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </SheetContent>
// //             </Sheet>
// //           </div>
// //         </div>
// //       </header>
// //     </>
// //   )
// // }


// "use client"

// import { useState, useCallback } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
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
// } from "lucide-react"
// import { useAuth } from "@/app/contexts/auth-provider"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { cn } from "@/lib/utils"

// export function AdminHeader() {
//   const { user, logout } = useAuth()
//   const pathname = usePathname()
//   const [isOpen, setIsOpen] = useState(false)

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
//     },
//     {
//       name: "Users",
//       href: "/admin/users",
//       icon: Users,
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

//   const handleLogout = useCallback(async () => {
//     await logout()
//     setIsOpen(false)
//   }, [logout])

//   const isActiveRoute = useCallback(
//     (href: string) => {
//       if (href === "/admin/products") {
//         return pathname === href
//       }
//       return pathname.startsWith(href)
//     },
//     [pathname],
//   )

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-orange-200/30 dark:border-orange-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
   

//       {/* Main Admin Header */}
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-14 md:h-16">
//           {/* Logo */}
//           <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl md:text-2xl">
//             <div className="relative">
//               <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <Baby className="h-4 w-4 md:h-5 md:w-5 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
//             </div>
//             <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
//               Admin Panel
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-6">
//             {navigationItems.map((item) => {
//               const isActive = isActiveRoute(item.href)
//               return (
//                 <div key={item.name} className="relative group">
//                   <Link
//                     href={item.href}
//                     className={cn(
//                       "flex items-center gap-2 text-sm font-medium transition-colors relative group px-3 py-2 rounded-lg",
//                       isActive
//                         ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
//                         : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50",
//                     )}
//                   >
//                     <item.icon className="h-4 w-4" />
//                     {item.name}
//                   </Link>

//                   {/* Dropdown for items with children */}
//                   {item.children && (
//                     <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                       {item.children.map((child) => (
//                         <Link
//                           key={child.name}
//                           href={child.href}
//                           className={cn(
//                             "flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg transition-colors",
//                             isActiveRoute(child.href)
//                               ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
//                               : "text-gray-700 dark:text-gray-300",
//                           )}
//                         >
//                           <child.icon className="h-4 w-4" />
//                           {child.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-2 md:gap-4">
//             {/* Search */}
//             <Button variant="ghost" size="icon" className="hidden md:flex">
//               <Search className="h-4 w-4" />
//             </Button>

//             {/* Notifications */}
//             <Button variant="ghost" size="icon" className="relative">
//               <Bell className="h-4 w-4" />
//               <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600">
//                 3
//               </Badge>
//             </Button>

//             {/* Theme Toggle */}
//             <ThemeToggle />

//             {/* Admin User Menu */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Admin"} />
//                     <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
//                       {user?.name?.charAt(0)?.toUpperCase() || "A"}
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <div className="flex items-center justify-start gap-2 p-2">
//                   <div className="flex flex-col space-y-1 leading-none">
//                     <p className="font-medium">{user?.name || "Admin"}</p>
//                     <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
//                     <Badge variant="secondary" className="w-fit text-xs">
//                       Administrator
//                     </Badge>
//                   </div>
//                 </div>
//                 <DropdownMenuItem asChild>
//                   <Link href="/admin/profile" className="cursor-pointer">
//                     <User className="mr-2 h-4 w-4" />
//                     Admin Profile
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/admin/settings" className="cursor-pointer">
//                     <Settings className="mr-2 h-4 w-4" />
//                     Settings
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/" target="_blank" className="cursor-pointer">
//                     <Baby className="mr-2 h-4 w-4" />
//                     View Site
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Mobile Menu */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="lg:hidden">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-80">
//                 <div className="flex flex-col h-full">
//                   {/* Mobile Header */}
//                   <div className="flex items-center gap-2 pb-4 border-b">
//                     <div className="h-8 w-8 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center">
//                       <Baby className="h-4 w-4 text-white" />
//                     </div>
//                     <span className="font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
//                       Admin Panel
//                     </span>
//                   </div>

//                   {/* Admin Info */}
//                   <div className="flex items-center gap-3 py-4 border-b">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Admin"} />
//                       <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
//                         {user?.name?.charAt(0)?.toUpperCase() || "A"}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium">{user?.name || "Admin"}</p>
//                       <p className="text-sm text-muted-foreground">{user?.email}</p>
//                       <Badge variant="secondary" className="text-xs mt-1">
//                         Administrator
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Mobile Navigation */}
//                   <nav className="flex-1 py-4">
//                     <div className="space-y-2">
//                       {navigationItems.map((item) => (
//                         <div key={item.name}>
//                           <Link
//                             href={item.href}
//                             onClick={() => setIsOpen(false)}
//                             className={cn(
//                               "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
//                               isActiveRoute(item.href)
//                                 ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
//                                 : "hover:bg-gray-100 dark:hover:bg-gray-800",
//                             )}
//                           >
//                             <item.icon className="h-4 w-4" />
//                             {item.name}
//                           </Link>

//                           {/* Mobile Submenu */}
//                           {item.children && (
//                             <div className="ml-6 mt-1 space-y-1">
//                               {item.children.map((child) => (
//                                 <Link
//                                   key={child.name}
//                                   href={child.href}
//                                   onClick={() => setIsOpen(false)}
//                                   className={cn(
//                                     "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors",
//                                     isActiveRoute(child.href)
//                                       ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
//                                       : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
//                                   )}
//                                 >
//                                   <child.icon className="h-3 w-3" />
//                                   {child.name}
//                                 </Link>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>

//                     {/* Mobile Search */}
//                     <div className="mt-6 px-3">
//                       <Button
//                         variant="outline"
//                         className="w-full justify-start bg-transparent"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         <Search className="h-4 w-4 mr-2" />
//                         Search Admin Panel
//                       </Button>
//                     </div>
//                   </nav>

//                   {/* Mobile Footer */}
//                   <div className="border-t pt-4">
//                     <div className="space-y-2">
//                       <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
//                         <Link href="/admin/settings" onClick={() => setIsOpen(false)}>
//                           <Settings className="h-4 w-4 mr-2" />
//                           Settings
//                         </Link>
//                       </Button>
//                       <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
//                         <Link href="/" target="_blank" onClick={() => setIsOpen(false)}>
//                           <Baby className="h-4 w-4 mr-2" />
//                           View Site
//                         </Link>
//                       </Button>
//                       <Button
//                         variant="outline"
//                         className="w-full justify-start text-red-600 dark:text-red-400 bg-transparent"
//                         onClick={handleLogout}
//                       >
//                         <LogOut className="h-4 w-4 mr-2" />
//                         Logout
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
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
} from "lucide-react"
import { useAuth } from "@/app/contexts/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function AdminHeader() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [unreadOrdersCount, setUnreadOrdersCount] = useState(0)

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
      name: "Media",
      href: "/admin/media",
      icon: ImageIcon,
      children: [
        { name: "Slider", href: "/admin/sliders", icon: ImageIcon },
        { name: "Videos", href: "/admin/videos", icon: Video },
      ],
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
  ]

  // Fetch unread orders count
  const fetchUnreadOrdersCount = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/orders/unread-count", {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setUnreadOrdersCount(data.count || 0)
      }
    } catch (error) {
      console.error("Error fetching unread orders count:", error)
    }
  }, [])

  // Real-time updates for unread orders
  useEffect(() => {
    fetchUnreadOrdersCount()
    const interval = setInterval(fetchUnreadOrdersCount, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [fetchUnreadOrdersCount])

  // Reset count when visiting orders page
  useEffect(() => {
    if (pathname === "/admin/orders") {
      setUnreadOrdersCount(0)
    }
  }, [pathname])

  const handleLogout = useCallback(async () => {
    await logout()
    setIsOpen(false)
  }, [logout])

  const isActiveRoute = useCallback(
    (href: string) => {
      if (href === "/admin/products") {
        return pathname === href
      }
      return pathname.startsWith(href)
    },
    [pathname],
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-200/30 dark:border-orange-800/30 bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl">
      {/* Main Admin Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl md:text-2xl">
            <div className="relative">
              <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Baby className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.href)
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors relative group px-3 py-2 rounded-lg",
                      isActive
                        ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {item.badge && (
                      <Badge className="bg-red-500 text-white animate-pulse ml-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                  {/* Dropdown for items with children */}
                  {item.children && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg transition-colors",
                            isActiveRoute(child.href)
                              ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                              : "text-gray-700 dark:text-gray-300",
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/admin/orders">
                <Bell className="h-4 w-4" />
                {unreadOrdersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600 animate-pulse">
                    {unreadOrdersCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Admin User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Admin"} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name || "Admin"}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                    <Badge variant="secondary" className="w-fit text-xs">
                      Administrator
                    </Badge>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Admin Profile
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem asChild>
                  <Link href="/" target="_blank" className="cursor-pointer">
                    <Baby className="mr-2 h-4 w-4" />
                    View Site
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center gap-2 pb-4 border-b">
                    <div className="h-8 w-8 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Baby className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                      Admin Panel
                    </span>
                  </div>

                  {/* Admin Info */}
                  <div className="flex items-center gap-3 py-4 border-b">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Admin"} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name || "Admin"}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        Administrator
                      </Badge>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-4">
                    <div className="space-y-2">
                      {navigationItems.map((item) => (
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                              isActiveRoute(item.href)
                                ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800",
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                            {item.badge && (
                              <Badge className="bg-red-500 text-white animate-pulse ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                          {/* Mobile Submenu */}
                          {item.children && (
                            <div className="ml-6 mt-1 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors",
                                    isActiveRoute(child.href)
                                      ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                                      : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
                                  )}
                                >
                                  <child.icon className="h-3 w-3" />
                                  {child.name}
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
                        className="w-full justify-start bg-transparent"
                        onClick={() => setIsOpen(false)}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search Admin Panel
                      </Button>
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      {/* <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/admin/settings" onClick={() => setIsOpen(false)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </Button> */}
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/" target="_blank" onClick={() => setIsOpen(false)}>
                          <Baby className="h-4 w-4 mr-2" />
                          View Site
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 dark:text-red-400 bg-transparent"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
