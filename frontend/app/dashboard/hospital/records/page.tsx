"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  Settings,
  Search,
  Eye,
  Shield,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: Users, label: "Doctors", href: "/dashboard/hospital/doctors" },
  { icon: FileText, label: "Patient Records", href: "/dashboard/hospital/records", active: true },
  { icon: Building2, label: "Hospital Profile", href: "/dashboard/hospital/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/hospital/settings" },
]

const mockPatientRecords = [
  {
    id: 1,
    patientRecordId: "SPN-0001",
    patientName: "Abebe Bekele",
    createdBy: "Dr. Tegegne Abiyot",
    dateCreated: "2024-01-15",
    diagnosisSummary: "Hypertension, Type 2 Diabetes",
    cardanoHash: "0x1234...abcd",
  },
  {
    id: 2,
    patientRecordId: "SPN-0002",
    patientName: "Tigist Haile",
    createdBy: "Dr. Saron Leulkal",
    dateCreated: "2024-01-14",
    diagnosisSummary: "Upper respiratory infection",
    cardanoHash: "0x5678...efgh",
  },
  {
    id: 3,
    patientRecordId: "SPN-0003",
    patientName: "Dawit Mengistu",
    createdBy: "Dr. Rita Tilaye",
    dateCreated: "2024-01-13",
    diagnosisSummary: "Prenatal care - 2nd trimester",
    cardanoHash: "0x9abc...ijkl",
  },
  {
    id: 4,
    patientRecordId: "SPN-0004",
    patientName: "Sara Tesfaye",
    createdBy: "Dr. Tegegne Abiyot",
    dateCreated: "2024-01-12",
    diagnosisSummary: "Back pain, muscle strain",
    cardanoHash: "0xdef0...mnop",
  },
]

export default function PatientRecordsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = mockPatientRecords.filter(
    (record) =>
      record.patientRecordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosisSummary.toLowerCase().includes(searchQuery.toLowerCase())
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
            <span className="font-bold text-foreground">The Spine</span>
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
                placeholder="Search by Patient ID, name, doctor, or diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 bg-secondary/50 pl-10 focus:bg-card"
              />
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Patient Records</h1>
            <p className="text-muted-foreground">View all patient records created by doctors in your hospital.</p>
          </div>

          <div className="glow-card rounded-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                All Records ({filteredRecords.length})
              </h2>
            </div>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-foreground">{record.patientName}</p>
                      <span className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded">
                        {record.patientRecordId}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created by {record.createdBy} on {new Date(record.dateCreated).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-foreground mt-1">{record.diagnosisSummary}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Shield className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-muted-foreground font-mono">{record.cardanoHash}</span>
                    </div>
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
          </div>
        </main>
      </div>
    </div>
  )
}

