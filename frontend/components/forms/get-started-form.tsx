"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, User, Stethoscope, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

type UserRole = "patient" | "doctor" | "hospital" | null

export default function GetStartedForm() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [idImage, setIdImage] = useState<File | null>(null)
  const [idImageError, setIdImageError] = useState<string | null>(null)
  const [licenseImage, setLicenseImage] = useState<File | null>(null)
  const [licenseImageError, setLicenseImageError] = useState<string | null>(null)
  const [facilityImage, setFacilityImage] = useState<File | null>(null)
  const [facilityImageError, setFacilityImageError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"]
  const allowedImageName = /\.(jpe?g|png|webp)$/i

  const roles = [
    {
      id: "patient",
      label: "Patient",
      icon: User,
      description: "Access and manage your medical records securely",
    },
    {
      id: "doctor",
      label: "Doctor",
      icon: Stethoscope,
      description: "Refer patients and access referral history",
    },
    {
      id: "hospital",
      label: "Hospital",
      icon: Building2,
      description: "Manage facility records and patient data",
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const makeImageChangeHandler = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (!file) {
      setFile(null)
      setError(null)
      return
    }

    const hasAllowedType = allowedImageTypes.includes(file.type)
    const hasAllowedExtension = allowedImageName.test(file.name)

    if (!hasAllowedType && !hasAllowedExtension) {
      setFile(null)
      setError("Only JPG, PNG, or WEBP images are allowed.")
      return
    }

    setFile(file)
    setError(null)
  }

  const handleIdImageChange = makeImageChangeHandler(setIdImage, setIdImageError)
  const handleLicenseImageChange = makeImageChangeHandler(setLicenseImage, setLicenseImageError)
  const handleFacilityImageChange = makeImageChangeHandler(setFacilityImage, setFacilityImageError)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRole) {
      setSubmitError("Please select a role to continue.")
      return
    }

    const roleToRoute: Record<Exclude<UserRole, null>, string> = {
      patient: "/dashboard/patient",
      doctor: "/dashboard/doctor",
      hospital: "/dashboard/hospital",
    }

    console.log("Form submitted:", { role: selectedRole, ...formData, idImage, licenseImage, facilityImage })
    setSubmitted(true)
    setSubmitError(null)

    const route = roleToRoute[selectedRole]
    if (route) {
      router.push(route)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to The Spine!</h2>
        <p className="text-muted-foreground mb-6">
          Check your email for next steps. We're excited to have you on board.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setSelectedRole(null)
            setFormData({})
            setIdImage(null)
            setIdImageError(null)
            setLicenseImage(null)
            setLicenseImageError(null)
            setFacilityImage(null)
            setFacilityImageError(null)
            setSubmitError(null)
          }}
          className="text-primary hover:text-primary/80 font-semibold"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Card: Registration Form */}
      <div className="bg-card rounded-2xl border border-border p-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Get Started</h2>
        <p className="text-muted-foreground mb-8">Enter your information to continue</p>

        {selectedRole ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {submitError && <p className="text-sm text-destructive">{submitError}</p>}
            {/* Patient Form */}
            {selectedRole === "patient" && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="+251 9XX XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password / OTP
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label htmlFor="idImage" className="block text-sm font-medium text-foreground mb-2">
                    ID (Optional)
                  </label>
                  <input
                    type="file"
                    id="idImage"
                    name="idImage"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleIdImageChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {idImage && <p className="mt-2 text-xs text-muted-foreground">Selected: {idImage.name}</p>}
                  {idImageError && <p className="mt-2 text-xs text-destructive">{idImageError}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">Accepted: JPG, PNG, WEBP</p>
                </div>
              </>
            )}

            {/* Doctor Form */}
            {selectedRole === "doctor" && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="hospital" className="block text-sm font-medium text-foreground mb-2">
                    Hospital / Clinic Name
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={formData.hospital || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your health facility"
                  />
                </div>

                <div>
                  <label htmlFor="licenseId" className="block text-sm font-medium text-foreground mb-2">
                    Medical License (Image)
                  </label>
                  <input
                    type="file"
                    id="licenseId"
                    name="licenseId"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleLicenseImageChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Upload license image"
                  />
                  {licenseImage && (
                    <p className="mt-2 text-xs text-muted-foreground">Selected: {licenseImage.name}</p>
                  )}
                  {licenseImageError && <p className="mt-2 text-xs text-destructive">{licenseImageError}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">Accepted: JPG, PNG, WEBP</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="+251 9XX XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter password"
                  />
                </div>
              </>
            )}

            {/* Hospital Form */}
            {selectedRole === "hospital" && (
              <>
                <div>
                  <label htmlFor="facilityName" className="block text-sm font-medium text-foreground mb-2">
                    Facility Name
                  </label>
                  <input
                    type="text"
                    id="facilityName"
                    name="facilityName"
                    value={formData.facilityName || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your health facility name"
                  />
                </div>

                <div>
                  <label htmlFor="adminName" className="block text-sm font-medium text-foreground mb-2">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    id="adminName"
                    name="adminName"
                    value={formData.adminName || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Administrator name"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-foreground mb-2">
                    Phone / Email
                  </label>
                  <input
                    type="text"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Contact information"
                  />
                </div>

                <div>
                  <label htmlFor="facilityId" className="block text-sm font-medium text-foreground mb-2">
                    Facility ID (Image)
                  </label>
                  <input
                    type="file"
                    id="facilityId"
                    name="facilityId"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFacilityImageChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Upload facility ID image"
                  />
                  {facilityImage && (
                    <p className="mt-2 text-xs text-muted-foreground">Selected: {facilityImage.name}</p>
                  )}
                  {facilityImageError && <p className="mt-2 text-xs text-destructive">{facilityImageError}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">Accepted: JPG, PNG, WEBP</p>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter password"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              {selectedRole === "hospital" ? (
                <>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Get Started <ArrowRight className="w-5 h-5" />
                  </button>
                  
                </>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Select a role from the right to see the form</p>
          </div>
        )}
      </div>

      {/* Right Card: Role Selection */}
      <div className="bg-card rounded-2xl border border-border p-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Role-Based Access</h2>
        <p className="text-muted-foreground mb-8">Choose your role to get started</p>

        <div className="space-y-4">
          {roles.map((role) => {
            const IconComponent = role.icon
            return (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id as UserRole)
                  setFormData({})
                  setIdImage(null)
                  setIdImageError(null)
                  setLicenseImage(null)
                  setLicenseImageError(null)
                  setFacilityImage(null)
                  setFacilityImageError(null)
                }}
                className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                  selectedRole === role.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-background"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 rounded-lg p-2 ${selectedRole === role.id ? "bg-primary/20" : "bg-primary/10"}`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${selectedRole === role.id ? "text-primary" : "text-primary/60"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold text-lg mb-1 ${
                        selectedRole === role.id ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {role.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
