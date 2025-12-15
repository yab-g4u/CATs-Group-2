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
  Clock,
  UserPlus,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient" },
  { icon: Wallet, label: "CarePoints Wallet", href: "/dashboard/doctor/wallet" },
  { icon: MessageSquare, label: "Chatbot", href: "/dashboard/doctor/chatbot" },
]

const sidebarBottomItems = [{ icon: Users, label: "Account", href: "/dashboard/doctor/account" }]

const dayAppointments = [
  { id: 1, patient: "Abebe Bekele", time: "09:00", type: "Follow-up" },
  { id: 2, patient: "Hana Girma", time: "10:30", type: "New Patient" },
  { id: 3, patient: "Yonas Tadesse", time: "11:45", type: "Lab Review" },
  { id: 4, patient: "Meron Assefa", time: "14:00", type: "Consultation" },
]

export default function DoctorCalendarPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <span className="font-bold text-foreground">D.I.N.A</span>
            <p className="text-xs text-muted-foreground">Doctor Portal</p>
          </div>
        </div>
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src="/placeholder.jpg" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Dr. Nik Friman</p>
              <p className="text-xs text-muted-foreground">General Physician</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {sidebarNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${item.active
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

      {/* Main */}
      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur-md">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search calendar" className="h-10 bg-secondary/50 pl-10 focus:bg-card" />
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

        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
              <p className="mt-1 text-muted-foreground">Calendar view with today's appointments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="glow-card rounded-2xl p-6">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="glow-card rounded-2xl p-5">
                <h3 className="mb-3 font-semibold text-foreground">
                  {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </h3>
                <div className="space-y-3">
                  {dayAppointments.map((apt) => (
                    <div key={apt.id} className="rounded-xl border border-border bg-card/60 p-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{apt.patient}</p>
                        <p className="text-xs text-muted-foreground">
                          {apt.time} • {apt.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

