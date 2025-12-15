"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  UserPlus,
  QrCode,
  FileText,
  User,
  ArrowLeft,
  Wallet,
  Coins,
  TrendingUp,
  History,
  ArrowRight,
  MessageSquare,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { toast } from "sonner"

const sidebarNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/doctor" },
  { icon: Users, label: "My Patients", href: "/dashboard/doctor/patients" },
  { icon: UserPlus, label: "Create Patient", href: "/dashboard/doctor/create-patient" },
  { icon: Wallet, label: "CarePoints Wallet", href: "/dashboard/doctor/wallet", active: true },
  { icon: MessageSquare, label: "Chatbot", href: "/dashboard/doctor/chatbot" },
]

const sidebarBottomItems = [{ icon: User, label: "Account", href: "/dashboard/doctor/account" }]

interface CarePointsData {
  balance: number
  currentStreak: number
  totalEarned: number
  history: Array<{
    id: string
    date: string
    amount: number
    reason: string
    txHash?: string
  }>
}

export default function CarePointsWalletPage() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [carePoints, setCarePoints] = useState<CarePointsData>({
    balance: 0,
    currentStreak: 0,
    totalEarned: 0,
    history: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [showConvertModal, setShowConvertModal] = useState(false)
  const [convertAmount, setConvertAmount] = useState("")

  useEffect(() => {
    loadCarePointsData()
  }, [])

  const loadCarePointsData = async () => {
    try {
      setIsLoading(true)
      const doctorId = "doctor_1" // In production, get from auth context

      // Fetch streak data
      const streakResponse = await fetch(`/api/doctor/streak?doctorId=${doctorId}`)
      const streakData = await streakResponse.json()

      // Calculate CarePoints from localStorage or mock data
      const storedData = localStorage.getItem(`carepoints_${doctorId}`)
      let carePointsData: CarePointsData

      if (storedData) {
        carePointsData = JSON.parse(storedData)
      } else {
        carePointsData = {
          balance: 0,
          currentStreak: streakData.currentStreak || 0,
          totalEarned: 0,
          history: [],
        }
      }

      carePointsData.currentStreak = streakData.currentStreak || 0
      setCarePoints(carePointsData)
    } catch (error) {
      console.error("Failed to load CarePoints data:", error)
      toast.error("Failed to load wallet data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConvertToADA = () => {
    const amount = parseFloat(convertAmount)
    if (isNaN(amount) || amount <= 0 || amount > carePoints.balance) {
      toast.error("Invalid amount")
      return
    }

    // Mock conversion (no real swap)
    toast.success(`Converted ${amount} CarePoints to ${(amount / 10).toFixed(2)} ADA (Mock)`)
    setShowConvertModal(false)
    setConvertAmount("")
  }

  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <span className="font-bold text-foreground">D.I.N.A</span>
            <p className="text-xs text-muted-foreground">Doctor Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>

      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
          <Link href="/dashboard/doctor">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </header>

        <main className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">CarePoints Wallet</h1>
              <p className="text-muted-foreground">
                Earn CarePoints for every medical record you upload to the blockchain.
              </p>
            </div>

            {/* Balance Card */}
            <div className="glow-card rounded-2xl p-8 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
                  <h2 className="text-5xl font-bold text-foreground flex items-center gap-2">
                    <Coins className="h-10 w-10 text-primary" />
                    {carePoints.balance.toLocaleString()}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">CarePoints</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                    <span className="text-2xl font-bold text-foreground">{carePoints.currentStreak} days</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +{10 + carePoints.currentStreak * 2} CarePoints per upload
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowConvertModal(true)}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white h-12 text-base"
              >
                Convert to ADA (Mock)
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="glow-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{carePoints.totalEarned.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </div>
              <div className="glow-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-foreground">{carePoints.currentStreak}</p>
                <p className="text-xs text-muted-foreground mt-1">Consecutive days</p>
              </div>
              <div className="glow-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Next Reward</p>
                  <History className="h-5 w-5 text-accent" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {10 + (carePoints.currentStreak + 1) * 2}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Next upload</p>
              </div>
            </div>

            {/* History */}
            <div className="glow-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transaction History
                </h3>
              </div>
              {carePoints.history.length > 0 ? (
                <div className="space-y-4">
                  {carePoints.history.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                    >
                      <div>
                        <p className="font-medium text-foreground">{transaction.reason}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        {transaction.txHash && (
                          <code className="text-xs text-muted-foreground font-mono mt-1">
                            {transaction.txHash.substring(0, 20)}...
                          </code>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">+{transaction.amount}</p>
                        <p className="text-xs text-muted-foreground">CarePoints</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No transactions yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start uploading records to earn CarePoints!
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Convert Modal */}
      <Dialog open={showConvertModal} onOpenChange={setShowConvertModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert CarePoints to ADA</DialogTitle>
            <DialogDescription>
              This is a mock conversion for demonstration purposes. No real ADA will be transferred.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Amount (CarePoints)</label>
              <input
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                max={carePoints.balance}
                min={1}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Conversion rate: 10 CarePoints = 1 ADA (Mock)
              </p>
              {convertAmount && !isNaN(parseFloat(convertAmount)) && (
                <p className="text-sm text-foreground mt-2">
                  You will receive: <strong>{(parseFloat(convertAmount) / 10).toFixed(2)} ADA</strong>
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleConvertToADA}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                disabled={!convertAmount || parseFloat(convertAmount) <= 0 || parseFloat(convertAmount) > carePoints.balance}
              >
                Convert
              </Button>
              <Button variant="outline" onClick={() => setShowConvertModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

