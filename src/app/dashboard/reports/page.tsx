'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Download,
  Plus,
  PieChart,
  LineChart,
  Calendar,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

const reports = [
  {
    id: '1',
    title: 'Monthly Performance Report',
    description: 'Overview of care worker performance, visit completion rates, and client satisfaction.',
    frequency: 'Monthly',
    lastGenerated: '2024-12-01',
    format: 'PDF',
    category: 'Performance'
  },
  {
    id: '2',
    title: 'Care Hours Summary',
    description: 'Total hours of care provided by location, worker, and client.',
    frequency: 'Weekly',
    lastGenerated: '2024-12-02',
    format: 'Excel',
    category: 'Operations'
  },
  {
    id: '3',
    title: 'Incident Analysis',
    description: 'Analysis of incidents by type, severity, and resolution status.',
    frequency: 'Monthly',
    lastGenerated: '2024-11-28',
    format: 'PDF',
    category: 'Safety'
  },
  {
    id: '4',
    title: 'Client Satisfaction Report',
    description: 'Feedback scores, ratings, and satisfaction trends from clients.',
    frequency: 'Quarterly',
    lastGenerated: '2024-11-15',
    format: 'PDF',
    category: 'Quality'
  },
  {
    id: '5',
    title: 'Compliance Audit',
    description: 'Compliance status across all regulatory requirements and certifications.',
    frequency: 'Quarterly',
    lastGenerated: '2024-11-01',
    format: 'PDF',
    category: 'Compliance'
  },
  {
    id: '6',
    title: 'Financial Summary',
    description: 'Billing, invoicing, and financial overview by client and service type.',
    frequency: 'Monthly',
    lastGenerated: '2024-12-01',
    format: 'Excel',
    category: 'Finance'
  }
]

const analytics = [
  {
    id: 'visit-completion',
    label: 'Visit Completion Rate',
    value: '94%',
    trend: '+2%',
    icon: <Activity className="h-6 w-6" />,
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 'avg-rating',
    label: 'Average Rating',
    value: '4.8/5',
    trend: '+0.2',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  },
  {
    id: 'total-clients',
    label: 'Active Clients',
    value: '156',
    trend: '+12',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 'care-hours',
    label: 'Care Hours (This Month)',
    value: '2,847',
    trend: '+15%',
    icon: <BarChart3 className="h-6 w-6" />,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  }
]

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredReports = selectedCategory === 'all'
    ? reports
    : reports.filter(r => r.category === selectedCategory)

  const categories = ['all', ...Array.from(new Set(reports.map(r => r.category)))]

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
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate reports, view analytics, and export data for compliance</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          New Report
        </Button>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics.map((stat, idx) => (
          <motion.div key={stat.id} variants={itemVariants}>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 font-semibold mt-1">{stat.trend}</p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-xl`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Visit Trends (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: 'Mon', visits: 34, percentage: 85 },
                  { day: 'Tue', visits: 38, percentage: 95 },
                  { day: 'Wed', visits: 36, percentage: 90 },
                  { day: 'Thu', visits: 35, percentage: 88 },
                  { day: 'Fri', visits: 32, percentage: 80 },
                  { day: 'Sat', visits: 28, percentage: 70 },
                  { day: 'Sun', visits: 18, percentage: 45 }
                ].map(item => (
                  <div key={item.day} className="flex items-center gap-3">
                    <span className="w-12 font-semibold text-gray-600">{item.day}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.visits}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Care Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Daily Care', value: 35, color: 'bg-blue-500' },
                  { name: 'Medication Mgmt', value: 28, color: 'bg-purple-500' },
                  { name: 'Mobility Support', value: 18, color: 'bg-green-500' },
                  { name: 'Nutrition Support', value: 12, color: 'bg-orange-500' },
                  { name: 'Other', value: 7, color: 'bg-gray-500' }
                ].map(item => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-600 flex-1">{item.name}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Reports Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Available Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Category Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>

            {/* Reports Grid */}
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <motion.div key={report.id} variants={itemVariants}>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{report.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {report.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Last: {report.lastGenerated}
                          </span>
                          <span className="flex items-center gap-1">
                            Every {report.frequency}
                          </span>
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {report.format}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
