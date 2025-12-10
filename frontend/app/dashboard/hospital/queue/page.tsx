"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LayoutDashboard, ListOrdered, GitPullRequest, Calendar, MessageSquare, BarChart3, User, Search, Bell, Moon, Sun, CheckCircle, X } from "lucide-react"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: ListOrdered, label: "Patient Queue", href: "/dashboard/hospital/queue", active: true },
  { icon: GitPullRequest, label: "Referral Manager", href: "/dashboard/hospital/referrals" },
  { icon: Calendar, label: "Appointments", href: "/dashboard/hospital/appointments" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/hospital/messages" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/hospital/analytics" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "#" }]

const initialQueue = [
  { id: "A-001", name: "Abebe Bekele", department: "Cardiology", priority: "high", waitTime: "15 min", status: "waiting" },
  { id: "A-002", name: "Tigist Haile", department: "General", priority: "normal", waitTime: "25 min", status: "waiting" },
  { id: "A-003", name: "Dawit Mengistu", department: "Orthopedics", priority: "normal", waitTime: "30 min", status: "waiting" },
]

export default function HospitalQueuePage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [queue, setQueue] = useState(initialQueue)
  const [selected, setSelected] = useState(initialQueue[0])
  const [search, setSearch] = useState("")

  const filtered = queue.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()),
  )

  const updateStatus = (id: string, status: "accepted" | "declined") => {
    setQueue((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
    const current = queue.find((p) => p.id === id)
    if (current) setSelected({ ...current, status })
  }

  const priorityColor = (priority: string) => {
    if (priority === "high") return "bg-orange-500/20 text-orange-500 border-orange-500/30"
    return "bg-primary/20 text-primary border-primary/30"
  }

  return (
    <div className="flex min-h-screen bg-background">
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
            <Avatar className="h-10 w-10 border-2 border-primary/30">
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
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

      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur-md">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or ticket"
              className="h-10 bg-secondary/50 pl-10 focus:bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patient Queue</h1>
            <p className="text-muted-foreground">Top 3 patients with accept/decline and detail panel</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-3">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                    selected.id === p.id ? "border-primary/60 bg-primary/5" : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div>
                    <button className="font-semibold text-foreground hover:text-primary" onClick={() => setSelected(p)}>
                      {p.name}
                    </button>
                    <p className="text-xs text-muted-foreground">
                      {p.department} • Ticket {p.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs border ${priorityColor(p.priority)}`}>{p.priority}</span>
                    <span className="text-xs text-muted-foreground">{p.waitTime}</span>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => updateStatus(p.id, "accepted")}>
                      <CheckCircle className="h-4 w-4" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => updateStatus(p.id, "declined")}>
                      <X className="h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-3">Patient Detail</h3>
              {selected ? (
                <div className="space-y-2 text-sm">
                  <p className="text-lg font-semibold text-foreground">{selected.name}</p>
                  <p className="text-muted-foreground">Ticket {selected.id}</p>
                  <p className="text-muted-foreground">{selected.department}</p>
                  <p className="text-muted-foreground">Wait: {selected.waitTime}</p>
                  <p className="text-muted-foreground capitalize">Status: {selected.status}</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Select a patient to view details</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

