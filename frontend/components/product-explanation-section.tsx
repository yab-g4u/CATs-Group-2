import { QrCode, Database, FileText } from "lucide-react"

export function ProductExplanationSection() {
  return (
    <section id="product" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How <span className="text-primary glow-text">D.I.N.A</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three powerful technologies working together to transform healthcare delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glow-card rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">QR Code Identity</h3>
            <p className="text-muted-foreground">
              Every patient gets a unique QR code that serves as their portable medical ID. Scan it anywhere to access
              their complete health history instantly.
            </p>
          </div>

          <div className="glow-card rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mx-auto mb-6">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Blockchain Security</h3>
            <p className="text-muted-foreground">
              Built on Cardano blockchain, ensuring data integrity, security, and immutability. Your medical records
              are tamper-proof and always verifiable.
            </p>
          </div>

          <div className="glow-card rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Complete Medical Records</h3>
            <p className="text-muted-foreground">
              All your medical history in one place—diagnoses, treatments, test results, medications, and referrals.
              Accessible to authorized healthcare providers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

