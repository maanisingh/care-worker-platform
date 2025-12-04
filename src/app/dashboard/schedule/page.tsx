'use client'

import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Plus,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Users,
  FileText,
  Play,
  X,
  Mail
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Drawer } from 'vaul'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

type Visit = {
  id: string
  clientName: string
  worker: string
  date: string
  time: string
  location: string
  status: string
  type: string
  phone: string
  clientAge?: number
  workerPhone?: string
  address?: string
  careTasks?: string[]
  notes?: string
  checkInTime?: string
  checkOutTime?: string
  clientConditions?: string[]
}

const visits: Visit[] = [
  {
    id: '1',
    clientName: 'Margaret Thompson',
    worker: 'Sarah Johnson',
    date: '2024-12-04',
    time: '09:00 - 10:00',
    location: 'North London',
    status: 'completed',
    type: 'Daily Care',
    phone: '+44 7700 100201',
    clientAge: 78,
    workerPhone: '+44 7700 900123',
    address: '45 Oak Avenue, North London, N2 8QB',
    careTasks: ['Morning washing assistance', 'Breakfast preparation', 'Medication administration', 'Light exercise'],
    notes: 'Client prefers morning visits. Check blood pressure before medication.',
    checkInTime: '09:02 AM',
    checkOutTime: '10:05 AM',
    clientConditions: ['Mobility Issues', 'Hypertension']
  },
  {
    id: '2',
    clientName: 'John Williams',
    worker: 'Michael Peters',
    date: '2024-12-04',
    time: '10:30 - 11:30',
    location: 'East London',
    status: 'in-progress',
    type: 'Medication Check',
    phone: '+44 7700 100202'
  },
  {
    id: '3',
    clientName: 'Elizabeth Brown',
    worker: 'Emma Wilson',
    date: '2024-12-04',
    time: '14:00 - 15:00',
    location: 'West London',
    status: 'scheduled',
    type: 'Dementia Support',
    phone: '+44 7700 100203'
  },
  {
    id: '4',
    clientName: 'Robert Davis',
    worker: 'Emma Wilson',
    date: '2024-12-04',
    time: '15:30 - 16:30',
    location: 'South London',
    status: 'scheduled',
    type: 'Palliative Care',
    phone: '+44 7700 100204'
  },
  {
    id: '5',
    clientName: 'Dorothy Miller',
    worker: 'Lisa Anderson',
    date: '2024-12-04',
    time: '11:00 - 12:00',
    location: 'Central London',
    status: 'completed',
    type: 'Nutrition Support',
    phone: '+44 7700 100205'
  },
  {
    id: '6',
    clientName: 'Peter Johnson',
    worker: 'David Chen',
    date: '2024-12-05',
    time: '09:30 - 10:30',
    location: 'North London',
    status: 'scheduled',
    type: 'Recovery Support',
    phone: '+44 7700 100206'
  },
  {
    id: '7',
    clientName: 'Margaret Thompson',
    worker: 'Sarah Johnson',
    date: '2024-12-05',
    time: '14:00 - 15:00',
    location: 'North London',
    status: 'scheduled',
    type: 'Daily Care',
    phone: '+44 7700 100201'
  },
  {
    id: '8',
    clientName: 'John Williams',
    worker: 'Michael Peters',
    date: '2024-12-05',
    time: '10:00 - 11:00',
    location: 'East London',
    status: 'scheduled',
    type: 'Medication Check',
    phone: '+44 7700 100202'
  }
]

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const today = new Date('2024-12-04')

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState('2024-12-04')
  const [viewType, setViewType] = useState<'daily' | 'weekly'>('daily')
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openVisitDrawer = (visit: Visit) => {
    setSelectedVisit(visit)
    setIsDrawerOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700'
      case 'scheduled':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'in-progress':
        return <Clock className="h-4 w-4" />
      case 'scheduled':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const todayVisits = visits.filter(v => v.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time))
  const weekVisits = visits.filter(v => {
    const date = new Date(v.date)
    const selectedWeekStart = new Date(selectedDate)
    selectedWeekStart.setDate(selectedWeekStart.getDate() - selectedWeekStart.getDay())
    const selectedWeekEnd = new Date(selectedWeekStart)
    selectedWeekEnd.setDate(selectedWeekEnd.getDate() + 6)
    return date >= selectedWeekStart && date <= selectedWeekEnd
  })

  const completedCount = todayVisits.filter(v => v.status === 'completed').length
  const inProgressCount = todayVisits.filter(v => v.status === 'in-progress').length
  const scheduledCount = todayVisits.filter(v => v.status === 'scheduled').length

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule & Calendar</h1>
          <p className="text-gray-600 mt-1">View and manage care worker schedules and visits</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          Schedule Visit
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Visits</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{todayVisits.length}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{completedCount}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{inProgressCount}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{scheduledCount}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* View Toggle */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Button
                variant={viewType === 'daily' ? 'default' : 'outline'}
                onClick={() => setViewType('daily')}
                className={viewType === 'daily' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
              >
                Daily View
              </Button>
              <Button
                variant={viewType === 'weekly' ? 'default' : 'outline'}
                onClick={() => setViewType('weekly')}
                className={viewType === 'weekly' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
              >
                Weekly View
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Visits List */}
      <div className="space-y-3">
        {(viewType === 'daily' ? todayVisits : weekVisits).map((visit) => (
          <motion.div key={visit.id} variants={itemVariants}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0 text-sm">
                        {visit.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{visit.clientName}</h3>
                          <Badge className={`${getStatusColor(visit.status)} flex items-center gap-1`}>
                            {getStatusIcon(visit.status)}
                            <span className="capitalize">{visit.status.replace('-', ' ')}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{visit.type}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{visit.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{visit.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="h-4 w-4 flex-shrink-0" />
                            <span>{visit.worker}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{visit.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openVisitDrawer(visit)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {(viewType === 'daily' ? todayVisits : weekVisits).length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No visits scheduled for this {viewType}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Visit Detail Drawer */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 md:right-0 md:left-auto md:w-[600px] md:rounded-l-[10px] md:rounded-tr-none md:mt-0 md:h-full">
            <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4 md:hidden" />

              {selectedVisit && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedVisit.type}</h2>
                        <Badge className={`${getStatusColor(selectedVisit.status)} flex items-center gap-1`}>
                          {getStatusIcon(selectedVisit.status)}
                          <span className="capitalize">{selectedVisit.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600">{selectedVisit.date} • {selectedVisit.time}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Client Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Client Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold">
                          {selectedVisit.clientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{selectedVisit.clientName}</p>
                          <p className="text-sm text-gray-600">{selectedVisit.clientAge} years old</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedVisit.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{selectedVisit.address}</p>
                        </div>
                      </div>
                      {selectedVisit.clientConditions && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Medical Conditions</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedVisit.clientConditions.map((condition, index) => (
                              <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Worker Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Assigned Worker
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {selectedVisit.worker.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{selectedVisit.worker}</p>
                          <p className="text-sm text-gray-600">Care Worker</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedVisit.workerPhone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Visit Details */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Visit Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Scheduled Time</p>
                          <p className="font-medium">{selectedVisit.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Visit Type</p>
                          <p className="font-medium">{selectedVisit.type}</p>
                        </div>
                      </div>
                      {selectedVisit.checkInTime && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Check-in Time</p>
                            <p className="font-medium text-green-600">{selectedVisit.checkInTime}</p>
                          </div>
                          {selectedVisit.checkOutTime && (
                            <div>
                              <p className="text-sm text-gray-600">Check-out Time</p>
                              <p className="font-medium text-blue-600">{selectedVisit.checkOutTime}</p>
                            </div>
                          )}
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{selectedVisit.location}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Care Tasks */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Care Tasks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedVisit.careTasks?.map((task, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  {selectedVisit.notes && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Visit Notes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 italic">"{selectedVisit.notes}"</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3 pb-4">
                    {selectedVisit.status === 'scheduled' && (
                      <Button className="w-full bg-gradient-to-r from-green-600 to-green-700" size="lg">
                        <Play className="mr-2 h-5 w-5" />
                        Start Visit
                      </Button>
                    )}
                    {selectedVisit.status === 'in-progress' && (
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" size="lg">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Complete Visit
                      </Button>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Client
                      </Button>
                      <Button variant="outline">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Worker
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </motion.div>
  )
}
