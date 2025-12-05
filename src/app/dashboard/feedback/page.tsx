'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  MessageSquare,
  Star,
  Upload,
  Send,
  FileText,
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react'

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<'feedback' | 'request'>('feedback')
  const [rating, setRating] = useState(0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback & Requests</h1>
          <p className="text-gray-600 mt-1">Share your feedback or submit service requests</p>
        </div>
        <MessageSquare className="h-8 w-8 text-blue-600" />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'feedback'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Submit Feedback
        </button>
        <button
          onClick={() => setActiveTab('request')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'request'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Service Request
        </button>
      </div>

      {/* Feedback Form */}
      {activeTab === 'feedback' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Share Your Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Feedback Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Feedback Type <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select type...</option>
                  <option value="general">General Feedback</option>
                  <option value="care-quality">Care Quality</option>
                  <option value="care-worker">About Care Worker</option>
                  <option value="service">Service Improvement</option>
                  <option value="complaint">Complaint</option>
                  <option value="compliment">Compliment</option>
                </select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-600">
                    {rating === 5 && '⭐ Excellent!'}
                    {rating === 4 && '👍 Very Good'}
                    {rating === 3 && '😊 Good'}
                    {rating === 2 && '😐 Fair'}
                    {rating === 1 && '😔 Needs Improvement'}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
                  placeholder="Please share your feedback with us..."
                />
                <p className="text-xs text-gray-500">Minimum 20 characters</p>
              </div>

              {/* Attachment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Attachment (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>

              {/* Info Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Your feedback is important to us</p>
                  <p className="mt-1">We review all feedback within 48 hours and will respond if needed.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Service Request Form */}
      {activeTab === 'request' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Submit Service Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Request Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Request Type <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select type...</option>
                  <option value="schedule-change">Schedule Change</option>
                  <option value="additional-service">Additional Service</option>
                  <option value="equipment">Equipment Request</option>
                  <option value="care-plan-review">Care Plan Review</option>
                  <option value="care-worker-change">Change Care Worker</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Urgency Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Urgency Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
                    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
                    { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
                  ].map((urgency) => (
                    <button
                      key={urgency.value}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors ${urgency.color}`}
                    >
                      {urgency.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="date"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="time"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Request Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
                  placeholder="Please provide details about your request..."
                />
              </div>

              {/* Attachment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Supporting Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Request
              </Button>

              {/* Info Note */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium">Request Processing Time</p>
                  <p className="mt-1">Standard requests: 2-3 business days | Urgent requests: 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: 'Feedback',
                subject: 'Excellent care service',
                date: '2 days ago',
                status: 'Reviewed',
                statusColor: 'bg-green-100 text-green-700'
              },
              {
                type: 'Request',
                subject: 'Schedule change needed',
                date: '1 week ago',
                status: 'Completed',
                statusColor: 'bg-blue-100 text-blue-700'
              },
              {
                type: 'Feedback',
                subject: 'Care worker appreciation',
                date: '2 weeks ago',
                status: 'Acknowledged',
                statusColor: 'bg-purple-100 text-purple-700'
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{item.type}</Badge>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <p className="font-medium text-gray-900">{item.subject}</p>
                </div>
                <Badge className={item.statusColor}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
