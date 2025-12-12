"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  Settings,
  User,
  ArrowLeft,
  Save,
  UserPlus,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CheckCircle2 } from "lucide-react"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: Users, label: "Doctors", href: "/dashboard/hospital/doctors", active: true },
  { icon: FileText, label: "Patient Records", href: "/dashboard/hospital/records" },
  { icon: Building2, label: "Hospital Profile", href: "/dashboard/hospital/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/hospital/settings" },
]

export default function AddDoctorPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [generatedStaffId, setGeneratedStaffId] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate staff ID (in real app, this comes from backend)
    const staffId = `DOC-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`
    setGeneratedStaffId(staffId)
    setShowSuccessModal(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Simplified for this page */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <span className="font-bold text-foreground">The Spine</span>
            <p className="text-xs text-muted-foreground">Hospital Portal</p>
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
          <Link href="/dashboard/hospital">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </header>

        <main className="p-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Add Doctor</h1>
              <p className="text-muted-foreground">Add a new doctor to your hospital. They will receive access to the Doctor App.</p>
            </div>

            <form onSubmit={handleSubmit} className="glow-card rounded-2xl p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base">
                  Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="e.g., Dr. John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">
                    Phone <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+251 911 234 567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-base">
                  Department <span className="text-red-400">*</span>
                </Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)} required>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="general-medicine">General Medicine</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Password <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password for the doctor"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  minLength={8}
                  className="h-11"
                />
                <p className="text-sm text-muted-foreground">Doctor will use this password to access the Doctor App.</p>
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
                      Adding...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Add Doctor
                    </>
                  )}
                </Button>
                <Link href="/dashboard/hospital">
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
            <DialogTitle className="text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              Doctor Added Successfully!
            </DialogTitle>
            <DialogDescription>
              The doctor has been added to your hospital and now has access to the Doctor App.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="glow-card rounded-xl p-4 bg-primary/5">
              <Label className="text-sm text-muted-foreground mb-2 block">Staff ID</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background rounded-lg text-lg font-mono font-semibold text-foreground">
                  {generatedStaffId}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(generatedStaffId)}
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Share this Staff ID with the doctor for easy identification.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                onClick={() => {
                  setShowSuccessModal(false)
                  router.push("/dashboard/hospital")
                }}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    department: "",
                    password: "",
                  })
                  setShowSuccessModal(false)
                }}
              >
                Add Another
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

