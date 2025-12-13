import { BrowserWallet } from "@meshsdk/core"
import { Transaction } from "@meshsdk/core"
import { MeshWallet } from "@meshsdk/core"
import { getWalletAddress } from "./wallet"
import { ANCHOR_VALIDATOR_HASH, MIN_ADA_UTXO, NETWORK } from "./config"

/**
 * Upload a medical record to Cardano blockchain using Aiken smart contract
 * @param patientId - The patient's unique ID
 * @param recordData - The medical record data (JSON string)
 * @param wallet - Connected browser wallet
 * @param issuerPubKeyHash - Doctor's public key hash (from wallet)
 * @returns Transaction hash and metadata
 */
export async function uploadRecord(
  patientId: string,
  recordData: string,
  wallet: BrowserWallet,
  issuerPubKeyHash: string
): Promise<{
  txHash: string
  timestamp: number
  walletAddress: string
  recordHash: string
}> {
  try {
    // Step 1: Hash the record data using SHA-256
    const recordHash = await hashRecordData(recordData)
    
    // Step 2: Get wallet address
    const addresses = await wallet.getUsedAddresses()
    const walletAddress = addresses[0]
    
    // Step 3: Create datum matching Aiken contract structure
    // Datum: { issuer_id: ByteArray, patient_id: ByteArray, record_hash: ByteArray, issued_at: Int }
    const timestamp = Math.floor(Date.now() / 1000) // Unix timestamp in seconds
    
    // Convert strings to ByteArray (hex)
    const issuerIdBytes = hexToBytes(issuerPubKeyHash)
    const patientIdBytes = new TextEncoder().encode(patientId)
    const recordHashBytes = hexToBytes(recordHash.replace("0x", ""))
    
    // Build datum according to Aiken contract schema
    const datum = {
      constructor: 0,
      fields: [
        issuerIdBytes,      // issuer_id: ByteArray
        patientIdBytes,     // patient_id: ByteArray
        recordHashBytes,     // record_hash: ByteArray
        timestamp,          // issued_at: Int
      ],
    }
    
    // Step 4: Build transaction
    // For MVP, we'll use metadata approach (simpler than full UTXO locking)
    // In production, you'd lock ADA in the validator script address
    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(
        walletAddress, // Send to self (min ADA requirement)
        MIN_ADA_UTXO.toString()
      )
      .setMetadata(674, {
        // CIP-20 metadata format
        anchor_validator: ANCHOR_VALIDATOR_HASH,
        issuer_id: issuerPubKeyHash,
        patient_id: patientId,
        record_hash: recordHash,
        issued_at: timestamp,
        datum: datum,
      })
    
    // Step 5: Sign and submit transaction
    const unsignedTx = await tx.build()
    const signedTx = await wallet.signTx(unsignedTx)
    const txHash = await wallet.submitTx(signedTx)
    
    return {
      txHash,
      timestamp: timestamp * 1000, // Convert back to milliseconds
      walletAddress,
      recordHash,
    }
  } catch (error) {
    console.error("Failed to upload record to blockchain:", error)
    throw new Error(`Failed to upload record: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Hash record data using SHA-256
 */
async function hashRecordData(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return `0x${hashHex}`
}

/**
 * Convert hex string to ByteArray (Uint8Array)
 */
function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.replace("0x", "").replace(/^0+/, "")
  const bytes = new Uint8Array(cleanHex.length / 2)
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16)
  }
  return bytes
}

/**
 * Simplified version for MVP (uses metadata only, no UTXO locking)
 * This matches the demo approach from the scripts/index.html
 */
export async function uploadRecordSimple(
  patientId: string,
  recordData: string,
  wallet: BrowserWallet,
  issuerPubKeyHash: string
): Promise<{
  txHash: string
  timestamp: number
  walletAddress: string
  recordHash: string
}> {
  try {
    // Hash the record data
    const recordHash = await hashRecordData(recordData)
    
    // Get wallet address
    const addresses = await wallet.getUsedAddresses()
    const walletAddress = addresses[0]
    
    const timestamp = Math.floor(Date.now() / 1000)
    
    // For MVP: Store in localStorage and return mock txHash
    // In production with real testnet, this would submit actual transaction
    const txHash = `tx_${Date.now()}_${Math.random().toString(36).substring(7)}`
    
    // Store metadata locally (in production, this goes to blockchain)
    if (typeof window !== "undefined") {
      const metadata = {
        txHash,
        recordHash,
        patientId,
        timestamp,
        walletAddress,
        issuerPubKeyHash,
        anchorValidatorHash: ANCHOR_VALIDATOR_HASH,
        network: NETWORK,
      }
      localStorage.setItem(`record_${txHash}`, JSON.stringify(metadata))
      localStorage.setItem(`recordData_${txHash}`, recordData)
    }
    
    return {
      txHash,
      timestamp: timestamp * 1000,
      walletAddress,
      recordHash,
    }
  } catch (error) {
    console.error("Failed to upload record:", error)
    throw new Error(`Failed to upload record: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
