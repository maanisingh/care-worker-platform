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

const careWorkers = [
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
    joinedDate: 'Jan 2022'
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
                  <Button size="sm" className="flex-1" variant="outline">
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
