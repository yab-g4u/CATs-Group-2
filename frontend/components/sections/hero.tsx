import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background via-accent/5 to-background flex items-center justify-center px-4 py-20">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-accent/20 rounded-full border border-accent/30">
          <p className="text-sm font-medium text-accent">Transforming Healthcare in Africa</p>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-foreground">
          Portable Medical Records
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            at Your Fingertips
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
          The Spine gives every patient a secure, portable digital identity backed by Cardano blockchain. One QR code.
          Complete medical history. Smarter referrals between clinics and hospitals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 border-t border-border">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary mb-1">100+</p>
            <p className="text-sm text-muted-foreground">Health Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-accent mb-1">50K+</p>
            <p className="text-sm text-muted-foreground">Patients Served</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary mb-1">95%</p>
            <p className="text-sm text-muted-foreground">Faster Referrals</p>
          </div>
        </div>
      </div>
    </section>
  )
}
