import { NextRequest, NextResponse } from "next/server"
import { uploadRecordSimple } from "@/lib/cardano/uploadRecord"
import { BrowserWallet } from "@meshsdk/core"
import { ANCHOR_VALIDATOR_HASH, NETWORK } from "@/lib/cardano/config"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { patientId, recordData, walletName, issuerPubKeyHash } = body

    if (!patientId || !recordData) {
      return NextResponse.json(
        { error: "Missing required fields: patientId and recordData" },
        { status: 400 }
      )
    }

    // For MVP: We'll use the simplified upload (localStorage-based)
    // In production, this would use the actual wallet connection
    let wallet: BrowserWallet | null = null
    
    if (walletName) {
      try {
        wallet = await BrowserWallet.enable(walletName)
      } catch (error) {
        console.error("Wallet connection failed, using mock:", error)
      }
    }

    // Hash the record data
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(recordData)
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const recordHash = `0x${hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")}`

    // Generate transaction hash (mock for MVP)
    const timestamp = Date.now()
    const txHash = `tx_${timestamp}_${Math.random().toString(36).substring(7)}`
    
    // Store in a mock database (in production, this would be a real database)
    const metadata = {
      txHash,
      recordHash,
      patientId,
      timestamp,
      walletAddress: wallet ? (await wallet.getUsedAddresses())[0] : "mock_address",
      anchorValidatorHash: ANCHOR_VALIDATOR_HASH,
      network: NETWORK,
      // In production, this would be stored on Cardano blockchain via smart contract
      // The datum structure matches the Aiken anchor_validator.ak contract
      datum: {
        issuer_id: issuerPubKeyHash || (wallet ? (await wallet.getUsedAddresses())[0] : "mock_issuer"),
        patient_id: patientId,
        record_hash: recordHash.replace("0x", ""),
        issued_at: timestamp,
      },
      issuerPubKeyHash: issuerPubKeyHash || "mock_issuer",
    }

    // Return success response
    return NextResponse.json({
      success: true,
      txHash: metadata.txHash,
      recordHash: metadata.recordHash,
      timestamp: metadata.timestamp,
      walletAddress: metadata.walletAddress,
      metadata,
    })
  } catch (error) {
    console.error("Upload record error:", error)
    return NextResponse.json(
      {
        error: "Failed to upload record",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

