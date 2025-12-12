import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Shield, QrCode, Zap, CheckCircle2, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ForDoctorsPage() {
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
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Built for <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">Doctors</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Save time, improve care, and access complete patient histories instantly with The Spine.
              </p>
              <Link href="/dashboard/doctor/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 px-8 h-12 text-base"
                >
                  Start as Doctor
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Doctors Need It */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Why Doctors <span className="text-primary glow-text">Need It</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every day, doctors face the challenge of incomplete patient information. The Spine solves this.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glow-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">No More Waiting</h3>
                <p className="text-muted-foreground text-lg">
                  Stop waiting for paper records or incomplete histories. Access complete patient data instantly with a QR code scan.
                </p>
              </div>

              <div className="glow-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Complete Picture</h3>
                <p className="text-muted-foreground text-lg">
                  See all past tests, diagnoses, medications, and referrals in one place. Make informed decisions with full context.
                </p>
              </div>

              <div className="glow-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Better Outcomes</h3>
                <p className="text-muted-foreground text-lg">
                  Reduce medical errors, avoid duplicate tests, and provide better care with comprehensive patient histories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Saves Time */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  How It <span className="text-primary glow-text">Saves Time</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Instant Access</h3>
                      <p className="text-muted-foreground">
                        Scan a QR code and immediately see the patient&apos;s complete medical history. No paperwork, no phone calls, no delays.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Faster Consultations</h3>
                      <p className="text-muted-foreground">
                        Spend less time gathering information and more time with patients. Average consultation time reduced by 40%.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Digital Referrals</h3>
                      <p className="text-muted-foreground">
                        Send referrals instantly with complete patient packets. No more handwritten letters or lost documents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glow-card rounded-3xl p-8 bg-gradient-to-br from-primary/10 to-accent/5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl">
                      <QrCode className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">QR Code Scan</p>
                        <p className="text-sm text-muted-foreground">2 seconds</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Complete History</p>
                        <p className="text-sm text-muted-foreground">Instant access</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="font-semibold text-foreground">Ready to Consult</p>
                        <p className="text-sm text-muted-foreground">No waiting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QR & Cardano Protection */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                How QR & Cardano <span className="text-primary glow-text">Protects Data</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Enterprise-grade security powered by blockchain technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glow-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <QrCode className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Secure QR Codes</h3>
                <p className="text-muted-foreground text-lg mb-4">
                  Each QR code is cryptographically signed and linked to a unique patient ID. Only authorized healthcare providers can access the data.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Encrypted patient identifiers
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Access control and audit logs
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    No data stored in the QR code itself
                  </li>
                </ul>
              </div>

              <div className="glow-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Blockchain Security</h3>
                <p className="text-muted-foreground text-lg mb-4">
                  Cardano blockchain ensures data integrity, immutability, and protection against tampering or loss.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Immutable record history
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Cryptographic data verification
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    HIPAA-compliant architecture
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Demo Graphics */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Simple <span className="text-primary glow-text">Workflow</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Three steps to access any patient&apos;s complete medical history.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="glow-card rounded-2xl p-8 mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">1. Scan QR Code</h3>
                  <p className="text-muted-foreground">Patient presents QR code or ID</p>
                </div>
              </div>

              <div className="text-center">
                <div className="glow-card rounded-2xl p-8 mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2. Verify Access</h3>
                  <p className="text-muted-foreground">System verifies your authorization</p>
                </div>
              </div>

              <div className="text-center">
                <div className="glow-card rounded-2xl p-8 mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3. View Records</h3>
                  <p className="text-muted-foreground">Complete medical history appears</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glow-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Ready to Transform Your <span className="text-primary glow-text">Practice</span>?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Join doctors across Ethiopia who are already using The Spine to provide better care.
                </p>
                <Link href="/dashboard/doctor/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 px-8 h-12 text-base"
                  >
                    Start as Doctor
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

