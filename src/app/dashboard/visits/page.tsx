'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CheckSquare,
  Clock,
  User,
  MapPin,
  Calendar,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Check,
  X,
  Phone,
  Navigation
} from 'lucide-react'

type Visit = {
  id: string
  clientName: string
  worker: string
  address: string
  time: string
  date: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'pending-confirmation'
  tasks: { id: string; title: string; completed: boolean; required: boolean }[]
  duration: string
  notes?: string
}

const mockVisits: Visit[] = [
  {
    id: '1',
    clientName: 'Margaret Thompson',
    worker: 'Sarah Johnson',
    address: '45 Oak Avenue, North London',
    time: '09:00 AM',
    date: '2024-12-05',
    status: 'in-progress',
    duration: '60 min',
    tasks: [
      { id: 't1', title: 'Morning washing assistance', completed: true, required: true },
      { id: 't2', title: 'Breakfast preparation', completed: true, required: true },
      { id: 't3', title: 'Medication administration', completed: false, required: true },
      { id: 't4', title: 'Light exercise', completed: false, required: false }
    ],
    notes: 'Check blood pressure before medication'
  },
  {
    id: '2',
    clientName: 'John Williams',
    worker: 'Michael Peters',
    address: '23 High Street, East London',
    time: '10:30 AM',
    date: '2024-12-05',
    status: 'scheduled',
    duration: '45 min',
    tasks: [
      { id: 't5', title: 'Medication check', completed: false, required: true },
      { id: 't6', title: 'Blood pressure monitoring', completed: false, required: true },
      { id: 't7', title: 'Health check discussion', completed: false, required: false }
    ]
  },
  {
    id: '3',
    clientName: 'Elizabeth Brown',
    worker: 'Emma Wilson',
    address: '78 Park Road, West London',
    time: '02:00 PM',
    date: '2024-12-05',
    status: 'pending-confirmation',
    duration: '60 min',
    tasks: [
      { id: 't8', title: 'Dementia care activities', completed: false, required: true },
      { id: 't9', title: 'Lunch preparation', completed: false, required: true },
      { id: 't10', title: 'Social engagement', completed: false, required: false }
    ]
  },
  {
    id: '4',
    clientName: 'Robert Davis',
    worker: 'Emma Wilson',
    address: '12 Garden Lane, South London',
    time: '03:30 PM',
    date: '2024-12-05',
    status: 'scheduled',
    duration: '90 min',
    tasks: [
      { id: 't11', title: 'Palliative care support', completed: false, required: true },
      { id: 't12', title: 'Comfort monitoring', completed: false, required: true },
      { id: 't13', title: 'Family liaison', completed: false, required: false }
    ]
  },
  {
    id: '5',
    clientName: 'Dorothy Miller',
    worker: 'Lisa Anderson',
    address: '56 Main Street, Central London',
    time: '08:00 AM',
    date: '2024-12-05',
    status: 'completed',
    duration: '45 min',
    tasks: [
      { id: 't14', title: 'Breakfast preparation', completed: true, required: true },
      { id: 't15', title: 'Nutrition support', completed: true, required: true },
      { id: 't16', title: 'Hydration monitoring', completed: true, required: true }
    ]
  }
]

export default function VisitsAndTasksPage() {
  const [visits, setVisits] = useState(mockVisits)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700'
      case 'scheduled':
        return 'bg-purple-100 text-purple-700'
      case 'pending-confirmation':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'in-progress':
        return <Play className="h-4 w-4" />
      case 'scheduled':
        return <Clock className="h-4 w-4" />
      case 'pending-confirmation':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.worker.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || visit.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: visits.length,
    completed: visits.filter(v => v.status === 'completed').length,
    inProgress: visits.filter(v => v.status === 'in-progress').length,
    pending: visits.filter(v => v.status === 'pending-confirmation').length
  }

  const toggleTask = (visitId: string, taskId: string) => {
    setVisits(visits.map(visit => {
      if (visit.id === visitId) {
        return {
          ...visit,
          tasks: visit.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        }
      }
      return visit
    }))
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
          <h1 className="text-3xl font-bold text-gray-900">Visits & Tasks</h1>
          <p className="text-gray-600 mt-1">Real-time visit tracking and task management</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          Schedule New Visit
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visits</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.inProgress}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completed}</p>
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
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                <AlertCircle className="h-6 w-6 text-white" />
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
                placeholder="Search by client or worker name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'scheduled', 'in-progress', 'pending-confirmation', 'completed'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  onClick={() => setFilterStatus(status)}
                  className={filterStatus === status ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                >
                  {status === 'all' ? 'All' : status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visits List */}
      <div className="space-y-4">
        {filteredVisits.map((visit) => (
          <Card key={visit.id} className="border-0 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold">
                      {visit.clientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{visit.clientName}</h3>
                      <p className="text-sm text-gray-600">Care Worker: {visit.worker}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{visit.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{visit.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{visit.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{visit.duration}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${getStatusColor(visit.status)} flex items-center gap-1`}>
                  {getStatusIcon(visit.status)}
                  <span className="capitalize">{visit.status.replace('-', ' ')}</span>
                </Badge>
              </div>

              {/* Tasks Checklist */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  Tasks ({visit.tasks.filter(t => t.completed).length}/{visit.tasks.length})
                </h4>
                <div className="space-y-2">
                  {visit.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors">
                      <button
                        onClick={() => toggleTask(visit.id, task.id)}
                        className={`flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                          task.completed
                            ? 'bg-green-600 border-green-600'
                            : 'border-gray-300 hover:border-green-600'
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3 text-white" />}
                      </button>
                      <span className={`flex-1 text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {task.title}
                      </span>
                      {task.required && (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          Required
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {visit.notes && (
                <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-600 rounded">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Note:</span> {visit.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Client
                </Button>
                <Button variant="outline" size="sm">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
                {visit.status === 'pending-confirmation' && (
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700">
                    <Check className="h-4 w-4 mr-2" />
                    Confirm Visit
                  </Button>
                )}
                {visit.status === 'scheduled' && (
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Play className="h-4 w-4 mr-2" />
                    Start Visit
                  </Button>
                )}
                {visit.status === 'in-progress' && (
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Visit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVisits.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <CheckSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No visits found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
