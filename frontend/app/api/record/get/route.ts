import { NextRequest, NextResponse } from "next/server"
import { getRecord } from "@/lib/cardano/getRecord"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { txHash } = body

    if (!txHash) {
      return NextResponse.json(
        { error: "Missing required field: txHash" },
        { status: 400 }
      )
    }

    // Get record from blockchain/localStorage
    const record = await getRecord(txHash)

    return NextResponse.json({
      success: true,
      patientId: record.patientId,
      recordHash: record.recordHash,
      metadata: record.metadata,
      verified: record.verified,
      recordData: record.recordData,
      timestamp: record.timestamp,
      walletAddress: record.walletAddress,
    })
  } catch (error) {
    console.error("Get record error:", error)
    return NextResponse.json(
      {
        error: "Failed to retrieve record",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

