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
  Badge as BadgeIcon,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  MoreVertical
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

const teamMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Team Lead',
    status: 'active',
    department: 'North London',
    phone: '+44 7700 900123',
    email: 'sarah.j@careplatform.com',
    joinedDate: 'Jan 2022',
    performanceRating: 4.9,
    tasksAssigned: 12,
    tasksCompleted: 11
  },
  {
    id: '2',
    name: 'Michael Peters',
    role: 'Care Worker',
    status: 'active',
    department: 'East London',
    phone: '+44 7700 900124',
    email: 'mike.p@careplatform.com',
    joinedDate: 'Mar 2022',
    performanceRating: 4.8,
    tasksAssigned: 8,
    tasksCompleted: 8
  },
  {
    id: '3',
    name: 'Emma Wilson',
    role: 'Senior Care Worker',
    status: 'active',
    department: 'West London',
    phone: '+44 7700 900125',
    email: 'emma.w@careplatform.com',
    joinedDate: 'Oct 2021',
    performanceRating: 5.0,
    tasksAssigned: 15,
    tasksCompleted: 15
  },
  {
    id: '4',
    name: 'James Martinez',
    role: 'Care Worker',
    status: 'on-leave',
    department: 'South London',
    phone: '+44 7700 900126',
    email: 'james.m@careplatform.com',
    joinedDate: 'Jun 2022',
    performanceRating: 4.7,
    tasksAssigned: 5,
    tasksCompleted: 4
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    role: 'Care Worker',
    status: 'active',
    department: 'Central London',
    phone: '+44 7700 900127',
    email: 'lisa.a@careplatform.com',
    joinedDate: 'Aug 2022',
    performanceRating: 4.6,
    tasksAssigned: 9,
    tasksCompleted: 9
  },
  {
    id: '6',
    name: 'David Chen',
    role: 'Team Lead',
    status: 'active',
    department: 'North London',
    phone: '+44 7700 900128',
    email: 'david.c@careplatform.com',
    joinedDate: 'Dec 2021',
    performanceRating: 4.9,
    tasksAssigned: 14,
    tasksCompleted: 13
  }
]

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'on-leave':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-3 w-3" />
      case 'on-leave':
        return <Clock className="h-3 w-3" />
      default:
        return null
    }
  }

  const filteredTeam = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || member.role === filterRole
    return matchesSearch && matchesRole
  })

  const roles = ['all', ...Array.from(new Set(teamMembers.map(m => m.role)))]
  const activeMembers = teamMembers.filter(m => m.status === 'active').length
  const onLeaveMembers = teamMembers.filter(m => m.status === 'on-leave').length
  const avgRating = (teamMembers.reduce((sum, m) => sum + m.performanceRating, 0) / teamMembers.length).toFixed(1)

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
          <h1 className="text-3xl font-bold text-gray-900">My Team</h1>
          <p className="text-gray-600 mt-1">Manage your team members, track performance, and assign tasks</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          Add Team Member
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Team Members</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{teamMembers.length}</p>
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
                  <p className="text-3xl font-bold text-gray-900 mt-2">{activeMembers}</p>
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
                  <p className="text-sm font-medium text-gray-600">On Leave</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{onLeaveMembers}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
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
                  <p className="text-3xl font-bold text-gray-900 mt-2">{avgRating}</p>
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or department..."
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
              <div className="flex gap-2 flex-wrap">
                {roles.map(role => (
                  <Button
                    key={role}
                    variant={filterRole === role ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterRole(role)}
                    className={filterRole === role ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                  >
                    {role === 'all' ? 'All Roles' : role}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map((member) => (
          <motion.div key={member.id} variants={itemVariants}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(member.status)} flex items-center gap-1`}>
                    {getStatusIcon(member.status)}
                    <span className="capitalize">{member.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{member.department}</span>
                  </div>
                </div>

                {/* Performance */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <p className="text-lg font-bold text-gray-900">{member.performanceRating}</p>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{member.tasksCompleted}/{member.tasksAssigned}</p>
                    <p className="text-xs text-gray-600">Tasks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">
                      {member.tasksAssigned > 0 ? Math.round((member.tasksCompleted / member.tasksAssigned) * 100) : 0}%
                    </p>
                    <p className="text-xs text-gray-600">Complete</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-3">
                  <Button size="sm" className="flex-1" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                    Assign Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTeam.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No team members found</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
