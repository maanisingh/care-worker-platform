export type UserRole = 'admin' | 'care-worker' | 'supervisor' | 'client' | 'family'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
}

export interface CareWorker extends User {
  role: 'care-worker'
  skills: string[]
  availability: string
  performanceScore: number
  status: 'active' | 'on-leave' | 'inactive'
}

export interface Client {
  id: string
  name: string
  dateOfBirth: string
  address: string
  phone: string
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  carePackage: string
  riskLevel: 'low' | 'medium' | 'high'
  status: 'active' | 'inactive'
}

export interface Visit {
  id: string
  clientId: string
  clientName: string
  workerId: string
  workerName: string
  date: string
  startTime: string
  endTime: string
  duration: number
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  type: string
  address: string
}

export interface CareLog {
  id: string
  visitId: string
  clientId: string
  workerId: string
  date: string
  tasks: {
    task: string
    completed: boolean
    notes?: string
  }[]
  observations: string
  mood: string
  signatureUrl?: string
  photos?: string[]
  location: {
    lat: number
    lng: number
  }
  submittedAt: string
}

export interface Incident {
  id: string
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  clientId: string
  reporterId: string
  date: string
  description: string
  actionsTaken: string
}
