'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import {
  Pill,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Plus,
  Search,
  Filter,
  XCircle,
  Bell,
  History
} from 'lucide-react'

type MedicationSchedule = {
  id: string
  clientName: string
  medicationName: string
  dosage: string
  time: string
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'night'
  status: 'pending' | 'administered' | 'missed' | 'refused'
  administeredBy?: string
  administeredAt?: string
  notes?: string
}

type MedicationHistory = {
  id: string
  clientName: string
  medicationName: string
  dosage: string
  administeredBy: string
  administeredAt: string
  notes?: string
}

const mockMedicationSchedule: MedicationSchedule[] = [
  {
    id: '1',
    clientName: 'Margaret Thompson',
    medicationName: 'Amlodipine',
    dosage: '5mg',
    time: '08:00',
    timeSlot: 'morning',
    status: 'administered',
    administeredBy: 'Sarah Johnson',
    administeredAt: '2024-12-05 08:15',
    notes: 'Taken with breakfast'
  },
  {
    id: '2',
    clientName: 'Margaret Thompson',
    medicationName: 'Metformin',
    dosage: '500mg',
    time: '08:00',
    timeSlot: 'morning',
    status: 'administered',
    administeredBy: 'Sarah Johnson',
    administeredAt: '2024-12-05 08:15'
  },
  {
    id: '3',
    clientName: 'John Williams',
    medicationName: 'Warfarin',
    dosage: '2mg',
    time: '09:00',
    timeSlot: 'morning',
    status: 'pending'
  },
  {
    id: '4',
    clientName: 'Elizabeth Brown',
    medicationName: 'Donepezil',
    dosage: '10mg',
    time: '09:30',
    timeSlot: 'morning',
    status: 'pending'
  },
  {
    id: '5',
    clientName: 'Robert Davis',
    medicationName: 'Morphine',
    dosage: '10mg',
    time: '10:00',
    timeSlot: 'morning',
    status: 'pending'
  },
  {
    id: '6',
    clientName: 'Margaret Thompson',
    medicationName: 'Amlodipine',
    dosage: '5mg',
    time: '14:00',
    timeSlot: 'afternoon',
    status: 'pending'
  },
  {
    id: '7',
    clientName: 'John Williams',
    medicationName: 'Aspirin',
    dosage: '75mg',
    time: '14:30',
    timeSlot: 'afternoon',
    status: 'pending'
  },
  {
    id: '8',
    clientName: 'Elizabeth Brown',
    medicationName: 'Memantine',
    dosage: '10mg',
    time: '18:00',
    timeSlot: 'evening',
    status: 'pending'
  },
  {
    id: '9',
    clientName: 'Dorothy Miller',
    medicationName: 'Vitamin D',
    dosage: '1000IU',
    time: '19:00',
    timeSlot: 'evening',
    status: 'pending'
  }
]

const mockMedicationHistory: MedicationHistory[] = [
  {
    id: 'h1',
    clientName: 'Margaret Thompson',
    medicationName: 'Amlodipine',
    dosage: '5mg',
    administeredBy: 'Sarah Johnson',
    administeredAt: '2024-12-04 08:10',
    notes: 'No issues reported'
  },
  {
    id: 'h2',
    clientName: 'John Williams',
    medicationName: 'Warfarin',
    dosage: '2mg',
    administeredBy: 'Michael Peters',
    administeredAt: '2024-12-04 09:05'
  },
  {
    id: 'h3',
    clientName: 'Elizabeth Brown',
    medicationName: 'Donepezil',
    dosage: '10mg',
    administeredBy: 'Emma Wilson',
    administeredAt: '2024-12-04 09:35',
    notes: 'Client was in good spirits'
  }
]

