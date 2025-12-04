'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  ClipboardList,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Heart,
  FileText
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function MobileDrawerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/login')
    setIsOpen(false)
  }

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Care Workers', href: '/dashboard/workers' },
    { icon: UserCheck, label: 'Clients', href: '/dashboard/clients' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
    { icon: ClipboardList, label: 'Care Logs', href: '/dashboard/care-logs' },
    { icon: AlertTriangle, label: 'Incidents', href: '/dashboard/incidents' },
    { icon: BarChart3, label: 'Reports', href: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  const supervisorMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'My Team', href: '/dashboard/team' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
    { icon: ClipboardList, label: 'Care Logs', href: '/dashboard/care-logs' },
    { icon: AlertTriangle, label: 'Incidents', href: '/dashboard/incidents' },
    { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  const careWorkerMenuItems = [
    { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
    { icon: UserCheck, label: 'My Clients', href: '/dashboard/clients' },
    { icon: Calendar, label: 'My Schedule', href: '/dashboard/schedule' },
    { icon: ClipboardList, label: 'Care Logs', href: '/dashboard/care-logs' },
    { icon: AlertTriangle, label: 'Report Issue', href: '/dashboard/incidents' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  const clientMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'My Schedule', href: '/dashboard/schedule' },
    { icon: Users, label: 'My Care Workers', href: '/dashboard/workers' },
    { icon: ClipboardList, label: 'Care History', href: '/dashboard/care-logs' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  const menuItems = user?.role === 'admin'
    ? adminMenuItems
    : user?.role === 'supervisor'
    ? supervisorMenuItems
    : user?.role === 'client'
    ? clientMenuItems
    : careWorkerMenuItems

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden rounded-full"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Caring Hands</h1>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}
