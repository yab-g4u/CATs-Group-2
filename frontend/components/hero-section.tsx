"use client"

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
            Your medical history.
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
              One ID. Everywhere.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            D.I.N.A gives every patient a secure, portable digital identity backed by Cardano blockchain. One QR code.
            Complete medical history. Smarter referrals between clinics and hospitals.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link href="/dashboard/doctor/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 px-6 sm:px-8 h-12 text-sm sm:text-base"
              >
                For Doctors
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Link href="/for-hospitals" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary/30 hover:bg-primary/10 px-6 sm:px-8 h-12 text-sm sm:text-base"
              >
                For Hospitals
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Link href="/patient-access" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary/30 hover:bg-primary/10 px-6 sm:px-8 h-12 text-sm sm:text-base"
              >
                Access Your Record
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
