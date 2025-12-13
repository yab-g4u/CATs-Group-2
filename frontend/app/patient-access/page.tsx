"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Search, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PatientAccessPage() {
  const [patientId, setPatientId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleViewRecords = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientId.trim()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Navigate to patient record page with ID
    router.push(`/dashboard/patient/${encodeURIComponent(patientId.trim())}`)
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center">
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
                <QrCode className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">No Signup Required</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Access Your <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">Medical Records</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-4">
                Enter your Patient ID to view your complete medical history instantly.
              </p>
              <p className="text-sm text-muted-foreground">
                Don&apos;t have a Patient ID? Ask your doctor or healthcare provider.
              </p>
            </div>

            <div className="glow-card rounded-3xl p-8 sm:p-12">
              <form onSubmit={handleViewRecords} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="patientId" className="text-base font-medium">
                    Enter Your Patient ID
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="patientId"
                      type="text"
                      placeholder="e.g., PAT-123456789"
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
                      You can also scan your QR code to access your records. The QR code contains your Patient ID.
                    </p>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Scan QR Code
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Your medical records are securely stored on the Cardano blockchain.{" "}
                <a href="#" className="text-primary hover:underline">
                  Learn more about security
                </a>
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

