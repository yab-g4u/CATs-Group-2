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
  Heart,
  Pill,
  FlaskConical,
  Plus,
  Check,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/patient", active: true },
  { icon: Calendar, label: "Appointment", href: "/dashboard/patient/appointment" },
  { icon: FileText, label: "Record", href: "/dashboard/patient/record" },
  { icon: MessageSquare, label: "Chat", href: "/dashboard/patient/chat" },
]

const sidebarBottomItems = [
  { icon: User, label: "Account", href: "/dashboard/patient/account" },
]

const tasks = [
  { id: 1, title: "Order drugs", date: "07.06.2020", completed: true },
  { id: 2, title: "Start course", date: "10.06.2020", completed: true },
  { id: 3, title: "Blood test", date: "09:00, 12.06.2020", completed: true },
  { id: 4, title: "Diagnostic", date: "09:00, 12.06.2020", completed: true },
  { id: 5, title: "Took tests", date: "13:30, 10.06.2020", completed: false },
  { id: 6, title: "Consultation", date: "14:00, 10.06.2020", completed: false },
  { id: 7, title: "Diagnostic", date: "07:00, 12.05.2020", completed: false },
]

export default function PatientDashboard() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [taskFilter, setTaskFilter] = useState<"week" | "month">("week")

  const completedTasks = tasks.filter((t) => t.completed).length

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
            <span className="font-bold text-foreground">The Spine</span>
            <p className="text-xs text-muted-foreground">we care about you</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src="/ethiopian-woman-portrait.jpg" />
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

        {/* Dashboard Content */}
        <div className="flex gap-6 p-8">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Greeting */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Hello, <span className="glow-text text-primary">Kate!</span>
                </h1>
                <p className="mt-1 text-muted-foreground">Have are you feeling today?</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="glow-card h-12 w-12 rounded-xl bg-transparent">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </div>

            {/* Doctor and Data Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Your Doctor Card */}
              <div className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Your doctor</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/30">
                      <AvatarImage src="/ethiopian-male-doctor.jpg" />
                      <AvatarFallback>NF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">Nik Friman</p>
                      <p className="text-sm text-primary">Therapist</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-secondary">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Your Data Card */}
              <div className="glow-card rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Your data</h3>
                  <button className="text-sm text-primary hover:underline">Change</button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="text-xl font-bold text-foreground">58 kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="text-xl font-bold text-foreground">1.72 m</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Blood</p>
                    <p className="text-xl font-bold text-foreground">A+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="flex gap-6">
              {/* Service Cards */}
              <div className="flex flex-1 flex-col gap-3">
                <div className="glow-card flex items-center justify-between rounded-xl p-4 transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Diagnostic</h4>
                      <p className="text-sm text-muted-foreground">List of diseases</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="glow-card flex items-center justify-between rounded-xl p-4 transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                      <Pill className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Drugs</h4>
                      <p className="text-sm text-muted-foreground">Archive of tests</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="glow-card flex items-center justify-between rounded-xl p-4 transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/20">
                      <FlaskConical className="h-6 w-6 text-chart-3" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Tests</h4>
                      <p className="text-sm text-muted-foreground">Prescribed medicine</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reminder */}
          <div className="w-80">
            <div className="glow-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Remind me</h3>
                <div className="flex gap-2 text-sm">
                  <span className="text-muted-foreground">Show:</span>
                  <button
                    onClick={() => setTaskFilter("week")}
                    className={`${taskFilter === "week" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    This week
                  </button>
                  <span className="text-muted-foreground">•</span>
                  <button
                    onClick={() => setTaskFilter("month")}
                    className={`${taskFilter === "month" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    Month
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <p className="mb-2 text-sm text-muted-foreground">
                  {completedTasks} task completed out of {tasks.length}
                </p>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                    style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                      task.completed
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-card hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-md ${
                          task.completed ? "bg-primary text-primary-foreground" : "border border-border"
                        }`}
                      >
                        {task.completed && <Check className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${task.completed ? "text-foreground" : "text-foreground"}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{task.date}</p>
                      </div>
                    </div>
                    <button className="text-xs text-primary hover:underline">Change</button>
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
