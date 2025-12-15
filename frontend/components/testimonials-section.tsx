import Image from "next/image"

const testimonials = [
  {
    quote:
      "Still early, but the referral flow already feels faster. If they land the remaining features, this could remove a lot of friction for our team.",
    name: "Dr. Tegegne Abiyot",
    role: "Chief Doctor, Tikur Anbessa Hospital",
    image: "/frontend/public/Dr.tegegn abiyot.png",
  },
  {
    quote:
      "We're piloting it with a few sites. The promise of consistent patient histories across facilities is exactly what we need—looking forward to the full rollout.",
    name: "Dr. Saron Leulkal",
    role: "Health Post Coordinator, Addis Ababa",
    image: "/frontend/public/Dr.saron leulkal.png",
  },
  {
    quote:
      "Even in beta, seeing my records in one place is reassuring. If they keep this pace, it'll be a game changer for patients like me.",
    name: "Dr. Rita Tilaye",
    role: "Patient, Digital Healthcare Advocate",
    image: "/frontend/public/Dr.Rita tilaye.png",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Early words, <span className="text-primary glow-text">strong promise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A project in motion—here&apos;s what early users notice as D.I.N.A takes shape.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glow-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
              <p className="text-foreground mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image || "/placeholder.jpg"}
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
}
