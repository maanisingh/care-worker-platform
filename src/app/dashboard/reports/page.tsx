import { BarChart3 } from 'lucide-react'
import { PlaceholderPage } from '@/components/ui/placeholder-page'

export default function ReportsPage() {
  return (
    <PlaceholderPage
      title="Reports & Analytics"
      description="Generate reports, view analytics, and export data for compliance."
      icon={<BarChart3 className="h-16 w-16 text-blue-600" />}
    />
  )
}
