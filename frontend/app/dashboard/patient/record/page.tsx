"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  User,
  Search,
  Bell,
  Moon,
  Sun,
  Upload,
  Send,
  Stethoscope,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/patient" },
  { icon: Calendar, label: "Appointment", href: "#" },
  { icon: FileText, label: "Record", href: "/dashboard/patient/record", active: true },
  { icon: MessageSquare, label: "Chat", href: "#" },
]

const sidebarBottomItems = [
  { icon: User, label: "Account", href: "/dashboard/patient/account" },
]

const medicalHistory = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Consultation",
    doctor: "Dr. Nik Friman",
    diagnosis: "Hypertension - Controlled",
    notes: "Blood pressure readings are within normal range. Continue current medication.",
    medications: ["Lisinopril 10mg daily"],
  },
  {
    id: 2,
    date: "2023-12-10",
    type: "Lab Test",
    doctor: "Dr. Nik Friman",
    diagnosis: "Routine Blood Work",
    notes: "Complete blood count and lipid panel. All values within normal limits.",
    medications: [],
  },
  {
    id: 3,
    date: "2023-11-05",
    type: "Consultation",
    doctor: "Dr. Nik Friman",
    diagnosis: "Annual Checkup",
    notes: "General health assessment. Patient reports feeling well. No concerns.",
    medications: [],
  },
  {
    id: 4,
    date: "2023-09-20",
    type: "Treatment",
    doctor: "Dr. Nik Friman",
    diagnosis: "Hypertension Management",
    notes: "Started on Lisinopril for blood pressure control. Follow-up scheduled in 2 weeks.",
    medications: ["Lisinopril 10mg daily"],
  },
  {
    id: 5,
    date: "2023-08-12",
    type: "Diagnostic",
    doctor: "Dr. Nik Friman",
    diagnosis: "Hypertension - Initial Diagnosis",
    notes: "Elevated blood pressure readings detected. Recommended lifestyle changes and medication.",
    medications: [],
  },
]

const referredDoctors = [
  {
    id: 1,
    name: "Dr. Nik Friman",
    specialty: "Therapist",
    hospital: "The Spine Hospital",
    email: "nik.friman@spine.com",
    avatar: "/ethiopian-male-doctor.jpg",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    hospital: "City Medical Center",
    email: "sarah.johnson@citymed.com",
    avatar: "",
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    hospital: "Regional Hospital",
    email: "michael.chen@regional.com",
    avatar: "",
  },
]

export default function PatientRecordPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = () => {
    setShowShareDialog(true)
  }

  const handleSendToDoctor = async () => {
    if (!selectedDoctor) return

    setIsSharing(true)
    // Simulate PDF generation and sending
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // In real implementation, this would:
    // 1. Generate PDF from medical history
    // 2. Create shareable link
    // 3. Send link to selected doctor
    
    alert(`Medical records PDF link sent to ${referredDoctors.find(d => d.id === selectedDoctor)?.name}`)
    setIsSharing(false)
    setShowShareDialog(false)
    setSelectedDoctor(null)
  }

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
            <p className="text-xs text-muted-foreground">we care about you</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src="/ethiopian-woman-portrait.jpg" />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Sierra Lisbon</p>
              <p className="text-xs text-muted-foreground">s.ferguson@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {sidebarNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    item.active
                      ? "glow-card bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-border px-4 py-4">
          <ul className="space-y-1">
            {sidebarBottomItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur-md">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Global search" className="h-10 bg-secondary/50 pl-10 focus:bg-card" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10 w-10 rounded-full">
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>
          </div>
        </header>

        {/* Medical History Content */}
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Medical History</h1>
              <p className="mt-1 text-muted-foreground">View your complete medical records</p>
            </div>
            <Button onClick={handleShare} variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Medical History List */}
          <div className="space-y-4">
            {medicalHistory.map((record) => (
              <div
                key={record.id}
                className="glow-card rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-xs font-semibold text-primary">{record.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{record.diagnosis}</h3>
                    
                    <p className="mb-3 text-sm text-muted-foreground">
                      <span className="font-medium">Doctor:</span> {record.doctor}
                    </p>
                    
                    <p className="mb-3 text-sm text-foreground">{record.notes}</p>
                    
                    {record.medications.length > 0 && (
                      <div className="mt-3">
                        <p className="mb-1 text-xs font-semibold text-muted-foreground">Medications:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {record.medications.map((med, idx) => (
                            <li key={idx} className="text-sm text-foreground">{med}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {medicalHistory.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">No medical history records found</p>
            </div>
          )}
        </div>
      </main>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Medical Records</DialogTitle>
            <DialogDescription>
              Select a doctor to send your medical history PDF. A shareable link will be generated and sent.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
            {referredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor.id)}
                className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all ${
                  selectedDoctor === doctor.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <Avatar className="h-12 w-12 border-2 border-primary/30">
                  <AvatarImage src={doctor.avatar} />
                  <AvatarFallback>
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <p className="text-xs text-muted-foreground">{doctor.hospital}</p>
                </div>
                {selectedDoctor === doctor.id && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowShareDialog(false)
                setSelectedDoctor(null)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendToDoctor}
              disabled={!selectedDoctor || isSharing}
              className="gap-2"
            >
              {isSharing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send PDF
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

