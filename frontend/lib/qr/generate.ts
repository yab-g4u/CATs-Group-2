import QRCode from "qrcode"

export interface QRData {
  txHash: string
  patientId: string
  recordHash?: string
}

/**
 * Generate a QR code containing transaction hash and patient ID
 * @param data - Object containing txHash and patientId
 * @returns QR code as data URL (base64 image)
 */
export async function generateQRCode(data: QRData): Promise<string> {
  try {
    const qrData = JSON.stringify({
      txHash: data.txHash,
      patientId: data.patientId,
      recordHash: data.recordHash,
    })
    
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: "M",
      type: "image/png",
      quality: 0.92,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      width: 300,
    })
    
    return qrCodeDataUrl
  } catch (error) {
    console.error("Failed to generate QR code:", error)
    throw new Error("Failed to generate QR code")
  }
}

/**
 * Generate QR code and return as blob for download
 */
export async function generateQRCodeBlob(data: QRData): Promise<Blob> {
  try {
    const dataUrl = await generateQRCode(data)
    
    // Convert data URL to blob
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    
    return blob
  } catch (error) {
    console.error("Failed to generate QR code blob:", error)
    throw new Error("Failed to generate QR code blob")
  }
}

/**
 * Generate QR code for patient access (contains only patient ID)
 */
export async function generatePatientQRCode(patientId: string): Promise<string> {
  try {
    const qrData = JSON.stringify({
      patientId,
      type: "patient_access",
    })
    
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: "M",
      type: "image/png",
      quality: 0.92,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      width: 300,
    })
    
    return qrCodeDataUrl
  } catch (error) {
    console.error("Failed to generate patient QR code:", error)
    throw new Error("Failed to generate patient QR code")
  }
}

