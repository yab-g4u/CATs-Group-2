"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  Send,
  Calendar,
  MessageSquare,
  Search,
  Bell,
  Moon,
  Sun,
  FileText,
  Activity,
  Pill,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "Patients", href: "/dashboard/doctor/patients", active: true },
  { icon: Send, label: "Referrals", href: "/dashboard/doctor/referrals" },
  { icon: Calendar, label: "Appointments", href: "/dashboard/doctor/appointments" },
  { icon: MessageSquare, label: "Chatbot", href: "/dashboard/doctor/chatbot" },
]

const sidebarBottomItems = [
  { icon: Users, label: "Account", href: "#" },
]

const patients = [
  {
    id: 1,
    name: "Abebe Bekele",
    condition: "Hypertension",
    lastVisit: "Today",
    avatar: "/ethiopian-woman-portrait.jpg",
    age: 42,
    bloodType: "A+",
    notes: "BP trending stable, continue Lisinopril.",
    history: [
      { label: "BP", value: "120/78" },
      { label: "HR", value: "72 bpm" },
      { label: "Last Lab", value: "Normal" },
    ],
  },
  {
    id: 2,
    name: "Tigist Haile",
    condition: "Diabetes Type 2",
    lastVisit: "Yesterday",
    avatar: "",
    age: 35,
    bloodType: "O+",
    notes: "A1C improving, keep Metformin.",
    history: [
      { label: "A1C", value: "6.8%" },
      { label: "Weight", value: "62 kg" },
      { label: "Last Lab", value: "Normal" },
    ],
  },
  {
    id: 3,
    name: "Dawit Mengistu",
    condition: "Back Pain",
    lastVisit: "2 days ago",
    avatar: "",
    age: 29,
    bloodType: "B-",
    notes: "Physio scheduled, no red flags.",
    history: [
      { label: "Pain", value: "4/10" },
      { label: "Mobility", value: "Good" },
      { label: "Imaging", value: "Pending" },
    ],
  },
]

export default function DoctorPatientsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [showRecord, setShowRecord] = useState(false)

  const fakeRecord = {
    vitals: [
      { label: "Blood Pressure", value: "120/78 mmHg" },
      { label: "Heart Rate", value: "72 bpm" },
      { label: "Temp", value: "36.8°C" },
    ],
    meds: ["Lisinopril 10mg daily", "Vitamin D 1000 IU"],
    labs: ["CBC: Normal", "Lipid Panel: Borderline LDL", "A1C: 6.8%"],
    notes: "Follow-up in 2 weeks. Continue medication and monitor home BP.",
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
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search patients" className="h-10 bg-secondary/50 pl-10 focus:bg-card" />
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

        {/* Page Body */}
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Patients</h1>
              <p className="mt-1 text-muted-foreground">Three patients with quick history</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient list */}
            <div className="lg:col-span-1 space-y-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                    selectedPatient.id === patient.id
                      ? "border-primary/60 bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href="#" className="font-semibold text-foreground hover:text-primary">
                        {patient.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                      <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Patient detail */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 border-2 border-primary/40">
                      <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedPatient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{selectedPatient.name}</h2>
                      <p className="text-sm text-muted-foreground">{selectedPatient.condition}</p>
                      <p className="text-xs text-muted-foreground">
                        Age {selectedPatient.age} • Blood {selectedPatient.bloodType}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowRecord(true)}>
                    <FileText className="h-4 w-4" />
                    View Full Record
                  </Button>
                </div>

                <p className="mt-4 text-sm text-foreground">{selectedPatient.notes}</p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {selectedPatient.history.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-border bg-card/60 p-3">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-lg font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glow-card rounded-2xl p-6">
                <h3 className="mb-3 font-semibold text-foreground">Recent Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-card/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <Stethoscope className="h-4 w-4" />
                      <span className="text-sm font-semibold">Visit</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Consulted for follow-up and vitals review.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-chart-3">
                      <Pill className="h-4 w-4" />
                      <span className="text-sm font-semibold">Medication</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Renewed prescription and adjusted dosage.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-accent">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm font-semibold">Lab</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Latest labs reviewed, all within range.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showRecord} onOpenChange={setShowRecord}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedPatient.name} — Full Record (sample)</DialogTitle>
            <DialogDescription>Static data for demo purposes.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {fakeRecord.vitals.map((v, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card/60 p-3">
                  <p className="text-xs text-muted-foreground">{v.label}</p>
                  <p className="text-lg font-semibold text-foreground">{v.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Medications</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                {fakeRecord.meds.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Recent Labs</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                {fakeRecord.labs.map((l, idx) => (
                  <li key={idx}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Notes</p>
              <p className="text-sm text-muted-foreground">{fakeRecord.notes}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

