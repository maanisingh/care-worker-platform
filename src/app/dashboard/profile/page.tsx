'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
  Edit,
  Camera,
  Download,
  AlertCircle,
  Shield
} from 'lucide-react'

type Certificate = {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  status: 'valid' | 'expiring-soon' | 'expired'
}

type TrainingCourse = {
  id: string
  name: string
  category: string
  status: 'completed' | 'in-progress' | 'required'
  completedDate?: string
  progress?: number
}

const mockProfile = {
  name: 'Sarah Johnson',
  role: 'Senior Care Worker',
  email: 'sarah.johnson@careplatform.com',
  phone: '+44 7700 900123',
  address: '123 Care Street, London, NW1 1AB',
  joinDate: '2022-01-15',
  employeeId: 'CW-2022-001',
  profileImage: '',
  preferences: {
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    maxHoursPerWeek: 40,
    preferredClients: ['Dementia Care', 'Palliative Care'],
    transportMode: 'Own Vehicle'
  }
}

const mockCertificates: Certificate[] = [
  {
    id: '1',
    name: 'DBS Enhanced Check',
    issuer: 'Disclosure and Barring Service',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    status: 'valid'
  },
  {
    id: '2',
    name: 'First Aid at Work',
    issuer: 'St John Ambulance',
    issueDate: '2023-06-10',
    expiryDate: '2025-06-10',
    status: 'valid'
  },
  {
    id: '3',
    name: 'Food Hygiene Level 2',
    issuer: 'CIEH',
    issueDate: '2024-11-01',
    expiryDate: '2025-02-01',
    status: 'expiring-soon'
  },
  {
    id: '4',
    name: 'Medication Administration',
    issuer: 'Care Training Academy',
    issueDate: '2024-09-15',
    expiryDate: '2025-09-15',
    status: 'valid'
  }
]

const mockTraining: TrainingCourse[] = [
  {
    id: '1',
    name: 'Dementia Awareness',
    category: 'Clinical',
    status: 'completed',
    completedDate: '2024-10-15'
  },
  {
    id: '2',
    name: 'Safeguarding Adults',
    category: 'Legal & Compliance',
    status: 'completed',
    completedDate: '2024-08-20'
  },
  {
    id: '3',
    name: 'Infection Control',
    category: 'Health & Safety',
    status: 'in-progress',
    progress: 65
  },
  {
    id: '4',
    name: 'Mental Capacity Act',
    category: 'Legal & Compliance',
    status: 'required'
  }
]

const mockPerformanceMetrics = {
  visitsCompleted: 487,
  rating: 4.9,
  clientSatisfaction: 98,
  timesheetAccuracy: 100,
  attendanceRate: 99
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockProfile)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'expiring-soon':
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700'
      case 'expired':
      case 'required':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Profile & Training</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and professional development</p>
        </div>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="mr-2 h-5 w-5" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-semibold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute bottom-0 right-0 h-10 w-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50">
                  <Camera className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div className="text-center">
                <Badge className="bg-blue-100 text-blue-700">
                  {profile.employeeId}
                </Badge>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-lg text-gray-600">{profile.role}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">{profile.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Join Date</p>
                    <p className="font-medium text-gray-900">{new Date(profile.joinDate).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visits Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{mockPerformanceMetrics.visitsCompleted}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{mockPerformanceMetrics.rating}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{mockPerformanceMetrics.clientSatisfaction}%</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Timesheet</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{mockPerformanceMetrics.timesheetAccuracy}%</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{mockPerformanceMetrics.attendanceRate}%</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certifications */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCertificates.map((cert) => (
              <div key={cert.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                  </div>
                  <Badge className={`${getStatusColor(cert.status)} flex items-center gap-1`}>
                    {cert.status === 'valid' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                    <span className="capitalize">{cert.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="text-gray-500">Issued:</span> {new Date(cert.issueDate).toLocaleDateString('en-GB')}
                  </div>
                  {cert.expiryDate && (
                    <div>
                      <span className="text-gray-500">Expires:</span> {new Date(cert.expiryDate).toLocaleDateString('en-GB')}
                    </div>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Training Courses */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Training Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTraining.map((course) => (
              <div key={course.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.category}</p>
                  </div>
                  <Badge className={`${getStatusColor(course.status)} flex items-center gap-1`}>
                    <span className="capitalize">{course.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
                {course.completedDate && (
                  <p className="text-xs text-gray-600 mb-2">
                    <span className="text-gray-500">Completed:</span> {new Date(course.completedDate).toLocaleDateString('en-GB')}
                  </p>
                )}
                {course.progress !== undefined && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="mt-3">
                  {course.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-2" />
                      Certificate
                    </Button>
                  )}
                  {course.status === 'in-progress' && (
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Continue
                    </Button>
                  )}
                  {course.status === 'required' && (
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Start Course
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Schedule Preferences */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Schedule Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Availability</label>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.availability.map(day => (
                  <Badge key={day} className="bg-blue-100 text-blue-700">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Max Hours/Week</label>
              <p className="text-2xl font-bold text-gray-900">{profile.preferences.maxHoursPerWeek}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Care Types</label>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.preferredClients.map(type => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Transport</label>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700">
                  {profile.preferences.transportMode}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
