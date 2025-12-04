'use client'

import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  MapPin,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  X,
  Edit2,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Drawer } from 'vaul'

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

type Incident = {
  id: string
  title: string
  clientName: string
  date: string
  severity: string
  status: string
  type: string
  description: string
  reportedBy: string
  location: string
  investigation: string
  time?: string
  immediateAction?: string
  witnesses?: string[]
  timeline?: { time: string; event: string }[]
  investigationNotes?: string[]
  resolutionSteps?: string[]
  relatedDocuments?: string[]
  assignedTo?: string
}

const incidents: Incident[] = [
  {
    id: '1',
    title: 'Fall Risk Assessment',
    clientName: 'Margaret Thompson',
    date: '2024-12-02',
    severity: 'medium',
    status: 'open',
    type: 'Safety',
    description: 'Client fell in bathroom. Minor bruising on arm. No fractures detected.',
    reportedBy: 'Sarah Johnson',
    location: 'North London',
    investigation: 'Under review',
    time: '14:30',
    immediateAction: 'Client helped up, ice pack applied to bruise, vital signs checked (all normal). No emergency medical attention required.',
    witnesses: ['Sarah Johnson (Care Worker)', 'Neighbor (heard fall)'],
    timeline: [
      { time: '14:25', event: 'Client entered bathroom unassisted' },
      { time: '14:30', event: 'Fall occurred - client slipped on wet floor' },
      { time: '14:31', event: 'Care worker responded to call for help' },
      { time: '14:35', event: 'Client examined, ice pack applied' },
      { time: '14:45', event: 'Incident report filed' }
    ],
    investigationNotes: [
      'Bathroom floor was wet from recent cleaning',
      'No non-slip mat was in place',
      'Client was wearing slippers without grip',
      'No grab rails installed near toilet area'
    ],
    resolutionSteps: [
      'Install grab rails in bathroom (scheduled for 2024-12-10)',
      'Purchase and install non-slip bath mat',
      'Review cleaning protocols to ensure floors are dried properly',
      'Recommend non-slip footwear for client'
    ],
    relatedDocuments: ['Incident Report Form #IR-2024-001', 'Medical Assessment', 'Photos of bathroom'],
    assignedTo: 'Safety Manager - John Smith'
  },
  {
    id: '2',
    title: 'Medication Error',
    clientName: 'John Williams',
    date: '2024-11-28',
    severity: 'high',
    status: 'resolved',
    type: 'Medication',
    description: 'Wrong dosage given but caught before administration. Corrected immediately.',
    reportedBy: 'Michael Peters',
    location: 'East London',
    investigation: 'Completed - Training provided'
  },
  {
    id: '3',
    title: 'Equipment Malfunction',
    clientName: 'Robert Davis',
    date: '2024-11-25',
    severity: 'low',
    status: 'resolved',
    type: 'Equipment',
    description: 'Blood pressure monitor malfunction. Replaced with backup device.',
    reportedBy: 'Emma Wilson',
    location: 'South London',
    investigation: 'Completed - Device serviced'
  },
  {
    id: '4',
    title: 'Behavioral Incident',
    clientName: 'Elizabeth Brown',
    date: '2024-12-01',
    severity: 'medium',
    status: 'open',
    type: 'Behavior',
    description: 'Client exhibited confusion and agitation. Calmed with reassurance.',
    reportedBy: 'Emma Wilson',
    location: 'West London',
    investigation: 'Awaiting family consultation'
  },
  {
    id: '5',
    title: 'Care Deviation',
    clientName: 'Dorothy Miller',
    date: '2024-11-30',
    severity: 'low',
    status: 'resolved',
    type: 'Procedure',
    description: 'Nutrition protocol adjusted without prior authorization. Now documented.',
    reportedBy: 'Lisa Anderson',
    location: 'Central London',
    investigation: 'Completed - Process updated'
  },
  {
    id: '6',
    title: 'Communication Breakdown',
    clientName: 'Peter Johnson',
    date: '2024-11-27',
    severity: 'medium',
    status: 'open',
    type: 'Communication',
    description: 'Care plan change not communicated to all team members.',
    reportedBy: 'David Chen',
    location: 'North London',
    investigation: 'Under review'
  }
]

