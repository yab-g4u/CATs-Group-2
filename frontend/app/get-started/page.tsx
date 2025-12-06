"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Stethoscope, Building2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Role = "patient" | "doctor" | "hospital" | null
type AuthMode = "signup" | "signin"

export default function GetStartedPage() {
  const [selectedRole, setSelectedRole] = useState<Role>(null)
  const [authMode, setAuthMode] = useState<AuthMode>("signup")
  const [showPassword, setShowPassword] = useState(false)

  const roles = [
    {
      id: "patient" as Role,
      icon: User,
      title: "Patient",
      description: "Access and manage your medical records securely",
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
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {authMode === "signup" ? "Get Started" : "Welcome Back"}
              </h1>
              <p className="text-muted-foreground mb-6">
                {authMode === "signup" ? "Enter your information to continue" : "Sign in to your account"}
              </p>

              {authMode === "signup" && !selectedRole ? (
                <div className="flex items-center justify-center h-48 text-muted-foreground">
                  Select a role from the right to see the form
                </div>
              ) : authMode === "signin" ? (
                // Sign In Form
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter your username" className="bg-input border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="bg-input border-border pr-10"
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
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white mt-6">Sign In</Button>
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
              ) : (
                // Sign Up Form based on role
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="bg-input border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="bg-input border-border" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-input border-border" />
                  </div>
                  {selectedRole === "doctor" && (
                    <div className="space-y-2">
                      <Label htmlFor="license">Medical License Number</Label>
                      <Input id="license" placeholder="Enter your license number" className="bg-input border-border" />
                    </div>
                  )}
                  {selectedRole === "hospital" && (
                    <div className="space-y-2">
                      <Label htmlFor="facility">Facility Name</Label>
                      <Input id="facility" placeholder="Enter facility name" className="bg-input border-border" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="bg-input border-border pr-10"
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
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white mt-6">
                    Create Account
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
                        setAuthMode("signup")
                      }}
                      className={`w-full p-4 rounded-xl border transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                          : "border-border hover:border-primary/50 bg-card/50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-gradient-to-br from-primary to-accent" : "bg-muted"
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
