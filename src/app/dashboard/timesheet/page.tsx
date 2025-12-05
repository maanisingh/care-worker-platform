'use client'

import { PlaceholderPage } from '@/components/ui/placeholder-page'
import { Clock } from 'lucide-react'

export default function TimesheetPage() {
  return (
    <PlaceholderPage
      title="Timesheet & Payroll"
      description="Timesheet submissions, approvals, and payroll management will be available here."
      icon={<Clock className="h-16 w-16 text-blue-600" />}
    />
  )
}
