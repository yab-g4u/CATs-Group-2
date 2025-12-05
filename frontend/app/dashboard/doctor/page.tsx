import { RetroGrid } from "@/components/ui/retro-grid"

export default function DoctorDashboard() {
  const recentPatients = [
    { name: "H. Tadesse", lastSeen: "2025-02-20", status: "Follow-up" },
    { name: "S. Bekele", lastSeen: "2025-02-15", status: "Lab review" },
    { name: "M. Kidane", lastSeen: "2025-02-12", status: "New consult" },
  ]

  const referrals = [
    { patient: "H. Tadesse", to: "Cardiology", date: "2025-02-20" },
    { patient: "S. Bekele", to: "Radiology", date: "2025-02-15" },
  ]

  const tasks = [
    { title: "Review MRI results", detail: "Patient: H. Tadesse", when: "Today" },
    { title: "Call patient back", detail: "S. Bekele lab clarification", when: "In 2 hrs" },
    { title: "Sign referral", detail: "M. Kidane → Orthopedics", when: "By end of day" },
  ]

  const stats = [
    { label: "Referrals this week", value: "8" },
    { label: "Labs signed off", value: "14" },
    { label: "Avg. turnaround", value: "18h" },
  ]

  const recentSearches = ["Kidane", "Bekele", "Tadesse", "Abebe"]

  return (
    <main className="relative min-h-screen bg-background px-8 py-14 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_75%_10%,rgba(59,130,246,0.08),transparent_38%),radial-gradient(circle_at_50%_60%,rgba(59,130,246,0.06),transparent_45%)]" />
      <RetroGrid className="opacity-45" angle={70} />
      <div className="relative z-10 mx-auto max-w-7xl space-y-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-full flex justify-end">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              ← Home
            </a>
          </div>
          <div className="space-y-2 rounded-2xl border border-border bg-muted/30 px-5 py-4 shadow-sm">
            <p className="text-base font-semibold uppercase tracking-wide text-primary">Doctor Dashboard</p>
            <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-primary via-foreground to-foreground/80 bg-clip-text text-transparent sm:text-5xl">
              Care tools
            </h1>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-8">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">QR scanner</p>
                  <h2 className="text-xl font-semibold text-foreground">Scan patient</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">QR</span>
              </div>
              <div className="mt-4 h-48 rounded-xl border border-dashed border-border bg-background" />
              <p className="mt-3 text-xs text-muted-foreground">Open the camera to scan a patient QR code.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <p className="text-sm text-muted-foreground">Health tip for clinicians</p>
              <h3 className="text-lg font-semibold text-foreground">Protect your posture</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Alternate sitting and standing, and take a 2-minute stretch break every hour to avoid neck and back strain.
              </p>
              <div className="mt-4 rounded-lg bg-primary/5 px-3 py-2 text-xs text-primary">Updated weekly.</div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">Tasks & follow-ups</h3>
              <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                {tasks.map((task) => (
                  <li key={task.title} className="rounded-lg bg-background px-3 py-2">
                    <p className="font-semibold text-foreground">{task.title}</p>
                    <p>{task.detail}</p>
                    <p className="text-xs text-muted-foreground">{task.when}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div className="grid gap-6 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Patient profile timeline</h2>
                <span className="text-xs text-muted-foreground">Recent</span>
              </div>
              <div className="mt-5 space-y-4">
                {recentPatients.map((p) => (
                  <div key={p.name} className="flex items-center justify-between rounded-xl bg-background p-4">
                    <div>
                      <p className="text-base font-semibold text-foreground">{p.name}</p>
                      <p className="text-sm text-muted-foreground">Last seen: {p.lastSeen}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Create referral</h3>
                <p className="mt-2 text-sm text-muted-foreground">Start a new referral with destination, reason, and urgency.</p>
                <button className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  New referral
                </button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Upload lab results</h3>
                <p className="mt-2 text-sm text-muted-foreground">Attach PDF or images to the patient record.</p>
                <div className="mt-4 h-28 rounded-lg border border-dashed border-border bg-background" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Recent referrals</h3>
                <ul className="mt-3 space-y-3 text-sm">
                  {referrals.map((r) => (
                    <li key={`${r.patient}-${r.to}`} className="rounded-lg bg-background px-3 py-2">
                      <p className="font-semibold text-foreground">{r.patient}</p>
                      <p className="text-xs text-muted-foreground">To {r.to} · {r.date}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full px-1 sm:px-2">
                <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground">Patient search</h3>
                  <input
                    type="search"
                    placeholder="Search patient name or ID"
                    className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <p className="mt-3 text-xs text-muted-foreground">Recent</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <span key={term} className="rounded-full bg-background px-3 py-1 text-xs text-foreground border border-border">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
