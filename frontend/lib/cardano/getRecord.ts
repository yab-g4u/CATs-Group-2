import { BLOCKFROST_PREPROD_URL, BLOCKFROST_API_KEY, ANCHOR_VALIDATOR_HASH } from "./config"

/**
 * Get a medical record from Cardano blockchain using transaction hash
 * @param txHash - The transaction hash
 * @returns Record metadata and verification status
 */
export async function getRecord(txHash: string): Promise<{
  patientId: string
  recordHash: string
  metadata: any
  verified: boolean
  recordData?: string
  timestamp?: number
  walletAddress?: string
  issuerPubKeyHash?: string
}> {
  try {
    // First check localStorage (for MVP/demo)
    if (typeof window !== "undefined") {
      const storedMetadata = localStorage.getItem(`record_${txHash}`)
      const storedData = localStorage.getItem(`recordData_${txHash}`)
      
      if (storedMetadata && storedData) {
        const metadata = JSON.parse(storedMetadata)
        
        // Verify hash integrity
        const recordHash = await hashRecordData(storedData)
        const verified = recordHash === metadata.recordHash
        
        return {
          patientId: metadata.patientId,
          recordHash: metadata.recordHash,
          metadata,
          verified,
          recordData: storedData,
          timestamp: metadata.timestamp,
          walletAddress: metadata.walletAddress,
          issuerPubKeyHash: metadata.issuerPubKeyHash,
        }
      }
    }
    
    // In production: Fetch from Cardano blockchain via Blockfrost API
    try {
      const response = await fetch(`${BLOCKFROST_PREPROD_URL}/txs/${txHash}`, {
        headers: {
          project_id: BLOCKFROST_API_KEY,
        },
      })
      
      if (response.ok) {
        const txData = await response.json()
        
        // Get transaction metadata
        const metadataResponse = await fetch(`${BLOCKFROST_PREPROD_URL}/txs/${txHash}/metadata`, {
          headers: {
            project_id: BLOCKFROST_API_KEY,
          },
        })
        
        if (metadataResponse.ok) {
          const metadataArray = await metadataResponse.json()
          
          // Find metadata with label 674 (CIP-20)
          const recordMetadata = metadataArray.find((m: any) => m.label === "674")
          
          if (recordMetadata) {
            const metadata = JSON.parse(recordMetadata.json_metadata)
            
            // Verify anchor validator hash matches
            const validatorMatch = metadata.anchor_validator === ANCHOR_VALIDATOR_HASH
            
            // Verify record hash
            const computedHash = await hashRecordData(metadata.recordData || "")
            const hashMatch = metadata.record_hash === computedHash.replace("0x", "")
            
            return {
              patientId: metadata.patient_id,
              recordHash: metadata.record_hash,
              metadata,
              verified: validatorMatch && hashMatch,
              recordData: metadata.recordData,
              timestamp: metadata.issued_at * 1000,
              walletAddress: txData.inputs?.[0]?.address || "",
              issuerPubKeyHash: metadata.issuer_id,
            }
          }
        }
      }
    } catch (blockchainError) {
      console.warn("Failed to fetch from blockchain, using local storage:", blockchainError)
    }
    
    // Fallback: Return error if not found
    throw new Error(`Record not found for transaction hash: ${txHash}`)
  } catch (error) {
    console.error("Failed to get record:", error)
    throw new Error(`Failed to retrieve record: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Hash record data using SHA-256 (same as uploadRecord)
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
 * Verify record integrity by comparing stored hash with computed hash
 */
export async function verifyRecord(txHash: string, recordData: string): Promise<boolean> {
  try {
    const record = await getRecord(txHash)
    const computedHash = await hashRecordData(recordData)
    return record.recordHash === computedHash.replace("0x", "")
  } catch (error) {
    console.error("Failed to verify record:", error)
    return false
  }
}

/**
 * Get public key hash from wallet address
 */
export function getPubKeyHashFromAddress(address: string): string {
  // Extract payment credential hash from address
  // Cardano addresses encode the payment key hash
  // This is a simplified version - in production, use proper address decoding
  try {
    // For bech32 addresses, decode and extract hash
    // Using a simplified approach - in production, use proper bech32 decoder
    const parts = address.split("1")
    if (parts.length > 1) {
      // This is a simplified extraction - proper implementation needed
      return address.substring(0, 56) // Approximate hash length
    }
    return address
  } catch (error) {
    console.error("Failed to extract pubkey hash:", error)
    return address
  }
}
