"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
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
  ChevronRight,
  Check,
  X,
  FileText,
  UserPlus,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient" },
  { icon: Wallet, label: "CarePoints Wallet", href: "/dashboard/doctor/wallet" },
  { icon: MessageSquare, label: "Chatbot", href: "/dashboard/doctor/chatbot" },
]

const sidebarBottomItems = [{ icon: Users, label: "Account", href: "/dashboard/doctor/account" }]

const referrals = [
  {
    id: "REF-001",
    patient: "Abebe Bekele",
    reason: "Cardiology consult",
    status: "pending",
    to: "Cardiologist - St. Paul's Hospital",
    date: "Dec 10, 2025",
  },
  {
    id: "REF-002",
    patient: "Tigist Haile",
    reason: "Endocrinology follow-up",
    status: "sent",
    to: "Endocrinology - Tikur Anbessa",
    date: "Dec 8, 2025",
  },
  {
    id: "REF-003",
    patient: "Dawit Mengistu",
    reason: "Physiotherapy program",
    status: "accepted",
    to: "Physiotherapy - ALERT Hospital",
    date: "Dec 6, 2025",
  },
]

export default function DoctorReferralsPage() {
  const { theme, toggleTheme, mounted } = useTheme()

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
            <Input placeholder="Search referrals" className="h-10 bg-secondary/50 pl-10 focus:bg-card" />
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
              <h1 className="text-3xl font-bold text-foreground">Referrals</h1>
              <p className="mt-1 text-muted-foreground">Sample referral workflow</p>
            </div>
            <Button className="gap-2">
              <Send className="h-4 w-4" />
              New Referral
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="rounded-2xl border border-border bg-card/60 p-4 transition-all hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{referral.id}</p>
                      <h3 className="text-lg font-semibold text-foreground">{referral.patient}</h3>
                      <p className="text-sm text-muted-foreground">{referral.reason}</p>
                      <p className="mt-1 text-sm text-foreground">{referral.to}</p>
                      <p className="text-xs text-muted-foreground">Date: {referral.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${referral.status === "accepted"
                          ? "bg-primary/15 text-primary"
                          : referral.status === "sent"
                            ? "bg-accent/15 text-accent"
                            : "bg-amber-100 text-amber-700"
                          }`}
                      >
                        {referral.status}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <FileText className="h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Send className="h-4 w-4" />
                          Resend
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="glow-card rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Referral Status</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-semibold text-foreground">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sent</span>
                    <span className="font-semibold text-foreground">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Accepted</span>
                    <span className="font-semibold text-foreground">1</span>
                  </div>
                </div>
              </div>

              <div className="glow-card rounded-2xl p-5">
                <h3 className="mb-3 font-semibold text-foreground">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Create Referral
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Check className="h-4 w-4" />
                    Mark as Accepted
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <X className="h-4 w-4" />
                    Cancel Referral
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

