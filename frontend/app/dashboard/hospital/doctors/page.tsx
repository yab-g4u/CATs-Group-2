"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  Settings,
  Search,
  Plus,
  Trash2,
  UserPlus,
  Loader2,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getHospitalDoctors, type Doctor } from "@/lib/api"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: Users, label: "Doctors", href: "/dashboard/hospital/doctors", active: true },
  { icon: FileText, label: "Patient Records", href: "/dashboard/hospital/records" },
  { icon: Building2, label: "Hospital Profile", href: "/dashboard/hospital/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/hospital/settings" },
]

export default function DoctorsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      setIsLoading(true)
      const doctorsData = await getHospitalDoctors()
      setDoctors(doctorsData)
    } catch (error) {
      console.error("Failed to load doctors:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search doctors by name, department, or staff ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 bg-secondary/50 pl-10 focus:bg-card"
              />
            </div>
          </div>
          <Link href="/dashboard/hospital/doctors/add">
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Doctor
            </Button>
          </Link>
        </header>

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Doctors</h1>
            <p className="text-muted-foreground">Manage doctors in your hospital and view their statistics.</p>
          </div>

          <div className="glow-card rounded-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                All Doctors ({filteredDoctors.length})
              </h2>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{doctor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">{doctor.email}</p>
                        <p className="text-xs text-muted-foreground">{doctor.specialization} • {doctor.hospital}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{doctor.records_created || 0} records</p>
                        <p className="text-xs text-muted-foreground">{doctor.care_points_balance || 0} CarePoints</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-400 hover:text-red-500 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">
                {searchQuery ? "No doctors match your search." : "No doctors found."}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

