'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  User,
  MapPin,
  Clock,
  CheckCircle,
  Camera,
  FileText,
  Phone,
  Navigation,
  Calendar,
  AlertCircle,
  Check,
  PlayCircle,
  StopCircle,
  Upload
} from 'lucide-react'

type Task = {
  id: string
  title: string
  completed: boolean
  required: boolean
  notes?: string
}

type Photo = {
  id: string
  url: string
  caption: string
  timestamp: string
}

export default function VisitDetailPage() {
  const [checkInTime, setCheckInTime] = useState<string | null>('09:05')
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(true)
  const [visitNotes, setVisitNotes] = useState('')
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Morning washing assistance', completed: true, required: true },
    { id: '2', title: 'Breakfast preparation', completed: true, required: true },
    { id: '3', title: 'Medication administration', completed: false, required: true },
    { id: '4', title: 'Blood pressure check', completed: false, required: true },
    { id: '5', title: 'Light exercise routine', completed: false, required: false },
    { id: '6', title: 'Social engagement activities', completed: false, required: false }
  ])
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: '/placeholder-photo.jpg',
      caption: 'Meal preparation',
      timestamp: '09:30'
    }
  ])

  const visit = {
    clientName: 'Margaret Thompson',
    address: '45 Oak Avenue, North London, NW3 2ER',
    scheduledTime: '09:00 AM',
    duration: '60 min',
    carePlan: 'Personal care, medication support, and social engagement. Monitor blood pressure and general wellbeing.',
    notes: 'Client has diabetes - check blood pressure before medication. Prefers tea with breakfast.',
    emergencyContact: '+44 7700 900123'
  }

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleCheckIn = () => {
    setCheckInTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
    setIsActive(true)
  }

  const handleCheckOut = () => {
    setCheckOutTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
    setIsActive(false)
  }

  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const requiredTasks = tasks.filter(t => t.required && !t.completed).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visit Details</h1>
          <p className="text-gray-600 mt-1">Current visit to {visit.clientName}</p>
        </div>
        {isActive ? (
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700"
            onClick={handleCheckOut}
          >
            <StopCircle className="mr-2 h-5 w-5" />
            Check Out
          </Button>
        ) : (
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-700"
            onClick={handleCheckIn}
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Check In
          </Button>
        )}
      </div>

      {/* Status Banner */}
      {isActive && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold text-gray-900">Visit in progress</span>
                <span className="text-gray-600">Checked in at {checkInTime}</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700">
                <Clock className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client Information */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl font-semibold">
              {visit.clientName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{visit.clientName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2 text-gray-700">
                  <MapPin className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-600">{visit.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <Clock className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <p className="font-medium">Scheduled Time</p>
                    <p className="text-sm text-gray-600">{visit.scheduledTime} ({visit.duration})</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <Phone className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <p className="font-medium">Emergency Contact</p>
                    <p className="text-sm text-gray-600">{visit.emergencyContact}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-gray-700">
                  <Calendar className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <p className="font-medium">Visit Status</p>
                    <Badge className={isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {isActive ? 'In Progress' : 'Not Started'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Client
                </Button>
                <Button variant="outline" size="sm">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Checklist */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Tasks Checklist
              </CardTitle>
              <Badge variant="outline">
                {completedTasks}/{totalTasks} Complete
              </Badge>
            </div>
            {requiredTasks > 0 && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {requiredTasks} required task{requiredTasks > 1 ? 's' : ''} remaining
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    task.completed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`flex-shrink-0 h-6 w-6 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-green-600 border-green-600'
                          : 'border-gray-300 hover:border-green-600'
                      }`}
                    >
                      {task.completed && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </span>
                        {task.required && (
                          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                            Required
                          </Badge>
                        )}
                      </div>
                      {task.notes && (
                        <p className="text-sm text-gray-600 italic">{task.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Care Plan & Notes */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Care Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-900">{visit.carePlan}</p>
              </div>
              {visit.notes && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Important Notes:</p>
                  <p className="text-gray-900">{visit.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photo Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{photo.caption}</p>
                        <p className="text-sm text-gray-600">Taken at {photo.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Visit Notes */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Visit Notes & Observations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Record any observations, concerns, or important information about this visit..."
            value={visitNotes}
            onChange={(e) => setVisitNotes(e.target.value)}
            rows={6}
            className="mb-4"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {checkInTime && checkOutTime && (
                <>Visit duration: {checkInTime} - {checkOutTime}</>
              )}
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Check className="h-4 w-4 mr-2" />
              Save Notes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Complete Visit Button */}
      {isActive && completedTasks === totalTasks && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">All tasks completed!</h3>
                <p className="text-sm text-gray-600">Check out to complete this visit</p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700"
                onClick={handleCheckOut}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Complete Visit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
