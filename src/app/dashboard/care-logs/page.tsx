'use client'

import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Plus,
  User,
  Calendar,
  Clock,
  FileText,
  ChevronRight,
  Activity,
  CheckCircle,
  AlertCircle,
  Heart,
  Thermometer,
  Droplet,
  Image,
  X,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

type CareLog = {
  id: string
  clientName: string
  worker: string
  date: string
  time?: string
  status: string
  activities: string[]
  notes: string
  duration: number
  type: string
  vitals?: {
    bloodPressure?: string
    heartRate?: number
    temperature?: number
    oxygenLevel?: number
  }
  medicationsGiven?: { name: string; time: string; dosage: string }[]
  photos?: string[]
  workerSignature?: string
  clientFeedback?: string
}

const careLogs: CareLog[] = [
  {
    id: '1',
    clientName: 'Margaret Thompson',
    worker: 'Sarah Johnson',
    date: '2024-12-04',
    time: '10:00',
    status: 'approved',
    activities: ['Morning washing', 'Breakfast assistance', 'Medication given'],
    notes: 'Client in good mood. Took all medications without issue. Vitals stable.',
    duration: 60,
    type: 'Daily Care',
    vitals: {
      bloodPressure: '128/82',
      heartRate: 72,
      temperature: 36.8,
      oxygenLevel: 98
    },
    medicationsGiven: [
      { name: 'Amlodipine', time: '09:15', dosage: '5mg' },
      { name: 'Paracetamol', time: '09:15', dosage: '500mg' }
    ],
    photos: [],
    workerSignature: 'Sarah Johnson',
    clientFeedback: 'Very satisfied with care today. Sarah was very helpful.'
  },
  {
    id: '2',
    clientName: 'John Williams',
    worker: 'Michael Peters',
    date: '2024-12-04',
    time: '11:30',
    status: 'approved',
    activities: ['Blood glucose check', 'Medication review', 'Health monitoring'],
    notes: 'Blood glucose 156 mg/dL. Doctor informed. Adjusted diet recommended.',
    duration: 45,
    type: 'Medication Check'
  },
  {
    id: '3',
    clientName: 'Dorothy Miller',
    worker: 'Lisa Anderson',
    date: '2024-12-04',
    time: '12:00',
    status: 'pending',
    activities: ['Thickened fluid preparation', 'Nutrition monitoring', 'Hydration check'],
    notes: 'Client ate well at lunch. Drinking thickened fluids as required.',
    duration: 30,
    type: 'Nutrition Support'
  },
  {
    id: '4',
    clientName: 'Robert Davis',
    worker: 'Emma Wilson',
    date: '2024-12-04',
    time: '16:00',
    status: 'approved',
    activities: ['Pain management', 'Comfort care', 'Family support'],
    notes: 'Client comfortable. Medication effective. Family present during visit.',
    duration: 90,
    type: 'Palliative Care'
  },
  {
    id: '5',
    clientName: 'Elizabeth Brown',
    worker: 'Emma Wilson',
    date: '2024-12-03',
    status: 'pending',
    activities: ['Memory activities', 'Socialization', 'Light exercise'],
    notes: 'Engaged well with activities. Some confusion about time. Redirected successfully.',
    duration: 60,
    type: 'Dementia Support'
  },
  {
    id: '6',
    clientName: 'Peter Johnson',
    worker: 'David Chen',
    date: '2024-12-03',
    status: 'approved',
    activities: ['Wound dressing change', 'Mobility exercises', 'Progress assessment'],
    notes: 'Wound healing well. No signs of infection. Range of motion improving.',
    duration: 45,
    type: 'Recovery Support'
  }
]

