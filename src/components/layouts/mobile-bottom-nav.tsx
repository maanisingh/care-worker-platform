'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Users, Calendar, ClipboardList, Settings } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'

export function MobileBottomNav() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  // Don't show bottom nav for non-mobile users (admin)
  if (user?.role === 'admin') return null

  const navItems = user?.role === 'care-worker'
    ? [
        { icon: Home, label: 'Home', href: '/dashboard' },
        { icon: Users, label: 'Clients', href: '/dashboard/clients' },
        { icon: ClipboardList, label: 'Care Log', href: '/dashboard/care-logs' },
        { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
        { icon: Settings, label: 'More', href: '/dashboard/settings' },
      ]
    : [
        { icon: Home, label: 'Home', href: '/dashboard' },
        { icon: Users, label: 'Team', href: '/dashboard/team' },
        { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
        { icon: ClipboardList, label: 'Reports', href: '/dashboard/reports' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
      ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 pb-safe">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors",
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-blue-100")} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
