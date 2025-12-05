'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileCheck,
  User,
  Calendar,
  AlertTriangle,
  Activity,
  Utensils,
  Pill,
  Home,
  Globe
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function CarePlanPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Care Plan</h1>
          <p className="text-gray-600 mt-1">View your personalized care plan and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <FileCheck className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      {/* Overview Card */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Care Plan Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Client Name</p>
              <p className="font-semibold">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-semibold">15/06/1965</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Care Level</p>
              <Badge className="bg-blue-100 text-blue-700">Level 3 - Moderate</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Primary Carer</p>
              <p className="font-semibold">Sarah Johnson</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Review Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <p className="font-semibold">15/02/2025</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Risk Flags</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="destructive">Fall Risk</Badge>
                <Badge className="bg-orange-100 text-orange-700">Allergy</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accordion Sections */}
      <Accordion type="single" collapsible className="space-y-4">
        {/* Personal Care */}
        <AccordionItem value="personal-care" className="border rounded-lg px-6 bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Personal Care</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div>
              <p className="font-medium text-gray-700">Care Needs</p>
              <p className="text-gray-600 text-sm mt-1">Assistance with daily personal hygiene and grooming</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Tasks</p>
              <ul className="list-disc list-inside text-gray-600 text-sm mt-1 space-y-1">
                <li>Bathing - Full assistance required (3x per week)</li>
                <li>Grooming - Minimal assistance</li>
                <li>Dressing - Moderate assistance</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700">Notes</p>
              <p className="text-gray-600 text-sm mt-1">Prefers morning baths. Uses shower chair for safety.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mobility & Safety */}
        <AccordionItem value="mobility" className="border rounded-lg px-6 bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="font-semibold">Mobility & Safety</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div>
              <p className="font-medium text-gray-700">Mobility Level</p>
              <Badge className="bg-yellow-100 text-yellow-700 mt-1">Limited - Requires Walking Aid</Badge>
            </div>
            <div>
              <p className="font-medium text-gray-700">Mobility Aids</p>
              <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                <li>Walking frame (zimmer frame)</li>
                <li>Grab rails in bathroom</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700">Transfer Assistance</p>
              <p className="text-gray-600 text-sm mt-1">Two-person transfer required for bed to chair</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Safety Alerts</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="destructive">Fall Risk - High</Badge>
                <Badge className="bg-red-100 text-red-700">No stairs</Badge>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Nutrition & Dietary */}
        <AccordionItem value="nutrition" className="border rounded-lg px-6 bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Utensils className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Nutrition & Dietary</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div>
              <p className="font-medium text-gray-700">Diet Type</p>
              <Badge className="bg-green-100 text-green-700 mt-1">Diabetic Diet</Badge>
            </div>
            <div>
              <p className="font-medium text-gray-700">Allergies</p>
              <div className="flex gap-2 mt-1">
                <Badge className="bg-red-100 text-red-700">Nuts</Badge>
                <Badge className="bg-red-100 text-red-700">Shellfish</Badge>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-700">Meal Preferences</p>
              <p className="text-gray-600 text-sm mt-1">Prefers soft foods. Small portions. 6 small meals daily.</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Hydration</p>
              <p className="text-gray-600 text-sm mt-1">Minimum 1.5L water daily. Remind every 2 hours.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Medication Instructions */}
        <AccordionItem value="medication" className="border rounded-lg px-6 bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Pill className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Medication Instructions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="border-l-4 border-l-purple-600 pl-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">Metformin 500mg</p>
                <Badge>Morning & Evening</Badge>
              </div>
              <p className="text-sm text-gray-600">Dosage: 1 tablet twice daily with meals</p>
              <p className="text-sm text-gray-600 mt-1">Notes: Take with food to reduce stomach upset</p>
            </div>
            <div className="border-l-4 border-l-purple-600 pl-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">Ramipril 5mg</p>
                <Badge>Morning</Badge>
              </div>
              <p className="text-sm text-gray-600">Dosage: 1 tablet once daily</p>
              <p className="text-sm text-gray-600 mt-1">Safety: Monitor for dizziness</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Household Tasks */}
        <AccordionItem value="household" className="border rounded-lg px-6 bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold">Household Tasks</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div>
              <p className="font-medium text-gray-700">Support Required</p>
              <ul className="list-disc list-inside text-gray-600 text-sm mt-1 space-y-1">
                <li>Light housekeeping - dusting, vacuuming</li>
                <li>Laundry - washing and ironing</li>
                <li>Meal preparation - breakfast and lunch</li>
                <li>Bed making</li>
                <li>Shopping assistance - weekly grocery shopping</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Personal & Cultural Preferences */}
        <AccordionItem value="preferences" className="border rounded-lg px-6 bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-teal-600" />
              <span className="font-semibold">Personal & Cultural Preferences</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div>
              <p className="font-medium text-gray-700">Lifestyle & Timings</p>
              <p className="text-gray-600 text-sm mt-1">Early riser (6:00 AM). Prefers bed by 9:00 PM. Afternoon nap 2-3 PM.</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Cultural Practices</p>
              <p className="text-gray-600 text-sm mt-1">Christian faith - Sunday church attendance important</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Communication</p>
              <p className="text-gray-600 text-sm mt-1">Slight hearing impairment - speak clearly and face-to-face</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Social & Recreation</p>
              <p className="text-gray-600 text-sm mt-1">Enjoys reading, crossword puzzles, and visits from grandchildren</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Footer */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <p className="font-medium">Last Updated</p>
              <p>15 November 2024</p>
            </div>
            <div>
              <p className="font-medium">Updated By</p>
              <p>Sarah Johnson (Care Manager)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
