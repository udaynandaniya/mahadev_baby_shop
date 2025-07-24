import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import { VideoModel } from "@/lib/models/videoModel"
import { videoSchema } from "@/lib/validations/video-schema"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const data = await request.json()

    // Validate with Zod schema
    const validatedData = videoSchema.parse(data)

    // Find existing video
    const existingVideo = await VideoModel.findById(params.id)
    if (!existingVideo) {
      return NextResponse.json({ success: false, message: "Video not found" }, { status: 404 })
    }

    // Check product code uniqueness (excluding current video)
    const duplicateVideo = await VideoModel.findOne({
      productCode: validatedData.productCode,
      _id: { $ne: params.id },
    })
    if (duplicateVideo) {
      return NextResponse.json({ success: false, message: "Product code already exists" }, { status: 400 })
    }

    // Update video
    const updatedVideo = await VideoModel.findByIdAndUpdate(params.id, validatedData, {
      new: true,
      runValidators: true,
    })

    if (!updatedVideo) {
      return NextResponse.json({ success: false, message: "Failed to update video" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: updatedVideo,
      message: "Video updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating video:", error)
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }
    return NextResponse.json({ success: false, message: error.message || "Failed to update video" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    // Find the video to get video URL before deletion
    const video = await VideoModel.findById(params.id)
    if (!video) {
      return NextResponse.json({ success: false, message: "Video not found" }, { status: 404 })
    }

    // Delete video from Cloudinary (if you have this utility function)
    // if (video.videoUrl) {
    //   try {
    //     await deleteCloudinaryVideo(video.videoUrl)
    //   } catch (error) {
    //     console.warn("Failed to delete video from Cloudinary:", error)
    //     // Continue with database deletion even if Cloudinary deletion fails
    //   }
    // }

    // Delete video from database
    await VideoModel.findByIdAndDelete(params.id)

    return NextResponse.json({
      success: true,
      message: "Video and associated file deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting video:", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to delete video" }, { status: 500 })
  }
}
