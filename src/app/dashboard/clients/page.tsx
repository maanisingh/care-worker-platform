'use client'

import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  AlertCircle,
  ChevronRight,
  Users,
  FileText,
  Pill,
  Clock,
  User,
  Edit,
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

type Client = {
  id: string
  name: string
  age: number
  status: string
  phone: string
  email: string
  location: string
  carePlan: string
  assignedWorker: string
  visits: number
  lastVisit: string
  conditions: string[]
  notes: string
  address?: string
  emergencyContact?: { name: string; phone: string; relationship: string }
  medications?: { name: string; dosage: string; frequency: string }[]
  medicalHistory?: string[]
  assignedWorkers?: string[]
  visitSchedule?: { day: string; time: string; worker: string }[]
  familyContacts?: { name: string; relationship: string; phone: string }[]
}

const clients: Client[] = [
  {
    id: '1',
    name: 'Margaret Thompson',
    age: 78,
    status: 'active',
    phone: '+44 7700 100201',
    email: 'margaret.t@email.com',
    location: 'North London',
    carePlan: 'Daily Care & Mobility',
    assignedWorker: 'Sarah Johnson',
    visits: 28,
    lastVisit: '2 hours ago',
    conditions: ['Mobility Issues', 'Hypertension'],
    notes: 'Prefers morning visits. Requires assistance with washing.',
    address: '45 Oak Avenue, North London, N2 8QB',
    emergencyContact: { name: 'David Thompson', phone: '+44 7700 100999', relationship: 'Son' },
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'As needed' }
    ],
    medicalHistory: ['Hip replacement (2020)', 'Hypertension diagnosed (2015)', 'Fall incident (2023)'],
    assignedWorkers: ['Sarah Johnson', 'Emma Wilson'],
    visitSchedule: [
      { day: 'Monday', time: '09:00 AM', worker: 'Sarah Johnson' },
      { day: 'Wednesday', time: '09:00 AM', worker: 'Sarah Johnson' },
      { day: 'Friday', time: '09:00 AM', worker: 'Emma Wilson' }
    ],
    familyContacts: [
      { name: 'David Thompson', relationship: 'Son', phone: '+44 7700 100999' },
      { name: 'Sarah Thompson', relationship: 'Daughter', phone: '+44 7700 100998' }
    ]
  },
  {
    id: '2',
    name: 'John Williams',
    age: 82,
    status: 'active',
    phone: '+44 7700 100202',
    email: 'john.w@email.com',
    location: 'East London',
    carePlan: 'Medication Management',
    assignedWorker: 'Michael Peters',
    visits: 45,
    lastVisit: 'Yesterday',
    conditions: ['Diabetes', 'Heart Condition'],
    notes: 'Takes multiple medications. Daily health checks required.'
  },
  {
    id: '3',
    name: 'Elizabeth Brown',
    age: 75,
    status: 'inactive',
    phone: '+44 7700 100203',
    email: 'elizabeth.b@email.com',
    location: 'West London',
    carePlan: 'Dementia Care Support',
    assignedWorker: 'Emma Wilson',
    visits: 52,
    lastVisit: '1 month ago',
    conditions: ['Early Dementia', 'Arthritis'],
    notes: 'Requires supervised activities. Family visits on weekends.'
  },
  {
    id: '4',
    name: 'Robert Davis',
    age: 88,
    status: 'active',
    phone: '+44 7700 100204',
    email: 'robert.d@email.com',
    location: 'South London',
    carePlan: 'Palliative Care',
    assignedWorker: 'Emma Wilson',
    visits: 18,
    lastVisit: 'Today',
    conditions: ['End-of-Life Care'],
    notes: 'Comfort-focused care. Family frequently present.'
  },
  {
    id: '5',
    name: 'Dorothy Miller',
    age: 80,
    status: 'active',
    phone: '+44 7700 100205',
    email: 'dorothy.m@email.com',
    location: 'Central London',
    carePlan: 'Nutrition Support',
    assignedWorker: 'Lisa Anderson',
    visits: 35,
    lastVisit: '3 days ago',
    conditions: ['Swallowing Difficulty', 'Weight Loss'],
    notes: 'Specialist diet. Thickened fluids required.'
  },
  {
    id: '6',
    name: 'Peter Johnson',
    age: 76,
    status: 'active',
    phone: '+44 7700 100206',
    email: 'peter.j@email.com',
    location: 'North London',
    carePlan: 'Recovery Support',
    assignedWorker: 'David Chen',
    visits: 22,
    lastVisit: '1 week ago',
    conditions: ['Post-Surgery Recovery'],
    notes: 'Rehabilitation exercises. Monitor for infection.'
  }
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openClientDrawer = (client: Client) => {
    setSelectedClient(client)
    setIsDrawerOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'inactive':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = clients.filter(c => c.status === 'active').length
  const totalVisits = clients.reduce((sum, c) => sum + c.visits, 0)

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
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">View and manage client profiles, care plans, and visit history</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          Add Client
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{clients.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{activeCount}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
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
                  <p className="text-sm font-medium text-gray-600">Total Visits</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalVisits}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
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
                  <p className="text-sm font-medium text-gray-600">Avg Age</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {Math.round(clients.reduce((sum, c) => sum + c.age, 0) / clients.length)}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-white" />
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
                  placeholder="Search by name or location..."
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

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <motion.div key={client.id} variants={itemVariants}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.age} years old</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{client.location}</span>
                  </div>
                </div>

                {/* Care Plan */}
                <div className="pt-3 border-t">
                  <p className="text-xs font-medium text-gray-600 mb-2">Care Plan</p>
                  <p className="text-sm font-semibold text-gray-900">{client.carePlan}</p>
                </div>

                {/* Conditions */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Medical Conditions</p>
                  <div className="flex flex-wrap gap-1">
                    {client.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{client.visits}</p>
                    <p className="text-xs text-gray-600">Total Visits</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{client.lastVisit}</p>
                    <p className="text-xs text-gray-600">Last Visit</p>
                  </div>
                </div>

                {/* Actions */}
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => openClientDrawer(client)}
                >
                  View Profile
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Client Detail Drawer */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 md:right-0 md:left-auto md:w-[600px] md:rounded-l-[10px] md:rounded-tr-none md:mt-0 md:h-full">
            <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4 md:hidden" />

              {selectedClient && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0">
                        {selectedClient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h2>
                        <p className="text-gray-600">{selectedClient.age} years old</p>
                        <div className="mt-2">
                          <Badge className={getStatusColor(selectedClient.status)}>
                            {selectedClient.status === 'active' ? 'Active' : 'Inactive'}
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
                          <p className="font-medium">{selectedClient.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{selectedClient.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{selectedClient.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Emergency Contact */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Emergency Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedClient.emergencyContact?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Relationship:</span>
                        <span className="font-medium">{selectedClient.emergencyContact?.relationship}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedClient.emergencyContact?.phone}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Care Plan */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Care Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-lg text-gray-900 mb-2">{selectedClient.carePlan}</p>
                      <p className="text-sm text-gray-600 italic">{selectedClient.notes}</p>
                    </CardContent>
                  </Card>

                  {/* Medical Conditions */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Medical Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.conditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Medications */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Pill className="h-5 w-5" />
                        Medications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedClient.medications?.map((med, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-semibold text-gray-900">{med.name}</p>
                          <div className="flex justify-between mt-1 text-sm">
                            <span className="text-gray-600">Dosage: {med.dosage}</span>
                            <span className="text-gray-600">{med.frequency}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Medical History */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Medical History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedClient.medicalHistory?.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Assigned Workers */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Assigned Workers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedClient.assignedWorkers?.map((worker, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                              {worker.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-gray-700">{worker}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Visit Schedule */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Visit Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedClient.visitSchedule?.map((visit, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded">
                          <div>
                            <p className="font-medium text-gray-900">{visit.day}</p>
                            <p className="text-sm text-gray-600">{visit.time}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{visit.worker}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Family Contacts */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Family Contacts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedClient.familyContacts?.map((contact, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.relationship}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-700">{contact.phone}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Stats Summary */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">{selectedClient.visits}</p>
                          <p className="text-sm text-gray-600">Total Visits</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">{selectedClient.lastVisit}</p>
                          <p className="text-sm text-gray-600">Last Visit</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pb-4">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Client
                    </Button>
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
