"use client"

const problems = [
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

export default function Problems() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-slate-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900">Healthcare Challenges We Solve</h2>
      </div>

      <div className="relative w-screen -mx-[calc((100vw-100%)/2)]">
        <div className="flex animate-marquee gap-8">
          {[...problems, ...problems].map((problem, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-96 h-80 bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200 flex flex-col"
            >
              <div className="flex items-start gap-4 flex-col">
                <div className="text-4xl">⚠️</div>
                <div className="flex-1 flex flex-col gap-2">
                  <p className="text-slate-900 font-bold text-lg leading-tight">{problem.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-50 from-50% to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-blue-50 from-50% to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
