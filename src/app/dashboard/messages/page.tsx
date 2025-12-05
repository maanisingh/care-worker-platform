'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  MessageSquare,
  Send,
  User,
  Users,
  Search,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react'

type Message = {
  id: string
  content: string
  sender: string
  timestamp: string
  read: boolean
  fromMe: boolean
}

type Conversation = {
  id: string
  name: string
  type: 'team' | 'family' | 'manager'
  lastMessage: string
  timestamp: string
  unread: number
  avatar: string
  online: boolean
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Care Team - North',
    type: 'team',
    lastMessage: 'Thanks for the update on Margaret',
    timestamp: '10:45',
    unread: 2,
    avatar: 'CT',
    online: true
  },
  {
    id: '2',
    name: 'Thompson Family',
    type: 'family',
    lastMessage: 'How was mum today?',
    timestamp: '09:30',
    unread: 1,
    avatar: 'TF',
    online: false
  },
  {
    id: '3',
    name: 'Sarah Johnson (Manager)',
    type: 'manager',
    lastMessage: 'Please submit your timesheet',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'SJ',
    online: true
  },
  {
    id: '4',
    name: 'Williams Family',
    type: 'family',
    lastMessage: 'Thank you for your care',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'WF',
    online: false
  },
  {
    id: '5',
    name: 'Evening Shift Team',
    type: 'team',
    lastMessage: 'Handover notes uploaded',
    timestamp: '2 days ago',
    unread: 0,
    avatar: 'ES',
    online: false
  }
]

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hi team, just completed morning visit with Margaret Thompson',
    sender: 'You',
    timestamp: '10:30',
    read: true,
    fromMe: true
  },
  {
    id: '2',
    content: 'Blood pressure was 125/80, all medications taken',
    sender: 'You',
    timestamp: '10:31',
    read: true,
    fromMe: true
  },
  {
    id: '3',
    content: 'Great! Thanks for the update. Any concerns?',
    sender: 'Michael Peters',
    timestamp: '10:42',
    read: true,
    fromMe: false
  },
  {
    id: '4',
    content: 'None at all, she was in good spirits today',
    sender: 'You',
    timestamp: '10:43',
    read: true,
    fromMe: true
  },
  {
    id: '5',
    content: 'Thanks for the update on Margaret',
    sender: 'Emma Wilson',
    timestamp: '10:45',
    read: false,
    fromMe: false
  }
]

export default function MessagesPage() {
  const [conversations, setConversations] = useState(mockConversations)
  const [messages, setMessages] = useState(mockMessages)
  const [selectedConvo, setSelectedConvo] = useState<Conversation>(mockConversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredConversations = conversations.filter(convo =>
    convo.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: (messages.length + 1).toString(),
        content: newMessage,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        read: true,
        fromMe: true
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-12rem)]"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Team communications and client family messaging</p>
        </div>
        <Badge className="bg-blue-100 text-blue-700">
          {totalUnread} Unread
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Conversations List */}
        <Card className="border-0 shadow-md lg:col-span-1 flex flex-col h-full">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2 p-4">
            {filteredConversations.map((convo) => (
              <div
                key={convo.id}
                onClick={() => setSelectedConvo(convo)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedConvo.id === convo.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {convo.avatar}
                    </div>
                    {convo.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{convo.name}</h3>
                      {convo.unread > 0 && (
                        <Badge className="bg-blue-600 text-white ml-2">{convo.unread}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs capitalize">{convo.type}</Badge>
                      <span className="text-xs text-gray-500">{convo.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Messages Area */}
        <Card className="border-0 shadow-md lg:col-span-2 flex flex-col h-full">
          {/* Chat Header */}
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {selectedConvo.avatar}
                  </div>
                  {selectedConvo.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConvo.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedConvo.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.fromMe
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {!message.fromMe && (
                    <p className="text-xs font-semibold mb-1">{message.sender}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className={`flex items-center gap-1 mt-2 text-xs ${message.fromMe ? 'text-blue-100' : 'text-gray-500'}`}>
                    <span>{message.timestamp}</span>
                    {message.fromMe && (
                      <>
                        {message.read ? (
                          <CheckCheck className="h-3 w-3" />
                        ) : (
                          <Check className="h-3 w-3" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={sendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
