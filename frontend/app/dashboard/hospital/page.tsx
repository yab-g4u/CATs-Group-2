"use client"

import { useState } from "react"
import Link from "next/link"
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
  Users,
  Clock,
  Building2,
  TrendingUp,
  TrendingDown,
  Activity,
  ClipboardList,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital", active: true },
  { icon: ListOrdered, label: "Patient Queue", href: "/dashboard/hospital/queue" },
  { icon: GitPullRequest, label: "Referral Manager", href: "/dashboard/hospital/referrals" },
  { icon: Calendar, label: "Appointments", href: "/dashboard/hospital/appointments" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/hospital/messages" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/hospital/analytics" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "#" }]

const queuePreview = [
  { id: "A-001", name: "Abebe Bekele", department: "Cardiology", priority: "high", waitTime: "15 min" },
  { id: "A-002", name: "Tigist Haile", department: "General", priority: "normal", waitTime: "25 min" },
  { id: "A-003", name: "Dawit Mengistu", department: "Orthopedics", priority: "normal", waitTime: "30 min" },
]

const referralsPreview = [
  { id: "R-001", patient: "Hana Girma", direction: "Incoming", status: "pending" },
  { id: "R-002", patient: "Biniam Worku", direction: "Incoming", status: "accepted" },
  { id: "R-003", patient: "Meron Assefa", direction: "Outgoing", status: "pending" },
]

const appointmentsPreview = [
  { id: 1, patient: "Abebe Bekele", time: "09:00 AM", department: "Cardiology", status: "in-progress" },
  { id: 2, patient: "Hana Girma", time: "10:30 AM", department: "General", status: "waiting" },
  { id: 3, patient: "Yonas Tadesse", time: "11:45 AM", department: "Orthopedics", status: "scheduled" },
]

const messagesPreview = [
  { id: "PT-001", snippet: "Feedback: waiting time acceptable.", time: "10 min ago" },
  { id: "PT-002", snippet: "Feedback: wheelchair assistance needed.", time: "30 min ago" },
  { id: "PT-003", snippet: "Feedback: thanks for quick service.", time: "1 hour ago" },
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
  const [searchQuery, setSearchQuery] = useState("")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30"
      case "urgent":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
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
            <span className="font-bold text-foreground">The Spine</span>
            <p className="text-xs text-muted-foreground">Hospital Portal</p>
          </div>
        </div>

        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">The Spine Hospital</p>
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

      {/* Main */}
      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur-md">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search queue by name or ticket"
              className="h-10 bg-secondary/50 pl-10 focus:bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Hospital Dashboard</h1>
              <p className="text-muted-foreground">Quick overview with links to queue, referrals, appointments, messages</p>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard/hospital/queue">
                <Button variant="outline">Queue</Button>
              </Link>
              <Link href="/dashboard/hospital/appointments">
                <Button variant="outline">Appointments</Button>
              </Link>
            </div>
          </div>

          {/* Analytics */}
          <div className="grid grid-cols-6 gap-4">
            <AnalyticsCard title="Patients Today" value={analyticsData.patientsToday.value} change={`+${analyticsData.patientsToday.change}%`} trend="up" icon={Users} />
            <AnalyticsCard title="Referrals In" value={analyticsData.referralsReceived.value} change={`+${analyticsData.referralsReceived.change}`} trend="up" icon={GitPullRequest} />
            <AnalyticsCard title="Referrals Out" value={analyticsData.referralsSent.value} change={`${analyticsData.referralsSent.change}`} trend="down" icon={Activity} />
            <AnalyticsCard title="Avg Wait Time" value={analyticsData.avgWaitTime.value} change={`${analyticsData.avgWaitTime.change} min`} trend="down" icon={Clock} />
            <AnalyticsCard title="Bed Occupancy" value={analyticsData.bedOccupancy.value} change={`+${analyticsData.bedOccupancy.change}%`} trend="up" icon={BarChart3} />
            <AnalyticsCard title="Lab Tests Done" value={analyticsData.labTestsCompleted.value} change={`+${analyticsData.labTestsCompleted.change}`} trend="up" icon={ClipboardList} />
          </div>

          {/* Queue & Referrals */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Patient Queue</h3>
                  <p className="text-sm text-muted-foreground">Top 3 patients</p>
                </div>
                <Link href="/dashboard/hospital/queue" className="text-sm text-primary hover:underline">
                  Go to Queue
                </Link>
              </div>
              <div className="space-y-3">
                {queuePreview
                  .filter(
                    (p) =>
                      !searchQuery ||
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.id.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-xl border border-border bg-card/60 p-4">
                      <div>
                        <p className="font-semibold text-foreground hover:text-primary cursor-pointer">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.department} • Ticket {p.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-1 text-xs border ${getPriorityColor(p.priority)}`}>{p.priority}</span>
                        <span className="text-xs text-muted-foreground">{p.waitTime}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Referral Manager</h3>
                <Link href="/dashboard/hospital/referrals" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {referralsPreview.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border bg-card/60 p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">{r.patient}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${r.status === "accepted" ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-600"}`}>
                        {r.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{r.direction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Appointments & Messages */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Appointments</h3>
                  <p className="text-sm text-muted-foreground">Next 3 bookings</p>
                </div>
                <Link href="/dashboard/hospital/appointments" className="text-sm text-primary hover:underline">
                  Manage
                </Link>
              </div>
              <div className="space-y-3">
                {appointmentsPreview.map((apt) => (
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
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Messages</h3>
                <Link href="/dashboard/hospital/messages" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {messagesPreview.map((msg) => (
                  <div key={msg.id} className="rounded-xl border border-border bg-card/60 p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">Patient ID: {msg.id}</p>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

type AnalyticsCardProps = {
  title: string
  value: string | number
  change: string | number
  trend: "up" | "down"
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function AnalyticsCard({ title, value, change, trend, icon: Icon }: AnalyticsCardProps) {
  return (
    <div className="glow-card rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon className="h-5 w-5 text-primary" />
        {trend === "up" ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change}</p>
    </div>
  )
}