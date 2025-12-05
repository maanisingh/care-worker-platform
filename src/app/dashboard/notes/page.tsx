'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import {
  FileText,
  Calendar,
  User,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

type Note = {
  id: string
  clientName: string
  date: string
  time: string
  type: 'observation' | 'progress' | 'concern' | 'general'
  content: string
  author: string
  tags?: string[]
}

const mockNotes: Note[] = [
  {
    id: '1',
    clientName: 'Margaret Thompson',
    date: '2024-12-05',
    time: '09:15',
    type: 'observation',
    content: 'Client appeared in good spirits this morning. Blood pressure was 125/80, within normal range. Medication taken without issues. Discussed upcoming family visit which she is looking forward to.',
    author: 'Sarah Johnson',
    tags: ['vital-signs', 'medication', 'mood']
  },
  {
    id: '2',
    clientName: 'John Williams',
    date: '2024-12-05',
    time: '10:45',
    type: 'concern',
    content: 'Client mentioned increased pain in left knee. Mobility slightly reduced compared to last visit. Recommended to contact GP for review. Family has been informed.',
    author: 'Michael Peters',
    tags: ['mobility', 'pain', 'medical-review']
  },
  {
    id: '3',
    clientName: 'Elizabeth Brown',
    date: '2024-12-04',
    time: '14:30',
    type: 'progress',
    content: 'Noticeable improvement in engagement during cognitive activities. Client successfully completed memory exercises and showed good recall of recent events. Positive response to new stimulation activities.',
    author: 'Emma Wilson',
    tags: ['cognitive', 'dementia-care', 'improvement']
  },
  {
    id: '4',
    clientName: 'Robert Davis',
    date: '2024-12-04',
    time: '15:45',
    type: 'observation',
    content: 'Client comfortable and pain well-managed. Family visited for 2 hours - client very pleased. Appetite remains good, ate full lunch. Wound dressing changed as per protocol.',
    author: 'Emma Wilson',
    tags: ['palliative-care', 'family', 'wound-care']
  },
  {
    id: '5',
    clientName: 'Margaret Thompson',
    date: '2024-12-03',
    time: '09:00',
    type: 'general',
    content: 'Routine morning visit completed. Personal care provided, breakfast prepared and consumed well. Client requested to go for short walk in garden, assisted with mobility frame. No concerns to report.',
    author: 'Sarah Johnson',
    tags: ['routine-care', 'mobility']
  }
]

const noteTypeColors = {
  observation: 'bg-blue-100 text-blue-700',
  progress: 'bg-green-100 text-green-700',
  concern: 'bg-red-100 text-red-700',
  general: 'bg-gray-100 text-gray-700'
}

export default function NotesPage() {
  const [notes, setNotes] = useState(mockNotes)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClient, setFilterClient] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [showNewNoteForm, setShowNewNoteForm] = useState(false)
  const [newNote, setNewNote] = useState({
    clientName: '',
    type: 'observation' as 'observation' | 'progress' | 'concern' | 'general',
    content: ''
  })

  const clients = Array.from(new Set(notes.map(n => n.clientName)))

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClient = filterClient === 'all' || note.clientName === filterClient
    const matchesType = filterType === 'all' || note.type === filterType
    return matchesSearch && matchesClient && matchesType
  })

  const stats = {
    total: notes.length,
    today: notes.filter(n => n.date === '2024-12-05').length,
    concerns: notes.filter(n => n.type === 'concern').length,
    progress: notes.filter(n => n.type === 'progress').length
  }

  const addNote = () => {
    if (newNote.clientName && newNote.content) {
      const note: Note = {
        id: (notes.length + 1).toString(),
        clientName: newNote.clientName,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        type: newNote.type,
        content: newNote.content,
        author: 'Sarah Johnson'
      }
      setNotes([note, ...notes])
      setNewNote({ clientName: '', type: 'observation', content: '' })
      setShowNewNoteForm(false)
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
          <h1 className="text-3xl font-bold text-gray-900">Notes & Observations</h1>
          <p className="text-gray-600 mt-1">Record and track client care notes and observations</p>
        </div>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600"
          onClick={() => setShowNewNoteForm(!showNewNoteForm)}
        >
          <Plus className="mr-2 h-5 w-5" />
          New Note
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
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
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.today}</p>
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
                <p className="text-sm font-medium text-gray-600">Progress Notes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.progress}</p>
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
                <p className="text-sm font-medium text-gray-600">Concerns</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.concerns}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Note Form */}
      {showNewNoteForm && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Client Name</label>
                <Input
                  placeholder="Enter client name"
                  value={newNote.clientName}
                  onChange={(e) => setNewNote({ ...newNote, clientName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Note Type</label>
                <Select
                  value={newNote.type}
                  onChange={(e) => setNewNote({ ...newNote, type: e.target.value as any })}
                >
                  <option value="observation">Observation</option>
                  <option value="progress">Progress</option>
                  <option value="concern">Concern</option>
                  <option value="general">General</option>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Note Content</label>
              <Textarea
                placeholder="Enter detailed notes and observations..."
                rows={6}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={addNote}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Note
              </Button>
              <Button variant="outline" onClick={() => setShowNewNoteForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search notes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterClient} onChange={(e) => setFilterClient(e.target.value)}>
              <option value="all">All Clients</option>
              {clients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </Select>
            <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="observation">Observations</option>
              <option value="progress">Progress</option>
              <option value="concern">Concerns</option>
              <option value="general">General</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="border-0 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {note.clientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{note.clientName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(note.date).toLocaleDateString('en-GB')}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{note.time}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${noteTypeColors[note.type]} capitalize`}>
                  {note.type}
                </Badge>
              </div>

              <div className="mb-4">
                <p className="text-gray-900 leading-relaxed">{note.content}</p>
              </div>

              {note.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Recorded by {note.author}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
