"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
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
  Stethoscope,
  CalendarRange,
  Coins,
  UserPlus,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { getDoctorCarePoints, getCurrentUser, getDoctorPatients } from "@/lib/api"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient" },
  { icon: Wallet, label: "CarePoints Wallet", href: "/dashboard/doctor/wallet" },
  { icon: MessageSquare, label: "Chatbot", href: "/dashboard/doctor/chatbot" },
]

const sidebarBottomItems = [{ icon: Users, label: "Account", href: "/dashboard/doctor/account" }]

export default function DoctorAppointmentsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [notes, setNotes] = useState("")
  const [patientName, setPatientName] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [appointments, setAppointments] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [carePoints, setCarePoints] = useState(0)
  const [doctorName, setDoctorName] = useState("Zahir")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load doctor info
      const user = getCurrentUser()
      if (user) {
        setDoctorName(user.full_name || "Zahir")
      }

      // Load CarePoints
      try {
        const cpData = await getDoctorCarePoints()
        setCarePoints(cpData.balance || 0)
      } catch (error) {
        console.error("Failed to load CarePoints:", error)
      }

      // Load patients for dropdown
      try {
        const patientsData = await getDoctorPatients()
        setPatients(patientsData)
      } catch (error) {
        console.error("Failed to load patients:", error)
      }

      // Load appointments (placeholder - would need backend endpoint)
      setAppointments([])
    } catch (error) {
      console.error("Failed to load data:", error)
    }
  }

  const availableSlots = ["08:30", "09:00", "09:30", "10:30", "11:30", "14:00", "15:30", "16:00"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !patientName || !reason) {
      alert("Please fill required fields")
      return
    }
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    alert(
      `Appointment booked for ${patientName} with ${selectedDoctor} on ${format(selectedDate, "PPP")} at ${selectedTime}`
    )
    setIsSubmitting(false)
    setPatientName("")
    setReason("")
    setNotes("")
    setSelectedTime("")
  }

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

        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
              <p className="mt-1 text-muted-foreground">Calendar view and new appointments</p>
            </div>
            <Button variant="outline" className="gap-2">
              <CalendarRange className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1">
              <div className="glow-card rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Calendar</h2>
                </div>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border-0"
                />
                {selectedDate && (
                  <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center">
                    <p className="text-sm text-muted-foreground">Selected Date</p>
                    <p className="text-lg font-semibold text-foreground">{format(selectedDate, "EEEE, MMM d, yyyy")}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="xl:col-span-2 space-y-6">
              <div className="glow-card rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Upcoming</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {appointments.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-muted-foreground">No appointments scheduled</div>
                  ) : (
                    appointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="rounded-xl border border-border bg-card/60 p-4 transition-all hover:border-primary/30"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{apt.type}</p>
                            <p className="text-lg font-semibold text-foreground">{apt.patient}</p>
                            <p className="text-xs text-muted-foreground">{apt.time}</p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${apt.status === "confirmed" ? "bg-primary/15 text-primary" : "bg-amber-100 text-amber-700"
                              }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="glow-card rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Schedule New</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient">Patient *</Label>
                      <Select value={patientName} onValueChange={setPatientName}>
                        <SelectTrigger id="patient" className="bg-secondary/50">
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((p) => (
                            <SelectItem key={p.id} value={p.full_name}>
                              {p.full_name} ({p.health_id})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {patients.length === 0 && (
                        <p className="text-xs text-muted-foreground">No patients yet. Create a patient first.</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input readOnly value={selectedDate ? format(selectedDate, "PPP") : ""} className="bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Time *</Label>
                      <div className="flex flex-wrap gap-2">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={selectedTime === slot ? "default" : "outline"}
                            onClick={() => setSelectedTime(slot)}
                            className="h-9 px-3"
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason *</Label>
                    <Input
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="e.g., Follow-up, Lab review"
                      className="bg-secondary/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Optional notes..."
                      className="bg-secondary/50"
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? "Scheduling..." : "Create Appointment"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

