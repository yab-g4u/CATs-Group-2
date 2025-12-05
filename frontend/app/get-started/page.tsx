import Link from "next/link"
import GetStartedForm from "@/components/forms/get-started-form"

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-card/30 px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-primary hover:text-primary/80 font-semibold mb-8 inline-flex items-center">
          ← Back to Home
        </Link>

        <GetStartedForm />

        <p className="text-xs text-muted-foreground text-center mt-12">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  )
}
