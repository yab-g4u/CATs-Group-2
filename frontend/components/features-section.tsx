import { QrCode, Shield, FileText } from "lucide-react"

const features = [
  {
    icon: QrCode,
    title: "QR Code Identity",
    description:
      "Every patient gets a unique QR code that serves as their digital medical identity. One scan gives doctors instant access to complete medical history, eliminating the need for paper records or repeated tests.",
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description:
      "Powered by Cardano blockchain, all medical records are securely stored with cryptographic protection. Data is immutable, tamper-proof, and accessible only to authorized healthcare providers, ensuring patient privacy and data integrity.",
  },
  {
    icon: FileText,
    title: "Complete Medical Records",
    description:
      "A comprehensive digital record of every test, diagnosis, treatment, and referral. Patients carry their complete medical history in one place, accessible anywhere, anytime, ensuring continuity of care across all healthcare facilities.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What The Spine <span className="text-primary glow-text">Does</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three powerful technologies working together to transform healthcare delivery in Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glow-card rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
