import { Users } from 'lucide-react'
import { PlaceholderPage } from '@/components/ui/placeholder-page'

export default function TeamPage() {
  return (
    <PlaceholderPage
      title="My Team"
      description="Manage your team members, track performance, and assign tasks."
      icon={<Users className="h-16 w-16 text-blue-600" />}
    />
  )
}
