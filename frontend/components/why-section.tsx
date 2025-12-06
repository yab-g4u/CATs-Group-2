import { AlertTriangle, Lightbulb, TrendingUp } from "lucide-react"

export function WhySection() {
  return (
    <section id="why" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why <span className="text-primary glow-text">The Spine</span> Matters
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Patients in Ethiopia often carry their own medical history between clinics—in paper folders or their
              memory. Critical information gets lost, tests are repeated, and doctors make decisions with incomplete
              data.
            </p>
            <p className="text-muted-foreground text-lg">
              The Spine reimagines patient referrals as a secure digital backbone. With a QR code, patients become
              empowered data carriers. Doctors get the complete picture instantly. Health systems become smarter and
              more efficient.
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="glow-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">The Problem</h3>
                  <p className="text-muted-foreground">
                    Paper-based records, fragmented systems, and information loss creating delays and worse patient
                    outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="glow-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Our Solution</h3>
                  <p className="text-muted-foreground">
                    Blockchain-backed digital records that are secure, portable, and instantly accessible to authorized
                    providers.
                  </p>
                </div>
              </div>
            </div>

            <div className="glow-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">The Impact</h3>
                  <p className="text-muted-foreground">
                    Faster diagnosis, reduced costs, better patient outcomes, and the foundation for universal health
                    coverage.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
