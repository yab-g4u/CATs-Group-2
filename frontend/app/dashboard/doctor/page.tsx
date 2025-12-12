"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  User,
  Bell,
  Moon,
  Sun,
  QrCode,
  Send,
  Upload,
  Users,
  Clock,
  ChevronRight,
  X,
  Camera,
  Check,
  FileUp,
  Activity,
  Pill,
  FlaskConical,
  Stethoscope,
  UserPlus,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor", active: true },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient" },
  { icon: QrCode, label: "Generate QR", href: "/dashboard/doctor/generate-qr" },
  { icon: FileText, label: "Records", href: "/dashboard/doctor/records" },
  { icon: User, label: "Profile", href: "/dashboard/doctor/account" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "#" }]

const recentPatients = [
  {
    id: 1,
    name: "Abebe Bekele",
    condition: "Hypertension",
    lastVisit: "Today",
    avatar: "/ethiopian-woman-portrait.jpg",
  },
  { id: 2, name: "Tigist Haile", condition: "Diabetes Type 2", lastVisit: "Yesterday", avatar: "" },
  { id: 3, name: "Dawit Mengistu", condition: "Back Pain", lastVisit: "2 days ago", avatar: "" },
  { id: 4, name: "Sara Tesfaye", condition: "Prenatal Care", lastVisit: "3 days ago", avatar: "" },
]

const appointments = [
  { id: 1, patient: "Abebe Bekele", time: "09:00 AM", type: "Follow-up", status: "confirmed" },
  { id: 2, patient: "Hana Girma", time: "10:30 AM", type: "New Patient", status: "pending" },
  { id: 3, patient: "Yonas Tadesse", time: "11:45 AM", type: "Lab Review", status: "confirmed" },
  { id: 4, patient: "Meron Assefa", time: "02:00 PM", type: "Consultation", status: "confirmed" },
  { id: 5, patient: "Biniam Worku", time: "03:30 PM", type: "Follow-up", status: "pending" },
]

const notifications = [
  { id: 1, title: "Lab result ready", detail: "CBC for Abebe Bekele is available", time: "5m ago" },
  { id: 2, title: "New referral accepted", detail: "Cardiology accepted referral for Hana Girma", time: "18m ago" },
  { id: 3, title: "Appointment update", detail: "Yonas Tadesse moved to 12:15 PM", time: "30m ago" },
]

const patientTimeline = [
  { date: "Dec 5, 2025", event: "Blood Test Results", type: "lab", details: "Hemoglobin: 14.2 g/dL, WBC: 7,500" },
  {
    date: "Nov 28, 2025",
    event: "Prescribed Medication",
    type: "prescription",
    details: "Metformin 500mg, twice daily",
  },
  { date: "Nov 20, 2025", event: "Diagnostic Visit", type: "visit", details: "Routine checkup, BP: 120/80" },
  { date: "Nov 10, 2025", event: "Referral to Specialist", type: "referral", details: "Referred to Cardiologist" },
  { date: "Oct 25, 2025", event: "Initial Consultation", type: "visit", details: "Patient presented with fatigue" },
]

