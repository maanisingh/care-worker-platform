'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import {
  Clock,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Download,
  Send,
  Eye,
  FileText,
  TrendingUp,
  Clock3
} from 'lucide-react'

type TimesheetEntry = {
  date: string
  clientName: string
  checkIn: string
  checkOut: string
  breakTime: number
  totalHours: number
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  notes?: string
}

type WeekSummary = {
  weekEnding: string
  totalHours: number
  regularHours: number
  overtimeHours: number
  grossPay: number
  status: 'draft' | 'submitted' | 'approved' | 'paid'
}

const mockTimesheetEntries: TimesheetEntry[] = [
  {
    date: '2024-12-02',
    clientName: 'Margaret Thompson',
    checkIn: '09:00',
    checkOut: '17:00',
    breakTime: 60,
    totalHours: 7,
    status: 'approved',
    notes: 'Morning and evening care routine'
  },
  {
    date: '2024-12-03',
    clientName: 'John Williams',
    checkIn: '10:00',
    checkOut: '14:30',
    breakTime: 30,
    totalHours: 4,
    status: 'approved'
  },
  {
    date: '2024-12-03',
    clientName: 'Elizabeth Brown',
    checkIn: '15:00',
    checkOut: '18:00',
    breakTime: 0,
    totalHours: 3,
    status: 'approved'
  },
  {
    date: '2024-12-04',
    clientName: 'Margaret Thompson',
    checkIn: '09:00',
    checkOut: '17:00',
    breakTime: 60,
    totalHours: 7,
    status: 'submitted'
  },
  {
    date: '2024-12-04',
    clientName: 'Robert Davis',
    checkIn: '18:00',
    checkOut: '21:00',
    breakTime: 0,
    totalHours: 3,
    status: 'submitted'
  },
  {
    date: '2024-12-05',
    clientName: 'Dorothy Miller',
    checkIn: '08:00',
    checkOut: '12:00',
    breakTime: 30,
    totalHours: 3.5,
    status: 'draft'
  },
  {
    date: '2024-12-05',
    clientName: 'Margaret Thompson',
    checkIn: '14:00',
    checkOut: '18:00',
    breakTime: 0,
    totalHours: 4,
    status: 'draft'
  }
]

const mockWeekHistory: WeekSummary[] = [
  {
    weekEnding: '2024-11-29',
    totalHours: 38.5,
    regularHours: 38.5,
    overtimeHours: 0,
    grossPay: 577.5,
    status: 'paid'
  },
  {
    weekEnding: '2024-11-22',
    totalHours: 42,
    regularHours: 40,
    overtimeHours: 2,
    grossPay: 660,
    status: 'paid'
  },
  {
    weekEnding: '2024-11-15',
    totalHours: 36,
    regularHours: 36,
    overtimeHours: 0,
    grossPay: 540,
    status: 'paid'
  },
  {
    weekEnding: '2024-11-08',
    totalHours: 40,
    regularHours: 40,
    overtimeHours: 0,
    grossPay: 600,
    status: 'paid'
  }
]

