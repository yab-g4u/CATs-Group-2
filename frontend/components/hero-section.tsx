import { Button } from "@/components/ui/button"
import { ArrowRight, QrCode } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <QrCode className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Transforming Healthcare in Africa</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            Portable Medical Records
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
              at Your Fingertips
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            The Spine gives every patient a secure, portable digital identity backed by Cardano blockchain. One QR code.
            Complete medical history. Smarter referrals between clinics and hospitals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-started">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 px-8 h-12 text-base"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
