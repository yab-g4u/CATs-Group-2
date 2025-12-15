"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
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
  UserPlus,
  Wallet,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { getUserProfile, getCurrentUser } from "@/lib/api"
import { toast } from "sonner"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient" },
  { icon: Wallet, label: "CarePoints Wallet", href: "/dashboard/doctor/wallet" },
  { icon: MessageSquare, label: "Chatbot", href: "/dashboard/doctor/chatbot" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "/dashboard/doctor/account", active: true }]

type ProfileFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string
  licenseNumber: string
  hospital: string
  yearsExperience: string
  address: string
  about: string
}

export default function DoctorAccountPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "General Physician",
    licenseNumber: "",
    hospital: "D.I.N.A Hospital",
    yearsExperience: "",
    address: "Addis Ababa, Ethiopia",
    about: "",
  })

  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: profileData,
  })

  const doctorId = "DOC-2024-001234"

  // Load user profile on mount
  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setIsLoading(true)
      // Try to get from backend first
      const backendProfile = await getUserProfile()
      const nameParts = (backendProfile.full_name || "").split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      const loadedData = {
        firstName,
        lastName,
        email: backendProfile.email || "",
        phone: backendProfile.phone || "",
        specialization: "General Physician",
        licenseNumber: "",
        hospital: "D.I.N.A Hospital",
        yearsExperience: "",
        address: "Addis Ababa, Ethiopia",
        about: "",
      }
      setProfileData(loadedData)
      reset(loadedData)
    } catch (error) {
      // Fallback to local user data
      const user = getCurrentUser()
      if (user) {
        const nameParts = (user.full_name || "").split(" ")
        const loadedData = {
          firstName: nameParts[0] || "Doctor",
          lastName: nameParts.slice(1).join(" ") || "",
          email: user.email || "",
          phone: user.phone || "",
          specialization: "General Physician",
          licenseNumber: "",
          hospital: "D.I.N.A Hospital",
          yearsExperience: "",
          address: "Addis Ababa, Ethiopia",
          about: "",
        }
        setProfileData(loadedData)
        reset(loadedData)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSaving(true)
      // Save to local state (backend doesn't support full profile update yet)
      setProfileData(data)
      setIsEditing(false)
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile")
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = () => {
    reset(profileData)
    setIsEditing(true)
  }

  const handleCancel = () => {
    reset(profileData)
    setIsEditing(false)
  }

  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

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
            <p className="text-xs text-muted-foreground">Doctor Portal</p>
          </div>
        </div>

        <div className="border-b border-border px-6 py-4">
          <div className="glow-card flex items-center gap-3 rounded-xl p-3">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src="/placeholder.jpg" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Dr. Nik Friman</p>
              <p className="text-xs text-muted-foreground">General Physician</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {sidebarNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${'active' in item && item.active
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

        <div className="border-t border-border px-4 py-4">
          <ul className="space-y-1">
            {sidebarBottomItems.map((item) => (
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur-md">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search settings" className="h-10 bg-secondary/50 pl-10 focus:bg-card" />
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

        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Account</h1>
            <p className="mt-1 text-muted-foreground">Manage your doctor profile and ID</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ID Card */}
            <div className="lg:col-span-1">
              <div className="glow-card rounded-2xl p-6">
                <h2 className="mb-4 text-xl font-semibold text-foreground">Doctor ID Card</h2>

                <div className="relative h-[400px]" style={{ perspective: "1000px" }}>
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="text-xs font-semibold text-primary">DOCTOR ID</div>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFlipped(true)}>
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                          <Avatar className="h-24 w-24 border-4 border-primary/50">
                            <AvatarImage src="/placeholder.jpg" />
                            <AvatarFallback className="text-2xl">DR</AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-foreground">
                              Dr. {profileData.firstName} {profileData.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{profileData.specialization}</p>
                          </div>
                        </div>

                        <div className="mt-auto space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ID Number:</span>
                            <span className="font-semibold text-foreground">{doctorId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">License:</span>
                            <span className="font-semibold text-foreground">{profileData.licenseNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Hospital:</span>
                            <span className="font-semibold text-foreground">{profileData.hospital}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Experience:</span>
                            <span className="font-semibold text-foreground">{profileData.yearsExperience} yrs</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
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
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFlipped(false)}>
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
                          <p className="text-xs text-muted-foreground">Doctor ID: {doctorId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4" onClick={() => setIsFlipped(!isFlipped)}>
                  {isFlipped ? "View Front" : "View QR Code"}
                </Button>
              </div>
            </div>

            {/* Profile Form */}
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
                      <Input id="firstName" {...register("firstName")} disabled={!isEditing} className="bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" {...register("lastName")} disabled={!isEditing} className="bg-secondary/50" />
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
                      <Input id="phone" {...register("phone")} disabled={!isEditing} className="bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        {...register("specialization")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        {...register("licenseNumber")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital</Label>
                      <Input id="hospital" {...register("hospital")} disabled={!isEditing} className="bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">Years of Experience</Label>
                      <Input
                        id="yearsExperience"
                        {...register("yearsExperience")}
                        disabled={!isEditing}
                        className="bg-secondary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register("address")} disabled={!isEditing} className="bg-secondary/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="about">About</Label>
                    <Textarea
                      id="about"
                      {...register("about")}
                      disabled={!isEditing}
                      className="bg-secondary/50"
                      rows={4}
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

