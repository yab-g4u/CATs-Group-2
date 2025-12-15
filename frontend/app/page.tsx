import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StorySection } from "@/components/story-section"
import { VideoSection } from "@/components/video-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
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
        <StorySection />
        <VideoSection />
        <FeaturesSection />
        {/* Inline testimonials (uses correct public paths) */}
        {(() => {
          const testimonials = [
            {
              quote:
                "Before D.I.N.A, I spent 15-20 minutes per patient just trying to piece together their medical history from scattered paper records. Now, one QR scan gives me everything instantly. It's transformed how I practice medicine—I can focus on diagnosis and treatment instead of paperwork.",
              name: "Dr. Tegegne Abiyot",
              role: "Chief Doctor, Tikur Anbessa Hospital",
              image: encodeURI("/Dr.tegegn abiyot.png"),
            },
            {
              quote:
                "The biggest challenge in our health posts is losing patient records when they move between facilities. D.I.N.A's blockchain storage means we never lose critical information. I've seen it prevent duplicate tests and help us make better treatment decisions with complete patient histories.",
              name: "Dr. Saron Leulkal",
              role: "Health Post Coordinator, Addis Ababa",
              image: encodeURI("/Dr.saron leulkal.png"),
            },
            {
              quote:
                "As a pediatrician, continuity of care is crucial. When a child comes in with incomplete records, I'm forced to make decisions without full context. D.I.N.A ensures I always have access to vaccination history, previous diagnoses, and medication records—this directly improves patient outcomes.",
              name: "Dr. Rita Tilaye",
              role: "Pediatrician, Addis Ababa Health Center",
              image: encodeURI("/Dr.Rita tilaye.png"),
            },
          ]

          return (
            <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    What Doctors <span className="text-primary glow-text">Say</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Early feedback from healthcare providers using D.I.N.A.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="glow-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                      <p className="text-foreground mb-6 italic text-sm sm:text-base leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.image || "/placeholder.jpg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground text-sm sm:text-base truncate">{testimonial.name}</p>
                          <p className="text-muted-foreground text-xs sm:text-sm truncate">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })()}
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  )
}
