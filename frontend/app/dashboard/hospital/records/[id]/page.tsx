"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  Settings,
  ArrowLeft,
  Download,
  QrCode,
  Shield,
  FileText as FileTextIcon,
  Pill,
  FlaskConical,
  Calendar,
  User,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: Users, label: "Doctors", href: "/dashboard/hospital/doctors" },
  { icon: FileText, label: "Patient Records", href: "/dashboard/hospital/records", active: true },
  { icon: Building2, label: "Hospital Profile", href: "/dashboard/hospital/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/hospital/settings" },
]

// Mock data - in real app, this comes from API based on record ID
const mockRecord = {
  id: 1,
  patientRecordId: "SPN-0001",
  patientName: "Abebe Bekele",
  createdBy: "Dr. Tegegne Abiyot",
  dateCreated: "2024-01-15",
  diagnosis: "Hypertension, Type 2 Diabetes",
  prescriptions: [
    { id: 1, medication: "Lisinopril 10mg", dosage: "Once daily", duration: "30 days" },
    { id: 2, medication: "Metformin 500mg", dosage: "Twice daily", duration: "30 days" },
  ],
  notes: "Patient presented with elevated blood pressure and blood sugar levels. Recommended lifestyle changes including diet and exercise. Follow-up appointment scheduled in 2 weeks.",
  files: [
    { id: 1, name: "Blood Test Results.pdf", type: "pdf", uploaded: "2024-01-15" },
    { id: 2, name: "ECG Report.pdf", type: "pdf", uploaded: "2024-01-15" },
  ],
  cardanoHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  recordHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  qrCode: "https://thespine.app/patient-access?q=SPN-0001",
}

export default function PatientRecordDetailsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const params = useParams()
  const recordId = params.id

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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${item.active
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
          <Link href="/dashboard/hospital/records">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Records
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="glow-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{mockRecord.patientName}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-mono">
                      {mockRecord.patientRecordId}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(mockRecord.dateCreated).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {mockRecord.createdBy}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="glow-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 text-primary" />
                Diagnosis
              </h2>
              <p className="text-foreground text-lg">{mockRecord.diagnosis}</p>
            </div>

            {/* Prescriptions */}
            <div className="glow-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Prescriptions
              </h2>
              <div className="space-y-3">
                {mockRecord.prescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-4 rounded-lg bg-muted/30">
                    <p className="font-semibold text-foreground">{prescription.medication}</p>
                    <p className="text-sm text-muted-foreground">
                      {prescription.dosage} • Duration: {prescription.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="glow-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 text-primary" />
                Notes
              </h2>
              <p className="text-foreground">{mockRecord.notes}</p>
            </div>

            {/* Files */}
            <div className="glow-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Uploaded Files
              </h2>
              <div className="space-y-2">
                {mockRecord.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <FileTextIcon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">Uploaded on {new Date(file.uploaded).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code & Cardano Verification */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glow-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  QR Code
                </h2>
                <div className="w-full aspect-square bg-background rounded-lg flex items-center justify-center border-2 border-dashed border-border mb-4">
                  <QrCode className="w-32 h-32 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground text-center mb-4">
                  Patient can scan this QR code to access their records
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download QR Code
                </Button>
              </div>

              <div className="glow-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Cardano Verification
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Transaction Hash</p>
                    <code className="block p-3 bg-muted rounded-lg text-xs font-mono break-all">
                      {mockRecord.cardanoHash}
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Record Hash</p>
                    <code className="block p-3 bg-muted rounded-lg text-xs font-mono break-all">
                      {mockRecord.recordHash}
                    </code>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">Verified on Cardano Blockchain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

