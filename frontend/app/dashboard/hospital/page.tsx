"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  CalendarDays,
  User,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Moon,
  Sun,
  Users,
  Clock,
  ChevronRight,
  X,
  Upload,
  FileUp,
  Building2,
  ListOrdered,
  GitPullRequest,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  UserPlus,
  Filter,
  CheckCircle,
  ClipboardList,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#", active: true },
  { icon: ListOrdered, label: "Patient Queue", href: "#queue" },
  { icon: GitPullRequest, label: "Referral Manager", href: "#referrals" },
  { icon: Upload, label: "Lab Results", href: "#lab-results" },
  { icon: Calendar, label: "Appointments", href: "#appointments" },
  { icon: MessageSquare, label: "Messages", href: "#messages" },
  { icon: BarChart3, label: "Analytics", href: "#analytics" },
  { icon: CalendarDays, label: "Calendar", href: "#" },
]

const sidebarBottomItems = [
  { icon: User, label: "Account", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help center", href: "#" },
]

const patientQueue = [
  { id: 1, name: "Abebe Bekele", department: "Cardiology", priority: "high", waitTime: "15 min", ticketNo: "A-001" },
  { id: 2, name: "Tigist Haile", department: "General", priority: "normal", waitTime: "25 min", ticketNo: "A-002" },
  {
    id: 3,
    name: "Dawit Mengistu",
    department: "Orthopedics",
    priority: "normal",
    waitTime: "30 min",
    ticketNo: "A-003",
  },
  { id: 4, name: "Sara Tesfaye", department: "OB/GYN", priority: "urgent", waitTime: "5 min", ticketNo: "A-004" },
  { id: 5, name: "Yonas Tadesse", department: "General", priority: "normal", waitTime: "40 min", ticketNo: "A-005" },
  { id: 6, name: "Meron Assefa", department: "Pediatrics", priority: "high", waitTime: "20 min", ticketNo: "A-006" },
]

const incomingReferrals = [
  {
    id: 1,
    patient: "Hana Girma",
    from: " Hospital",
    department: "Cardiology",
    date: "Dec 6, 2025",
    status: "pending",
  },
  {
    id: 2,
    patient: "Biniam Worku",
    from: "Yekatit 12 Hospital",
    department: "Neurology",
    date: "Dec 5, 2025",
    status: "accepted",
  },
  {
    id: 3,
    patient: "Lidya Tesfaye",
    from: "St. Paul's Hospital",
    department: "Oncology",
    date: "Dec 5, 2025",
    status: "pending",
  },
  {
    id: 4,
    patient: "Getachew Alemu",
    from: "Zewditu Hospital",
    department: "Nephrology",
    date: "Dec 4, 2025",
    status: "completed",
  },
]

const outgoingReferrals = [
  {
    id: 1,
    patient: "Abebe Bekele",
    to: "Black Lion Hospital",
    department: "Cardiology",
    date: "Dec 6, 2025",
    status: "pending",
  },
  {
    id: 2,
    patient: "Sara Tesfaye",
    to: "St. Peter's Hospital",
    department: "OB/GYN",
    date: "Dec 5, 2025",
    status: "accepted",
  },
]

const appointments = [
  {
    id: 1,
    patient: "Abebe Bekele",
    doctor: "Dr. Nik Friman",
    time: "09:00 AM",
    department: "Cardiology",
    status: "in-progress",
  },
  {
    id: 2,
    patient: "Hana Girma",
    doctor: "Dr. Sara Haile",
    time: "10:30 AM",
    department: "General",
    status: "waiting",
  },
  {
    id: 3,
    patient: "Yonas Tadesse",
    doctor: "Dr. Dawit Mengistu",
    time: "11:45 AM",
    department: "Orthopedics",
    status: "waiting",
  },
  {
    id: 4,
    patient: "Meron Assefa",
    doctor: "Dr. Tigist Bekele",
    time: "02:00 PM",
    department: "Pediatrics",
    status: "scheduled",
  },
]

const recentMessages = [
  { id: 1, from: "Dr. Nik Friman", message: "Patient transfer approved", time: "10 min ago", unread: true },
  { id: 2, from: "  Hospital", message: "Referral documents received", time: "30 min ago", unread: true },
  { id: 3, from: "Lab Department", message: "Results ready for review", time: "1 hour ago", unread: false },
]

const analyticsData = {
  patientsToday: { value: 156, change: 12, trend: "up" },
  referralsReceived: { value: 24, change: 5, trend: "up" },
  referralsSent: { value: 18, change: -3, trend: "down" },
  avgWaitTime: { value: "32 min", change: -8, trend: "down" },
  bedOccupancy: { value: "78%", change: 2, trend: "up" },
  labTestsCompleted: { value: 89, change: 15, trend: "up" },
}

export default function HospitalDashboard() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof patientQueue>([])
  const [referralTab, setReferralTab] = useState<"incoming" | "outgoing">("incoming")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const results = patientQueue.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) || p.ticketNo.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-600"
      case "accepted":
        return "bg-primary/20 text-primary"
      case "completed":
        return "bg-green-500/20 text-green-600"
      case "in-progress":
        return "bg-blue-500/20 text-blue-500"
      case "waiting":
        return "bg-orange-500/20 text-orange-500"
      case "scheduled":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
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
            <span className="font-bold text-foreground"> <a href="/"> The Spine </a></span>
            <p className="text-xs text-muted-foreground">Hospital Portal</p>
          </div>
        </div>

        {/* Hospital Profile */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground"> </p>
              <p className="text-xs text-muted-foreground">General Hospital</p>
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
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or ticket number..."
              className="h-10 bg-secondary/50 pl-10 focus:bg-card"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border bg-card p-2 shadow-lg z-50">
                {searchResults.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between rounded-lg p-3 hover:bg-secondary cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {patient.ticketNo} • {patient.department}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10 w-10 rounded-full">
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-primary/30">
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Greeting & Quick Actions */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                <span className="glow-text text-primary"> </span> Hospital
              </h1>
              <p className="mt-1 text-muted-foreground">
                {patientQueue.length} patients in queue •{" "}
                {incomingReferrals.filter((r) => r.status === "pending").length} pending referrals
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setActiveModal("upload")}
                className="glow-card gap-2 bg-primary hover:bg-primary/90"
              >
                <Upload className="h-5 w-5" />
                Upload Lab Results
              </Button>
              <Button onClick={() => setActiveModal("add-patient")} variant="outline" className="glow-card gap-2">
                <UserPlus className="h-5 w-5" />
                Add Patient
              </Button>
            </div>
          </div>

          {/* Analytics Panel */}
          <div className="mb-6 grid grid-cols-6 gap-4">
            <div className="glow-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-primary" />
                {analyticsData.patientsToday.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.patientsToday.value}</p>
              <p className="text-xs text-muted-foreground">Patients Today</p>
              <p className="text-xs text-green-500">+{analyticsData.patientsToday.change}%</p>
            </div>
            <div className="glow-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <GitPullRequest className="h-5 w-5 text-accent" />
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.referralsReceived.value}</p>
              <p className="text-xs text-muted-foreground">Referrals In</p>
              <p className="text-xs text-green-500">+{analyticsData.referralsReceived.change}</p>
            </div>
            <div className="glow-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-5 w-5 text-chart-3" />
                <TrendingDown className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.referralsSent.value}</p>
              <p className="text-xs text-muted-foreground">Referrals Out</p>
              <p className="text-xs text-red-500">{analyticsData.referralsSent.change}</p>
            </div>
            <div className="glow-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-5 w-5 text-chart-4" />
                <TrendingDown className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.avgWaitTime.value}</p>
              <p className="text-xs text-muted-foreground">Avg Wait Time</p>
              <p className="text-xs text-green-500">{analyticsData.avgWaitTime.change}%</p>
            </div>
            <div className="glow-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Building2 className="h-5 w-5 text-chart-5" />
                <TrendingUp className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.bedOccupancy.value}</p>
              <p className="text-xs text-muted-foreground">Bed Occupancy</p>
              <p className="text-xs text-yellow-500">+{analyticsData.bedOccupancy.change}%</p>
            </div>
            <div className="glow-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.labTestsCompleted.value}</p>
              <p className="text-xs text-muted-foreground">Lab Tests</p>
              <p className="text-xs text-green-500">+{analyticsData.labTestsCompleted.change}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Patient Queue */}
            <div className="col-span-2 space-y-6">
              {/* Patient Queue */}
              <div className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ListOrdered className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Patient Queue</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <button className="text-sm text-primary hover:underline">View All</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {patientQueue.map((patient, index) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary font-bold text-foreground">
                          {patient.ticketNo}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Wait time</p>
                          <p className="font-medium text-foreground">{patient.waitTime}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full border ${getPriorityColor(patient.priority)}`}>
                          {patient.priority}
                        </span>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <CheckCircle className="h-4 w-4" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referral Manager */}
              <div className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GitPullRequest className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Referral Manager</h3>
                  </div>
                  <div className="flex rounded-lg border border-border p-1">
                    <button
                      onClick={() => setReferralTab("incoming")}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        referralTab === "incoming" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      Incoming ({incomingReferrals.length})
                    </button>
                    <button
                      onClick={() => setReferralTab("outgoing")}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        referralTab === "outgoing" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      Outgoing ({outgoingReferrals.length})
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {(referralTab === "incoming" ? incomingReferrals : outgoingReferrals).map((referral) => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/20"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarFallback>
                            {referral.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{referral.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {referralTab === "incoming"
                              ? `From: ${referral.from}`
                              : `To: ${(referral as (typeof outgoingReferrals)[0]).to}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{referral.department}</p>
                          <p className="text-xs text-muted-foreground">{referral.date}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(referral.status)}`}>
                          {referral.status}
                        </span>
                        {referral.status === "pending" && referralTab === "incoming" && (
                          <div className="flex gap-2">
                            <Button size="sm" className="h-8 bg-primary">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 bg-transparent">
                              Decline
                            </Button>
                          </div>
                        )}
                        {referral.status !== "pending" && (
                          <Button variant="ghost" size="sm" className="h-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Appointments & Messages */}
            <div className="space-y-6">
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
                          <p className="font-medium text-foreground text-sm">{apt.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            {apt.doctor} • {apt.time}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Messages */}
              <div className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Messages</h3>
                  <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {recentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 rounded-xl border p-3 transition-all cursor-pointer ${
                        msg.unread ? "border-primary/30 bg-primary/5" : "border-border bg-card/50"
                      } hover:border-primary/20`}
                    >
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarFallback>
                          {msg.from
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground">{msg.from}</p>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{msg.message}</p>
                      </div>
                      {msg.unread && <span className="h-2 w-2 rounded-full bg-primary mt-2" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Stats */}
              <div className="glow-card rounded-2xl p-5">
                <h3 className="mb-4 font-semibold text-foreground">Department Load</h3>
                <div className="space-y-3">
                  {[
                    { name: "General", patients: 45, capacity: 80 },
                    { name: "Cardiology", patients: 28, capacity: 30 },
                    { name: "Pediatrics", patients: 32, capacity: 50 },
                    { name: "OB/GYN", patients: 18, capacity: 25 },
                  ].map((dept) => (
                    <div key={dept.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{dept.name}</span>
                        <span className="text-muted-foreground">
                          {dept.patients}/{dept.capacity}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            dept.patients / dept.capacity > 0.9
                              ? "bg-red-500"
                              : dept.patients / dept.capacity > 0.7
                                ? "bg-yellow-500"
                                : "bg-primary"
                          }`}
                          style={{ width: `${(dept.patients / dept.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Lab Results Modal */}
      {activeModal === "upload" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glow-card w-full max-w-lg rounded-2xl bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Upload Lab Results</h3>
              <Button variant="ghost" size="icon" onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Patient</Label>
                <Select>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patientQueue.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.name} ({p.ticketNo})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Test Type</Label>
                <Select>
                  <SelectTrigger className="bg-secondary/50">
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
              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 transition-colors hover:border-primary/50">
                  <FileUp className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add any notes about the results..." className="bg-secondary/50" rows={3} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setActiveModal(null)} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 gap-2 bg-primary">
                  <Upload className="h-4 w-4" />
                  Upload Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {activeModal === "add-patient" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glow-card w-full max-w-lg rounded-2xl bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Add Patient to Queue</h3>
              <Button variant="ghost" size="icon" onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="Enter first name" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Enter last name" className="bg-secondary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="obgyn">OB/GYN</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reason for Visit</Label>
                <Textarea placeholder="Brief description of visit reason..." className="bg-secondary/50" rows={3} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setActiveModal(null)} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 gap-2 bg-primary">
                  <UserPlus className="h-4 w-4" />
                  Add to Queue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
