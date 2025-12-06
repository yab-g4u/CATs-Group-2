import { QrCode, Shield, Zap, Layers, UserCheck, Wifi } from "lucide-react"

const features = [
  {
    icon: QrCode,
    title: "Simple QR Code Access",
    description:
      "Doctors instantly access complete patient history with a single QR code scan, eliminating paperwork and delays.",
  },
  {
    icon: Shield,
    title: "Secure & Encrypted",
    description:
      "Cardano blockchain ensures data integrity and security while maintaining full patient privacy and compliance.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Referrals",
    description:
      "Replace handwritten letters with digital referral packets that arrive instantly to receiving hospitals.",
  },
  {
    icon: Layers,
    title: "Seamless Integration",
    description: "Works with existing clinic systems and requires minimal training for healthcare workers.",
  },
  {
    icon: UserCheck,
    title: "Patient Control",
    description: "Patients maintain full control over their medical data and who can access it.",
  },
  {
    icon: Wifi,
    title: "Always Available",
    description: "Medical records accessible even offline, with automatic sync when connectivity returns.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Features for <span className="text-primary glow-text">Better Care</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built specifically for African healthcare systems, designed with clinicians and patients in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glow-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
