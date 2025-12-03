'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  Navigation,
  CheckCircle2,
  AlertCircle,
  User,
  ClipboardList,
  Heart,
  Star
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

export function CareWorkerDashboard() {
  const todaysVisits = [
    {
      id: '1',
      client: 'Mrs. Margaret Smith',
      time: '09:00 - 10:00',
      address: '42 Oak Street, London',
      type: 'Personal Care',
      status: 'upcoming',
      priority: 'normal',
      notes: 'Medication reminder at 9:30am'
    },
    {
      id: '2',
      client: 'Mr. John Davis',
      time: '10:30 - 11:30',
      address: '15 Maple Avenue, London',
      type: 'Meal Preparation',
      status: 'upcoming',
      priority: 'normal'
    },
    {
      id: '3',
      client: 'Ms. Sarah Brown',
      time: '12:00 - 13:00',
      address: '28 Elm Road, London',
      type: 'Personal Care & Medication',
      status: 'upcoming',
      priority: 'high',
      notes: 'Diabetes medication - check blood sugar'
    },
    {
      id: '4',
      client: 'Mrs. Emily Taylor',
      time: '14:00 - 15:00',
      address: '91 Pine Street, London',
      type: 'Companionship',
      status: 'upcoming',
      priority: 'normal'
    },
  ]

  const quickStats = [
    { label: 'Today\'s Visits', value: '6', icon: Calendar, color: 'text-blue-600' },
    { label: 'Completed', value: '2', icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Upcoming', value: '4', icon: Clock, color: 'text-orange-600' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'text-yellow-600' },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-24 md:pb-6"
    >
      {/* Header with Greeting */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 text-white shadow-lg">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-90">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
          <h1 className="text-3xl font-bold mt-1">Good Morning, Sarah! 👋</h1>
          <p className="text-sm opacity-90 mt-2">
            You have 6 visits scheduled for today. Let's make it a great day!
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Heart className="h-40 w-40" />
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-gray-100 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Today's Schedule */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Today's Schedule</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Your visits for today</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                4 Remaining
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysVisits.map((visit) => (
              <motion.div
                key={visit.id}
                whileHover={{ scale: 1.02 }}
                className={`p-5 rounded-xl border-2 ${
                  visit.priority === 'high'
                    ? 'border-orange-200 bg-orange-50'
                    : 'border-gray-200 bg-white'
                } hover:shadow-md transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {visit.client.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{visit.client}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{visit.time}</span>
                      </div>
                    </div>
                  </div>
                  {visit.priority === 'high' && (
                    <Badge className="bg-orange-600">Priority</Badge>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{visit.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ClipboardList className="h-4 w-4 flex-shrink-0" />
                    <span>{visit.type}</span>
                  </div>
                  {visit.notes && (
                    <div className="flex items-start space-x-2 text-sm">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-600" />
                      <span className="text-orange-700 font-medium">{visit.notes}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Navigation className="mr-2 h-4 w-4" />
                    Navigate
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-auto py-4 flex-col space-y-2 bg-gradient-to-br from-green-600 to-green-700">
                <CheckCircle2 className="h-6 w-6" />
                <span>Start Visit</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
                <ClipboardList className="h-6 w-6" />
                <span>Care Log</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
                <AlertCircle className="h-6 w-6" />
                <span>Report Incident</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span>My Schedule</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
