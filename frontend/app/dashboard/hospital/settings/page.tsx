"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  Settings,
  Moon,
  Sun,
  LogOut,
  Bell,
  Shield,
  Key,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: Users, label: "Doctors", href: "/dashboard/hospital/doctors" },
  { icon: FileText, label: "Patient Records", href: "/dashboard/hospital/records" },
  { icon: Building2, label: "Hospital Profile", href: "/dashboard/hospital/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/hospital/settings", active: true },
]

export default function HospitalSettingsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)

  if (!mounted) return null

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
            <p className="text-xs text-muted-foreground">Hospital Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>

      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Appearance */}
            <div className="glow-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                Appearance
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Theme</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                </div>
                <Button variant="outline" onClick={toggleTheme} className="gap-2">
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Notifications */}
            <div className="glow-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about new records and updates</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Alerts</p>
                    <p className="text-sm text-muted-foreground">Get email notifications for important events</p>
                  </div>
                  <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="glow-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security
              </h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Key className="h-4 w-4" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Shield className="h-4 w-4" />
                  Two-Factor Authentication
                </Button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="glow-card rounded-2xl p-6 border-red-500/20">
              <h2 className="text-xl font-semibold text-foreground mb-6">Account Actions</h2>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                  onClick={() => router.push("/dashboard/hospital/login")}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

