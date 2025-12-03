'use client'

import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Star,
  BarChart3,
  Activity
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

export function SupervisorDashboard() {
  const teamStats = [
    {
      title: 'Team Members',
      value: '24',
      subtitle: 'Active workers',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      trend: '+3'
    },
    {
      title: 'Visits Today',
      value: '86',
      subtitle: '92% completed',
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
      trend: '+12'
    },
    {
      title: 'Team Performance',
      value: '94%',
      subtitle: 'Quality score',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      trend: '+5%'
    },
    {
      title: 'Issues',
      value: '2',
      subtitle: 'Needs attention',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      trend: '-1'
    },
  ]

  const topPerformers = [
    {
      name: 'Sarah Johnson',
      visits: 45,
      rating: 4.9,
      status: 'On Visit',
      performance: 98
    },
    {
      name: 'Mike Peters',
      visits: 42,
      rating: 4.8,
      status: 'Available',
      performance: 96
    },
    {
      name: 'Emma Wilson',
      visits: 40,
      rating: 4.9,
      status: 'On Visit',
      performance: 95
    },
    {
      name: 'John Martinez',
      visits: 38,
      rating: 4.7,
      status: 'Break',
      performance: 93
    },
  ]

  const teamActivity = [
    {
      worker: 'Sarah Johnson',
      action: 'Completed visit',
      client: 'Mrs. Smith',
      time: '2 mins ago',
      status: 'success'
    },
    {
      worker: 'Mike Peters',
      action: 'Reported incident',
      client: 'Mr. Davis',
      time: '15 mins ago',
      status: 'warning'
    },
    {
      worker: 'Emma Wilson',
      action: 'Started visit',
      client: 'Ms. Brown',
      time: '23 mins ago',
      status: 'info'
    },
    {
      worker: 'John Martinez',
      action: 'Submitted care log',
      client: 'Mr. Taylor',
      time: '35 mins ago',
      status: 'success'
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supervisor Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your team performance</p>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <BarChart3 className="mr-2 h-4 w-4" />
            Team Report
          </Button>
        </div>
      </motion.div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamStats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                    <div className="mt-2">
                      <span className="text-sm font-semibold text-green-600">{stat.trend}</span>
                      <span className="text-xs text-gray-500 ml-1">this week</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>This week's highest-rated care workers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                          {performer.name.charAt(0)}
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                            <Star className="h-3 w-3 text-white fill-current" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{performer.name}</p>
                        <p className="text-sm text-gray-600">{performer.visits} visits this week</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-gray-900">{performer.rating}</span>
                      </div>
                      <Badge
                        variant={
                          performer.status === 'On Visit'
                            ? 'default'
                            : performer.status === 'Available'
                            ? 'outline'
                            : 'secondary'
                        }
                        className="mt-1"
                      >
                        {performer.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Activity Feed */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Real-time updates from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.status === 'success'
                          ? 'bg-green-100 text-green-600'
                          : activity.status === 'warning'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {activity.status === 'success' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : activity.status === 'warning' ? (
                        <AlertTriangle className="h-5 w-5" />
                      ) : (
                        <Activity className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.worker}</p>
                      <p className="text-sm text-gray-600">
                        {activity.action} • {activity.client}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supervisor Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="justify-start h-auto py-3">
                <Users className="mr-2 h-4 w-4" />
                Team Schedule
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <TrendingUp className="mr-2 h-4 w-4" />
                Performance Review
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <Clock className="mr-2 h-4 w-4" />
                Timesheet Approval
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Incident Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
