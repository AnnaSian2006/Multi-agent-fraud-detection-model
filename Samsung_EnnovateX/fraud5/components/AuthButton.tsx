"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AuthButton() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    })
    if (error) console.error("Login error:", error.message)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login") // Redirect to login page
  }

  return (
    <div className="flex gap-4">
      {!user ? (
        <button
          onClick={handleLogin}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <span className="text-sm text-gray-700">
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-gray-600 text-white"
          >
            Logout
          </button>
        </>
      )}
    </div>
  )
}
