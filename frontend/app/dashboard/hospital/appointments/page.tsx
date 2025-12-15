"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  LayoutDashboard,
  ListOrdered,
  GitPullRequest,
  Calendar,
  MessageSquare,
  BarChart3,
  User,
  Search,
  Bell,
  Moon,
  Sun,
  Clock,
  Plus,
} from "lucide-react"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: ListOrdered, label: "Patient Queue", href: "/dashboard/hospital/queue" },
  { icon: GitPullRequest, label: "Referral Manager", href: "/dashboard/hospital/referrals" },
  { icon: Calendar, label: "Appointments", href: "/dashboard/hospital/appointments", active: true },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/hospital/messages" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/hospital/analytics" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "#" }]

const initialAppointments = [
  { id: 1, patient: "Abebe Bekele", time: "09:00", department: "Cardiology", status: "in-progress" },
  { id: 2, patient: "Hana Girma", time: "10:30", department: "General", status: "waiting" },
  { id: 3, patient: "Yonas Tadesse", time: "11:45", department: "Orthopedics", status: "scheduled" },
]

export default function HospitalAppointmentsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [appointments, setAppointments] = useState(initialAppointments)
  const [patient, setPatient] = useState("")
  const [time, setTime] = useState("")
  const [dept, setDept] = useState("")
  const [notes, setNotes] = useState("")

  const addAppointment = () => {
    if (!patient || !time || !dept) return
    setAppointments((prev) => [
      ...prev,
      { id: prev.length + 1, patient, time, department: dept, status: "scheduled", notes },
    ])
    setPatient("")
    setTime("")
    setDept("")
    setNotes("")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <span className="font-bold text-foreground">D.I.N.A</span>
            <p className="text-xs text-muted-foreground">Hospital Portal</p>
          </div>
        </div>

        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/30">
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">D.I.N.A Hospital</p>
              <p className="text-xs text-muted-foreground">Addis Ababa</p>
            </div>
          </div>
        </div>

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

      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur-md">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search appointments" className="h-10 bg-secondary/50 pl-10 focus:bg-card" />
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

        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
              <p className="text-muted-foreground">All bookings plus create new</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={addAppointment} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Appointment
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-3">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between rounded-xl border border-border bg-card/60 p-4">
                  <div>
                    <p className="font-semibold text-foreground">{apt.patient}</p>
                    <p className="text-xs text-muted-foreground">{apt.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{apt.time}</p>
                      <p className="text-xs text-muted-foreground capitalize">{apt.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <h3 className="font-semibold text-foreground">New Appointment</h3>
              <Input placeholder="Patient name" value={patient} onChange={(e) => setPatient(e.target.value)} className="bg-secondary/50" />
              <Input placeholder="Time (e.g., 14:00)" value={time} onChange={(e) => setTime(e.target.value)} className="bg-secondary/50" />
              <Input placeholder="Department" value={dept} onChange={(e) => setDept(e.target.value)} className="bg-secondary/50" />
              <Textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="bg-secondary/50" rows={3} />
              <Button onClick={addAppointment} className="w-full">
                Create
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

