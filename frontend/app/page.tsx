import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { ChallengesSection } from "@/components/challenges-section"
import { FeaturesSection } from "@/components/features-section"
import { WhySection } from "@/components/why-section"
import Image from "next/image"
// Using an inline testimonials section here because the component in
// `components/testimonials-section.tsx` points image srcs at
// "/frontend/public/..." which prevents Next.js from resolving them.
// Public assets are served from the project root `/`. We encode the
// filenames to safely handle spaces.
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ChallengesSection />
        <FeaturesSection />
        <WhySection />
        {/* Inline testimonials (uses correct public paths) */}
        {(() => {
          const testimonials = [
            {
              quote:
                "Still early, but the referral flow already feels faster. If they land the remaining features, this could remove a lot of friction for our team.",
              name: "Dr. Tegegne Abiyot",
              role: "Chief Doctor, Tikur Anbessa Hospital",
              image: encodeURI("/Dr.tegegn abiyot.png"),
            },
            {
              quote:
                "We're piloting it with a few sites. The promise of consistent patient histories across facilities is exactly what we need—looking forward to the full rollout.",
              name: "Dr. Saron Leulkal",
              role: "Health Post Coordinator, Addis Ababa",
              image: encodeURI("/Dr.saron leulkal.png"),
            },
            {
              quote:
                "Even in beta, seeing my records in one place is reassuring. If they keep this pace, it'll be a game changer for patients like me.",
              name: "Dr. Rita Tilaye",
              role: "Patient, Digital Healthcare Advocate",
              image: encodeURI("/Dr.Rrita tilaye.png"),
            },
          ]

          return (
            <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    Early words, <span className="text-primary glow-text">strong promise</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A project in motion—here&apos;s what early users notice as The Spine takes shape.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="glow-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                      <p className="text-foreground mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })()}
        <CTASection />
        <Footer />
      </div>
    </main>
  )
}
