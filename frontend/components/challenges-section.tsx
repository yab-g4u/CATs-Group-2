"use client"

import { AlertTriangle } from "lucide-react"
import { useEffect, useRef } from "react"

const challenges = [
  {
    title: "Patient records scattered across providers",
    description:
      "Medical records are fragmented across multiple healthcare facilities, making it difficult for patients and doctors to access complete health history when needed most.",
  },
  {
    title: "Slow referral processes causing delays",
    description:
      "Traditional referral systems require manual paperwork and multiple handoffs, leading to significant delays in patient care and treatment initiation.",
  },
  {
    title: "Medical data security concerns",
    description:
      "Patient data is vulnerable to breaches and unauthorized access when stored in isolated, outdated systems without robust encryption or security protocols.",
  },
  {
    title: "Limited patient control over health data",
    description:
      "Patients have little visibility or authority over who accesses their medical information, compromising privacy and autonomy over personal health records.",
  },
  {
    title: "Incompatible healthcare systems",
    description:
      "Different healthcare providers use incompatible systems that don't communicate with each other, creating silos and preventing seamless data exchange.",
  },
  {
    title: "Lost medical history during transfers",
    description:
      "Critical medical information is often lost or not transferred when patients switch providers or travel between healthcare facilities.",
  },
]

export function ChallengesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const interval = setInterval(scroll, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-center">
          Healthcare Challenges <span className="text-primary glow-text">We Solve</span>
        </h2>
      </div>

      {/* Scrolling cards */}
      <div ref={scrollRef} className="flex gap-6 overflow-x-hidden">
        {[...challenges, ...challenges].map((challenge, index) => (
          <div key={index} className="glow-card rounded-2xl p-6 min-w-[350px] max-w-[350px] flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{challenge.title}</h3>
            <p className="text-muted-foreground text-sm">{challenge.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
