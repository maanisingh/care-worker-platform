'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Heart,
  AlertCircle,
  CheckCircle2,
  Navigation
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export function ClientDashboard() {
  const upcomingVisits = [
    {
      id: '1',
      careWorker: 'Sarah Johnson',
      date: 'Today',
      time: '09:00 - 10:00',
      service: 'Personal Care',
      status: 'confirmed',
      photo: null
    },
    {
      id: '2',
      careWorker: 'Michael Peters',
      date: 'Today',
      time: '14:00 - 15:00',
      service: 'Meal Preparation',
      status: 'confirmed',
      photo: null
    },
    {
      id: '3',
      careWorker: 'Sarah Johnson',
      date: 'Tomorrow',
      time: '09:00 - 10:00',
      service: 'Personal Care',
      status: 'confirmed',
      photo: null
    },
    {
      id: '4',
      careWorker: 'Emma Wilson',
      date: 'Tomorrow',
      time: '16:00 - 17:00',
      service: 'Companionship',
      status: 'confirmed',
      photo: null
    }
  ]

  const regularCareWorkers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Care Worker',
      phone: '+44 7700 900123',
      email: 'sarah.j@caringhands.com',
      rating: 4.9,
      visitsThisMonth: 12
    },
    {
      id: '2',
      name: 'Michael Peters',
      role: 'Care Worker',
      phone: '+44 7700 900124',
      email: 'mike.p@caringhands.com',
      rating: 4.8,
      visitsThisMonth: 8
    }
  ]

  const quickStats = [
    { label: 'This Week', value: '8', icon: Calendar, color: 'text-blue-600' },
    { label: 'This Month', value: '28', icon: Calendar, color: 'text-purple-600' },
    { label: 'Care Workers', value: '2', icon: User, color: 'text-green-600' },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-24 md:pb-6"
    >
      {/* Header with Greeting */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 p-6 text-white shadow-lg">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-90">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
          <h1 className="text-3xl font-bold mt-1">Welcome Back! 👋</h1>
          <p className="text-sm opacity-90 mt-2">
            You have {upcomingVisits.filter(v => v.date === 'Today').length} care visits scheduled for today.
          </p>
        </div>

        {/* Decorative blob */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {quickStats.map((stat, idx) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 text-center">
                <div className={`mx-auto mb-2 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 mx-auto" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Visits */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Care Visits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                  {visit.careWorker.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h4 className="font-semibold text-gray-900">{visit.careWorker}</h4>
                      <p className="text-sm text-gray-600">{visit.service}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Confirmed
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {visit.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {visit.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Your Care Team */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Your Regular Care Workers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {regularCareWorkers.map((worker) => (
              <div key={worker.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{worker.name}</h4>
                        <p className="text-sm text-gray-600">{worker.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Heart className="h-4 w-4 fill-yellow-400" />
                          <span className="font-semibold">{worker.rating}</span>
                        </div>
                        <p className="text-xs text-gray-600">{worker.visitsThisMonth} visits</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <a href={`tel:${worker.phone}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <Phone className="h-4 w-4" />
                        {worker.phone}
                      </a>
                      <a href={`mailto:${worker.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <Mail className="h-4 w-4" />
                        {worker.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Call Care Coordinator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 h-4 w-4" />
                Report an Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
