'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import {
  FolderOpen,
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar,
  GraduationCap,
  Shield,
  Award,
  Search,
  Filter
} from 'lucide-react'

type Document = {
  id: string
  name: string
  category: 'certificate' | 'training' | 'policy' | 'contract'
  uploadDate: string
  expiryDate?: string
  size: string
  status: 'valid' | 'expiring-soon' | 'expired'
  uploadedBy: string
}

type Training = {
  id: string
  name: string
  category: string
  status: 'completed' | 'in-progress' | 'required'
  completedDate?: string
  expiryDate?: string
  progress?: number
  certificateId?: string
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'DBS Certificate',
    category: 'certificate',
    uploadDate: '2024-01-15',
    expiryDate: '2027-01-15',
    size: '2.4 MB',
    status: 'valid',
    uploadedBy: 'HR Department'
  },
  {
    id: '2',
    name: 'First Aid Certificate',
    category: 'certificate',
    uploadDate: '2023-06-10',
    expiryDate: '2025-06-10',
    size: '1.8 MB',
    status: 'valid',
    uploadedBy: 'Training Department'
  },
  {
    id: '3',
    name: 'Food Hygiene Certificate',
    category: 'certificate',
    uploadDate: '2024-11-01',
    expiryDate: '2025-02-01',
    size: '1.2 MB',
    status: 'expiring-soon',
    uploadedBy: 'Training Department'
  },
  {
    id: '4',
    name: 'Medication Administration Training',
    category: 'training',
    uploadDate: '2024-09-15',
    expiryDate: '2025-09-15',
    size: '3.1 MB',
    status: 'valid',
    uploadedBy: 'Self'
  },
  {
    id: '5',
    name: 'Safeguarding Adults Policy',
    category: 'policy',
    uploadDate: '2024-01-01',
    size: '856 KB',
    status: 'valid',
    uploadedBy: 'Compliance Team'
  },
  {
    id: '6',
    name: 'Employment Contract',
    category: 'contract',
    uploadDate: '2024-01-10',
    size: '412 KB',
    status: 'valid',
    uploadedBy: 'HR Department'
  },
  {
    id: '7',
    name: 'Manual Handling Certificate',
    category: 'certificate',
    uploadDate: '2022-12-01',
    expiryDate: '2024-12-01',
    size: '1.5 MB',
    status: 'expired',
    uploadedBy: 'Training Department'
  }
]

const mockTraining: Training[] = [
  {
    id: 't1',
    name: 'Basic Life Support',
    category: 'Health & Safety',
    status: 'completed',
    completedDate: '2024-11-20',
    expiryDate: '2026-11-20',
    certificateId: '2'
  },
  {
    id: 't2',
    name: 'Dementia Awareness',
    category: 'Clinical',
    status: 'completed',
    completedDate: '2024-10-15',
    expiryDate: '2026-10-15'
  },
  {
    id: 't3',
    name: 'Infection Control',
    category: 'Health & Safety',
    status: 'in-progress',
    progress: 65
  },
  {
    id: 't4',
    name: 'Mental Capacity Act',
    category: 'Legal & Compliance',
    status: 'required'
  },
  {
    id: 't5',
    name: 'Moving and Handling',
    category: 'Health & Safety',
    status: 'required'
  }
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [training, setTraining] = useState(mockTraining)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [activeTab, setActiveTab] = useState<'documents' | 'training'>('documents')

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'expiring-soon':
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />
      case 'expired':
      case 'required':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'certificate':
        return <Award className="h-4 w-4" />
      case 'training':
        return <GraduationCap className="h-4 w-4" />
      case 'policy':
        return <Shield className="h-4 w-4" />
      case 'contract':
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || doc.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const filteredTraining = training.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const docStats = {
    total: documents.length,
    valid: documents.filter(d => d.status === 'valid').length,
    expiring: documents.filter(d => d.status === 'expiring-soon').length,
    expired: documents.filter(d => d.status === 'expired').length
  }

  const trainingStats = {
    total: training.length,
    completed: training.filter(t => t.status === 'completed').length,
    inProgress: training.filter(t => t.status === 'in-progress').length,
    required: training.filter(t => t.status === 'required').length
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
          <h1 className="text-3xl font-bold text-gray-900">Documents & Training</h1>
          <p className="text-gray-600 mt-1">Manage certificates, documents, and training records</p>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Upload className="mr-2 h-5 w-5" />
          Upload Document
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'documents' ? 'default' : 'outline'}
          onClick={() => setActiveTab('documents')}
          className={activeTab === 'documents' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Documents
        </Button>
        <Button
          variant={activeTab === 'training' ? 'default' : 'outline'}
          onClick={() => setActiveTab('training')}
          className={activeTab === 'training' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
        >
          <GraduationCap className="mr-2 h-4 w-4" />
          Training
        </Button>
      </div>

      {/* Stats Cards */}
      {activeTab === 'documents' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{docStats.total}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valid</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{docStats.valid}</p>
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
                  <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{docStats.expiring}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expired</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{docStats.expired}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{trainingStats.total}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{trainingStats.completed}</p>
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
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{trainingStats.inProgress}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Required</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{trainingStats.required}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filter */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={`Search ${activeTab}...`}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab === 'documents' && (
              <div className="flex gap-2">
                {['all', 'certificate', 'training', 'policy', 'contract'].map((category) => (
                  <Button
                    key={category}
                    variant={filterCategory === category ? 'default' : 'outline'}
                    onClick={() => setFilterCategory(category)}
                    className={filterCategory === category ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                    size="sm"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {activeTab === 'documents' ? (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                      {getCategoryIcon(doc.category)}
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                        <Badge className={`${getStatusColor(doc.status)} flex items-center gap-1`}>
                          {getStatusIcon(doc.status)}
                          <span className="capitalize">{doc.status.replace('-', ' ')}</span>
                        </Badge>
                        <Badge variant="outline" className="capitalize">{doc.category}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString('en-GB')}</span>
                        </div>
                        {doc.expiryDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Expires: {new Date(doc.expiryDate).toLocaleDateString('en-GB')}</span>
                          </div>
                        )}
                        <div>Size: {doc.size}</div>
                        <div>By: {doc.uploadedBy}</div>
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
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTraining.map((course) => (
            <Card key={course.id} className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                        <Badge className={`${getStatusColor(course.status)} flex items-center gap-1`}>
                          {getStatusIcon(course.status)}
                          <span className="capitalize">{course.status.replace('-', ' ')}</span>
                        </Badge>
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        {course.completedDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Completed: {new Date(course.completedDate).toLocaleDateString('en-GB')}</span>
                          </div>
                        )}
                        {course.expiryDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Expires: {new Date(course.expiryDate).toLocaleDateString('en-GB')}</span>
                          </div>
                        )}
                        {course.progress !== undefined && (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span>Progress: {course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {course.status === 'completed' && course.certificateId && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
