'use client'

import { PlaceholderPage } from '@/components/ui/placeholder-page'
import { Pill } from 'lucide-react'

export default function MedicationPage() {
  return (
    <PlaceholderPage
      title="Medication Administration"
      description="Medication schedules, administration records, and tracking will be available here."
      icon={<Pill className="h-16 w-16 text-blue-600" />}
    />
  )
}
