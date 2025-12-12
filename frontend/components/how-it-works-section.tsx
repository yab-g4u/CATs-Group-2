import { User, Database, Smartphone, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: User,
    title: "Doctor Creates",
    description: "Healthcare providers create and update patient records through our secure platform, ensuring all medical information is captured accurately.",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: Database,
    title: "Blockchain Stores",
    description: "All medical records are securely stored on the Cardano blockchain, ensuring data integrity, immutability, and protection against loss or tampering.",
    color: "from-primary/20 to-primary/10",
    iconColor: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    icon: Smartphone,
    title: "Patient Accesses",
    description: "Patients access their complete medical history anytime, anywhere using a simple QR code. No more lost records or repeated tests.",
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-400",
    bgColor: "bg-green-500/20",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-primary glow-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to transform how medical records are created, stored, and accessed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`glow-card rounded-2xl p-8 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color}`} />
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary/30">{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

