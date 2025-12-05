'use client'

import { PlaceholderPage } from '@/components/ui/placeholder-page'
import { CheckSquare } from 'lucide-react'

export default function VisitsPage() {
  return (
    <PlaceholderPage
      title="Visits & Tasks"
      description="Real-time visit tracking, pending confirmations, and task management will be available here."
      icon={<CheckSquare className="h-16 w-16 text-blue-600" />}
    />
  )
}
