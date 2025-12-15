"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface AuthGuardProps {
    children: React.ReactNode
    requiredRole?: "doctor" | "patient" | "hospital" | "any"
}

export function AuthGuard({ children, requiredRole = "any" }: AuthGuardProps) {
    const { isAuthenticated, isLoading, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            // Redirect to login page
            router.push("/get-started")
        }

        // Check role if specified
        if (!isLoading && isAuthenticated && requiredRole !== "any") {
            if (user?.role !== requiredRole) {
                // Redirect to appropriate dashboard based on role
                if (user?.role === "doctor") {
                    router.push("/dashboard/doctor")
                } else if (user?.role === "patient") {
                    router.push("/dashboard/patient")
                } else if (user?.role === "hospital") {
                    router.push("/dashboard/hospital")
                } else {
                    router.push("/")
                }
            }
        }
    }, [isLoading, isAuthenticated, user, requiredRole, router])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Checking authentication...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null // Will redirect in useEffect
    }

    if (requiredRole !== "any" && user?.role !== requiredRole) {
        return null // Will redirect in useEffect
    }

    return <>{children}</>
}
