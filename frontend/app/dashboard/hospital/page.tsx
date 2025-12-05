import { RetroGrid } from "@/components/ui/retro-grid"

export default function HospitalDashboard() {
  const queue = [
    { name: "A. Lemma", reason: "Referral follow-up", eta: "10 mins" },
    { name: "R. Mekonnen", reason: "Imaging", eta: "20 mins" },
    { name: "S. Endale", reason: "Lab draw", eta: "30 mins" },
  ]

  const referrals = [
    { from: "Dr. H. Tadesse", patient: "A. Lemma", dept: "Cardiology" },
    { from: "Dr. S. Bekele", patient: "R. Mekonnen", dept: "Radiology" },
  ]

  const analytics = [
    { label: "Today's patients", value: "38" },
    { label: "Open referrals", value: "12" },
    { label: "Avg. wait", value: "22m" },
  ]

  const bedAvailability = [
    { ward: "ICU", open: 2, total: 10 },
    { ward: "Cardiology", open: 4, total: 18 },
    { ward: "Surgical", open: 6, total: 22 },
    { ward: "Pediatrics", open: 3, total: 15 },
  ]

  const pendingSignatures = [
    { title: "CT report", owner: "Dr. Lema", percent: 60 },
    { title: "Referral to Ortho", owner: "Dr. Fekadu", percent: 35 },
    { title: "Lab panel", owner: "Dr. Tadesse", percent: 80 },
  ]

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
            <p className="text-base font-semibold uppercase tracking-wide text-primary">Hospital Dashboard</p>
            <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-primary via-foreground to-foreground/80 bg-clip-text text-transparent sm:text-5xl">
              Facility operations
            </h1>
          </div>
        </div>

        <div className="grid gap-10 xl:grid-cols-12">
          <div className="space-y-8 xl:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Patient queue</p>
                  <h2 className="text-xl font-semibold text-foreground">Now serving</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Live</span>
              </div>
              <ul className="mt-4 space-y-3">
                {queue.map((item) => (
                  <li key={item.name} className="rounded-lg bg-background px-3 py-2">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                    <p className="text-xs text-primary">ETA {item.eta}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">Referral manager</h2>
              <p className="mt-2 text-sm text-muted-foreground">Assign destinations and update statuses.</p>
              <div className="mt-4 space-y-3">
                {referrals.map((ref) => (
                  <div key={`${ref.patient}-${ref.dept}`} className="rounded-lg bg-background px-3 py-2">
                    <p className="font-semibold text-foreground">{ref.patient}</p>
                    <p className="text-xs text-muted-foreground">From {ref.from}</p>
                    <p className="text-xs text-primary">To {ref.dept}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Assign referral
              </button>
            </div>
          </div>

          <div className="space-y-8 xl:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">Upload lab results</h2>
              <p className="mt-2 text-sm text-muted-foreground">Attach imaging and lab files to patient records.</p>
              <div className="mt-4 h-28 rounded-lg border border-dashed border-border bg-background" />
              <button className="mt-5 w-full rounded-lg border border-dashed border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted">
                Browse files
              </button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">Search patient</h3>
              <input
                type="search"
                placeholder="Name or ID"
                className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Bed availability</h3>
                <p className="mt-1 text-sm text-muted-foreground">Open beds by ward with a quick transfer action.</p>
                <div className="mt-4 space-y-3">
                  {bedAvailability.map((bed) => (
                    <div key={bed.ward} className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
                      <div>
                        <p className="font-semibold text-foreground">{bed.ward}</p>
                        <p className="text-xs text-muted-foreground">{bed.open} open / {bed.total} total</p>
                      </div>
                      <button className="rounded-md border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted">
                        Request transfer
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">Pending signatures</h3>
                <p className="mt-1 text-sm text-muted-foreground">Follow up on labs and referrals awaiting sign-off.</p>
                <div className="mt-4 space-y-4">
                  {pendingSignatures.map((item) => (
                    <div key={item.title} className="rounded-lg bg-background px-3 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Owner: {item.owner}</p>
                        </div>
                        <span className="text-xs font-semibold text-primary">{item.percent}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
