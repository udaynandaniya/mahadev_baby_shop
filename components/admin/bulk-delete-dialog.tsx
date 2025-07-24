"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, AlertTriangle, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface BulkDeleteDialogProps {
  selectedIds: string[]
  onDeleteComplete: () => void
  onClearSelection: () => void
}

export function BulkDeleteDialog({ selectedIds, onDeleteComplete, onClearSelection }: BulkDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return

    setIsDeleting(true)
    try {
      const response = await fetch("/api/admin/products/toys/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toyIds: selectedIds }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete toys")
      }

      const result = await response.json()
      toast.success(result.message)
      onDeleteComplete()
      onClearSelection()
      setIsOpen(false)
    } catch (error: any) {
      console.error("Error bulk deleting toys:", error)
      toast.error(error.message || "Failed to delete toys")
    } finally {
      setIsDeleting(false)
    }
  }

  if (selectedIds.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="rounded-xl">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Selected ({selectedIds.length})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirm Bulk Delete
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {selectedIds.length} selected toy{selectedIds.length !== 1 ? "s" : ""}?
            <br />
            <strong className="text-red-600">
              This will also permanently delete all associated images from Cloudinary and remove them from stock
              management.
            </strong>
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleBulkDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete {selectedIds.length} Toy{selectedIds.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
