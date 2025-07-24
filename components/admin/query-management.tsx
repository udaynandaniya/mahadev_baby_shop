"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Reply, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Query {
  id: string
  customerName: string
  customerEmail: string
  subject: string
  message: string
  status: "pending" | "replied" | "resolved"
  createdAt: string
  reply?: string
  repliedAt?: string
}

export function QueryManagement() {
  const [queries, setQueries] = useState<Query[]>([])
  const [loading, setLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchQueries()
  }, [])

  const fetchQueries = async () => {
    try {
      // Mock data - replace with actual API call
      const mockQueries: Query[] = [
        {
          id: "Q-001",
          customerName: "Priya Patel",
          customerEmail: "priya@example.com",
          subject: "Product Size Query",
          message:
            "Hi, I want to know about the sizing for the baby romper set. What size would be suitable for a 6-month-old baby?",
          status: "pending",
          createdAt: "2024-01-21T10:30:00Z",
        },
        {
          id: "Q-002",
          customerName: "Rahul Shah",
          customerEmail: "rahul@example.com",
          subject: "Delivery Time",
          message: "How long does it take for delivery to Rajkot? I need the items urgently for a baby shower.",
          status: "replied",
          createdAt: "2024-01-20T14:15:00Z",
          reply:
            "Hello Rahul, delivery to Rajkot typically takes 2-3 business days. For urgent orders, we also offer same-day delivery within Mangrol and next-day delivery to nearby cities. Please let us know if you need express delivery.",
          repliedAt: "2024-01-20T16:30:00Z",
        },
        {
          id: "Q-003",
          customerName: "Meera Joshi",
          customerEmail: "meera@example.com",
          subject: "Return Policy",
          message: "What is your return policy? Can I return items if they don't fit properly?",
          status: "resolved",
          createdAt: "2024-01-19T09:45:00Z",
          reply:
            "Hi Meera, we have a 7-day return policy for unused items in original packaging. If the size doesn't fit, you can exchange or return the item. Please contact us within 7 days of delivery.",
          repliedAt: "2024-01-19T11:20:00Z",
        },
      ]
      setQueries(mockQueries)
    } catch (error) {
      console.error("Error fetching queries:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReply = async (queryId: string) => {
    if (!replyText.trim()) {
      toast({
        title: "Please enter a reply",
        description: "Reply message cannot be empty",
        variant: "destructive",
      })
      return
    }

    try {
      setQueries((prev) =>
        prev.map((query) =>
          query.id === queryId
            ? {
                ...query,
                status: "replied" as const,
                reply: replyText,
                repliedAt: new Date().toISOString(),
              }
            : query,
        ),
      )

      setReplyingTo(null)
      setReplyText("")

      toast({
        title: "Reply sent",
        description: "Your reply has been sent to the customer",
      })

      // Here you would also send the email to the customer
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      })
    }
  }

  const markAsResolved = async (queryId: string) => {
    try {
      setQueries((prev) =>
        prev.map((query) => (query.id === queryId ? { ...query, status: "resolved" as const } : query)),
      )

      toast({
        title: "Query resolved",
        description: "Query has been marked as resolved",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update query status",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: Query["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "replied":
        return <Reply className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Query["status"]) => {
    switch (status) {
      case "pending":
        return "destructive"
      case "replied":
        return "default"
      case "resolved":
        return "secondary"
    }
  }

  if (loading) {
    return <div>Loading queries...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Customer Queries</h2>
        <p className="text-gray-600 dark:text-gray-300">Manage and respond to customer inquiries</p>
      </div>

      <div className="grid gap-6">
        {queries.map((query) => (
          <Card key={query.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {query.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{query.subject}</CardTitle>
                    <CardDescription>
                      From: {query.customerName} ({query.customerEmail})
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(query.status)} className="flex items-center gap-1">
                    {getStatusIcon(query.status)}
                    {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500">{new Date(query.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Customer Message:</p>
                <p>{query.message}</p>
              </div>

              {query.reply && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Your Reply:</p>
                  <p>{query.reply}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Replied on: {new Date(query.repliedAt!).toLocaleString()}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                {query.status === "pending" && (
                  <Button onClick={() => setReplyingTo(query.id)} className="flex items-center gap-2">
                    <Reply className="h-4 w-4" />
                    Reply
                  </Button>
                )}

                {query.status === "replied" && (
                  <Button
                    onClick={() => markAsResolved(query.id)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark as Resolved
                  </Button>
                )}
              </div>

              {replyingTo === query.id && (
                <div className="space-y-3 border-t pt-4">
                  <Textarea
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                  />
                  <div className="flex items-center gap-2">
                    <Button onClick={() => handleReply(query.id)}>Send Reply</Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setReplyingTo(null)
                        setReplyText("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {queries.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No customer queries yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