export default function TimesheetPage() {
  const [entries, setEntries] = useState(mockTimesheetEntries)
  const [selectedWeek, setSelectedWeek] = useState('current')
  const [newEntry, setNewEntry] = useState<Partial<TimesheetEntry>>({
    date: new Date().toISOString().split('T')[0],
    checkIn: '',
    checkOut: '',
    breakTime: 0
  })

  const currentWeekEntries = entries.filter(e => {
    const entryDate = new Date(e.date)
    const today = new Date()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())
    return entryDate >= weekStart
  })

  const weekStats = {
    totalHours: currentWeekEntries.reduce((sum, e) => sum + e.totalHours, 0),
    daysWorked: new Set(currentWeekEntries.map(e => e.date)).size,
    pendingApproval: currentWeekEntries.filter(e => e.status === 'submitted').length,
    approved: currentWeekEntries.filter(e => e.status === 'approved').length
  }

  const estimatedPay = weekStats.totalHours * 15 // £15 per hour

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'paid':
        return 'bg-green-100 text-green-700'
      case 'submitted':
        return 'bg-blue-100 text-blue-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'paid':
        return <CheckCircle className="h-4 w-4" />
      case 'submitted':
        return <Clock className="h-4 w-4" />
      case 'rejected':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const submitTimesheet = () => {
    setEntries(entries.map(entry =>
      entry.status === 'draft' ? { ...entry, status: 'submitted' } : entry
    ))
  }

  const addEntry = () => {
    if (newEntry.date && newEntry.checkIn && newEntry.checkOut) {
      const checkInTime = new Date(`2000-01-01T${newEntry.checkIn}`)
      const checkOutTime = new Date(`2000-01-01T${newEntry.checkOut}`)
      const diffMs = checkOutTime.getTime() - checkInTime.getTime()
      const diffHours = diffMs / (1000 * 60 * 60)
      const totalHours = diffHours - (newEntry.breakTime || 0) / 60

      const entry: TimesheetEntry = {
        date: newEntry.date,
        clientName: newEntry.clientName || 'Unassigned',
        checkIn: newEntry.checkIn,
        checkOut: newEntry.checkOut,
        breakTime: newEntry.breakTime || 0,
        totalHours: Math.round(totalHours * 10) / 10,
        status: 'draft'
      }

      setEntries([...entries, entry])
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        checkIn: '',
        checkOut: '',
        breakTime: 0
      })
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
          <h1 className="text-3xl font-bold text-gray-900">Timesheet & Payroll</h1>
          <p className="text-gray-600 mt-1">Track your hours and manage payroll</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Export
          </Button>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={submitTimesheet}
            disabled={!currentWeekEntries.some(e => e.status === 'draft')}
          >
            <Send className="mr-2 h-5 w-5" />
            Submit Timesheet
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{weekStats.totalHours}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Worked</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{weekStats.daysWorked}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Estimated Pay</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">£{estimatedPay}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{weekStats.approved}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock3 className="h-5 w-5" />
            Add Time Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
              <Input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Client</label>
              <Input
                placeholder="Client name"
                value={newEntry.clientName || ''}
                onChange={(e) => setNewEntry({ ...newEntry, clientName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Check In</label>
              <Input
                type="time"
                value={newEntry.checkIn}
                onChange={(e) => setNewEntry({ ...newEntry, checkIn: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Check Out</label>
              <Input
                type="time"
                value={newEntry.checkOut}
                onChange={(e) => setNewEntry({ ...newEntry, checkOut: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Break (min)</label>
              <Input
                type="number"
                value={newEntry.breakTime || 0}
                onChange={(e) => setNewEntry({ ...newEntry, breakTime: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addEntry} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                Add Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Week Timesheet */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Current Week Timesheet
            </CardTitle>
            <Select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
              <option value="current">Current Week</option>
              <option value="last">Last Week</option>
              <option value="all">All Entries</option>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentWeekEntries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">{entry.clientName}</span>
                      <Badge className={`${getStatusColor(entry.status)} flex items-center gap-1`}>
                        {getStatusIcon(entry.status)}
                        <span className="capitalize">{entry.status}</span>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(entry.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{entry.checkIn} - {entry.checkOut}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Break:</span> {entry.breakTime}min
                      </div>
                      <div className="font-semibold text-blue-600">
                        {entry.totalHours} hours
                      </div>
                      <div className="font-semibold text-green-600">
                        £{(entry.totalHours * 15).toFixed(2)}
                      </div>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">{entry.notes}</p>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {currentWeekEntries.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No entries for this week</h3>
              <p className="text-gray-600">Add your first time entry above</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historical Timesheets */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Historical Timesheets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockWeekHistory.map((week, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">
                        Week ending {new Date(week.weekEnding).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <Badge className={`${getStatusColor(week.status)} flex items-center gap-1`}>
                        {getStatusIcon(week.status)}
                        <span className="capitalize">{week.status}</span>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Total Hours:</span>{' '}
                        <span className="font-semibold text-gray-900">{week.totalHours}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Regular:</span>{' '}
                        <span className="font-semibold text-gray-900">{week.regularHours}h</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Overtime:</span>{' '}
                        <span className="font-semibold text-gray-900">{week.overtimeHours}h</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Gross Pay:</span>{' '}
                        <span className="font-semibold text-green-600">£{week.grossPay.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
