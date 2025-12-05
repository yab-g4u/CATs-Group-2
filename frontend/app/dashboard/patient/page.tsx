import { RetroGrid } from "@/components/ui/retro-grid"

export default function PatientDashboard() {
  const timeline = [
    { date: "2025-02-14", title: "Follow-up", detail: "Spine MRI reviewed, stable." },
    { date: "2024-11-01", title: "Surgery", detail: "Lumbar microdiscectomy completed." },
    { date: "2024-08-10", title: "Consult", detail: "Initial neurology consultation." },
  ]

  const stats = [
    { label: "Upcoming", value: "2 appointments", tone: "primary" },
    { label: "Medications", value: "2 active", tone: "muted" },
    { label: "Alerts", value: "None", tone: "success" },
  ]

  const meds = [
    { name: "Gabapentin", dose: "300mg", note: "Twice daily" },
    { name: "Ibuprofen", dose: "400mg", note: "As needed for pain" },
  ]

  const reminders = [
    { title: "Take morning meds", detail: "Gabapentin 300mg", when: "Today 8:00 AM" },
    { title: "Refill Ibuprofen", detail: "Order 30 tablets", when: "Due in 3 days" },
    { title: "Prep for visit", detail: "Bring MRI images", when: "Next visit" },
  ]

  const vitals = [
    { label: "Blood Pressure", value: "118/76", note: "Stable" },
    { label: "Weight", value: "72.4 kg", note: "-0.4 kg vs last" },
    { label: "Heart Rate", value: "68 bpm", note: "Resting" },
  ]

  const sparklinePoints = [0, 4, 2, 5, 3, 6, 4]

  const labs = [
    { name: "CBC", date: "2025-01-05", status: "Normal" },
    { name: "MRI Spine", date: "2024-12-20", status: "Reviewed" },
  ]

  const appointments = [
    { date: "2025-03-12", with: "Dr. Abebe (Neuro)", type: "Follow-up" },
    { date: "2025-04-02", with: "PT Clinic", type: "Physiotherapy" },
  ]

  return (
    <main className="relative min-h-screen bg-background px-6 py-12 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_75%_10%,rgba(59,130,246,0.08),transparent_38%),radial-gradient(circle_at_50%_60%,rgba(59,130,246,0.06),transparent_45%)]" />
      <RetroGrid className="opacity-45" angle={70} />
      <div className="relative z-10 mx-auto max-w-7xl space-y-10">
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
            <p className="text-base font-semibold uppercase tracking-wide text-primary">Patient Dashboard</p>
            <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-primary via-foreground to-foreground/80 bg-clip-text text-transparent sm:text-5xl">
              Welcome back
            </h1>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Medical history timeline</h2>
                <span className="text-xs text-muted-foreground">Latest first</span>
              </div>
              <div className="mt-4 space-y-4">
                {timeline.map((item) => (
                  <div key={item.date} className="flex gap-4 rounded-xl border border-border bg-background p-4">
                    <div className="mt-1 h-10 w-10 rounded-full bg-primary/10 text-center text-xs font-semibold text-primary leading-10">
                      {item.date.slice(5)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                      <p className="text-base font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">Health tip</p>
              <h3 className="text-lg font-semibold text-foreground">Small daily moves</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Take a 20-minute walk, hydrate with 2L of water, and stretch your lower back after long sitting blocks.
              </p>
              <div className="mt-4 rounded-lg bg-primary/5 px-3 py-2 text-xs text-primary">Updated weekly.</div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">QR code profile</p>
                  <h2 className="text-xl font-semibold text-foreground">Share securely</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">QR</span>
              </div>
              <div className="mt-5 flex items-center justify-center rounded-xl border border-dashed border-border bg-background p-10">
                <div className="h-36 w-36 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Scan to share a read-only summary of your profile.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">Appointments</h3>
              <ul className="mt-4 space-y-4">
                {appointments.map((appt) => (
                  <li key={`${appt.date}-${appt.with}`} className="rounded-xl bg-background px-4 py-3">
                    <p className="font-semibold text-foreground">{appt.with}</p>
                    <p className="text-sm text-muted-foreground">{appt.type}</p>
                    <p className="text-xs text-muted-foreground">{appt.date}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-primary/5 p-4 text-sm text-primary">
                Emergency contact: +251 911 223344
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Medications</h3>
            <ul className="mt-4 space-y-3">
              {meds.map((med) => (
                <li key={med.name} className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
                  <div>
                    <p className="font-semibold text-foreground">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.note}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{med.dose}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Lab results</h3>
            <ul className="mt-4 space-y-3">
              {labs.map((lab) => (
                <li key={lab.name} className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
                  <div>
                    <p className="font-semibold text-foreground">{lab.name}</p>
                    <p className="text-xs text-muted-foreground">{lab.date}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{lab.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Reminders & tasks</h3>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              {reminders.map((item) => (
                <li key={item.title} className="rounded-lg bg-background px-3 py-2">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p>{item.detail}</p>
                  <p className="text-xs text-muted-foreground">{item.when}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Vitals & trends</h3>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {vitals.map((vital) => (
                <div key={vital.label} className="rounded-lg bg-background px-3 py-3">
                  <p className="text-xs text-muted-foreground">{vital.label}</p>
                  <p className="text-lg font-semibold text-foreground">{vital.value}</p>
                  <p className="text-xs text-muted-foreground">{vital.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Weight trend</h3>
              <span className="text-xs text-muted-foreground">Last 7 readings</span>
            </div>
            <svg viewBox="0 0 140 60" className="mt-4 h-24 w-full text-primary" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                points={sparklinePoints.map((p, i) => `${(i / (sparklinePoints.length - 1)) * 140},${60 - p * 8}`).join(" ")}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" /> Weight (kg)
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