export default function DoctorDashboard() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedPatient, setSelectedPatient] = useState(recentPatients[0])
  const [isScanning, setIsScanning] = useState(false)

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "lab":
        return <FlaskConical className="h-4 w-4" />
      case "prescription":
        return <Pill className="h-4 w-4" />
      case "visit":
        return <Stethoscope className="h-4 w-4" />
      case "referral":
        return <Send className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
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

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Greeting & Quick Actions */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Good Morning, <span className="glow-text text-primary">Dr. Nik!</span>
              </h1>
              <p className="mt-1 text-muted-foreground">You have {appointments.length} appointments today</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setActiveModal("qr")} className="glow-card gap-2 bg-primary hover:bg-primary/90">
                <QrCode className="h-5 w-5" />
                Scan QR
              </Button>
              <Button onClick={() => setActiveModal("referral")} variant="outline" className="glow-card gap-2">
                <Send className="h-5 w-5" />
                Create Referral
              </Button>
              <Button onClick={() => setActiveModal("upload")} variant="outline" className="glow-card gap-2">
                <Upload className="h-5 w-5" />
                Upload Results
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Recent Patients & Patient Timeline */}
            <div className="col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="glow-card rounded-2xl p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 mx-auto items-center justify-center rounded-xl bg-primary/20">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-xs text-muted-foreground">Patients Today</p>
                </div>
                <div className="glow-card rounded-2xl p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 mx-auto items-center justify-center rounded-xl bg-accent/20">
                    <Send className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-xs text-muted-foreground">Referrals Sent</p>
                </div>
                <div className="glow-card rounded-2xl p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 mx-auto items-center justify-center rounded-xl bg-chart-3/20">
                    <FlaskConical className="h-5 w-5 text-chart-3" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Lab Results</p>
                </div>
                <div className="glow-card rounded-2xl p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 mx-auto items-center justify-center rounded-xl bg-chart-4/20">
                    <MessageSquare className="h-5 w-5 text-chart-4" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Unread Messages</p>
                </div>
              </div>

              {/* Recent Patients */}
              <div id="patients" className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Recent Patients</h3>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {recentPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                        selectedPatient.id === patient.id
                          ? "border-primary/50 bg-primary/10"
                          : "border-border bg-card hover:border-primary/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <Link
                            href="#patient-history"
                            onClick={(e) => {
                              e.preventDefault()
                              setSelectedPatient(patient)
                              document.getElementById("patient-history")?.scrollIntoView({ behavior: "smooth" })
                            }}
                            className="font-medium text-foreground hover:text-primary"
                          >
                            {patient.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{patient.lastVisit}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Profile Timeline */}
              <div id="patient-history" className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/30">
                      <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedPatient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{selectedPatient.name}</h3>
                      <p className="text-sm text-muted-foreground">Medical Timeline</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <FileText className="h-4 w-4" />
                    Full Record
                  </Button>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />
                  <div className="space-y-4">
                    {patientTimeline.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {getTimelineIcon(item.type)}
                        </div>
                        <div className="rounded-xl border border-border bg-card/50 p-3 ml-2">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-foreground">{item.event}</p>
                            <span className="text-xs text-muted-foreground">{item.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Notifications & Today's Appointments */}
            <div className="space-y-6">
              <div className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <span className="text-xs text-muted-foreground">Live feed</span>
                </div>
                <div className="space-y-3">
                  {notifications.map((note) => (
                    <div key={note.id} className="rounded-xl border border-border bg-card/50 p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{note.title}</p>
                        <span className="text-xs text-muted-foreground">{note.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{note.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Appointments */}
              <div className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Today's Appointments</h3>
                  <span className="text-xs text-muted-foreground">Dec 6, 2025</span>
                </div>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-card/50 p-3 transition-all hover:border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-secondary">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{apt.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            {apt.time} • {apt.type}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          apt.status === "confirmed" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* QR Scanner Modal */}
      {activeModal === "qr" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glow-card w-full max-w-md rounded-2xl bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">QR Scanner</h3>
              <Button variant="ghost" size="icon" onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-64 w-64 items-center justify-center rounded-2xl border-2 border-dashed border-primary/50 bg-secondary/30">
                {isScanning ? (
                  <div className="text-center">
                    <div className="animate-pulse">
                      <QrCode className="mx-auto h-16 w-16 text-primary" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Position QR code here</p>
                  </div>
                )}
              </div>
              <Button onClick={() => setIsScanning(!isScanning)} className="w-full gap-2">
                <Camera className="h-5 w-5" />
                {isScanning ? "Stop Scanning" : "Start Scanner"}
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Scan patient's QR code to quickly access their medical records
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Create Referral Modal */}
      {activeModal === "referral" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glow-card w-full max-w-lg rounded-2xl bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Create Referral</h3>
              <Button variant="ghost" size="icon" onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {recentPatients.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="specialist">Refer To</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select specialist" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardio">Cardiologist</SelectItem>
                    <SelectItem value="neuro">Neurologist</SelectItem>
                    <SelectItem value="ortho">Orthopedist</SelectItem>
                    <SelectItem value="derm">Dermatologist</SelectItem>
                    <SelectItem value="ent">ENT Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hospital">Hospital</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tikur">Tikur Anbessa Hospital</SelectItem>
                    <SelectItem value="st-paul">St. Paul's Hospital</SelectItem>
                    <SelectItem value="alert">ALERT Hospital</SelectItem>
                    <SelectItem value="zewditu">Zewditu Memorial Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reason">Reason for Referral</Label>
                <Textarea
                  id="reason"
                  placeholder="Describe the reason for this referral..."
                  className="mt-1 min-h-24"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setActiveModal(null)}>
                  Cancel
                </Button>
                <Button className="flex-1 gap-2">
                  <Send className="h-4 w-4" />
                  Send Referral
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Lab Results Modal */}
      {activeModal === "upload" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glow-card w-full max-w-lg rounded-2xl bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Upload Lab Results</h3>
              <Button variant="ghost" size="icon" onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {recentPatients.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="test-type">Test Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood">Blood Test</SelectItem>
                    <SelectItem value="urine">Urine Analysis</SelectItem>
                    <SelectItem value="xray">X-Ray</SelectItem>
                    <SelectItem value="mri">MRI Scan</SelectItem>
                    <SelectItem value="ct">CT Scan</SelectItem>
                    <SelectItem value="ecg">ECG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Upload File</Label>
                <div className="mt-1 flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 transition-colors hover:border-primary/50">
                  <FileUp className="h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add any notes about the results..." className="mt-1 min-h-20" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setActiveModal(null)}>
                  Cancel
                </Button>
                <Button className="flex-1 gap-2">
                  <Check className="h-4 w-4" />
                  Upload Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
