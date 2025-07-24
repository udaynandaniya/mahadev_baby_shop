export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-lg font-medium">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
        Loading Clothes...
      </div>
    </div>
  )
}
