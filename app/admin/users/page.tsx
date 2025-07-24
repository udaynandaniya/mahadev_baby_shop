"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, RefreshCw, Users, Eye, UserCheck, UserX, Crown, Mail, Phone, Calendar } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"

interface User {
  _id: string
  name: string
  email: string
  phone?: string
  role: "user" | "admin"
  isActive: boolean
  isVerified: boolean
  createdAt: string
  lastLogin?: string
  totalOrders: number
  totalSpent: number
  address?: {
    street: string
    city: string
    state: string
    pincode: string
  }
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, roleFilter, statusFilter])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to fetch users")
    } finally {
      setIsLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.phone && user.phone.includes(searchTerm)),
      )
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    // Status filter
    if (statusFilter === "active") {
      filtered = filtered.filter((user) => user.isActive)
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((user) => !user.isActive)
    } else if (statusFilter === "verified") {
      filtered = filtered.filter((user) => user.isVerified)
    } else if (statusFilter === "unverified") {
      filtered = filtered.filter((user) => !user.isVerified)
    }

    setFilteredUsers(filtered)
  }

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      })

      if (response.ok) {
        toast.success(`User ${isActive ? "activated" : "deactivated"} successfully`)
        fetchUsers()
      } else {
        toast.error("Failed to update user status")
      }
    } catch (error) {
      console.error("Error updating user status:", error)
      toast.error("Failed to update user status")
    }
  }

  const updateUserRole = async (userId: string, role: "user" | "admin") => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      })

      if (response.ok) {
        toast.success(`User role updated to ${role}`)
        fetchUsers()
      } else {
        toast.error("Failed to update user role")
      }
    } catch (error) {
      console.error("Error updating user role:", error)
      toast.error("Failed to update user role")
    }
  }

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return (
        <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
          <Crown className="h-3 w-3" />
          Admin
        </Badge>
      )
    }
    return <Badge variant="outline">User</Badge>
  }

  const getStatusBadge = (isActive: boolean, isVerified: boolean) => {
    if (!isActive) {
      return <Badge variant="destructive">Inactive</Badge>
    }
    if (!isVerified) {
      return <Badge variant="secondary">Unverified</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">Active</Badge>
  }

  const openUserDetails = (user: User) => {
    setSelectedUser(user)
    setIsDetailDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3 text-lg font-medium">
            <RefreshCw className="h-6 w-6 animate-spin text-pink-500" />
            Loading Users...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
              <span className="text-xl md:text-3xl lg:text-4xl">Users Management</span>
            </h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage customer accounts and permissions</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            className="rounded-xl bg-transparent w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-blue-600">{users.length}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-green-600">{users.filter((u) => u.isActive).length}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-purple-600">
                  {users.filter((u) => u.role === "admin").length}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Admins</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-orange-600">
                  {users.filter((u) => u.isVerified).length}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Verified</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-32 rounded-xl">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-36 rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Users className="h-5 w-5" />
              Users ({filteredUsers.length} users)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Name</TableHead>
                    <TableHead className="min-w-[200px]">Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Phone</TableHead>
                    <TableHead className="w-20">Role</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Orders</TableHead>
                    <TableHead className="hidden lg:table-cell">Joined</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium text-sm">{user.name}</TableCell>
                      <TableCell className="text-sm">{user.email}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{user.phone || "N/A"}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.isActive, user.isVerified)}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        <div>
                          <p>{user.totalOrders} orders</p>
                          <p className="text-xs text-muted-foreground">₹{user.totalSpent.toLocaleString()}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openUserDetails(user)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateUserStatus(user._id, !user.isActive)}
                            className="h-8 w-8 p-0"
                          >
                            {user.isActive ? <UserX className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
                          </Button>
                          {user.role !== "admin" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateUserRole(user._id, "admin")}
                              className="h-8 w-8 p-0"
                            >
                              <Crown className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* User Details Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">User Details - {selectedUser?.name}</DialogTitle>
              <DialogDescription className="text-sm">Complete user information and activity</DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className="space-y-4 md:space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedUser.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium text-sm">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{selectedUser.phone || "Not provided"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="mt-1">{getStatusBadge(selectedUser.isActive, selectedUser.isVerified)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Verification</p>
                      <div className="mt-1">
                        <Badge variant={selectedUser.isVerified ? "default" : "secondary"}>
                          {selectedUser.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {selectedUser.lastLogin && (
                      <div>
                        <p className="text-sm text-muted-foreground">Last Login</p>
                        <p className="font-medium">{new Date(selectedUser.lastLogin).toLocaleString()}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Order Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">Order Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedUser.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold text-green-600">₹{selectedUser.totalSpent.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                {selectedUser.address && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base md:text-lg">Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>{selectedUser.address.street}</p>
                        <p>
                          {selectedUser.address.city}, {selectedUser.address.state}
                        </p>
                        <p>PIN: {selectedUser.address.pincode}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => updateUserStatus(selectedUser._id, !selectedUser.isActive)}
                    className="w-full sm:w-auto"
                  >
                    {selectedUser.isActive ? "Deactivate User" : "Activate User"}
                  </Button>
                  {selectedUser.role !== "admin" && (
                    <Button
                      variant="outline"
                      onClick={() => updateUserRole(selectedUser._id, "admin")}
                      className="w-full sm:w-auto"
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Make Admin
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
