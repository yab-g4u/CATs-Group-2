import { NextRequest, NextResponse } from "next/server"

// Mock database for streaks (in production, use real database)
const streakData: Record<string, { currentStreak: number; lastUploadDate: string; totalUploads: number }> = {}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const doctorId = searchParams.get("doctorId")

    if (!doctorId) {
      return NextResponse.json(
        { error: "Missing required field: doctorId" },
        { status: 400 }
      )
    }

    const streak = streakData[doctorId] || {
      currentStreak: 0,
      lastUploadDate: "",
      totalUploads: 0,
    }

    return NextResponse.json({
      success: true,
      currentStreak: streak.currentStreak,
      lastUploadDate: streak.lastUploadDate,
      totalUploads: streak.totalUploads,
    })
  } catch (error) {
    console.error("Get streak error:", error)
    return NextResponse.json(
      {
        error: "Failed to retrieve streak",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { doctorId } = body

    if (!doctorId) {
      return NextResponse.json(
        { error: "Missing required field: doctorId" },
        { status: 400 }
      )
    }

    const today = new Date().toISOString().split("T")[0]
    const currentStreak = streakData[doctorId] || {
      currentStreak: 0,
      lastUploadDate: "",
      totalUploads: 0,
    }

    // Check if last upload was yesterday (maintains streak) or today (no change)
    const lastDate = currentStreak.lastUploadDate
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split("T")[0]

    let newStreak = currentStreak.currentStreak

    if (lastDate === yesterdayStr) {
      // Maintain streak - last upload was yesterday
      newStreak = currentStreak.currentStreak + 1
    } else if (lastDate === today) {
      // Already uploaded today - no change
      newStreak = currentStreak.currentStreak
    } else if (lastDate === "") {
      // First upload
      newStreak = 1
    } else {
      // Streak broken - reset to 1
      newStreak = 1
    }

    streakData[doctorId] = {
      currentStreak: newStreak,
      lastUploadDate: today,
      totalUploads: currentStreak.totalUploads + 1,
    }

    // Calculate CarePoints: +10 base + streak bonus
    const carePoints = 10 + (newStreak * 2) // 10 base + 2 per streak day

    return NextResponse.json({
      success: true,
      currentStreak: newStreak,
      lastUploadDate: today,
      totalUploads: streakData[doctorId].totalUploads,
      carePointsEarned: carePoints,
    })
  } catch (error) {
    console.error("Update streak error:", error)
    return NextResponse.json(
      {
        error: "Failed to update streak",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

