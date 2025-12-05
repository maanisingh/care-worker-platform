'use client'

import { PlaceholderPage } from '@/components/ui/placeholder-page'
import { FolderOpen } from 'lucide-react'

export default function DocumentsPage() {
  return (
    <PlaceholderPage
      title="Documents & Training"
      description="Document management, certificate uploads, and training records will be available here."
      icon={<FolderOpen className="h-16 w-16 text-blue-600" />}
    />
  )
}
