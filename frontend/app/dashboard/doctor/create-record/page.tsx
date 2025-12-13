"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  UserPlus,
  QrCode,
  FileText,
  User,
  ArrowLeft,
  Save,
  Upload,
  CheckCircle2,
  Copy,
  Download,
  Shield,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { connectWallet, getAvailableWallets, isWalletConnected, getPubKeyHash } from "@/lib/cardano/wallet"
import { generateQRCode } from "@/lib/qr/generate"
import Image from "next/image"
import { toast } from "sonner"
import { ANCHOR_VALIDATOR_HASH, NETWORK } from "@/lib/cardano/config"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient" },
  { icon: FileText, label: "Create Record", href: "/dashboard/doctor/create-record", active: true },
  { icon: QrCode, label: "Generate QR", href: "/dashboard/doctor/generate-qr" },
  { icon: User, label: "Profile", href: "/dashboard/doctor/account" },
]

export default function CreateRecordPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [availableWallets, setAvailableWallets] = useState<string[]>([])
  const [selectedWallet, setSelectedWallet] = useState<string>("")
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")
  const [recordHash, setRecordHash] = useState<string>("")

  const [formData, setFormData] = useState({
    patientId: "",
    diagnosis: "",
    prescriptions: "",
    notes: "",
    files: [] as File[],
  })

  // Load available wallets on mount
  useEffect(() => {
    getAvailableWallets().then(setAvailableWallets)
  }, [])

  const handleConnectWallet = async () => {
    try {
      if (!selectedWallet) {
        toast.error("Please select a wallet")
        return
      }
      await connectWallet(selectedWallet)
      setWalletConnected(true)
      toast.success(`Connected to ${selectedWallet}`)
    } catch (error) {
      toast.error(`Failed to connect wallet: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.patientId || !formData.diagnosis) {
      toast.error("Please fill in required fields")
      return
    }

    setIsSubmitting(true)
    toast.loading("Uploading record to blockchain...")

    try {
      // Prepare record data
      const recordData = JSON.stringify({
        patientId: formData.patientId,
        diagnosis: formData.diagnosis,
        prescriptions: formData.prescriptions,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
      })

      // Get pubkey hash for smart contract issuer_id
      let issuerPubKeyHash = ""
      try {
        if (walletConnected && selectedWallet) {
          const wallet = await connectWallet(selectedWallet)
          issuerPubKeyHash = await getPubKeyHash()
        }
      } catch (error) {
        console.warn("Failed to get pubkey hash, using mock:", error)
        issuerPubKeyHash = "mock_issuer_hash"
      }

      // Upload to blockchain via API
      const response = await fetch("/api/record/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: formData.patientId,
          recordData,
          walletName: selectedWallet,
          issuerPubKeyHash,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Upload failed")
      }

      // Update streak and CarePoints
      const streakResponse = await fetch("/api/doctor/streak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: "doctor_1", // In production, get from auth context
        }),
      })

      const streakData = await streakResponse.json()
      if (streakData.success) {
        // Update CarePoints in localStorage
        const doctorId = "doctor_1"
        const storedData = localStorage.getItem(`carepoints_${doctorId}`)
        let carePointsData = storedData ? JSON.parse(storedData) : { balance: 0, totalEarned: 0, history: [] }
        
        const carePointsEarned = streakData.carePointsEarned || 10
        carePointsData.balance = (carePointsData.balance || 0) + carePointsEarned
        carePointsData.totalEarned = (carePointsData.totalEarned || 0) + carePointsEarned
        carePointsData.history.unshift({
          id: `tx_${Date.now()}`,
          date: new Date().toISOString(),
          amount: carePointsEarned,
          reason: `Record uploaded - ${streakData.currentStreak} day streak`,
          txHash: result.txHash,
        })
        
        localStorage.setItem(`carepoints_${doctorId}`, JSON.stringify(carePointsData))
      }

      // Generate QR code
      const qrData = await generateQRCode({
        txHash: result.txHash,
        patientId: formData.patientId,
        recordHash: result.recordHash,
      })

      setTxHash(result.txHash)
      setRecordHash(result.recordHash)
      setQrCodeDataUrl(qrData)
      setShowSuccessModal(true)
      
      toast.success("Record uploaded successfully!")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCopyTxHash = () => {
    navigator.clipboard.writeText(txHash)
    toast.success("Transaction hash copied!")
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <span className="font-bold text-foreground">The Spine</span>
            <p className="text-xs text-muted-foreground">Doctor Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>

      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
          <Link href="/dashboard/doctor">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </header>

        <main className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Create Medical Record</h1>
              <p className="text-muted-foreground">Create a new medical record and upload it to the Cardano blockchain.</p>
            </div>

            {/* Wallet Connection */}
            <div className="glow-card rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Connect Wallet
              </h2>
              {!walletConnected ? (
                <div className="space-y-4">
                  <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select a wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableWallets.length > 0 ? (
                        availableWallets.map((wallet) => (
                          <SelectItem key={wallet} value={wallet}>
                            {wallet}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="mock">Mock Wallet (Demo Mode)</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleConnectWallet}
                    disabled={!selectedWallet}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                  >
                    Connect Wallet
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    For demo purposes, you can use "Mock Wallet" without installing a browser extension.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-medium">Wallet Connected</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setWalletConnected(false)}>
                    Disconnect
                  </Button>
                </div>
              )}
            </div>

            {/* Record Form */}
            <form onSubmit={handleSubmit} className="glow-card rounded-2xl p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patientId" className="text-base">
                  Patient ID <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="patientId"
                  type="text"
                  placeholder="e.g., SPN-0001"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange("patientId", e.target.value)}
                  required
                  className="h-11"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the Patient ID or select from your patients list.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis" className="text-base">
                  Diagnosis <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="diagnosis"
                  placeholder="Enter diagnosis..."
                  value={formData.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescriptions" className="text-base">
                  Prescriptions
                </Label>
                <Textarea
                  id="prescriptions"
                  placeholder="List medications and dosages..."
                  value={formData.prescriptions}
                  onChange={(e) => handleInputChange("prescriptions", e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !walletConnected}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 px-8 h-11"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Uploading to Blockchain...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Save to Blockchain
                    </>
                  )}
                </Button>
                <Link href="/dashboard/doctor/patients">
                  <Button type="button" variant="outline" className="h-11">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              Record Uploaded Successfully!
            </DialogTitle>
            <DialogDescription>
              Your medical record has been stored on the Cardano blockchain. Share the QR code with the patient.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* QR Code */}
            <div className="glow-card rounded-xl p-6 bg-primary/5 text-center">
              <h3 className="font-semibold text-foreground mb-4">QR Code</h3>
              {qrCodeDataUrl && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    width={256}
                    height={256}
                    className="rounded-lg"
                  />
                </div>
              )}
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download QR Code
              </Button>
            </div>

            {/* Transaction Hash */}
            <div className="glow-card rounded-xl p-4 bg-primary/5">
              <Label className="text-sm text-muted-foreground mb-2 block">Transaction Hash</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background rounded-lg text-sm font-mono font-semibold text-foreground break-all">
                  {txHash}
                </code>
                <Button variant="outline" size="sm" onClick={handleCopyTxHash}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Record Hash */}
            <div className="glow-card rounded-xl p-4 bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-400" />
                <Label className="text-sm text-muted-foreground">Record Hash (Verified)</Label>
              </div>
              <code className="block px-3 py-2 bg-background rounded-lg text-xs font-mono text-foreground break-all">
                {recordHash}
              </code>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                onClick={() => {
                  setShowSuccessModal(false)
                  router.push("/dashboard/doctor")
                }}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setFormData({
                    patientId: "",
                    diagnosis: "",
                    prescriptions: "",
                    notes: "",
                    files: [],
                  })
                  setShowSuccessModal(false)
                }}
              >
                Create Another
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

