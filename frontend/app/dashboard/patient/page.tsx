"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
  QrCode,
  Download,
  History,
  ArrowRight,
  Menu,
  X,
  Copy,
  CheckCircle2,
  Shield,
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copiedId, setCopiedId] = useState(false)
  const [copiedHash, setCopiedHash] = useState(false)

  const completedTasks = tasks.filter((t) => t.completed).length

  // Mock data - in real app, this comes from API
  const patientId = "SPN-0001"
  const recordHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"

  const handleCopyId = () => {
    navigator.clipboard.writeText(patientId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const handleCopyHash = () => {
    navigator.clipboard.writeText(recordHash)
    setCopiedHash(true)
    setTimeout(() => setCopiedHash(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-sidebar transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-border px-4 sm:px-6 py-5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0">
            <Image
              src="/icon.png"
              alt="The Spine Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-foreground text-sm sm:text-base">The Spine</span>
            <p className="text-xs text-muted-foreground">we care about you</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-2 hover:bg-muted rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="border-b border-border px-4 sm:px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50 flex-shrink-0">
              <AvatarImage src="/ethiopian-woman-portrait.jpg" />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">Sierra Lisbon</p>
              <p className="text-xs text-muted-foreground truncate">s.ferguson@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    item.active
                      ? "glow-card bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
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
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-4 sm:px-6 lg:px-8 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                className="h-10 bg-secondary/50 pl-10 focus:bg-card text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
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
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8">
          {/* Left Column */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* Greeting */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Hello, <span className="glow-text text-primary">Kate!</span>
                </h1>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground">How are you feeling today?</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="glow-card h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-transparent">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </Button>
              </div>
            </div>

            {/* Doctor and Data Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Your Doctor Card */}
              <div className="glow-card rounded-2xl p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Your doctor</h3>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary/30 flex-shrink-0">
                      <AvatarImage src="/ethiopian-male-doctor.jpg" />
                      <AvatarFallback>NF</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm sm:text-base truncate">Nik Friman</p>
                      <p className="text-xs sm:text-sm text-primary truncate">Therapist</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-secondary">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Your Data Card */}
              <div className="glow-card rounded-2xl p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">Your data</h3>
                  <button className="text-xs sm:text-sm text-primary hover:underline">Change</button>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">58 kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Height</p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">1.72 m</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Blood</p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">A+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History Section */}
            <div className="glow-card rounded-2xl p-4 sm:p-6">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                  <History className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  Medical History
                </h3>
                <Link href="/dashboard/patient/record">
                  <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                    View All
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base">Hypertension Diagnosis</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">January 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base">Prescription: Lisinopril</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">January 15, 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Tests Section */}
            <div className="glow-card rounded-2xl p-4 sm:p-6">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  Past Tests
                </h3>
                <Link href="/dashboard/patient/record">
                  <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                    View All
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base">Blood Test - CBC</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">December 10, 2023 • Results: Normal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm sm:text-base">X-Ray - Chest</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">November 5, 2023 • Results: Clear</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - QR Code & Download */}
          <div className="w-full lg:w-80 space-y-4 sm:space-y-6">
            {/* Patient ID & Verification */}
            <div className="glow-card rounded-2xl p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground text-sm sm:text-base flex items-center gap-2">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  Patient ID
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-xs text-muted-foreground">Your Patient ID</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyId}
                      className="h-6 w-6 p-0"
                    >
                      {copiedId ? (
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <code className="text-sm sm:text-base font-mono font-semibold text-foreground break-all">
                    {patientId}
                  </code>
                </div>
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3 text-green-400" />
                      <p className="text-xs text-muted-foreground">Cardano Record Hash</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyHash}
                      className="h-6 w-6 p-0"
                    >
                      {copiedHash ? (
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <code className="text-xs font-mono text-foreground break-all">
                    {recordHash}
                  </code>
                  <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified on Cardano Blockchain
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code Access */}
            <div className="glow-card rounded-2xl p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground text-sm sm:text-base flex items-center gap-2">
                  <QrCode className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  QR Code Access
                </h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[200px] sm:w-48 aspect-square bg-background rounded-lg flex items-center justify-center border-2 border-dashed border-border mb-4">
                  <QrCode className="w-24 h-24 sm:w-32 sm:h-32 text-muted-foreground" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground text-center mb-4 px-2">
                  Contains: Patient ID + Record Hash. Show to healthcare providers for instant access.
                </p>
                <Button variant="outline" className="w-full gap-2 text-sm sm:text-base">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  Download QR Code
                </Button>
              </div>
            </div>

            {/* Download Report */}
            <div className="glow-card rounded-2xl p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground text-sm sm:text-base flex items-center gap-2">
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  Download Report
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                Download your complete medical history as a PDF report.
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white gap-2 text-sm sm:text-base">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                Download Full Report
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
