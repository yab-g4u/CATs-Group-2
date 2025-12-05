"use client"
import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import Problems from "@/components/sections/problems"
import Services from "@/components/sections/services"
import About from "@/components/sections/about"
import Testimonials from "@/components/sections/testimonials"
import CTA from "@/components/sections/cta"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full overflow-hidden pt-16">
        <div id="home">
          <Hero />
        </div>
        <Problems />
        <div id="services">
          <Services />
        </div>
        <About />
        <div id="testimonials">
          <Testimonials />
        </div>
        <CTA />
      </main>
    </>
  )
}
