'use client'

import { PlaceholderPage } from '@/components/ui/placeholder-page'
import { GraduationCap } from 'lucide-react'

export default function ProfilePage() {
  return (
    <PlaceholderPage
      title="Profile & Training"
      description="Personal profile, training certificates, and professional development will be available here."
      icon={<GraduationCap className="h-16 w-16 text-blue-600" />}
    />
  )
}
