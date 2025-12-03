import { UserCheck } from 'lucide-react'
import { PlaceholderPage } from '@/components/ui/placeholder-page'

export default function ClientsPage() {
  return (
    <PlaceholderPage
      title="Client Management"
      description="View and manage client profiles, care plans, and visit history."
      icon={UserCheck}
    />
  )
}
