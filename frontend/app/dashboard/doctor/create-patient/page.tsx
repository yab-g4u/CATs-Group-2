"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Send,
  Calendar,
  MessageSquare,
  User,
  Search,
  Bell,
  Moon,
  Sun,
  QrCode,
  Save,
  ArrowLeft,
  UserPlus,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient", active: true },
  { icon: QrCode, label: "Generate QR", href: "/dashboard/doctor/generate-qr" },
  { icon: Users, label: "Records", href: "/dashboard/doctor/records" },
  { icon: User, label: "Profile", href: "/dashboard/doctor/account" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "/dashboard/doctor/account" }]

export default function CreatePatientPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [generatedPatientId, setGeneratedPatientId] = useState("")
  const [generatedQR, setGeneratedQR] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    condition: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate patient ID (in real app, this comes from backend)
    const patientId = `PAT-${Date.now().toString().slice(-9)}`
    setGeneratedPatientId(patientId)
    setGeneratedQR(`https://thespine.app/patient-access?q=${patientId}`)
    setShowSuccessModal(true)
    setIsSubmitting(false)
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
            <span className="font-bold text-foreground">The Spine</span>
            <p className="text-xs text-muted-foreground">Doctor Portal</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src="/ethiopian-male-doctor.jpg" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Dr. Nik Friman</p>
              <p className="text-xs text-muted-foreground">General Physician</p>
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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
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
                  {generatedPatientId}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(generatedPatientId)}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="glow-card rounded-xl p-4 bg-primary/5 text-center">
              <Label className="text-sm text-muted-foreground mb-2 block">QR Code</Label>
              <div className="w-48 h-48 mx-auto bg-background rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <QrCode className="w-32 h-32 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">QR code will be generated here</p>
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