export default function IncidentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'resolved'>('all')
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openIncidentDrawer = (incident: Incident) => {
    setSelectedIncident(incident)
    setIsDrawerOpen(true)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'low':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-orange-100 text-orange-700'
      case 'resolved':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />
      case 'medium':
        return <AlertCircle className="h-4 w-4" />
      case 'low':
        return <CheckCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          incident.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const openCount = incidents.filter(i => i.status === 'open').length
  const resolvedCount = incidents.filter(i => i.status === 'resolved').length
  const highSeverityCount = incidents.filter(i => i.severity === 'high').length
  const totalIncidents = incidents.length

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
          <h1 className="text-3xl font-bold text-gray-900">Incident Reports</h1>
          <p className="text-gray-600 mt-1">Track and manage incident reports, investigations, and resolutions</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-5 w-5" />
          Report Incident
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalIncidents}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-white" />
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
                  <p className="text-sm font-medium text-gray-600">Open</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{openCount}</p>
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
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{resolvedCount}</p>
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
                  <p className="text-sm font-medium text-gray-600">High Severity</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{highSeverityCount}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-white" />
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
                    placeholder="Search by title or client name..."
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
              <div className="flex flex-wrap gap-2">
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-600 flex items-center">Status:</span>
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('all')}
                    className={filterStatus === 'all' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === 'open' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('open')}
                    className={filterStatus === 'open' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                  >
                    Open
                  </Button>
                  <Button
                    variant={filterStatus === 'resolved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('resolved')}
                    className={filterStatus === 'resolved' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                  >
                    Resolved
                  </Button>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-600 flex items-center">Severity:</span>
                  <Button
                    variant={filterSeverity === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterSeverity('all')}
                    className={filterSeverity === 'all' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterSeverity === 'high' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterSeverity('high')}
                    className={filterSeverity === 'high' ? 'bg-gradient-to-r from-red-600 to-red-700' : ''}
                  >
                    High
                  </Button>
                  <Button
                    variant={filterSeverity === 'medium' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterSeverity('medium')}
                    className={filterSeverity === 'medium' ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : ''}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={filterSeverity === 'low' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterSeverity('low')}
                    className={filterSeverity === 'low' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                  >
                    Low
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Incidents List */}
      <div className="space-y-3">
        {filteredIncidents.map((incident) => (
          <motion.div key={incident.id} variants={itemVariants}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        incident.severity === 'high' ? 'bg-red-100' :
                        incident.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {getSeverityIcon(incident.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                          <div className="flex gap-2">
                            <Badge className={getSeverityColor(incident.severity)}>
                              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)} Severity
                            </Badge>
                            <Badge className={getStatusColor(incident.status)}>
                              {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{incident.clientName} - {incident.type}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 pt-2 border-t">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span>{incident.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="h-4 w-4 flex-shrink-0" />
                            <span>{incident.reportedBy}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{incident.location}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">Investigation:</span> {incident.investigation}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openIncidentDrawer(incident)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No incident reports found</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Incident Detail Drawer */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 md:right-0 md:left-auto md:w-[600px] md:rounded-l-[10px] md:rounded-tr-none md:mt-0 md:h-full">
            <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4 md:hidden" />

              {selectedIncident && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedIncident.title}</h2>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <Badge className={getSeverityColor(selectedIncident.severity)}>
                          {selectedIncident.severity.charAt(0).toUpperCase() + selectedIncident.severity.slice(1)} Severity
                        </Badge>
                        <Badge className={getStatusColor(selectedIncident.status)}>
                          {selectedIncident.status.charAt(0).toUpperCase() + selectedIncident.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{selectedIncident.type} Incident</p>
                      <p className="text-sm text-gray-500">{selectedIncident.date} {selectedIncident.time && `• ${selectedIncident.time}`}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Overview */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Incident Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Client</p>
                        <p className="font-medium text-gray-900">{selectedIncident.clientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">{selectedIncident.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reported By</p>
                        <p className="font-medium text-gray-900">{selectedIncident.reportedBy}</p>
                      </div>
                      {selectedIncident.assignedTo && (
                        <div>
                          <p className="text-sm text-gray-600">Assigned To</p>
                          <p className="font-medium text-gray-900">{selectedIncident.assignedTo}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Investigation Status</p>
                        <p className="font-medium text-gray-900">{selectedIncident.investigation}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedIncident.description}</p>
                    </CardContent>
                  </Card>

                  {/* Immediate Action */}
                  {selectedIncident.immediateAction && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Immediate Action Taken
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{selectedIncident.immediateAction}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Timeline */}
                  {selectedIncident.timeline && selectedIncident.timeline.length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Incident Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedIncident.timeline.map((entry, index) => (
                            <div key={index} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="h-3 w-3 bg-blue-600 rounded-full" />
                                {index < selectedIncident.timeline!.length - 1 && (
                                  <div className="w-0.5 h-full bg-blue-200 flex-1 mt-1" />
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <p className="font-semibold text-blue-600 text-sm">{entry.time}</p>
                                <p className="text-gray-700 mt-1">{entry.event}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Witnesses */}
                  {selectedIncident.witnesses && selectedIncident.witnesses.length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Witnesses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedIncident.witnesses.map((witness, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-700">{witness}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Investigation Notes */}
                  {selectedIncident.investigationNotes && selectedIncident.investigationNotes.length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Investigation Notes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedIncident.investigationNotes.map((note, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="h-2 w-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-700">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Resolution Steps */}
                  {selectedIncident.resolutionSteps && selectedIncident.resolutionSteps.length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Resolution Steps
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedIncident.resolutionSteps.map((step, index) => (
                            <li key={index} className="flex items-start space-x-3 p-2 bg-green-50 rounded">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Related Documents */}
                  {selectedIncident.relatedDocuments && selectedIncident.relatedDocuments.length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Related Documents
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedIncident.relatedDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-700">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3 pb-4">
                    {selectedIncident.status === 'open' && (
                      <>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" size="lg">
                          <Edit2 className="mr-2 h-5 w-5" />
                          Update Status
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Add Notes
                          </Button>
                          <Button variant="outline">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Resolved
                          </Button>
                        </div>
                      </>
                    )}
                    {selectedIncident.status === 'resolved' && (
                      <div className="pb-4">
                        <Badge className="bg-green-100 text-green-700 text-sm py-2 px-4">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          This incident has been resolved
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </motion.div>
  )
}
