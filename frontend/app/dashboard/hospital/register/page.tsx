"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Building2, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function RegisterHospitalPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")

  const [formData, setFormData] = useState({
    hospitalName: "",
    location: "",
    adminFullName: "",
    phone: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate hospital code (in real app, this comes from backend)
    const hospitalCode = `HSP-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`
    setGeneratedCode(hospitalCode)
    setShowSuccessModal(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    router.push("/dashboard/hospital")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/for-hospitals" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Hospitals
          </Link>

          <div className="glow-card rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Register Hospital</h1>
              <p className="text-muted-foreground">Create your hospital account to start managing doctors and patient records.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hospitalName" className="text-base">
                  Hospital Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="hospitalName"
                  type="text"
                  placeholder="e.g., Tikur Anbessa Hospital"
                  value={formData.hospitalName}
                  onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-base">
                  Location <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., Addis Ababa, Ethiopia"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminFullName" className="text-base">
                  Admin Full Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="adminFullName"
                  type="text"
                  placeholder="e.g., Dr. John Doe"
                  value={formData.adminFullName}
                  onChange={(e) => handleInputChange("adminFullName", e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">
                    Phone <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+251 911 234 567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@hospital.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  Password <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  minLength={8}
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 h-11 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Registering...
                  </>
                ) : (
                  "Register Hospital"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/dashboard/hospital/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              Hospital Registered Successfully!
            </DialogTitle>
            <DialogDescription>
              Your hospital has been registered. Save your Hospital Code for future reference.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="glow-card rounded-xl p-4 bg-primary/5">
              <Label className="text-sm text-muted-foreground mb-2 block">Hospital Code</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background rounded-lg text-lg font-mono font-semibold text-foreground">
                  {generatedCode}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(generatedCode)}
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Share this code with your doctors for easy hospital identification.
              </p>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
              onClick={handleContinue}
            >
              Continue to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}

