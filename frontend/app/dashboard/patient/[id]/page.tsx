"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  XCircle,
  Copy,
  Download,
  QrCode,
  FileText,
  Calendar,
  User,
  FlaskConical,
  Pill,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { generateQRCode } from "@/lib/qr/generate"
import { toast } from "sonner"

interface RecordData {
  patientId: string
  diagnosis: string
  prescriptions: string
  notes: string
  createdAt: string
}

interface RecordMetadata {
  txHash: string
  recordHash: string
  timestamp: number
  verified: boolean
  recordData?: RecordData
}

export default function PatientRecordPage({ params }: { params: { id: string } }) {
  const [patientId, setPatientId] = useState(params.id || "")
  const [records, setRecords] = useState<RecordMetadata[]>([])
  const [selectedRecord, setSelectedRecord] = useState<RecordMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [showQRModal, setShowQRModal] = useState(false)

  useEffect(() => {
    if (patientId) {
      loadPatientRecords()
    }
  }, [patientId])

  const loadPatientRecords = async () => {
    setIsLoading(true)
    try {
      // In production, this would fetch from backend API
      // For MVP, we'll get from localStorage
      const storedRecords: RecordMetadata[] = []
      
      // Get all records from localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("record_")) {
          const metadata = JSON.parse(localStorage.getItem(key) || "{}")
          if (metadata.patientId === patientId) {
            const recordData = localStorage.getItem(`recordData_${metadata.txHash}`)
            storedRecords.push({
              ...metadata,
              recordData: recordData ? JSON.parse(recordData) : undefined,
            })
          }
        }
      }

      // Sort by timestamp (newest first)
      storedRecords.sort((a, b) => b.timestamp - a.timestamp)
      setRecords(storedRecords)
    } catch (error) {
      console.error("Failed to load records:", error)
      toast.error("Failed to load patient records")
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewRecord = async (record: RecordMetadata) => {
    try {
      // Fetch full record from blockchain
      const response = await fetch("/api/record/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txHash: record.txHash }),
      })

      const result = await response.json()

      if (result.success) {
        setSelectedRecord({
          ...record,
          recordData: result.recordData ? JSON.parse(result.recordData) : record.recordData,
          verified: result.verified,
        })
      } else {
        toast.error("Failed to fetch record details")
      }
    } catch (error) {
      console.error("Failed to fetch record:", error)
      toast.error("Failed to fetch record details")
    }
  }

  const handleGenerateQR = async (record: RecordMetadata) => {
    try {
      const qrData = await generateQRCode({
        txHash: record.txHash,
        patientId: record.patientId,
        recordHash: record.recordHash,
      })
      setQrCodeDataUrl(qrData)
      setShowQRModal(true)
    } catch (error) {
      toast.error("Failed to generate QR code")
    }
  }

  const handleCopyTxHash = (txHash: string) => {
    navigator.clipboard.writeText(txHash)
    toast.success("Transaction hash copied!")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
        <Link href="/patient-access">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-foreground">Patient Records</h1>
        <div className="w-20" /> {/* Spacer */}
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        {/* Patient ID Input */}
        <div className="glow-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Patient ID</label>
              <Input
                type="text"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="h-11"
              />
            </div>
            <Button
              onClick={loadPatientRecords}
              disabled={!patientId || isLoading}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white h-11 px-8"
            >
              {isLoading ? "Loading..." : "Load Records"}
            </Button>
          </div>
        </div>

        {/* Records List */}
        {records.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Medical Records</h2>
            {records.map((record) => (
              <div
                key={record.txHash}
                className="glow-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {record.verified ? (
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className={`text-sm font-medium ${record.verified ? "text-green-400" : "text-red-400"}`}>
                          {record.verified ? "Verified" : "Unverified"}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    {record.recordData && (
                      <div className="space-y-2">
                        <p className="font-semibold text-foreground">{record.recordData.diagnosis}</p>
                        {record.recordData.prescriptions && (
                          <p className="text-sm text-muted-foreground">
                            Prescriptions: {record.recordData.prescriptions.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    )}
                    <code className="text-xs text-muted-foreground font-mono mt-2 block">
                      {record.txHash.substring(0, 40)}...
                    </code>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRecord(record)}
                      className="gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateQR(record)}
                      className="gap-2"
                    >
                      <QrCode className="h-4 w-4" />
                      QR
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glow-card rounded-2xl p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Records Found</h3>
            <p className="text-muted-foreground">
              {patientId ? "No medical records found for this Patient ID." : "Enter a Patient ID to view records."}
            </p>
          </div>
        )}
      </main>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Medical Record Details
              </DialogTitle>
              <DialogDescription>
                Verified on Cardano blockchain • {new Date(selectedRecord.timestamp).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Verification Status */}
              <div className={`glow-card rounded-xl p-4 ${selectedRecord.verified ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                <div className="flex items-center gap-2">
                  {selectedRecord.verified ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span className={`font-semibold ${selectedRecord.verified ? "text-green-400" : "text-red-400"}`}>
                    {selectedRecord.verified ? "Record Verified" : "Record Verification Failed"}
                  </span>
                </div>
              </div>

              {/* Record Data */}
              {selectedRecord.recordData && (
                <div className="space-y-4">
                  <div className="glow-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Diagnosis</h3>
                    </div>
                    <p className="text-foreground">{selectedRecord.recordData.diagnosis}</p>
                  </div>

                  {selectedRecord.recordData.prescriptions && (
                    <div className="glow-card rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Pill className="h-5 w-5 text-accent" />
                        <h3 className="font-semibold text-foreground">Prescriptions</h3>
                      </div>
                      <p className="text-foreground whitespace-pre-line">{selectedRecord.recordData.prescriptions}</p>
                    </div>
                  )}

                  {selectedRecord.recordData.notes && (
                    <div className="glow-card rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold text-foreground">Notes</h3>
                      </div>
                      <p className="text-foreground whitespace-pre-line">{selectedRecord.recordData.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Transaction Hash */}
              <div className="glow-card rounded-xl p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">Transaction Hash</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-background rounded-lg text-sm font-mono text-foreground break-all">
                    {selectedRecord.txHash}
                  </code>
                  <Button variant="outline" size="sm" onClick={() => handleCopyTxHash(selectedRecord.txHash)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Record Hash */}
              <div className="glow-card rounded-xl p-4 bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium text-muted-foreground">Record Hash</Label>
                </div>
                <code className="block px-3 py-2 bg-background rounded-lg text-xs font-mono text-foreground break-all">
                  {selectedRecord.recordHash}
                </code>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* QR Code Modal */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>Scan this QR code to access the medical record</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            {qrCodeDataUrl && (
              <Image src={qrCodeDataUrl} alt="QR Code" width={256} height={256} className="rounded-lg" />
            )}
          </div>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => {
              if (qrCodeDataUrl) {
                const link = document.createElement("a")
                link.href = qrCodeDataUrl
                link.download = "medical-record-qr.png"
                link.click()
              }
            }}
          >
            <Download className="h-4 w-4" />
            Download QR Code
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}


