"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Search,
  RefreshCw,
  Users,
  Eye,
  UserCheck,
  UserX,
  Crown,
  Mail,
  Phone,
  Calendar,
  Shield,
  AlertTriangle,
  Loader2,
  TrendingUp,
  UserPlus,
  Settings,
} from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "react-hot-toast"
import { useAuth } from "@/app/contexts/auth-provider"
import type { User } from "@/types/user"

interface UserStats {
  totalUsers: number
  activeUsers: number
  adminUsers: number
  verifiedUsers: number
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{
    type: "role" | "status"
    user: User
    newValue: any
  } | null>(null)

  const { user: currentUser } = useAuth()

  useEffect(() => {
    fetchUsers()
    fetchStats()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, roleFilter, statusFilter])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/users", {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to fetch users")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/users/stats", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const filterUsers = () => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.includes(searchTerm),
      )
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

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

  const handleRoleChange = (user: User, newRole: "user" | "admin") => {
    // Prevent self-demotion
    if (user._id === currentUser?.userId && newRole === "user") {
      toast.error("You cannot demote yourself from admin. Ask another admin to do this.")
      return
    }

    setConfirmAction({
      type: "role",
      user,
      newValue: newRole,
    })
  }

  const handleStatusChange = (user: User, newStatus: boolean) => {
    setConfirmAction({
      type: "status",
      user,
      newValue: newStatus,
    })
  }

  const executeAction = async () => {
    if (!confirmAction) return

    setIsUpdating(true)
    try {
      const updateData =
        confirmAction.type === "role" ? { role: confirmAction.newValue } : { isActive: confirmAction.newValue }

      const response = await fetch(`/api/admin/users/${confirmAction.user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update user")
      }

      const actionText =
        confirmAction.type === "role"
          ? `User role updated to ${confirmAction.newValue}`
          : `User ${confirmAction.newValue ? "activated" : "deactivated"} successfully`

      toast.success(actionText)
      await fetchUsers()
      await fetchStats()
    } catch (error: any) {
      console.error("Error updating user:", error)
      toast.error(error.message || "Failed to update user")
    } finally {
      setIsUpdating(false)
      setConfirmAction(null)
    }
  }

  const getRoleBadge = (role: User["role"]) => {
    return role === "admin" ? (
      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 flex items-center gap-1">
        <Crown className="h-3 w-3" />
        Admin
      </Badge>
    ) : (
      <Badge variant="outline" className="flex items-center gap-1">
        <Users className="h-3 w-3" />
        User
      </Badge>
    )
  }

  const getStatusBadge = (isActive: boolean, isVerified: boolean) => {
    if (!isActive) return <Badge variant="destructive">Inactive</Badge>
    if (!isVerified) return <Badge variant="secondary">Unverified</Badge>
    return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
  }

  const openUserDetails = async (user: User) => {
    try {
      const response = await fetch(`/api/admin/users/${user._id}`, {
        credentials: "include",
      })

      if (response.ok) {
        const userData = await response.json()
        setSelectedUser(userData)
        setIsDetailDialogOpen(true)
      } else {
        toast.error("Failed to load user details")
      }
    } catch (error) {
      console.error("Error fetching user details:", error)
      toast.error("Failed to load user details")
    }
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
            onClick={() => {
              fetchUsers()
              fetchStats()
            }}
            className="rounded-xl bg-transparent w-full sm:w-auto"
            disabled={isUpdating}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isUpdating ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <p className="text-xl md:text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Users</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <UserCheck className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-xl md:text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">Active</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="h-5 w-5 text-purple-600 mr-2" />
                    <p className="text-xl md:text-2xl font-bold text-purple-600">{stats.adminUsers}</p>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">Admins</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="h-5 w-5 text-orange-600 mr-2" />
                    <p className="text-xl md:text-2xl font-bold text-orange-600">{stats.verifiedUsers}</p>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">Verified</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
                      <TableCell className="font-medium text-sm">
                        <div className="flex items-center gap-2">
                          {user.name}
                          {user._id === currentUser?.userId && (
                            <Badge variant="secondary" className="text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      </TableCell>
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
                            disabled={isUpdating}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(user, !user.isActive)}
                            className="h-8 w-8 p-0"
                            disabled={isUpdating}
                          >
                            {user.isActive ? <UserX className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRoleChange(user, user.role === "admin" ? "user" : "admin")}
                            className="h-8 w-8 p-0"
                            disabled={isUpdating || (user._id === currentUser?.userId && user.role === "admin")}
                          >
                            <Crown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">No users found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Details Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl flex items-center gap-2">
                <Settings className="h-5 w-5" />
                User Details - {selectedUser?.name}
              </DialogTitle>
              <DialogDescription className="text-sm">Complete user information and activity</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 md:space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Basic Information
                    </CardTitle>
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
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Account Status
                    </CardTitle>
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
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Order Statistics
                    </CardTitle>
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
                          {selectedUser.address.area}, {selectedUser.address.state}
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
                    onClick={() => handleStatusChange(selectedUser, !selectedUser.isActive)}
                    className="w-full sm:w-auto"
                    disabled={isUpdating}
                  >
                    {selectedUser.isActive ? "Deactivate User" : "Activate User"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRoleChange(selectedUser, selectedUser.role === "admin" ? "user" : "admin")}
                    className="w-full sm:w-auto"
                    disabled={isUpdating || (selectedUser._id === currentUser?.userId && selectedUser.role === "admin")}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    {selectedUser.role === "admin" ? "Revoke Admin" : "Make Admin"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Confirm Action
              </AlertDialogTitle>
              <AlertDialogDescription>
                {confirmAction?.type === "role" ? (
                  <>
                    Are you sure you want to {confirmAction.newValue === "admin" ? "promote" : "demote"}{" "}
                    <strong>{confirmAction.user.name}</strong> {confirmAction.newValue === "admin" ? "to" : "from"}{" "}
                    admin?
                    {confirmAction.newValue === "admin" && (
                      <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-sm">
                        <strong>Warning:</strong> This user will have full administrative access to the system.
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    Are you sure you want to {confirmAction?.newValue ? "activate" : "deactivate"}{" "}
                    <strong>{confirmAction?.user.name}</strong>?
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={executeAction} disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
