/**
 * Decode QR code data and extract transaction hash and patient ID
 * @param qrData - The decoded QR code string (JSON)
 * @returns Parsed QR data
 */
export interface ParsedQRData {
  txHash?: string
  patientId?: string
  recordHash?: string
  type?: string
}

export function parseQRCode(qrData: string): ParsedQRData {
  try {
    const parsed = JSON.parse(qrData)
    
    return {
      txHash: parsed.txHash,
      patientId: parsed.patientId,
      recordHash: parsed.recordHash,
      type: parsed.type,
    }
  } catch (error) {
    console.error("Failed to parse QR code data:", error)
    throw new Error("Invalid QR code format")
  }
}

/**
 * Extract patient ID from QR code
 */
export function extractPatientIdFromQR(qrData: string): string | null {
  try {
    const parsed = parseQRCode(qrData)
    return parsed.patientId || null
  } catch (error) {
    return null
  }
}

/**
 * Extract transaction hash from QR code
 */
export function extractTxHashFromQR(qrData: string): string | null {
  try {
    const parsed = parseQRCode(qrData)
    return parsed.txHash || null
  } catch (error) {
    return null
  }
}

