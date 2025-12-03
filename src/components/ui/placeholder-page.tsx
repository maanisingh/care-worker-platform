'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PlaceholderPageProps {
  title: string
  description: string
  icon: LucideIcon
  comingSoon?: boolean
}

export function PlaceholderPage({ title, description, icon: Icon, comingSoon = true }: PlaceholderPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[60vh]"
    >
      <Card className="max-w-md w-full border-0 shadow-lg">
        <CardContent className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl">
              <Icon className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          {comingSoon && (
            <div className="pt-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                🚀 Coming Soon in Phase 2
              </div>
            </div>
          )}
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
            Go Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