export default function MedicationPage() {
  const [schedule, setSchedule] = useState(mockMedicationSchedule)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTimeSlot, setFilterTimeSlot] = useState<string>('all')
  const [selectedMed, setSelectedMed] = useState<MedicationSchedule | null>(null)
  const [adminNotes, setAdminNotes] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'administered':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'missed':
        return 'bg-red-100 text-red-700'
      case 'refused':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'administered':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'missed':
        return <XCircle className="h-4 w-4" />
      case 'refused':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTimeSlotIcon = (timeSlot: string) => {
    return <Clock className="h-4 w-4" />
  }

  const filteredSchedule = schedule.filter(med => {
    const matchesSearch = med.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.medicationName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterTimeSlot === 'all' || med.timeSlot === filterTimeSlot
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: schedule.length,
    administered: schedule.filter(m => m.status === 'administered').length,
    pending: schedule.filter(m => m.status === 'pending').length,
    missed: schedule.filter(m => m.status === 'missed').length
  }

  const administerMedication = (id: string, status: 'administered' | 'refused' | 'missed') => {
    setSchedule(schedule.map(med =>
      med.id === id
        ? {
            ...med,
            status,
            administeredBy: status === 'administered' ? 'Sarah Johnson' : undefined,
            administeredAt: status === 'administered' ? new Date().toISOString() : undefined,
            notes: adminNotes || undefined
          }
        : med
    ))
    setSelectedMed(null)
    setAdminNotes('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medication Administration</h1>
          <p className="text-gray-600 mt-1">Manage medication schedules and track administration</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          Add Medication
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Today</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Pill className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Administered</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.administered}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Missed/Alerts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.missed}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by client or medication name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'morning', 'afternoon', 'evening', 'night'].map((slot) => (
                <Button
                  key={slot}
                  variant={filterTimeSlot === slot ? 'default' : 'outline'}
                  onClick={() => setFilterTimeSlot(slot)}
                  className={filterTimeSlot === slot ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                >
                  {slot.charAt(0).toUpperCase() + slot.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medication Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </h2>
          {filteredSchedule.map((med) => (
            <Card key={med.id} className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {med.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{med.clientName}</h3>
                        <p className="text-sm text-gray-600">{med.time}</p>
                      </div>
                    </div>

                    <div className="ml-12 space-y-1">
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{med.medicationName}</span>
                        <Badge variant="outline" className="text-xs">{med.dosage}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="capitalize">{med.timeSlot}</span>
                      </div>
                      {med.administeredBy && (
                        <div className="text-sm text-gray-600">
                          Administered by {med.administeredBy} at {new Date(med.administeredAt!).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                      {med.notes && (
                        <p className="text-sm text-gray-600 italic">{med.notes}</p>
                      )}
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(med.status)} flex items-center gap-1`}>
                    {getStatusIcon(med.status)}
                    <span className="capitalize">{med.status}</span>
                  </Badge>
                </div>

                {med.status === 'pending' && (
                  <div className="flex gap-2 mt-3 ml-12">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-green-700"
                      onClick={() => setSelectedMed(med)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Administer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => administerMedication(med.id, 'refused')}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Refused
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => administerMedication(med.id, 'missed')}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Missed
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Administration Form or History */}
        <div className="space-y-4">
          {selectedMed ? (
            <Card className="border-0 shadow-md sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Administer Medication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedMed.clientName}</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><span className="font-medium">Medication:</span> {selectedMed.medicationName}</p>
                    <p><span className="font-medium">Dosage:</span> {selectedMed.dosage}</p>
                    <p><span className="font-medium">Scheduled Time:</span> {selectedMed.time}</p>
                    <p><span className="font-medium">Time Slot:</span> <span className="capitalize">{selectedMed.timeSlot}</span></p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Administration Notes
                  </label>
                  <Textarea
                    placeholder="Any observations or notes..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700"
                    onClick={() => administerMedication(selectedMed.id, 'administered')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Administration
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedMed(null)
                      setAdminNotes('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMedicationHistory.map((history) => (
                    <div key={history.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{history.clientName}</h4>
                          <p className="text-sm text-gray-600">{history.medicationName} - {history.dosage}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        <p>By {history.administeredBy}</p>
                        <p>{new Date(history.administeredAt).toLocaleString('en-GB')}</p>
                        {history.notes && <p className="mt-1 italic">{history.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  )
}
