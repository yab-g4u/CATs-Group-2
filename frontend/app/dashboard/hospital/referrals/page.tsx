"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  CheckCircle,
  X,
} from "lucide-react"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: ListOrdered, label: "Patient Queue", href: "/dashboard/hospital/queue" },
  { icon: GitPullRequest, label: "Referral Manager", href: "/dashboard/hospital/referrals", active: true },
  { icon: Calendar, label: "Appointments", href: "/dashboard/hospital/appointments" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/hospital/messages" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/hospital/analytics" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "#" }]

const incomingSeed = [
  { id: "INC-001", patient: "Hana Girma", from: "Black Lion", department: "Cardiology", status: "pending" },
  { id: "INC-002", patient: "Biniam Worku", from: "Yekatit 12", department: "Neurology", status: "accepted" },
  { id: "INC-003", patient: "Lidya Tesfaye", from: "St. Paul's", department: "Oncology", status: "pending" },
]

const outgoingSeed = [
  { id: "OUT-001", patient: "Abebe Bekele", to: "Black Lion", department: "Cardiology", status: "pending" },
  { id: "OUT-002", patient: "Hana Girma", to: "Yekatit 12", department: "General", status: "accepted" },
  { id: "OUT-003", patient: "Meron Assefa", to: "St. Paul's", department: "Pediatrics", status: "completed" },
]

export default function HospitalReferralsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [incoming, setIncoming] = useState(incomingSeed)
  const [outgoing, setOutgoing] = useState(outgoingSeed)
  const [tab, setTab] = useState<"incoming" | "outgoing">("incoming")
  const [search, setSearch] = useState("")

  const list = (tab === "incoming" ? incoming : outgoing).filter(
    (r) => r.patient.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()),
  )

  const setStatus = (id: string, status: "accepted" | "declined") => {
    if (tab === "incoming") {
      setIncoming((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } else {
      setOutgoing((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    }
  }

  const statusColor = (status: string) => {
    if (status === "accepted") return "bg-primary/20 text-primary"
    if (status === "completed") return "bg-green-500/20 text-green-600"
    if (status === "declined") return "bg-red-500/20 text-red-500"
    return "bg-yellow-500/20 text-yellow-600"
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
            <Input
              placeholder="Search referrals"
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Referral Manager</h1>
              <p className="text-muted-foreground">Incoming and outgoing referrals (top 3)</p>
            </div>
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => setTab("incoming")}
                className={`px-3 py-1 rounded-md ${tab === "incoming" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
              >
                Incoming
              </button>
              <button
                onClick={() => setTab("outgoing")}
                className={`px-3 py-1 rounded-md ${tab === "outgoing" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
              >
                Outgoing
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {list.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card/60 p-4 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{r.patient}</p>
                  <p className="text-xs text-muted-foreground">
                    {tab === "incoming" ? `From ${r.from}` : `To ${r.to}`} • {r.department}
                  </p>
                  <p className="text-xs text-muted-foreground">Ref ID: {r.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs ${statusColor(r.status)}`}>{r.status}</span>
                  <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "accepted")} className="gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "declined")} className="gap-1">
                    <X className="h-4 w-4" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

