"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  User,
  Search,
  Bell,
  Moon,
  Sun,
  Building2,
  Plus,
  Trash2,
  Eye,
  Settings,
  LogOut,
  UserPlus,
  Download,
  QrCode,
  Shield,
  TrendingUp,
  Loader2,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getHospitalDoctors,
  getHospitalPatientRecords,
  getHospitalStats,
  getCurrentUser,
  type Doctor,
  type HospitalPatientRecord,
  type HospitalStats,
} from "@/lib/api"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital", active: true },
  { icon: Users, label: "Doctors", href: "/dashboard/hospital/doctors" },
  { icon: FileText, label: "Patient Records", href: "/dashboard/hospital/records" },
  { icon: Building2, label: "Hospital Profile", href: "/dashboard/hospital/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/hospital/settings" },
]

export default function HospitalDashboard() {
  const { theme, toggleTheme, mounted } = useTheme()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [patientRecords, setPatientRecords] = useState<HospitalPatientRecord[]>([])
  const [stats, setStats] = useState<HospitalStats | null>(null)
  const [userInfo] = useState(getCurrentUser())

  useEffect(() => {
    loadHospitalData()
  }, [])

  const loadHospitalData = async () => {
    try {
      setIsLoading(true)
      const [doctorsData, recordsData, statsData] = await Promise.all([
        getHospitalDoctors().catch(() => []),
        getHospitalPatientRecords().catch(() => []),
        getHospitalStats().catch(() => null),
      ])
      
      setDoctors(doctorsData)
      setPatientRecords(recordsData)
      setStats(statsData)
    } catch (error) {
      console.error("Failed to load hospital data:", error)
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

  const filteredRecords = patientRecords.filter(
    (record) =>
      record.health_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.created_by_doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.diagnosis || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!mounted) return null

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
            <span className="font-bold text-foreground">D.I.N.A</span>
            <p className="text-xs text-muted-foreground">Hospital Portal</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarFallback>
                {userInfo?.full_name?.split(" ").map(n => n[0]).join("") || "HA"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{userInfo?.full_name || "Hospital Admin"}</p>
              <p className="text-xs text-muted-foreground">{stats?.hospital_code || "Hospital"}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon
              const isActive = item.active || false
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
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

        {/* Bottom Navigation */}
        <div className="border-t border-border px-4 py-4">
          <button
            onClick={() => router.push("/dashboard/hospital/login")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search doctors, records, patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 bg-secondary/50 pl-10 focus:bg-card"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Dashboard</h1>
            <p className="text-muted-foreground">Manage doctors, view patient records, and monitor hospital activity.</p>
          </div>

          {/* Stats Cards */}
          {isLoading ? (
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glow-card rounded-2xl p-6">
                  <div className="flex items-center justify-center h-20">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Doctors</p>
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stats?.total_doctors || doctors.length}</p>
              </div>
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Patient Records</p>
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stats?.total_patient_records || patientRecords.length}</p>
              </div>
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total CarePoints</p>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.total_care_points || doctors.reduce((sum, doc) => sum + (doc.care_points_balance || 0), 0)}
                </p>
              </div>
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Hospital Code</p>
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stats?.hospital_code || "HSP-001"}</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="records">Patient Records</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Recent Doctors */}
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Recent Doctors</h2>
                  <Link href="/dashboard/hospital/doctors/add">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Doctor
                    </Button>
                  </Link>
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : doctors.length > 0 ? (
                  <div className="space-y-4">
                    {doctors.slice(0, 3).map((doctor) => (
                      <div key={doctor.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{doctor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{doctor.specialization} • {doctor.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{doctor.records_created || 0} records</p>
                          <p className="text-xs text-muted-foreground">{doctor.care_points_balance || 0} CarePoints</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4">No doctors found.</p>
                )}
              </div>

              {/* Recent Records */}
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Recent Patient Records</h2>
                  <Link href="/dashboard/hospital/records">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : patientRecords.length > 0 ? (
                  <div className="space-y-4">
                    {patientRecords.slice(0, 3).map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-semibold text-foreground">{record.patient_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {record.health_id} • Created by {record.created_by_doctor}
                          </p>
                          {record.diagnosis && (
                            <p className="text-xs text-muted-foreground mt-1">{record.diagnosis}</p>
                          )}
                        </div>
                        <Link href={`/dashboard/hospital/records/${record.id}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4">No patient records found.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="space-y-6">
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">All Doctors</h2>
                  <Link href="/dashboard/hospital/doctors/add">
                    <Button className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Doctor
                    </Button>
                  </Link>
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filteredDoctors.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDoctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
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
                          <Button variant="outline" size="sm" className="text-red-400 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4">
                    {searchQuery ? "No doctors match your search." : "No doctors found."}
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="records" className="space-y-6">
              <div className="glow-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">All Patient Records</h2>
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filteredRecords.length > 0 ? (
                  <div className="space-y-4">
                    {filteredRecords.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-semibold text-foreground">{record.patient_name}</p>
                            <span className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded">
                              {record.health_id}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Created by {record.created_by_doctor} {record.created_at && `on ${new Date(record.created_at).toLocaleDateString()}`}
                          </p>
                          {record.diagnosis && (
                            <p className="text-sm text-foreground mt-1">{record.diagnosis}</p>
                          )}
                          {record.cardano_hash && (
                            <div className="flex items-center gap-2 mt-2">
                              <Shield className="h-3 w-3 text-green-400" />
                              <span className="text-xs text-muted-foreground font-mono">{record.cardano_hash.substring(0, 20)}...</span>
                            </div>
                          )}
                        </div>
                        <Link href={`/dashboard/hospital/records/${record.id}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4">
                    {searchQuery ? "No records match your search." : "No patient records found."}
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
