import { ClipboardList } from 'lucide-react'
import { PlaceholderPage } from '@/components/ui/placeholder-page'

export default function CareLogsPage() {
  return (
    <PlaceholderPage
      title="Care Logs"
      description="View, manage, and analyze care logs submitted by care workers."
      icon={<ClipboardList className="h-16 w-16 text-blue-600" />}
    />
  )
}
