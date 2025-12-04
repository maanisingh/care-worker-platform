import { AlertTriangle } from 'lucide-react'
import { PlaceholderPage } from '@/components/ui/placeholder-page'

export default function IncidentsPage() {
  return (
    <PlaceholderPage
      title="Incident Reports"
      description="Track and manage incident reports, investigations, and resolutions."
      icon={<AlertTriangle className="h-16 w-16 text-blue-600" />}
    />
  )
}
