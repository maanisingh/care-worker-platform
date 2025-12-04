'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  Award,
  Calendar,
  TrendingUp,
  X
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

type CareWorker = {
  id: string
  name: string
  role: string
  status: string
  phone: string
  email: string
  location: string
  rating: number
  visits: number
  clients: number
  certifications: string[]
  availability: string
  joinedDate: string
  address?: string
  emergencyContact?: string
  schedule?: { day: string; hours: string }[]
  recentVisits?: { clientName: string; date: string; duration: string }[]
  clientAssignments?: string[]
  performanceMetrics?: {
    onTimeRate: number
    completionRate: number
    clientSatisfaction: number
  }
}

const careWorkers: CareWorker[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Care Worker',
    status: 'active',
    phone: '+44 7700 900123',
    email: 'sarah.j@careplatform.com',
    location: 'North London',
    rating: 4.9,
    visits: 156,
    clients: 12,
    certifications: ['First Aid', 'Dementia Care', 'Medication Admin'],
    availability: 'Full-time',
    joinedDate: 'Jan 2022',
    address: '123 Care Street, North London, N1 2AB',
    emergencyContact: '+44 7700 900999',
    schedule: [
      { day: 'Monday', hours: '08:00 - 16:00' },
      { day: 'Tuesday', hours: '08:00 - 16:00' },
      { day: 'Wednesday', hours: '08:00 - 16:00' },
      { day: 'Thursday', hours: '08:00 - 16:00' },
      { day: 'Friday', hours: '08:00 - 16:00' }
    ],
    recentVisits: [
      { clientName: 'Margaret Thompson', date: '2024-12-04', duration: '60 min' },
      { clientName: 'Peter Johnson', date: '2024-12-03', duration: '45 min' },
      { clientName: 'Margaret Thompson', date: '2024-12-02', duration: '60 min' }
    ],
    clientAssignments: ['Margaret Thompson', 'Peter Johnson', 'Alice Davis'],
    performanceMetrics: {
      onTimeRate: 98,
      completionRate: 100,
      clientSatisfaction: 4.9
    }
  },
  {
    id: '2',
    name: 'Michael Peters',
    role: 'Care Worker',
    status: 'active',
    phone: '+44 7700 900124',
    email: 'mike.p@careplatform.com',
    location: 'East London',
    rating: 4.8,
    visits: 98,
    clients: 8,
    certifications: ['First Aid', 'Personal Care'],
    availability: 'Full-time',
    joinedDate: 'Mar 2022'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    role: 'Senior Care Worker',
    status: 'on-visit',
    phone: '+44 7700 900125',
    email: 'emma.w@careplatform.com',
    location: 'West London',
    rating: 5.0,
    visits: 203,
    clients: 15,
    certifications: ['First Aid', 'Palliative Care', 'Mental Health'],
    availability: 'Full-time',
    joinedDate: 'Oct 2021'
  },
  {
    id: '4',
    name: 'James Martinez',
    role: 'Care Worker',
    status: 'active',
    phone: '+44 7700 900126',
    email: 'james.m@careplatform.com',
    location: 'South London',
    rating: 4.7,
    visits: 145,
    clients: 11,
    certifications: ['First Aid', 'Mobility Support'],
    availability: 'Part-time',
    joinedDate: 'Jun 2022'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    role: 'Care Worker',
    status: 'off-duty',
    phone: '+44 7700 900127',
    email: 'lisa.a@careplatform.com',
    location: 'Central London',
    rating: 4.6,
    visits: 87,
    clients: 7,
    certifications: ['First Aid', 'Nutrition'],
    availability: 'Full-time',
    joinedDate: 'Aug 2022'
  },
  {
    id: '6',
    name: 'David Chen',
    role: 'Senior Care Worker',
    status: 'active',
    phone: '+44 7700 900128',
    email: 'david.c@careplatform.com',
    location: 'North London',
    rating: 4.9,
    visits: 187,
    clients: 13,
    certifications: ['First Aid', 'Diabetes Care', 'Wound Care'],
    availability: 'Full-time',
    joinedDate: 'Dec 2021'
  }
]

