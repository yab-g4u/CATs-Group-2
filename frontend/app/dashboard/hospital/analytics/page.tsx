"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LayoutDashboard, ListOrdered, GitPullRequest, Calendar, MessageSquare, BarChart3, User, Bell, Moon, Sun, TrendingUp, TrendingDown, Users, Activity, ClipboardList, Clock } from "lucide-react"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: ListOrdered, label: "Patient Queue", href: "/dashboard/hospital/queue" },
  { icon: GitPullRequest, label: "Referral Manager", href: "/dashboard/hospital/referrals" },
  { icon: Calendar, label: "Appointments", href: "/dashboard/hospital/appointments" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/hospital/messages" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/hospital/analytics", active: true },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "#" }]

const analyticsData = [
  { title: "Patients Today", value: 156, change: "+12%", trend: "up", icon: Users },
  { title: "Referrals In", value: 24, change: "+5", trend: "up", icon: GitPullRequest },
  { title: "Referrals Out", value: 18, change: "-3", trend: "down", icon: Activity },
  { title: "Avg Wait Time", value: "32 min", change: "-8 min", trend: "down", icon: Clock },
  { title: "Bed Occupancy", value: "78%", change: "+2%", trend: "up", icon: BarChart3 },
  { title: "Lab Tests Done", value: 89, change: "+15", trend: "up", icon: ClipboardList },
]

export default function HospitalAnalyticsPage() {
  const { theme, toggleTheme, mounted } = useTheme()

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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Snapshot of key metrics</p>
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
          <div className="grid grid-cols-3 gap-4">
            {analyticsData.map((item) => (
              <div key={item.title} className="glow-card rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.title}</p>
                <p className={`text-xs ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>{item.change}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