export default function CareLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all')
  const [selectedLog, setSelectedLog] = useState<CareLog | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openLogDrawer = (log: CareLog) => {
    setSelectedLog(log)
    setIsDrawerOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const filteredLogs = careLogs.filter(log => {
    const matchesSearch = log.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.worker.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const approvedCount = careLogs.filter(l => l.status === 'approved').length
  const pendingCount = careLogs.filter(l => l.status === 'pending').length
  const totalLogs = careLogs.length

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
          <h1 className="text-3xl font-bold text-gray-900">Care Logs</h1>
          <p className="text-gray-600 mt-1">View, manage, and analyze care logs submitted by care workers</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          New Log
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Logs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalLogs}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
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
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{approvedCount}</p>
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
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-white" />
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
                  <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalLogs > 0 ? Math.round((approvedCount / totalLogs) * 100) : 0}%
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by client or worker name..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'approved' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('approved')}
                  className={filterStatus === 'approved' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                >
                  Approved
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('pending')}
                  className={filterStatus === 'pending' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                >
                  Pending
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Care Logs List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <motion.div key={log.id} variants={itemVariants}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-semibold flex-shrink-0 text-sm">
                        {log.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{log.clientName}</h3>
                            <p className="text-sm text-gray-600">{log.type}</p>
                          </div>
                          <Badge className={`${getStatusColor(log.status)} flex items-center gap-1`}>
                            {getStatusIcon(log.status)}
                            <span className="capitalize">{log.status}</span>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 pt-2 border-t">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="h-4 w-4 flex-shrink-0" />
                            <span>{log.worker}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span>{log.date}</span>
                          </div>
                          {log.time && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span>{log.time}</span>
                            </div>
                          )}
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">{log.duration}</span> min
                          </div>
                        </div>

                        {/* Activities */}
                        <div className="mb-2">
                          <p className="text-xs font-medium text-gray-600 mb-1">Activities:</p>
                          <div className="flex flex-wrap gap-1">
                            {log.activities.map((activity, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Notes */}
                        <p className="text-sm text-gray-600 italic">"{log.notes}"</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openLogDrawer(log)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No care logs found</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Care Log Detail Drawer */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 md:right-0 md:left-auto md:w-[600px] md:rounded-l-[10px] md:rounded-tr-none md:mt-0 md:h-full">
            <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4 md:hidden" />

              {selectedLog && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">Care Log Details</h2>
                        <Badge className={`${getStatusColor(selectedLog.status)} flex items-center gap-1`}>
                          {getStatusIcon(selectedLog.status)}
                          <span className="capitalize">{selectedLog.status}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600">{selectedLog.type}</p>
                      <p className="text-sm text-gray-500">{selectedLog.date} {selectedLog.time && `• ${selectedLog.time}`}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Client & Worker Info */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Client</p>
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold text-xs">
                              {selectedLog.clientName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <p className="font-medium text-gray-900">{selectedLog.clientName}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Care Worker</p>
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                              {selectedLog.worker.split(' ').map(n => n[0]).join('')}
                            </div>
                            <p className="font-medium text-gray-900">{selectedLog.worker}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-lg text-gray-900">{selectedLog.duration} minutes</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activities Completed */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Activities Completed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedLog.activities.map((activity, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Vitals Recorded */}
                  {selectedLog.vitals && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Heart className="h-5 w-5" />
                          Vitals Recorded
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedLog.vitals.bloodPressure && (
                            <div className="p-3 bg-red-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Heart className="h-4 w-4 text-red-600" />
                                <p className="text-xs text-gray-600">Blood Pressure</p>
                              </div>
                              <p className="font-bold text-lg text-gray-900">{selectedLog.vitals.bloodPressure}</p>
                              <p className="text-xs text-gray-500">mmHg</p>
                            </div>
                          )}
                          {selectedLog.vitals.heartRate && (
                            <div className="p-3 bg-pink-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Activity className="h-4 w-4 text-pink-600" />
                                <p className="text-xs text-gray-600">Heart Rate</p>
                              </div>
                              <p className="font-bold text-lg text-gray-900">{selectedLog.vitals.heartRate}</p>
                              <p className="text-xs text-gray-500">bpm</p>
                            </div>
                          )}
                          {selectedLog.vitals.temperature && (
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Thermometer className="h-4 w-4 text-orange-600" />
                                <p className="text-xs text-gray-600">Temperature</p>
                              </div>
                              <p className="font-bold text-lg text-gray-900">{selectedLog.vitals.temperature}°C</p>
                              <p className="text-xs text-gray-500">celsius</p>
                            </div>
                          )}
                          {selectedLog.vitals.oxygenLevel && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Droplet className="h-4 w-4 text-blue-600" />
                                <p className="text-xs text-gray-600">Oxygen Level</p>
                              </div>
                              <p className="font-bold text-lg text-gray-900">{selectedLog.vitals.oxygenLevel}%</p>
                              <p className="text-xs text-gray-500">SpO2</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Medications Given */}
                  {selectedLog.medicationsGiven && selectedLog.medicationsGiven.length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Medications Administered
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {selectedLog.medicationsGiven.map((med, index) => (
                          <div key={index} className="p-3 bg-purple-50 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-gray-900">{med.name}</p>
                                <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                              </div>
                              <Badge variant="outline" className="bg-white">
                                {med.time}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Notes */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Care Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 italic">"{selectedLog.notes}"</p>
                    </CardContent>
                  </Card>

                  {/* Client Feedback */}
                  {selectedLog.clientFeedback && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Client Feedback
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">"{selectedLog.clientFeedback}"</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Photos Placeholder */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Image className="h-5 w-5" />
                        Photos & Documentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">No photos attached</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Signature */}
                  {selectedLog.workerSignature && (
                    <Card className="border-0 shadow-sm">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600 mb-2">Signed by:</p>
                        <p className="font-semibold text-gray-900 text-lg italic">{selectedLog.workerSignature}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  {selectedLog.status === 'pending' && (
                    <div className="flex space-x-3 pb-4">
                      <Button className="flex-1 bg-gradient-to-r from-green-600 to-green-700">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Approve Log
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-red-600 to-red-700">
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Reject Log
                      </Button>
                    </div>
                  )}
                  {selectedLog.status === 'approved' && (
                    <div className="pb-4">
                      <Badge className="bg-green-100 text-green-700 text-sm py-2 px-4">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        This care log has been approved
                      </Badge>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Mobile FAB */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="md:hidden fixed bottom-20 right-4 z-40"
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
