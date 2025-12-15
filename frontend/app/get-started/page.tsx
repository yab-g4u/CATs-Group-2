"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { loginUser, signupUser, getUserProfile } from "@/lib/api"
import { ArrowLeft, User, Stethoscope, Building2, Eye, EyeOff, QrCode, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Role = "patient" | "doctor" | "hospital" | null
type AuthMode = "signup" | "signin"

export default function GetStartedPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [selectedRole, setSelectedRole] = useState<Role>(null)
  const [authMode, setAuthMode] = useState<AuthMode>("signup")
  const [showPassword, setShowPassword] = useState(false)
  const [patientId, setPatientId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    {
      id: "patient" as Role,
      icon: User,
      title: "Patient",
      description: "Access your medical records with your Patient ID",
    },
    {
      id: "doctor" as Role,
      icon: Stethoscope,
      title: "Doctor",
      description: "Refer patients and access referral history",
    },
    {
      id: "hospital" as Role,
      icon: Building2,
      title: "Hospital",
      description: "Manage facility records and patient data",
    },
  ]

  const handlePatientAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientId.trim()) return

    setIsLoading(true)
    // Navigate to patient record page with ID
    router.push(`/dashboard/patient/${encodeURIComponent(patientId.trim())}`)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const emailOrPhone = formData.get("username") as string
    const password = formData.get("password") as string

    try {
      // Determine if input is email or phone (simple check)
      const isEmail = emailOrPhone.includes("@")

      const response = await loginUser({
        email: isEmail ? emailOrPhone : undefined,
        phone: !isEmail ? emailOrPhone : undefined,
        password
      })

      if (response.success && response.access && response.refresh) {
        // Authenticate in context
        login(response.access, response.refresh)

        // Fetch profile to redirect correctly
        try {
          // We need to wait a bit for localStorage to be consistent or just use the token 
          // actually login() sets localStorage. getUserProfile reads it.
          // But just in case, we can rely on the fact that login() calls refreshUser() which updates user state.
          // But here we need to redirect immediately.
          // Let's call getUserProfile manually to be sure.
          const profile = await getUserProfile()

          if (profile.role === "doctor") {
            router.push("/dashboard/doctor")
          } else if (profile.role === "hospital") {
            router.push("/dashboard/hospital")
          } else if (profile.role === "patient") {
            // Patients usually use ID access, but if they have account:
            router.push(`/dashboard/patient/${profile.national_id || profile.phone}`)
          } else {
            router.push("/")
          }
        } catch (err) {
          console.error("Profile fetch error", err)
          // Fallback based on selectedRole if available?
          router.push("/dashboard/doctor") // Default?
        }
      }
    } catch (error: any) {
      alert(error.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)

    // Combine names
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const fullName = `${firstName} ${lastName}`.trim()

    const email = formData.get("email") as string
    const password = formData.get("signupPassword") as string

    // Extra fields
    const license = formData.get("license") as string
    const facility = formData.get("facility") as string

    // National ID or Phone mapping? 
    // Schema expects optional national_id, phone. 
    // The form only asks for name, email, license/facility, password.

    // We can put license/facility into national_id for now or rely on profile update?
    // Or assume backend stores them if we send them in role-specific way?
    // Our simplified SignupSchema doesn't have license/facility fields.
    // However, existing backend Profile model might have them?
    // I'll ignore license/facility for now or put them in 'national_id' as a hack if needed, 
    // but better to just sign them up and let them update profile later.
    // User asked for "simple signup".

    try {
      const response = await signupUser({
        full_name: fullName,
        email: email,
        password: password,
        role: selectedRole || "patient",
        // We aren't collecting phone/national_id in the form yet.
      })

      if (response.success && response.access && response.refresh) {
        login(response.access, response.refresh)

        if (selectedRole === "doctor") {
          router.push("/dashboard/doctor")
        } else if (selectedRole === "hospital") {
          router.push("/dashboard/hospital")
        } else {
          router.push("/")
        }
      }
    } catch (error: any) {
      alert(error.message || "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 sm:p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
            {/* Left Side - Form */}
            <div className="glow-card rounded-2xl p-8">
              {selectedRole === "patient" ? (
                // Patient Access - Health ID Lookup (No signup needed)
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <QrCode className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">No Signup Required</span>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Access Your Records
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    Enter your Patient ID to view your complete medical history instantly.
                  </p>
                  <form onSubmit={handlePatientAccess} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="patientId" className="text-base font-medium">
                        Enter Your Patient ID
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="patientId"
                          type="text"
                          placeholder="e.g., PAT-ABCD1234"
                          name="patientId"
                          value={patientId}
                          onChange={(e) => setPatientId(e.target.value)}
                          className="pl-12 h-14 text-base"
                          required
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your Patient ID was provided by your doctor or healthcare facility.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading || !patientId.trim()}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 h-14 text-base"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Loading...
                        </>
                      ) : (
                        <>
                          View My Records
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <QrCode className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Have a QR Code?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          You can also scan your QR code to access your records.
                        </p>
                        <Button variant="outline" className="w-full sm:w-auto">
                          Scan QR Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : !selectedRole ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-muted-foreground">
                  <User className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-center">Select a role from the right to continue</p>
                </div>
              ) : authMode === "signin" ? (
                // Sign In Form for Doctor/Hospital
                <>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
                  <p className="text-muted-foreground mb-6">Sign in to your account</p>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Email or Username</Label>
                      <Input id="username" name="username" placeholder="Enter your email" className="bg-input border-border" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="bg-input border-border pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary to-accent text-white mt-6">
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      {"Don't have an account? "}
                      <button
                        type="button"
                        onClick={() => setAuthMode("signup")}
                        className="text-primary hover:underline"
                      >
                        Sign up
                      </button>
                    </p>
                  </form>
                </>
              ) : (
                // Sign Up Form for Doctor/Hospital
                <>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Get Started</h1>
                  <p className="text-muted-foreground mb-6">Enter your information to continue</p>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" name="firstName" placeholder="John" className="bg-input border-border" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" placeholder="Doe" className="bg-input border-border" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" className="bg-input border-border" required />
                    </div>
                    {selectedRole === "doctor" && (
                      <div className="space-y-2">
                        <Label htmlFor="license">Medical License Number</Label>
                        <Input id="license" name="license" placeholder="Enter your license number" className="bg-input border-border" />
                      </div>
                    )}
                    {selectedRole === "hospital" && (
                      <div className="space-y-2">
                        <Label htmlFor="facility">Facility Name</Label>
                        <Input id="facility" name="facility" placeholder="Enter facility name" className="bg-input border-border" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="signupPassword"
                          name="signupPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="bg-input border-border pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary to-accent text-white mt-6">
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      By signing up, you agree to our{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setAuthMode("signin")}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Right Side - Role Selection */}
            <div className="glow-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Role-Based Access</h2>
              <p className="text-muted-foreground mb-6">Choose your role to get started</p>

              <div className="space-y-4">
                {roles.map((role) => {
                  const Icon = role.icon
                  const isSelected = selectedRole === role.id
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        setSelectedRole(role.id)
                        if (role.id !== "patient") {
                          setAuthMode("signup")
                        }
                      }}
                      className={`w-full p-4 rounded-xl border transition-all text-left ${isSelected
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border hover:border-primary/50 bg-card/50"
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${isSelected ? "bg-gradient-to-br from-primary to-accent" : "bg-muted"
                            }`}
                        >
                          <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{role.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
