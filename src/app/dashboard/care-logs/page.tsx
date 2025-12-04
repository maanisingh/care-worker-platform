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
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

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

const careLogs = [
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
    type: 'Daily Care'
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
                  <Button size="sm" variant="ghost">
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
    </motion.div>
  )
}
