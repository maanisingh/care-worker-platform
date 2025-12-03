'use client'

import { motion } from 'framer-motion'
import {
  Users,
  UserCheck,
  CalendarCheck,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export function AdminDashboard() {
  const stats = [
    {
      title: 'Active Care Workers',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Clients',
      value: '842',
      change: '+28',
      trend: 'up',
      icon: UserCheck,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Visits Today',
      value: '124',
      change: '89%',
      trend: 'up',
      icon: CalendarCheck,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Open Incidents',
      value: '3',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Monthly Revenue',
      value: '£125K',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Avg Visit Time',
      value: '45min',
      change: '2min',
      trend: 'up',
      icon: Clock,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      title: 'Client Satisfaction',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Compliance Rate',
      value: '98%',
      change: '+3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600'
    },
  ]

  const recentActivity = [
    { type: 'care-log', worker: 'Sarah Johnson', client: 'Mrs. Smith', time: '5 mins ago', status: 'completed' },
    { type: 'incident', worker: 'Mike Peters', client: 'Mr. Davis', time: '12 mins ago', status: 'reported' },
    { type: 'check-in', worker: 'Emma Wilson', client: 'Ms. Brown', time: '18 mins ago', status: 'in-progress' },
    { type: 'check-out', worker: 'John Martinez', client: 'Mr. Taylor', time: '25 mins ago', status: 'completed' },
    { type: 'training', worker: 'Lisa Anderson', time: '1 hour ago', status: 'completed' },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your care operations</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                      <div className={`flex items-center space-x-1 text-sm font-semibold ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your care workers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {activity.worker.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.worker}
                        {activity.client && (
                          <span className="text-gray-600"> → {activity.client}</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {activity.type.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{activity.time}</span>
                    <Badge
                      variant={activity.status === 'completed' ? 'default' : 'outline'}
                      className="capitalize"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Add Worker
              </Button>
              <Button variant="outline" className="justify-start">
                <UserCheck className="mr-2 h-4 w-4" />
                Add Client
              </Button>
              <Button variant="outline" className="justify-start">
                <CalendarCheck className="mr-2 h-4 w-4" />
                Schedule Visit
              </Button>
              <Button variant="outline" className="justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                View Incidents
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
