import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-card rounded-3xl border border-border p-12 md:p-16 text-center overflow-hidden">
          {/* Background accent */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Transform Healthcare?</h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join healthcare providers across Ethiopia in building a smarter, more connected healthcare system. Start
              your journey with The Spine today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors gap-2 text-lg"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
             
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              No credit card required. Start free and upgrade anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
