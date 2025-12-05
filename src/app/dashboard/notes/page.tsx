'use client'

import { PlaceholderPage } from '@/components/ui/placeholder-page'
import { ClipboardList } from 'lucide-react'

export default function NotesPage() {
  return (
    <PlaceholderPage
      title="Notes & Observations"
      description="Record care notes, client observations, and daily care logs will be available here."
      icon={<ClipboardList className="h-16 w-16 text-blue-600" />}
    />
  )
}
