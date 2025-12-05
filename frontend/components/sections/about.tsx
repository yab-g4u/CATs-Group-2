export default function About() {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Why The Spine Matters</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Patients in Ethiopia often carry their own medical history between clinics—in paper folders or their
                memory. Critical information gets lost, tests are repeated, and doctors make decisions with incomplete
                data.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Spine reimagines patient referrals as a secure digital backbone. With a QR code, patients become
                empowered data carriers. Doctors get the complete picture instantly. Health systems become smarter and
                more efficient.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-12 border border-primary/10">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">The Problem</h3>
                <p className="text-muted-foreground">
                  Paper-based records, fragmented systems, and information loss creating delays and worse patient
                  outcomes.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">Our Solution</h3>
                <p className="text-muted-foreground">
                  Blockchain-backed digital records that are secure, portable, and instantly accessible to authorized
                  providers.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">The Impact</h3>
                <p className="text-muted-foreground">
                  Faster diagnosis, reduced costs, better patient outcomes, and the foundation for universal health
                  coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
