"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  User,
  Bell,
  Moon,
  Sun,
  QrCode,
  Save,
  ArrowLeft,
  UserPlus,
  Coins,
  Wallet,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { createPatient, getDoctorCarePoints } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"
import { useEffect } from "react"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient", active: true },
  { icon: Wallet, label: "CarePoints Wallet", href: "/dashboard/doctor/wallet" },
  { icon: MessageSquare, label: "Chatbot", href: "/dashboard/doctor/chatbot" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "/dashboard/doctor/account" }]

export default function CreatePatientPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [generatedPatientId, setGeneratedPatientId] = useState<number | null>(null)
  const [generatedHealthId, setGeneratedHealthId] = useState("")
  const [generatedQRUrl, setGeneratedQRUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [carePoints, setCarePoints] = useState(0)

  // Doctor name from auth context
  const doctorName = user?.full_name || "Doctor"

  useEffect(() => {
    loadDoctorData()
  }, [])

  const loadDoctorData = async () => {
    try {
      const cpData = await getDoctorCarePoints()
      setCarePoints(cpData.balance || 0)
    } catch (error) {
      console.error("Failed to load doctor data:", error)
    }
  }

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    condition: "",
    notes: "",
    emergencyContact: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await createPatient({
        full_name: formData.fullName,
        age: formData.age ? parseInt(formData.age) : undefined,
        date_of_birth: formData.dateOfBirth || undefined,
        gender: formData.gender,
        condition: formData.condition || undefined,
        notes: formData.notes || undefined,
        emergency_contact: formData.emergencyContact || undefined,
      })

      setGeneratedPatientId(response.patient_id)
      setGeneratedHealthId(response.health_id)
      setGeneratedQRUrl(response.qr_code_url)
      setShowSuccessModal(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create patient")
      console.error("Error creating patient:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <span className="font-bold text-foreground">D.I.N.A</span>
            <p className="text-xs text-muted-foreground">Doctor Portal</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src="/placeholder.jpg" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Dr. {doctorName}</p>
              <p className="text-xs text-muted-foreground">General Physician</p>
            </div>
          </div>
        </div>

        {/* CarePoints Display */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card rounded-xl p-3 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">CarePoints</p>
                  <p className="text-lg font-bold text-foreground">{carePoints.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon
              const isActive = item.active || false
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
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

        {/* Bottom Navigation */}
        <div className="border-t border-border px-4 py-4">
          <div className="space-y-1">
            {sidebarBottomItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/doctor/patients">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Patients
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create New Patient</h1>
            <p className="text-muted-foreground">Add a new patient to your records. A unique Patient ID and QR code will be generated automatically.</p>
          </div>

          <div className="max-w-3xl">
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="glow-card rounded-2xl p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base">
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="e.g., Abebe Bekele"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-base">
                    Gender <span className="text-red-400">*</span>
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)} required>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-base">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 45"
                    min="0"
                    max="150"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-base">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition" className="text-base">
                  Condition (Optional)
                </Label>
                <Input
                  id="condition"
                  type="text"
                  placeholder="e.g., Hypertension, Diabetes Type 2"
                  value={formData.condition}
                  onChange={(e) => handleInputChange("condition", e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about the patient..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-base">
                  Emergency Contact (Optional)
                </Label>
                <Input
                  id="emergencyContact"
                  type="text"
                  placeholder="e.g., +251 911 234 567"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 px-8 h-11"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Patient
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Patient Created Successfully!</DialogTitle>
            <DialogDescription>
              The patient has been added to your records. Share the Patient ID or QR code with the patient.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="glow-card rounded-xl p-4 bg-primary/5">
              <Label className="text-sm text-muted-foreground mb-2 block">Patient ID</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background rounded-lg text-lg font-mono font-semibold text-foreground">
                  {generatedHealthId || generatedPatientId}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(generatedHealthId || String(generatedPatientId))}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="glow-card rounded-xl p-4 bg-primary/5 text-center">
              <Label className="text-sm text-muted-foreground mb-2 block">QR Code</Label>
              {generatedQRUrl ? (
                <div className="w-48 h-48 mx-auto bg-background rounded-lg flex items-center justify-center border-2 border-border overflow-hidden">
                  <Image
                    src={generatedQRUrl}
                    alt="Patient QR Code"
                    width={192}
                    height={192}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 mx-auto bg-background rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <QrCode className="w-32 h-32 text-muted-foreground" />
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {generatedQRUrl ? "QR code generated successfully" : "QR code will be generated here"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                onClick={() => {
                  setShowSuccessModal(false)
                  router.push("/dashboard/doctor/patients")
                }}
              >
                View Patient
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setFormData({
                    fullName: "",
                    age: "",
                    dateOfBirth: "",
                    gender: "",
                    condition: "",
                    notes: "",
                    emergencyContact: "",
                  })
                  setGeneratedPatientId(null)
                  setGeneratedHealthId("")
                  setGeneratedQRUrl(null)
                  setError(null)
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

