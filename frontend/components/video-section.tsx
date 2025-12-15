"use client"

export function VideoSection() {
  const videoId = "sEThbj_CgGQ"
  const embedUrl = `https://www.youtube.com/embed/${videoId}`

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Story: <span className="text-primary glow-text">Problem & Solution</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Watch interviews with doctors and patients sharing their experiences with medical record challenges and how D.I.N.A provides a solution.
          </p>
        </div>

        <div className="glow-card rounded-3xl overflow-hidden relative">
          <div className="aspect-video relative bg-muted/30">
            <iframe
              src={embedUrl}
              title="D.I.N.A - Problem Statement and Interviews"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Learn more about the healthcare challenges we&apos;re solving and hear directly from healthcare providers and patients.
          </p>
        </div>
      </div>
    </section>
  )
}

