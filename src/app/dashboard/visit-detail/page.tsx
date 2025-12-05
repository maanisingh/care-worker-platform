'use client'

import { PlaceholderPage } from '@/components/ui/placeholder-page'
import { Clipboard } from 'lucide-react'

export default function VisitDetailPage() {
  return (
    <PlaceholderPage
      title="Visit Detail"
      description="Detailed visit information, tasks checklist, and care plan notes will be available here."
      icon={<Clipboard className="h-16 w-16 text-blue-600" />}
    />
  )
}
