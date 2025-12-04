import { Settings } from 'lucide-react'
import { PlaceholderPage } from '@/components/ui/placeholder-page'

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Configure your account, notification preferences, and system settings."
      icon={<Settings className="h-16 w-16 text-blue-600" />}
    />
  )
}
