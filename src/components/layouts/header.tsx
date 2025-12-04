'use client'

import { Bell, Search, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/auth-store'
import { MobileDrawerMenu } from './mobile-drawer-menu'

export function Header() {
  const { user } = useAuthStore()

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left - Mobile Menu & Logo */}
        <div className="flex items-center space-x-3">
          {/* Hamburger Menu (mobile only) */}
          <MobileDrawerMenu />

          {/* Logo (mobile only) */}
          <div className="flex items-center space-x-2 md:hidden">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Caring Hands</h2>
          </div>
        </div>

        {/* Center - Search (desktop only) */}
        <div className="hidden md:block flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-2">
          {/* Search icon (mobile only) */}
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              3
            </Badge>
          </Button>

          {/* User Avatar (desktop only) */}
          <div className="hidden md:flex items-center space-x-2 ml-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
