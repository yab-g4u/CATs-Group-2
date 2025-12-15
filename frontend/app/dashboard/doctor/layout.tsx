"use client"

import { AuthGuard } from "@/components/auth-guard"

export default function DoctorDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthGuard requiredRole="doctor">
            {children}
        </AuthGuard>
    )
}
