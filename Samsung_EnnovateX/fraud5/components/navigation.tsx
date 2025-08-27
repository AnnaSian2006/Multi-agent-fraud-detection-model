"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShieldCheckIcon, MenuIcon, UserIcon, LogOutIcon, BarChart3Icon, HomeIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import AuthButton from "@/components/AuthButton"

export function Navigation() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      }
    }
    getSession()

    // listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const navigationItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3Icon, requiresAuth: true },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <ShieldCheckIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">FraudGuard</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-6">
            {navigationItems.map((item) => {
              if (item.requiresAuth && !user) return null

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span className="hidden lg:inline">{user.user_metadata?.name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user.user_metadata?.name || "User"}</div>
                    <div className="text-muted-foreground">{user.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <BarChart3Icon className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthButton />
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <ShieldCheckIcon className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">FraudGuard</span>
                </div>

                {user && (
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <UserIcon className="h-4 w-4" />
                      <span className="font-medium">{user.user_metadata?.name || "User"}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                )}

                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    if (item.requiresAuth && !user) return null

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted ${
                          pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>

                <div className="pt-4 border-t space-y-2">
                  {user ? (
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <LogOutIcon className="h-4 w-4" />
                      Logout
                    </Button>
                  ) : (
                    <AuthButton />
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
