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
  QrCode,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/patient" },
  { icon: Calendar, label: "Appointment", href: "#" },
  { icon: FileText, label: "Record", href: "/dashboard/patient/record" },
  { icon: MessageSquare, label: "Chat", href: "#" },
]

const sidebarBottomItems = [
  { icon: User, label: "Account", href: "/dashboard/patient/account", active: true },
]

type ProfileFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  bloodType: string
  allergies: string
  medicalConditions: string
}

export default function PatientAccountPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: "Sierra",
    lastName: "Lisbon",
    email: "s.ferguson@gmail.com",
    phone: "+251 911 234 567",
    dateOfBirth: "1990-05-15",
    address: "Addis Ababa, Ethiopia",
    emergencyContact: "John Lisbon",
    emergencyPhone: "+251 911 234 568",
    bloodType: "A+",
    allergies: "Penicillin, Peanuts",
    medicalConditions: "Hypertension",
  })

  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: profileData,
  })

  const patientId = "PAT-2024-001234"
  const generatedId = patientId

  const onSubmit = (data: ProfileFormData) => {
    setProfileData(data)
    setIsEditing(false)
  }

  const handleEdit = () => {
    reset(profileData)
    setIsEditing(true)
  }

  const handleCancel = () => {
    reset(profileData)
    setIsEditing(false)
  }

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
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
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

        {/* Account Content */}
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Account</h1>
            <p className="mt-1 text-muted-foreground">Manage your profile and ID card</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ID Card Section */}
            <div className="lg:col-span-1">
              <div className="glow-card rounded-2xl p-6">
                <h2 className="mb-4 text-xl font-semibold text-foreground">Patient ID Card</h2>
                
                {/* Flipable ID Card */}
                <div className="relative h-[400px]" style={{ perspective: "1000px" }}>
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front of Card */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="text-xs font-semibold text-primary">PATIENT ID</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setIsFlipped(true)}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                          <Avatar className="h-24 w-24 border-4 border-primary/50">
                            <AvatarImage src="/ethiopian-woman-portrait.jpg" />
                            <AvatarFallback className="text-2xl">SL</AvatarFallback>
                          </Avatar>
                          
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-foreground">
                              {profileData.firstName} {profileData.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{profileData.email}</p>
                          </div>
                        </div>

                        <div className="mt-auto space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ID Number:</span>
                            <span className="font-semibold text-foreground">{generatedId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date of Birth:</span>
                            <span className="font-semibold text-foreground">
                              {new Date(profileData.dateOfBirth).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Blood Type:</span>
                            <span className="font-semibold text-foreground">{profileData.bloodType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone:</span>
                            <span className="font-semibold text-foreground">{profileData.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card - QR Code */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="flex flex-col h-full items-center justify-center">
                        <div className="mb-4 flex items-center justify-between w-full">
                          <div className="text-xs font-semibold text-primary">SCAN QR CODE</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setIsFlipped(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center">
                          <div className="w-48 h-48 bg-white rounded-lg p-4 flex items-center justify-center border-2 border-border mb-4">
                            <QrCode className="h-32 w-32 text-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground">QR Code Placeholder</p>
                        </div>
                        
                        <div className="mt-auto text-center">
                          <p className="text-xs text-muted-foreground">Patient ID: {generatedId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  {isFlipped ? "View Front" : "View QR Code"}
                </Button>
              </div>
            </div>

            {/* Profile Form Section */}
            <div className="lg:col-span-2">
              <div className="glow-card rounded-2xl p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleCancel} variant="outline" className="gap-2">
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit(onSubmit)} className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...register("dateOfBirth")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Input
                        id="bloodType"
                        {...register("bloodType")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      {...register("address")}
                      disabled={!isEditing}
                      className="bg-secondary/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        {...register("emergencyContact")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        {...register("emergencyPhone")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      {...register("allergies")}
                      disabled={!isEditing}
                      className="bg-secondary/50"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      {...register("medicalConditions")}
                      disabled={!isEditing}
                      className="bg-secondary/50"
                      rows={3}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

