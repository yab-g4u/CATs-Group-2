import { Shield, Zap, Users, Lock, QrCode, Cloud } from "lucide-react"

const services = [
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
    icon: Users,
    title: "Seamless Integration",
    description: "Works with existing clinic systems and requires minimal training for healthcare workers.",
  },
  {
    icon: Lock,
    title: "Patient Control",
    description: "Patients maintain full control over their medical data and who can access it.",
  },
  {
    icon: Cloud,
    title: "Always Available",
    description: "Medical records accessible even offline, with automatic sync when connectivity returns.",
  },
]

export default function Services() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Powerful Features for Better Care</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built specifically for African healthcare systems, designed with clinicians and patients in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
