"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
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
  FileText,
  Activity,
  Pill,
  Stethoscope,
  Coins,
  UserPlus,
  QrCode,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { getDoctorPatients, getDoctorCarePoints } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { generatePatientQRCode } from "@/lib/qr/generate"
import Image from "next/image"
import { toast } from "sonner"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "Patients", href: "/dashboard/doctor/patients", active: true },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient" },
  { icon: Wallet, label: "CarePoints Wallet", href: "/dashboard/doctor/wallet" },
  { icon: MessageSquare, label: "Chatbot", href: "/dashboard/doctor/chatbot" },
]

const sidebarBottomItems = [
  { icon: Users, label: "Account", href: "/dashboard/doctor/account" },
]

export default function DoctorPatientsPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const { user } = useAuth()
  const [patients, setPatients] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showRecord, setShowRecord] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [carePoints, setCarePoints] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showQRModal, setShowQRModal] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null)
  const [isGeneratingQR, setIsGeneratingQR] = useState(false)

  // Doctor name from auth context
  const doctorName = user?.full_name || "Doctor"

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      setIsLoading(true)

      // Load CarePoints
      try {
        const cpData = await getDoctorCarePoints()
        setCarePoints(cpData.balance || 0)
      } catch (error) {
        console.error("Failed to load CarePoints:", error)
      }

      // Load patients
      const patientsData = await getDoctorPatients()
      const formattedPatients = patientsData.map((p: any) => ({
        id: p.id,
        name: p.full_name,
        condition: "Patient",
        lastVisit: p.created_at ? new Date(p.created_at).toLocaleDateString() : "N/A",
        avatar: "",
        health_id: p.health_id,
        notes: `Patient ID: ${p.health_id}`,
        history: [
          { label: "Health ID", value: p.health_id },
          { label: "Created", value: p.created_at ? new Date(p.created_at).toLocaleDateString() : "N/A" },
        ],
      }))
      setPatients(formattedPatients)
      if (formattedPatients.length > 0) {
        setSelectedPatient(formattedPatients[0])
      }
    } catch (error) {
      console.error("Failed to load patients:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.health_id.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            <p className="text-xs text-muted-foreground">Doctor Portal</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src="/placeholder.jpg" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Dr. {doctorName}</p>
              <p className="text-xs text-muted-foreground">General Physician</p>
            </div>
          </div>
        </div>

        {/* CarePoints Display */}
        <div className="border-b border-border px-6 py-4">
          <div className="glow-card rounded-xl p-3 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">CarePoints</p>
                  <p className="text-lg font-bold text-foreground">{carePoints.toLocaleString()}</p>
                </div>
              </div>
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
            <Input
              placeholder="Search patients"
              className="h-10 bg-secondary/50 pl-10 focus:bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

        {/* Page Body */}
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Patients</h1>
              <p className="mt-1 text-muted-foreground">{patients.length} patient{patients.length !== 1 ? 's' : ''} in your records</p>
            </div>
            <Link href="/dashboard/doctor/create-patient">
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Create Patient
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient list */}
            <div className="lg:col-span-1 space-y-4">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading patients...</div>
              ) : filteredPatients.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No patients found matching your search" : "No patients yet. Create your first patient!"}
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`rounded-2xl border p-4 cursor-pointer transition-all ${selectedPatient?.id === patient.id
                      ? "border-primary/60 bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarImage src={patient.avatar || "/placeholder.jpg"} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href="#" className="font-semibold text-foreground hover:text-primary">
                          {patient.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Patient detail */}
            <div className="lg:col-span-2 space-y-4">
              {selectedPatient ? (
                <div className="glow-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-14 w-14 border-2 border-primary/40">
                        <AvatarImage src={selectedPatient?.avatar || "/placeholder.jpg"} />
                        <AvatarFallback>
                          {selectedPatient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">{selectedPatient.name}</h2>
                        <p className="text-sm text-muted-foreground">{selectedPatient.condition}</p>
                        <p className="text-xs text-muted-foreground">
                          Health ID: {selectedPatient.health_id}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowRecord(true)}>
                      <FileText className="h-4 w-4" />
                      View Full Record
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 bg-transparent"
                      disabled={isGeneratingQR}
                      onClick={async () => {
                        try {
                          setIsGeneratingQR(true)
                          const qrDataUrl = await generatePatientQRCode(selectedPatient.health_id)
                          setQrCodeDataUrl(qrDataUrl)
                          setShowQRModal(true)
                        } catch (error) {
                          toast.error("Failed to generate QR code")
                          console.error(error)
                        } finally {
                          setIsGeneratingQR(false)
                        }
                      }}
                    >
                      <QrCode className="h-4 w-4" />
                      {isGeneratingQR ? "Generating..." : "Generate QR"}
                    </Button>
                  </div>

                  <p className="mt-4 text-sm text-foreground">{selectedPatient.notes}</p>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {selectedPatient.history.map((item: any, idx: number) => (
                      <div key={idx} className="rounded-xl border border-border bg-card/60 p-3">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-lg font-semibold text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glow-card rounded-2xl p-6 text-center py-12">
                  <p className="text-muted-foreground">Select a patient to view details</p>
                </div>
              )}

              <div className="glow-card rounded-2xl p-6">
                <h3 className="mb-3 font-semibold text-foreground">Recent Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-card/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <Stethoscope className="h-4 w-4" />
                      <span className="text-sm font-semibold">Visit</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Consulted for follow-up and vitals review.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-chart-3">
                      <Pill className="h-4 w-4" />
                      <span className="text-sm font-semibold">Medication</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Renewed prescription and adjusted dosage.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-accent">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm font-semibold">Lab</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Latest labs reviewed, all within range.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedPatient && (
        <Dialog open={showRecord} onOpenChange={setShowRecord}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedPatient.name} — Full Record</DialogTitle>
              <DialogDescription>Patient ID: {selectedPatient.health_id}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {selectedPatient.history.map((item: any, idx: number) => (
                  <div key={idx} className="rounded-xl border border-border bg-card/60 p-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Notes</p>
                <p className="text-sm text-muted-foreground">{selectedPatient.notes}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* QR Code Modal */}
      {selectedPatient && (
        <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Patient QR Code
              </DialogTitle>
              <DialogDescription>
                Share this QR code with {selectedPatient.name} for quick access to their records.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-4">
              {qrCodeDataUrl ? (
                <div className="w-64 h-64 bg-white rounded-lg p-4 flex items-center justify-center border-2 border-border">
                  <Image
                    src={qrCodeDataUrl}
                    alt="Patient QR Code"
                    width={240}
                    height={240}
                    className="rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-64 h-64 bg-secondary/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <QrCode className="h-32 w-32 text-muted-foreground" />
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                Health ID: {selectedPatient.health_id}
              </p>
              <Button
                onClick={() => {
                  if (qrCodeDataUrl) {
                    const link = document.createElement('a');
                    link.href = qrCodeDataUrl;
                    link.download = `patient-${selectedPatient.health_id}-qr.png`;
                    link.click();
                    toast.success("QR code downloaded!");
                  }
                }}
                className="mt-4 w-full gap-2"
                disabled={!qrCodeDataUrl}
              >
                Download QR Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

