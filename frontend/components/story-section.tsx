"use client"

import Image from "next/image"
import { useState } from "react"

export function StorySection() {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Nadab&apos;s Story: <span className="text-primary glow-text">Lost Blood Test</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-4">
              Nadab&apos;s experience highlights a critical problem in healthcare: the loss of vital medical information. 
              During an interview, she shared how she lost her blood test results—a common but devastating issue that 
              affects countless patients across Ethiopia.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg mb-4">
              When critical test results go missing, patients face delayed diagnoses, repeated tests, and increased costs. 
              Doctors are forced to make decisions with incomplete information, potentially compromising patient care.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg">
              This is exactly why The Spine exists—to ensure that no patient&apos;s medical history is ever lost again. 
              With blockchain-backed records, every test, every diagnosis, every piece of medical information is securely 
              stored and instantly accessible, wherever and whenever it&apos;s needed.
            </p>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="glow-card rounded-3xl overflow-hidden relative">
              <div className="aspect-[4/3] relative">
                <Image
                  src={imageError ? "/placeholder.jpg" : "/nadab.jpg"}
                  alt="Nadab sharing her story about losing her blood test results"
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-white text-xs sm:text-sm font-medium">
                  &ldquo;I gave a blood sample, but when I returned to the treatment room, the lab had lost my sample.&rdquo;
                </p>
                <p className="text-white/80 text-xs mt-2">— Nadab, Patient</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-accent/15 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
