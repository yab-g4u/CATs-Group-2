"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  Settings,
  Save,
  Edit,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/hospital" },
  { icon: Users, label: "Doctors", href: "/dashboard/hospital/doctors" },
  { icon: FileText, label: "Patient Records", href: "/dashboard/hospital/records" },
  { icon: Building2, label: "Hospital Profile", href: "/dashboard/hospital/profile", active: true },
  { icon: Settings, label: "Settings", href: "/dashboard/hospital/settings" },
]

export default function HospitalProfilePage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    hospitalName: "Tikur Anbessa Hospital",
    location: "Addis Ababa, Ethiopia",
    adminFullName: "Dr. Hospital Admin",
    phone: "+251 911 234 567",
    email: "admin@hospital.com",
    description: "Leading healthcare facility providing comprehensive medical services to the community.",
  })

  const hospitalCode = "HSP-001"

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

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
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">Hospital Profile</h1>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-3xl mx-auto">
            <div className="glow-card rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Hospital Information</h2>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="glow-card rounded-xl p-4 bg-primary/5">
                  <Label className="text-sm text-muted-foreground mb-2 block">Hospital Code</Label>
                  <code className="text-lg font-mono font-semibold text-foreground">{hospitalCode}</code>
                  <p className="text-xs text-muted-foreground mt-2">This code is unique to your hospital and cannot be changed.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hospitalName">Hospital Name</Label>
                  {isEditing ? (
                    <Input
                      id="hospitalName"
                      value={formData.hospitalName}
                      onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                      className="h-11"
                    />
                  ) : (
                    <p className="text-foreground p-3 bg-muted/30 rounded-lg">{formData.hospitalName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="h-11"
                    />
                  ) : (
                    <p className="text-foreground p-3 bg-muted/30 rounded-lg">{formData.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminFullName">Admin Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="adminFullName"
                      value={formData.adminFullName}
                      onChange={(e) => setFormData({ ...formData, adminFullName: e.target.value })}
                      className="h-11"
                    />
                  ) : (
                    <p className="text-foreground p-3 bg-muted/30 rounded-lg">{formData.adminFullName}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11"
                      />
                    ) : (
                      <p className="text-foreground p-3 bg-muted/30 rounded-lg">{formData.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11"
                      />
                    ) : (
                      <p className="text-foreground p-3 bg-muted/30 rounded-lg">{formData.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="resize-none"
                    />
                  ) : (
                    <p className="text-foreground p-3 bg-muted/30 rounded-lg">{formData.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

