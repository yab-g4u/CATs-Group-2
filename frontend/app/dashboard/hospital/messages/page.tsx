"use client"

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
} from "lucide-react"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: ListOrdered, label: "Patient Queue", href: "/dashboard/hospital/queue" },
  { icon: GitPullRequest, label: "Referral Manager", href: "/dashboard/hospital/referrals" },
  { icon: Calendar, label: "Appointments", href: "/dashboard/hospital/appointments" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/hospital/messages", active: true },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/hospital/analytics" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "#" }]

const messagesSeed = [
  { id: "PT-001", subject: "Feedback", body: "Waiting time was acceptable.", time: "10 min ago", unread: true },
  { id: "PT-002", subject: "Assistance", body: "Requesting wheelchair support at entrance.", time: "30 min ago", unread: true },
  { id: "PT-003", subject: "Thank you", body: "Appreciate the quick service today.", time: "1 hour ago", unread: false },
]

export default function HospitalMessagesPage() {
  const { theme, toggleTheme, mounted } = useTheme()

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
            <Input placeholder="Search messages" className="h-10 bg-secondary/50 pl-10 focus:bg-card" />
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

        <div className="p-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground">Feedback from patients (ID only)</p>
          </div>

          <div className="space-y-3">
            {messagesSeed.map((msg) => (
              <div key={msg.id} className="rounded-xl border border-border bg-card/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">Patient ID: {msg.id}</p>
                  <span className={`text-xs ${msg.unread ? "text-primary" : "text-muted-foreground"}`}>{msg.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.subject} — {msg.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

