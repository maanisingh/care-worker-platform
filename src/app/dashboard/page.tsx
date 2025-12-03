'use client'

import { useAuthStore } from '@/stores/auth-store'
import { AdminDashboard } from '@/components/features/dashboard/admin-dashboard'
import { CareWorkerDashboard } from '@/components/features/dashboard/care-worker-dashboard'
import { SupervisorDashboard } from '@/components/features/dashboard/supervisor-dashboard'

export default function DashboardPage() {
  const { user } = useAuthStore()

  // Render dashboard based on user role
  if (user?.role === 'admin') {
    return <AdminDashboard />
  }

  if (user?.role === 'care-worker') {
    return <CareWorkerDashboard />
  }

  if (user?.role === 'supervisor') {
    return <SupervisorDashboard />
  }

  // Default fallback
  return <CareWorkerDashboard />
}
