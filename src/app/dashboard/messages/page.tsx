'use client'

import { PlaceholderPage } from '@/components/ui/placeholder-page'
import { MessageSquare } from 'lucide-react'

export default function MessagesPage() {
  return (
    <PlaceholderPage
      title="Messages"
      description="Team communications, client updates, and notifications will be available here."
      icon={<MessageSquare className="h-16 w-16 text-blue-600" />}
    />
  )
}
