import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, DollarSign, FlaskConical, Shield, TrendingDown, CheckCircle2, AlertTriangle, Clock, Activity, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ForHospitalsPage() {
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
                Built for <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">Hospitals</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Reduce costs, eliminate waste, and build trust with blockchain-backed medical records.
              </p>
                <Link href="/dashboard/hospital/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 px-8 h-12 text-base"
                  >
                    Register Hospital
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
            </div>
          </div>
        </section>

        {/* Nadab's Story Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="glow-card rounded-3xl overflow-hidden relative">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/nadab.jpg"
                      alt="Nadab sharing her story about losing her blood test results"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-sm font-medium">
                      &ldquo;I gave a blood sample, but when I returned to the treatment room, the lab had lost my sample.&rdquo;
                    </p>
                    <p className="text-white/80 text-xs mt-2">— Nadab, Patient</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-accent/15 rounded-full blur-3xl -z-10" />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Nadab&apos;s Story: <span className="text-primary glow-text">Lost Blood Test</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-4">
                  Nadab&apos;s experience highlights a critical problem in healthcare: the loss of vital medical information. 
                  During an interview, she shared how she lost her blood test results—a common but devastating issue that 
                  affects countless patients across Ethiopia.
                </p>
                <p className="text-muted-foreground text-lg mb-4">
                  When critical test results go missing, patients face delayed diagnoses, repeated tests, and increased costs. 
                  Hospitals bear the financial burden of duplicate procedures and lost efficiency.
                </p>
                <p className="text-muted-foreground text-lg">
                  This is exactly why D.I.N.A exists—to ensure that no patient&apos;s medical history is ever lost again. 
                  With blockchain-backed records, every test, every diagnosis, every piece of medical information is securely 
                  stored and instantly accessible, protecting both patients and hospitals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lost Records = Cost */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400 font-medium">The Hidden Cost</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Lost Records = <span className="text-red-400 glow-text">Cost</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-4">
                  Every lost medical record costs your hospital money. Patients return for duplicate tests, staff spend hours searching for files, and critical information gaps lead to delayed treatments.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Duplicate Testing Costs</h3>
                      <p className="text-muted-foreground">Patients repeat expensive tests when records are lost, increasing hospital expenses.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Staff Time Wasted</h3>
                      <p className="text-muted-foreground">Hours spent searching for paper records or calling other facilities for patient information.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Treatment Delays</h3>
                      <p className="text-muted-foreground">Incomplete records lead to delayed diagnoses and treatments, affecting patient outcomes.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glow-card rounded-3xl p-8 bg-gradient-to-br from-red-500/10 to-transparent">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-red-400 mb-2">30%</div>
                      <p className="text-muted-foreground">of medical records are lost or incomplete</p>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="text-center">
                      <div className="text-5xl font-bold text-red-400 mb-2">$2,500</div>
                      <p className="text-muted-foreground">average cost per lost record incident</p>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="text-center">
                      <div className="text-5xl font-bold text-red-400 mb-2">40%</div>
                      <p className="text-muted-foreground">reduction in duplicate tests with D.I.N.A</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Repeated Tests = Waste */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="glow-card rounded-3xl p-8 bg-gradient-to-br from-amber-500/10 to-transparent">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                      <FlaskConical className="w-12 h-12 text-amber-400" />
                      <div>
                        <p className="font-semibold text-foreground">Blood Test</p>
                        <p className="text-sm text-muted-foreground">Repeated 3 times</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                      <Activity className="w-12 h-12 text-amber-400" />
                      <div>
                        <p className="font-semibold text-foreground">X-Ray</p>
                        <p className="text-sm text-muted-foreground">Repeated 2 times</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                      <FileText className="w-12 h-12 text-amber-400" />
                      <div>
                        <p className="font-semibold text-foreground">Medical History</p>
                        <p className="text-sm text-muted-foreground">Reconstructed from memory</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                  <FlaskConical className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-amber-400 font-medium">The Waste Problem</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Repeated Tests = <span className="text-amber-400 glow-text">Waste</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-4">
                  Without access to previous test results, hospitals are forced to repeat expensive diagnostic procedures. This wastes resources, increases patient costs, and delays care.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Eliminate Duplicate Tests</h3>
                      <p className="text-muted-foreground">Access all previous test results instantly, reducing unnecessary repeat procedures by up to 40%.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Reduce Resource Waste</h3>
                      <p className="text-muted-foreground">Save on lab costs, imaging expenses, and staff time by accessing complete patient histories.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Faster Treatment</h3>
                      <p className="text-muted-foreground">Start treatment immediately with complete information, improving patient outcomes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blockchain Traceability = Trust */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">The Trust Solution</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Blockchain Traceability = <span className="text-primary glow-text">Trust</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Build patient and partner trust with immutable, verifiable medical records powered by Cardano blockchain.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glow-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Immutable Records</h3>
                <p className="text-muted-foreground text-lg mb-4">
                  Every medical record is cryptographically secured on the blockchain. Once recorded, it cannot be altered or deleted, ensuring data integrity.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Tamper-proof history
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Complete audit trail
                  </li>
                </ul>
              </div>

              <div className="glow-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <TrendingDown className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Verifiable Data</h3>
                <p className="text-muted-foreground text-lg mb-4">
                  Verify the authenticity of any medical record instantly. Know exactly when and where each record was created, building trust with patients and partners.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Cryptographic verification
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Source transparency
                  </li>
                </ul>
              </div>

              <div className="glow-card rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Partner Trust</h3>
                <p className="text-muted-foreground text-lg mb-4">
                  When referring patients or receiving referrals, trust that the medical records are authentic and complete. Build stronger partnerships with other healthcare facilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Reliable referrals
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Network credibility
                  </li>
                </ul>
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
                  Ready to Transform Your <span className="text-primary glow-text">Hospital</span>?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Join leading hospitals in Ethiopia using D.I.N.A to reduce costs and build trust.
                </p>
                <Link href="/dashboard/hospital/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 px-8 h-12 text-base"
                  >
                    Register Hospital
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