export default function WorkersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWorker, setSelectedWorker] = useState<CareWorker | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openWorkerDrawer = (worker: CareWorker) => {
    setSelectedWorker(worker)
    setIsDrawerOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'on-visit':
        return 'bg-blue-100 text-blue-700'
      case 'off-duty':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-3 w-3" />
      case 'on-visit':
        return <Clock className="h-3 w-3" />
      case 'off-duty':
        return <AlertCircle className="h-3 w-3" />
      default:
        return null
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Care Workers Directory</h1>
          <p className="text-gray-600 mt-1">Manage your care team and track performance</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          Add Care Worker
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workers</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">156</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
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
                  <p className="text-sm font-medium text-gray-600">On Duty</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">89</p>
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
                  <p className="text-sm font-medium text-gray-600">On Visit</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">34</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
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
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">4.8</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
                  <Star className="h-6 w-6 text-white" />
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careWorkers.map((worker) => (
          <motion.div key={worker.id} variants={itemVariants}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {worker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                      <p className="text-sm text-gray-600">{worker.role}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(worker.status)} flex items-center gap-1`}>
                    {getStatusIcon(worker.status)}
                    <span className="capitalize">{worker.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{worker.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{worker.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{worker.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{worker.visits}</p>
                    <p className="text-xs text-gray-600">Visits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{worker.clients}</p>
                    <p className="text-xs text-gray-600">Clients</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <p className="text-lg font-bold text-gray-900">{worker.rating}</p>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </div>

                {/* Certifications */}
                <div className="pt-3 border-t">
                  <p className="text-xs font-medium text-gray-600 mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-1">
                    {worker.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-3">
                  <Button
                    size="sm"
                    className="flex-1"
                    variant="outline"
                    onClick={() => openWorkerDrawer(worker)}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => openWorkerDrawer(worker)}
                  >
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Worker Detail Drawer */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 md:right-0 md:left-auto md:w-[600px] md:rounded-l-[10px] md:rounded-tr-none md:mt-0 md:h-full">
            <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4 md:hidden" />

              {selectedWorker && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0">
                        {selectedWorker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedWorker.name}</h2>
                        <p className="text-gray-600">{selectedWorker.role}</p>
                        <div className="mt-2">
                          <Badge className={`${getStatusColor(selectedWorker.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(selectedWorker.status)}
                            <span className="capitalize">{selectedWorker.status.replace('-', ' ')}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Contact Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{selectedWorker.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{selectedWorker.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{selectedWorker.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Emergency Contact</p>
                          <p className="font-medium">{selectedWorker.emergencyContact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Performance Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{selectedWorker.performanceMetrics?.onTimeRate}%</p>
                          <p className="text-xs text-gray-600 mt-1">On-Time Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{selectedWorker.performanceMetrics?.completionRate}%</p>
                          <p className="text-xs text-gray-600 mt-1">Completion</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <p className="text-2xl font-bold text-gray-900">{selectedWorker.performanceMetrics?.clientSatisfaction}</p>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Satisfaction</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedWorker.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Schedule */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Weekly Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedWorker.schedule?.map((day, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-medium text-gray-700">{day.day}</span>
                          <span className="text-gray-600">{day.hours}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Client Assignments */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Client Assignments ({selectedWorker.clientAssignments?.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedWorker.clientAssignments?.map((client, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold text-xs">
                              {client.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-gray-700">{client}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Visits */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Recent Visits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedWorker.recentVisits?.map((visit, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium text-gray-900">{visit.clientName}</p>
                            <p className="text-sm text-gray-600">{visit.date}</p>
                          </div>
                          <Badge variant="outline">{visit.duration}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Stats Summary */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">{selectedWorker.visits}</p>
                          <p className="text-sm text-gray-600">Total Visits</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-gray-900">{selectedWorker.clients}</p>
                          <p className="text-sm text-gray-600">Active Clients</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <p className="text-3xl font-bold text-gray-900">{selectedWorker.rating}</p>
                          </div>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-gray-900">{selectedWorker.availability}</p>
                          <p className="text-sm text-gray-600">Availability</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pb-4">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Worker
                    </Button>
                  </div>
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
