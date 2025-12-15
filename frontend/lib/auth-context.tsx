"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getUserProfile } from "@/lib/api"

interface User {
    id: number
    full_name: string
    phone: string | null
    national_id: string | null
    email: string
    role: string
    language: string
    elder_mode: boolean
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    token: string | null
    login: (accessToken: string, refreshToken: string, userData?: Partial<User>) => void
    logout: () => void
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const storedToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null

            if (!storedToken) {
                setIsLoading(false)
                return
            }

            setToken(storedToken)

            // Try to get user profile from backend
            try {
                const profile = await getUserProfile()
                setUser(profile)
            } catch (error) {
                // If profile fetch fails, try to get from localStorage
                const storedUser = localStorage.getItem("user")
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser))
                    } catch {
                        // Invalid stored user, clear auth
                        logout()
                    }
                } else {
                    // No valid auth, clear everything
                    logout()
                }
            }
        } catch (error) {
            console.error("Auth check failed:", error)
            logout()
        } finally {
            setIsLoading(false)
        }
    }

    const login = (accessToken: string, refreshToken: string, userData?: Partial<User>) => {
        localStorage.setItem("access_token", accessToken)
        localStorage.setItem("refresh_token", refreshToken)
        setToken(accessToken)

        if (userData) {
            const user = userData as User
            localStorage.setItem("user", JSON.stringify(user))
            setUser(user)
        }

        // Fetch full profile from backend
        refreshUser()
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
    }

    const refreshUser = async () => {
        try {
            const profile = await getUserProfile()
            setUser(profile)
            localStorage.setItem("user", JSON.stringify(profile))
        } catch (error) {
            console.error("Failed to refresh user:", error)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!token && !!user,
                isLoading,
                token,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
