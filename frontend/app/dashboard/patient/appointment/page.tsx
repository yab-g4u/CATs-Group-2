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
  Clock,
  CalendarDays,
  Stethoscope,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/patient" },
  { icon: Calendar, label: "Appointment", href: "/dashboard/patient/appointment", active: true },
  { icon: FileText, label: "Record", href: "/dashboard/patient/record" },
  { icon: MessageSquare, label: "Chat", href: "/dashboard/patient/chat" },
]

const sidebarBottomItems = [
  { icon: User, label: "Account", href: "/dashboard/patient/account" },
]

const availableDoctors = [
  {
    id: 1,
    name: "Dr. Nik Friman",
    specialty: "Therapist",
    hospital: "D.I.N.A Hospital",
    avatar: "/placeholder.jpg",
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    hospital: "City Medical Center",
    avatar: "",
    availableSlots: ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00"],
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    hospital: "Regional Hospital",
    avatar: "",
    availableSlots: ["09:00", "10:30", "12:00", "14:00", "15:30"],
  },
  {
    id: 4,
    name: "Dr. Aida Tesfaye",
    specialty: "General Practitioner",
    hospital: "D.I.N.A Hospital",
    avatar: "",
    availableSlots: ["08:30", "10:00", "11:30", "13:30", "15:00", "16:30"],
  },
]

export default function PatientAppointmentPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedDoctorData = availableDoctors.find((d) => d.id.toString() === selectedDoctor)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedDoctor || !selectedTime) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    alert(
      `Appointment scheduled with ${selectedDoctorData?.name} on ${format(selectedDate, "PPP")} at ${selectedTime}`
    )
    
    // Reset form
    setSelectedDate(new Date())
    setSelectedDoctor("")
    setSelectedTime("")
    setReason("")
    setNotes("")
    setIsSubmitting(false)
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
            <span className="font-bold text-foreground">D.I.N.A</span>
            <p className="text-xs text-muted-foreground">we care about you</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src="/placeholder.jpg" />
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

        {/* Appointment Content */}
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Schedule Appointment</h1>
            <p className="mt-1 text-muted-foreground">Book an appointment with your doctor</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <div className="lg:col-span-1">
              <div className="glow-card rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Select Date</h2>
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
                    <p className="text-lg font-semibold text-foreground">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Form Section */}
            <div className="lg:col-span-2">
              <div className="glow-card rounded-2xl p-6">
                <div className="mb-6 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Appointment Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Doctor Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Select Doctor *</Label>
                    <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                      <SelectTrigger id="doctor" className="bg-secondary/50">
                        <SelectValue placeholder="Choose a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDoctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id.toString()}>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={doctor.avatar} />
                                <AvatarFallback>
                                  {doctor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{doctor.name}</p>
                                <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Selected Doctor Info */}
                  {selectedDoctorData && (
                    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary/30">
                          <AvatarImage src={selectedDoctorData.avatar} />
                          <AvatarFallback>
                            {selectedDoctorData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{selectedDoctorData.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedDoctorData.specialty}</p>
                          <p className="text-xs text-muted-foreground">{selectedDoctorData.hospital}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Time Selection */}
                  {selectedDoctor && selectedDate && (
                    <div className="space-y-2">
                      <Label htmlFor="time">Select Time *</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {selectedDoctorData?.availableSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className="gap-2"
                          >
                            <Clock className="h-4 w-4" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reason for Visit */}
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit *</Label>
                    <Input
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="e.g., Routine checkup, Follow-up, Consultation"
                      className="bg-secondary/50"
                      required
                    />
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional information you'd like to share..."
                      className="bg-secondary/50"
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Scheduling...
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4" />
                        Schedule Appointment
                      </>
                    )}
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


